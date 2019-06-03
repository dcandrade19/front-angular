import { Teste } from './Teste';
import { Usuario } from './Usuario';
import { Deserializable } from './Deserializable';

export class Resultado implements Deserializable {

  public idResultado: number;
  public usuario: Usuario;
  public teste: Teste;
  public nota: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
