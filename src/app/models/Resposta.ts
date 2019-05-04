import { Deserializable } from './Deserializable';

export class Resposta implements Deserializable{
  public descricao: string;
  public certa: boolean;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
