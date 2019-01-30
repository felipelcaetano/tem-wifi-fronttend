import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Avaliacao, AvaliacaoInternet } from '../shared/models/avaliacoes/avaliacao.model';
import { MinhasAvaliacoesService } from './minhas-avaliacoes.service';
import { StorageService } from '../storage/storage.service';
import { LocaisService } from '../locais/locais.service';
import { Local } from '../shared/models/locais/local.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-minhas-avaliacoes',
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrls: ['./minhas-avaliacoes.component.scss']
})
export class MinhasAvaliacoesComponent implements OnInit {

  avaliacoes: Avaliacao[] = [];
  loading: boolean = false;

  constructor(private service: MinhasAvaliacoesService, private storageService: StorageService, private locaisService: LocaisService, 
    private cdRef:ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.storageService.get("tem-wifi")
      .subscribe(resp => {

        this.service.listRatings({userId: resp.id})
          .subscribe(resp => {
            console.log('Return get ratings: ', resp);
            this.avaliacoes = [];

            resp.ratings
              .forEach(rating => {

                this.locaisService.getLocation(rating.locationId)
                  .subscribe(resp => {
                    console.log('Return get location: ', resp);

                    let local: Local = {
                      name: resp.name,
                      city: resp.city,
                      complement: resp.complement,
                      country: resp.country,
                      id: resp.id,
                      number: resp.number,
                      postCode: resp.postCode,
                      state: resp.state,
                      street: resp.street,
                      ratingsCount: resp.ratingsCount
                    }

                    let internet: AvaliacaoInternet = {
                      hasInternet: rating.internet.hasInternet ? rating.internet.hasInternet : false,
                      isOpened: rating.internet.isOpened ? rating.internet.isOpened : false,
                      pass: rating.internet.pass,
                      speed: rating.internet.speed
                    }
                    let avaliacao: Avaliacao = {
                      id: rating.id,
                      userId: rating.userId,
                      location: local,
                      internet: internet,
                      foods: rating.foods,
                      drinks: rating.drinks,
                      treatment: rating.treatment,
                      price: rating.price,
                      comfort: rating.comfort,
                      noise: rating.noise,
                      generalRating: rating.generalRating,
                      urlImagem: '../../assets/images/img_place_'+ (Math.floor(Math.random() * 3) + 1) + '.jpg'
                    }

                    this.avaliacoes.push(avaliacao);
                  },
                  error => {
                    console.log('Erro get location: ', error);
                    this.openSnackBar('Erro inesperado');
                    this.loading = false;
                  })
              })
              this.loading = false;
          },
          error => {
            console.log('Erro list ratings: ', error);
            this.openSnackBar('Erro inesperado');
            this.loading = false;
          })
      },
      error => {
        console.log('Erro storage: ', error);
        this.openSnackBar('Erro inesperado');
        this.loading = false;
      })
  }

  onClickUpdateRating(avaliacao: Avaliacao): void {
    console.log(avaliacao)
    this.loading = true;
    this.service.updateRating(avaliacao)
      .subscribe(resp => {
        this.openSnackBar('Avaliação atualizada');
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.openSnackBar('Erro inesperado');
        console.log('Erro update rating ', error)
      })
  }

  openSnackBar(message: string) {
      this.snackBar.open(message, 'X', {
        duration: 2000,
      });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
