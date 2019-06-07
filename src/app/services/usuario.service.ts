import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private refresh = new Subject<number>();
  private usuarioLogadoSubject: BehaviorSubject<Usuario>;
  public usuarioLogado: Observable<Usuario>;
  baseUrl = environment.baseUrl;
  get Refresh() {
    return this.refresh;
  }
  constructor(private http: HttpClient) {
    this.usuarioLogadoSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuarioLogado')));
    this.usuarioLogado = this.usuarioLogadoSubject.asObservable();
  }
  public get getUsuarioLogado(): Usuario {
    return this.usuarioLogadoSubject.value;
  }

  public logar(usuario: Observable<Usuario>): Observable<Usuario> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
      let url = this.baseUrl + '/usuarios/logar';
    return this.http.post(url, usuario, { headers }).pipe(
      map(data => {
        const usuarioLogado = new Usuario().deserialize(data);
        if (usuarioLogado.idUsuario > 0) {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
          this.usuarioLogadoSubject.next(usuarioLogado);
        }
        return usuarioLogado;
      }),
      tap((data) => {
        this.refresh.next(data.idUsuario);
      }),
      catchError(() => throwError('Erro ao logar'))
    );
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogadoSubject.next(null);
  }

  public listar(): Observable<Usuario[]> {
    let url = this.baseUrl + '/usuarios';
    return this.http.get<Usuario[]>(url).pipe(
      map(data => data.map(usuario => new Usuario().deserialize(usuario)))
    );
  }

  public buscar(id: number | string): Observable<Usuario> {
    let url = this.baseUrl + `/usuarios/${id}`;
    return this.http.get<Usuario>(url).pipe(
      map(data => new Usuario().deserialize(data)),
      catchError(() => throwError('Usuario não localizada'))
    );
  }

  public salvar(usuario: Observable<Usuario>): Observable<Usuario> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const nUsuario = new Usuario().deserialize(usuario);
    let url = this.baseUrl + `/usuarios/${nUsuario.idUsuario}`;
    if (nUsuario.idUsuario > 0) {
      return this.http.put(url, nUsuario, { headers }).pipe(
        map(data => new Usuario().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idUsuario);
        }),
        catchError(() => throwError('Erro ao atualizar'))

      );
    } else {
      let url = this.baseUrl + '/usuarios';
      return this.http.post(url, nUsuario, { headers }).pipe(
        map(data => new Usuario().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idUsuario);
        }),
        catchError(() => throwError('Erro ao salvar'))
      );
    }
  }

  public deletar(id: number | string): Observable<any> {
    let url = this.baseUrl + `/usuarios/${id}`;
    return this.http.delete(url).pipe(
      map(data => data),
      tap(() => {
        this.refresh.next();
      }),
      catchError(() => throwError('Não foi possivel deletar'))
    );
  }
}
