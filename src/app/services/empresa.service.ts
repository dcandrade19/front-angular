import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Empresa } from '../models/Empresa';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private refresh = new Subject<number>();
  private empresaLogadoSubject: BehaviorSubject<Empresa>;
  public empresaLogado: Observable<Empresa>;
  baseUrl = environment.baseUrl;
  get Refresh() {
    return this.refresh;
  }
  constructor(private http: HttpClient) {
    this.empresaLogadoSubject = new BehaviorSubject<Empresa>(JSON.parse(localStorage.getItem('empresaLogado')));
    this.empresaLogado = this.empresaLogadoSubject.asObservable();
  }
  public get getEmpresaLogado(): Empresa {
    return this.empresaLogadoSubject.value;
  }

  public logar(empresa: Empresa): Observable<Empresa> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const url = this.baseUrl + '/empresas/login';
    return this.http.post(url, empresa, { headers }).pipe(
      map(data => {
        const empresaLogado = new Empresa().deserialize(data);
        if (empresaLogado.idUsuario > 0) {
          localStorage.setItem('empresaLogado', JSON.stringify(empresaLogado));
          localStorage.removeItem('candidatoLogado');
          this.empresaLogadoSubject.next(empresaLogado);
        }
        return empresaLogado;
      }),
      catchError(() => throwError('Erro ao logar'))
    );
  }

  logout() {
    localStorage.removeItem('empresaLogado');
    this.empresaLogadoSubject.next(null);
  }

  public listar(): Observable<Empresa[]> {
    const url = this.baseUrl + '/empresas';
    return this.http.get<Empresa[]>(url).pipe(
      map(data => data.map(empresa => new Empresa().deserialize(empresa)))
    );
  }

  public buscar(id: number | string): Observable<Empresa> {
    const url = this.baseUrl + `/empresas/${id}`;
    return this.http.get<Empresa>(url).pipe(
      map(data => new Empresa().deserialize(data)),
      catchError(() => throwError('Empresa não localizada'))
    );
  }

  public salvar(empresa: Observable<Empresa>): Observable<Empresa> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const nEmpresa = new Empresa().deserialize(empresa);
    if (nEmpresa.idUsuario > 0) {
      const url = this.baseUrl + `/empresas/${nEmpresa.idUsuario}`;
      return this.http.put(url, nEmpresa, { headers }).pipe(
        map(data => new Empresa().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idUsuario);
        }),
        catchError(() => throwError('Erro ao atualizar'))

      );
    } else {
      const url = this.baseUrl + '/empresas';
      return this.http.post(url, nEmpresa, { headers }).pipe(
        map(data => new Empresa().deserialize(data)),
        tap((data) => {
          this.refresh.next(data.idUsuario);
        }),
        catchError(() => throwError('Erro ao salvar'))
      );
    }
  }

  public deletar(id: number | string): Observable<any> {
    const url = this.baseUrl + `/empresas/${id}`;
    return this.http.delete(url).pipe(
      map(data => data),
      tap(() => {
        this.refresh.next();
      }),
      catchError(() => throwError('Não foi possivel deletar'))
    );
  }
}
