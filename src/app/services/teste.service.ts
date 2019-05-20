import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Teste } from '../models/Teste';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TesteService {
  private refresh = new Subject<void>();

  get Refresh() {
    return this.refresh;
  }

  constructor(private http: HttpClient) { }

  public listar(): Observable<Teste[]> {
    return this.http.get<Teste[]>('http://localhost:3002/testes').pipe(
      map(data => data.map(teste => new Teste().deserialize(teste)))
    );
  }

  public buscar(id: number | string): Observable<Teste> {
    return this.http.get<Teste>(`http://localhost:3002/testes/${id}`).pipe(
      map(data => new Teste().deserialize(data)),
      catchError(() => throwError('Teste não localizada'))
    );
  }

  public salvar(teste: Observable<Teste>): Observable<Teste> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const nTeste = new Teste().deserialize(teste);
    if (nTeste.id > 0) {
      return this.http.put(`http://localhost:3002/testes/${nTeste.id}`, nTeste, { headers }).pipe(
        map(data => new Teste().deserialize(data)),
        tap(() => {
          this.refresh.next();
        }),
        catchError(() => throwError('Erro ao atualizar'))
      );
    } else {
      return this.http.post('http://localhost:3002/testes', nTeste, { headers }).pipe(
        map(data => new Teste().deserialize(data)),
        tap(() => {
          this.refresh.next();
        }),
        catchError(() => throwError('Erro ao salvar'))
      );
    }
  }

  public deletar(id: number | string): Observable<any> {
    return this.http.delete(`http://localhost:3002/testes/${id}`).pipe(
      map(data => data),
      tap(() => {
        this.refresh.next();
      }),
      catchError(() => throwError('Não foi possivel deletar'))
    );
  }
}
