import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Candidato } from '../models/Candidato';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private refresh = new Subject<number>();
  private candidatoLogadoSubject: BehaviorSubject<Candidato>;
  public candidatoLogado: Observable<Candidato>;
  baseUrl = environment.baseUrl;
  get Refresh() {
    return this.refresh;
  }
  constructor(private http: HttpClient) {
    this.candidatoLogadoSubject = new BehaviorSubject<Candidato>(JSON.parse(localStorage.getItem('candidatoLogado')));
    this.candidatoLogado = this.candidatoLogadoSubject.asObservable();
  }
  public get getCandidatoLogado(): Candidato {
    return this.candidatoLogadoSubject.value;
  }

  public logar(candidato: Candidato): Observable<Candidato> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const url = this.baseUrl + '/candidatos/login';
    return this.http.post(url, candidato, { headers }).pipe(
      map(data => {
        const candidatoLogado = new Candidato().deserialize(data);
        if (candidatoLogado.idUsuario > 0) {
          localStorage.setItem('candidatoLogado', JSON.stringify(candidatoLogado));
          localStorage.removeItem('empresaLogado');
          this.candidatoLogadoSubject.next(candidatoLogado);
        }
        return candidatoLogado;
      }),
      catchError(() => throwError('Erro ao logar'))
    );
  }

  logout() {
    localStorage.removeItem('candidatoLogado');
    this.candidatoLogadoSubject.next(null);
  }

  public listar(): Observable<Candidato[]> {
    const url = this.baseUrl + '/candidatos';
    return this.http.get<Candidato[]>(url).pipe(
      map(data => data.map(candidato => new Candidato().deserialize(candidato)))
    );
  }

  public buscar(id: number | string): Observable<Candidato> {
    const url = this.baseUrl + `/candidatos/${id}`;
    return this.http.get<Candidato>(url).pipe(
      map(data => new Candidato().deserialize(data)),
      catchError(() => throwError('Candidato não localizada'))
    );
  }

  public salvar(candidato: Observable<Candidato>): Observable<Candidato> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const nCandidato = new Candidato().deserialize(candidato);
    if (nCandidato.idUsuario > 0) {
      const url = this.baseUrl + `/candidatos/${nCandidato.idUsuario}`;
      return this.http.put(url, nCandidato, { headers }).pipe(
        map(data => new Candidato().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idUsuario);
        }),
        catchError(() => throwError('Erro ao atualizar'))

      );
    } else {
      const url = this.baseUrl + '/candidatos';
      return this.http.post(url, nCandidato, { headers }).pipe(
        map(data => new Candidato().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idUsuario);
        }),
        catchError(() => throwError('Erro ao salvar'))
      );
    }
  }

  public deletar(id: number | string): Observable<any> {
    const url = this.baseUrl + `/candidatos/${id}`;
    return this.http.delete(url).pipe(
      map(data => data),
      tap(() => {
        this.refresh.next();
      }),
      catchError(() => throwError('Não foi possivel deletar'))
    );
  }
}
