import { Questao } from './Questao';
import { Deserializable } from './Deserializable';

export class Teste implements Deserializable {
  public id: number;
  public titulo: string;
  public questoes: Questao[];

  deserialize(input: any): this {

    Object.assign(this, input);

    this.questoes = input.questoes.map(questao => new Questao().deserialize(questao));

    return this;
  }
}
