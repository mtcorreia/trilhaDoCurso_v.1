import { Component, OnInit } from '@angular/core';
import { catchError, delay, of } from 'rxjs';
import { SenacCoin } from 'src/app/models/SenacCoin';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { SenacCoinMovimentacaoService } from 'src/app/services/senac-coin-movimentacao.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';
import { ErrorService } from 'src/app/shared/alerts/error-dialog/error-dialog.service';

@Component({
  selector: 'app-trilha-curso',
  templateUrl: './usuario-trilha-curso.component.html',
  styleUrls: ['./usuario-trilha-curso.component.css']
})
export class UsuarioTrilhaCursoComponent implements OnInit {

  senacCoins : SenacCoin;
  loading: boolean = true;
  senacCoinMovimentacoes : SenacCoinMovimentacao[]; 
  idUsuarioLogado : string;
  unidadesCurriculares : UnidadeCurricular[];

  constructor(private senacCoinService : SenacCoinService, private senacCoinMovimentacao : SenacCoinMovimentacaoService, private unidadeCurricularService : UnidadeCurricularService, private errorService : ErrorService) { }

  ngOnInit(): void {

    this.ObterUnidadesCurriculares();

    this.idUsuarioLogado = localStorage.getItem("UsuarioId")!;

    this.senacCoinService.ObterSenacCoinPeloUsuarioId(this.idUsuarioLogado).subscribe((resultado:SenacCoin) =>{
      this.senacCoins = resultado;
      this.loading = false;
    });

    this.senacCoinMovimentacao.ObterSenacCoinMovimentacaoPeloUsuarioId(this.idUsuarioLogado).subscribe((resultado:SenacCoinMovimentacao[]) =>{
        this.senacCoinMovimentacoes = resultado;
        this.loading = false;
    }); 

  }

  ObterUnidadesCurriculares = () => {
    this.unidadeCurricularService.ObterTodasUnidadesCurriculares().pipe(
      delay(500),
      catchError((error) => {
        this.errorService.onError('Erro ao carregar unidades curriculares.');
        return of([]);
      })
    ).subscribe((resultadoUnidadesCurriculares) => {
      this.unidadesCurriculares = resultadoUnidadesCurriculares;
      console.log(this.unidadesCurriculares);
    });
  }


  
}