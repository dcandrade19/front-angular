import { Deserializable } from './Deserializable';

export class Resposta implements Deserializable{
  public idResposta: number;
  public descricao: string;
  public certa: boolean;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
