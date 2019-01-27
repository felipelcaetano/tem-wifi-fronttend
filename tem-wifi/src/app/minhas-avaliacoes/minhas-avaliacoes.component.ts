import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../shared/models/avaliacoes/avaliacao.model';
import { MinhasAvaliacoesService } from './minhas-avaliacoes.service';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-minhas-avaliacoes',
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrls: ['./minhas-avaliacoes.component.scss']
})
export class MinhasAvaliacoesComponent implements OnInit {

  avaliacoes: Avaliacao[] = [];

  constructor(private service: MinhasAvaliacoesService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.get("tem-wifi")
      .subscribe(resp => {

        this.service.listRatings({userId: resp.id})
          .subscribe(resp => {
            console.log(resp)
          })
      })
  }

}
