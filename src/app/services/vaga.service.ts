import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { Vaga } from '../models/Vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  constructor(private http: HttpClient) { }

  public listarVagas() : Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`http://localhost:3002/vagas`).pipe(
      map(data => data.map(data => new Vaga().deserialize(data)))
    );
  }

  public buscarVaga(id: number | string): Observable<Vaga> {
    return this.http.get<Vaga>(`http://localhost:3002/vaga/${id}`).pipe(
      map(data => new Vaga().deserialize(data)),
      catchError(() => throwError('Vaga não localizada'))
    );
  }
}
