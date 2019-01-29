import { Component, OnInit, ViewChildren, AfterViewInit, QueryList, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { Local } from '../shared/models/locais/local.model';
import { NgxViacepService, Endereco, ErroCep, ErrorValues } from '@brunoc/ngx-viacep';
import { Avaliacao } from '../shared/models/avaliacoes/avaliacao.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-nova-avaliacao',
  templateUrl: './nova-avaliacao.component.html',
  styleUrls: ['./nova-avaliacao.component.scss']
})
export class NovaAvaliacaoComponent implements OnInit, AfterViewInit {

  newLocationForm: FormGroup;
  newRatingForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  local: Local;
  avaliacao: Avaliacao = {
    comfort: 3, 
    drinks: '',
    foods: '',
    generalRating: 3,
    noise: 3,
    price: 3,
    treatment: 3,
    internet: {
      hasInternet: true,
      isOpened: true,
      speed: 0,
      pass: ''
    }
  };
  private cepTemp: string = '';

  @ViewChildren('inputField') iputFields: QueryList<ElementRef>;

  constructor(private fb: FormBuilder, private viacep: NgxViacepService, private snackBar: MatSnackBar, private cdRef:ChangeDetectorRef) { }

  onSelectGooglePlace(local: Local): void {
    console.log(local);
    this.local = local;
    this.logradouro.setValue(local.street);
    this.numero.setValue(local.number);
    this.cep.setValue(local.postCode);
    this.cidade.setValue(local.city);
    this.estado.setValue(local.state);
    this.iputFields.forEach(input => {
      input.nativeElement.focus()
    });
    this.iputFields.first.nativeElement.focus();
  }

  returViaCep(endereco: Endereco): void {
    this.local = {
      street: endereco.logradouro,
      postCode: endereco.cep.replace('-', ''),
      city: endereco.localidade,
      state: endereco.uf,
      country: 'Brasil'
    }
    
    this.onSelectGooglePlace(this.local);
  }

  onKeyupCep(event: any): void {
    console.log(event.target.value);

    if(event.target.value.length == 8 && this.cepTemp != event.target.value) {
      this.cepTemp = event.target.value;

      this.viacep.buscarPorCep(event.target.value)
        .then( (endereco: Endereco) => {
          console.log('Ednereco via cep: ', endereco);
          this.cep.setErrors(null);
          this.returViaCep(endereco);
        })
        .catch( (error: ErroCep) => {
          console.log(error.message);
          switch(error.getCode()) {

            case ErrorValues.ERRO_SERVIDOR:
              this.openSnackBar('Erro na consulta de cep', 'Fechar');
              this.cep.setErrors(null);
              break;

            default:
              this.cep.setErrors({'invalid': true});
              break;
          }
        })
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  get nome() { return this.newLocationForm.get('nome'); }
  get logradouro() { return this.newLocationForm.get('logradouro'); }
  get numero() { return this.newLocationForm.get('numero'); }
  get nocomplementome() { return this.newLocationForm.get('complemento'); }
  get cep() { return this.newLocationForm.get('cep'); }
  get cidade() { return this.newLocationForm.get('cidade'); }
  get estado() { return this.newLocationForm.get('estado'); }

  get senhaInternet() { return this.newRatingForm.get('senhaInternet'); }
  get comidas() { return this.newRatingForm.get('comidas'); }
  get bebidas() { return this.newRatingForm.get('bebidas'); }

  ngOnInit() {
    this.newLocationForm = this.fb.group({
      nome: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern('^\\d{1,}$')]],
      complemento: [''],
      cep: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    })

    this.newRatingForm = this.fb.group({
      senhaInternet: [{value: '', disabled: true}],
      comidas: [''],
      bebidas: [''],
    })
  }

  onSubmitRating(): void {

  }

  onSubmitLocation(): void {

  }

  onChangeIsOpenedTrue(): void {
    console.log('disable')
    this.senhaInternet.disable();
  }

  onChangeIsOpenedFalse(): void {
    console.log('enable')
    this.senhaInternet.enable();
  }

  ngAfterViewInit() {
    // viewChildren is set
    console.log(this.iputFields);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
