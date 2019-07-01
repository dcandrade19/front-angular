import { Resultado } from './Resultado';
import { Usuario } from './Usuario';
import { Deserializable } from './Deserializable';

export class Candidato extends Usuario implements Deserializable{

  public resultados: Resultado[] = [];

  deserialize(input: any): this {

    Object.assign(this, input);
    if (this.resultados.length) {
      this.resultados = input.resultados.map(resultado => new Resultado().deserialize(resultado));
    }
    return this;
  }
}
