import { Questao } from './Questao';
import { Deserializable } from './Deserializable';

export class Teste implements Deserializable{
  public titulo: string;
  public questoes: Questao[];

  deserialize(input: any): this {

    Object.assign(this, input);

    // Iterate over all cars for our user and map them to a proper `Car` model
    this.questoes = input.questoes.map(questao => new Questao().deserialize(questao));

    return this;
  }
}
