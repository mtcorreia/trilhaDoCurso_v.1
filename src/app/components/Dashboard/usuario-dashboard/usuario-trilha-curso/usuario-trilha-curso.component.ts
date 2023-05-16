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
  unidadesCurricularesM1 : UnidadeCurricular[];
  unidadesCurricularesM2 : UnidadeCurricular[];
  unidadesCurricularesM3 : UnidadeCurricular[];
  unidadesCurricularesM4 : UnidadeCurricular[];
  unidadesCurricularesM5 : UnidadeCurricular[];

  constructor(private senacCoinService : SenacCoinService, private senacCoinMovimentacao : SenacCoinMovimentacaoService, private unidadeCurricularService : UnidadeCurricularService, private errorService : ErrorService) { }

  ngOnInit(): void {

    this.ObterUnidadesCurricularesM1();
    this.ObterUnidadesCurricularesM2();
    this.ObterUnidadesCurricularesM3();
    this.ObterUnidadesCurricularesM4();
    this.ObterUnidadesCurricularesM5();

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
  
  
  // TODAS UNIDADES CURRICULARES
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

  // MÓDULO 1
  ObterUnidadesCurricularesM1 = () => {
    this.unidadeCurricularService.ObterUnidadeCurricularPeloModuloId(1).pipe(
      delay(500),
      catchError((error) => {
        this.errorService.onError('Erro ao carregar unidades curriculares.');
        return of([]);
      })
    ).subscribe((resultadoUnidadesCurriculares) => {
      this.unidadesCurricularesM1 = resultadoUnidadesCurriculares;
      console.log(this.unidadesCurricularesM1);
    });
  }
      // MÓDULO 2
  ObterUnidadesCurricularesM2 = () => {
    this.unidadeCurricularService.ObterUnidadeCurricularPeloModuloId(2).pipe(
      delay(500),
      catchError((error) => {
        this.errorService.onError('Erro ao carregar unidades curriculares.');
        return of([]);
      })
    ).subscribe((resultadoUnidadesCurriculares) => {
      this.unidadesCurricularesM2 = resultadoUnidadesCurriculares;
      console.log(this.unidadesCurricularesM2);
    });
  }

  // MÓDULO 3
  ObterUnidadesCurricularesM3 = () => {
    this.unidadeCurricularService.ObterUnidadeCurricularPeloModuloId(3).pipe(
      delay(500),
      catchError((error) => {
        this.errorService.onError('Erro ao carregar unidades curriculares.');
        return of([]);
      })
    ).subscribe((resultadoUnidadesCurriculares) => {
      this.unidadesCurricularesM3 = resultadoUnidadesCurriculares;
      console.log(this.unidadesCurricularesM3);
    });
  }  

  // MÓDULO 4
  ObterUnidadesCurricularesM4 = () => {
    this.unidadeCurricularService.ObterUnidadeCurricularPeloModuloId(4).pipe(
      delay(500),
      catchError((error) => {
        this.errorService.onError('Erro ao carregar unidades curriculares.');
        return of([]);
      })
    ).subscribe((resultadoUnidadesCurriculares) => {
      this.unidadesCurricularesM4 = resultadoUnidadesCurriculares;
      console.log(this.unidadesCurricularesM4);
    });
  }  
    // MÓDULO 5
    ObterUnidadesCurricularesM5 = () => {
      this.unidadeCurricularService.ObterUnidadeCurricularPeloModuloId(5).pipe(
        delay(500),
        catchError((error) => {
          this.errorService.onError('Erro ao carregar unidades curriculares.');
          return of([]);
        })
      ).subscribe((resultadoUnidadesCurriculares) => {
        this.unidadesCurricularesM5 = resultadoUnidadesCurriculares;
        console.log(this.unidadesCurricularesM5);
      });
    }

}