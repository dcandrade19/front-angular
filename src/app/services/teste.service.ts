import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Teste } from '../models/Teste';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  constructor(private http: HttpClient) { }

  public listar(): Observable<Teste[]> {
    return this.http.get<Teste[]>('http://localhost:3002/Teste').pipe(
      map(data => data.map(teste => new Teste().deserialize(teste)))
    );
  }

  public buscar(id: number | string): Observable<Teste> {
    return this.http.get<Teste>(`http://localhost:3002/teste/${id}`).pipe(
      map(data => new Teste().deserialize(data)),
      catchError(() => throwError('Teste não localizado'))
    );
  }

  public salvar(teste: Observable<Teste>) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    const nTeste = new Teste().deserialize(teste);
    if (nTeste.id > 0) {
      this.http.put('http://localhost:3002/teste', nTeste , {headers}).subscribe();
    } else {
      this.http.post('http://localhost:3002/teste', nTeste , {headers}).subscribe();
    }
  }
}
