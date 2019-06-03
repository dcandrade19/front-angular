import { Deserializable } from './Deserializable';
import { Resultado } from './Resultado';

export class Usuario implements Deserializable {

  public idUsuario: number;
  public nome: string;
  public senha: string;
  public tipo: number;
  public resultados: Resultado[];

  deserialize(input: any): this {

    Object.assign(this, input);
    if (this.resultados) {
    this.resultados = input.resultados.map(resultado => new Resultado().deserialize(resultado));
    }
    return this;
  }
}
