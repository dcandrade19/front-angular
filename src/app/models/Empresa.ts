import { Usuario } from './Usuario';
import { Vaga } from './Vaga';
import { Deserializable } from './Deserializable';

export class Empresa extends Usuario implements Deserializable {
  public razaoSocial: string;
  public vagas: Vaga[] = [];

  deserialize(input: any): this {

    Object.assign(this, input);
    if (this.vagas.length) {
      this.vagas = input.vagas.map(vaga => new Vaga().deserialize(vaga));
    }
    return this;
  }

  toString(): string {
    return this.razaoSocial;
  }
}
