import { Deserializable } from './Deserializable';
import { Resposta } from './Resposta';

export class Questao implements Deserializable{
  public idQuestao = 0;
  public descricao: string;
  public respostas: Resposta[] = [];

  deserialize(input: any): this {

    Object.assign(this, input);

    // Iterate over all cars for our user and map them to a proper `Car` model
    this.respostas = input.respostas.map(resposta => new Resposta().deserialize(resposta));

    return this;
  }
}
