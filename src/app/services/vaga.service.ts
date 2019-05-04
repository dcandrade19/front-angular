import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Vaga } from '../models/Vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  constructor(private http: HttpClient) { }

  public listar(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>('http://localhost:3002/vagas').pipe(
      map(data => data.map(vaga => new Vaga().deserialize(vaga)))
    );
  }

  public buscar(id: number | string): Observable<Vaga> {
    return this.http.get<Vaga>(`http://localhost:3002/vaga/${id}`).pipe(
      map(data => new Vaga().deserialize(data)),
      catchError(() => throwError('Vaga não localizada'))
    );
  }

  public salvar(vaga: Observable<Vaga>): Observable<Vaga> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const nVaga = new Vaga().deserialize(vaga);
    if (nVaga.id > 0) {
      return this.http.put(`http://localhost:3002/vaga/${nVaga.id}`, nVaga, { headers }).pipe(
        map(data => new Vaga().deserialize(data)),
        catchError(() => throwError('Erro ao atualizar'))
      );
    } else {
      return this.http.post('http://localhost:3002/vaga', nVaga, { headers }).pipe(
        map(data => new Vaga().deserialize(data)),
        catchError(() => throwError('Erro ao salvar'))
      );
    }
  }

  public deletar(id: number | string): Observable<any> {
    return this.http.delete(`http://localhost:3002/vaga/${id}`).pipe(
      map(data => data),
      catchError(() => throwError('Não foi possivel deletar'))
    );
  }
}
