import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Vaga } from '../models/Vaga';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private refresh = new Subject<number>();
  baseUrl = environment.baseUrl;
  get Refresh() {
    return this.refresh;
  }
  constructor(private http: HttpClient) { }

  public listar(): Observable<Vaga[]> {
    let url = this.baseUrl + '/vagas';
    return this.http.get<Vaga[]>(url).pipe(
      map(data => data.map(vaga => new Vaga().deserialize(vaga)))
    );
  }

  public buscar(id: number | string): Observable<Vaga> {
    let url = this.baseUrl + `/vagas/${id}`;
    return this.http.get<Vaga>(url).pipe(
      map(data => new Vaga().deserialize(data)),
      catchError(() => throwError('Vaga não localizada'))
    );
  }

  public salvar(vaga: Observable<Vaga>): Observable<Vaga> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const nVaga = new Vaga().deserialize(vaga);
    let url = this.baseUrl + `/vagas/${nVaga.idVaga}`;
    if (nVaga.idVaga > 0) {
      return this.http.put(url, nVaga, { headers }).pipe(
        map(data => new Vaga().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idVaga);
        }),
        catchError(() => throwError('Erro ao atualizar'))

      );
    } else {
      let url = this.baseUrl + '/vagas';
      return this.http.post(url, nVaga, { headers }).pipe(
        map(data => new Vaga().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idVaga);
        }),
        catchError(() => throwError('Erro ao salvar'))
      );
    }
  }

  public deletar(id: number | string): Observable<any> {
    let url = this.baseUrl + `/vagas/${id}`;
    return this.http.delete(url).pipe(
      map(data => data),
      tap(() => {
        this.refresh.next();
      }),
      catchError(() => throwError('Não foi possivel deletar'))
    );
  }
}
