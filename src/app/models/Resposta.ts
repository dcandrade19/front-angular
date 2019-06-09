import { Deserializable } from './Deserializable';

export class Resposta implements Deserializable{
  public idResposta = 0;
  public descricao: string;
  public certa: boolean;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
