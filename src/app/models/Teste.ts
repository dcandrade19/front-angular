import { Questao } from './Questao';
import { Deserializable } from './Deserializable';
import { Resultado } from './Resultado';

export class Teste implements Deserializable {
  public idTeste = 0;
  public titulo: string;
  public questoes: Questao[] = [];
  public resultados: Resultado[] = [];

  deserialize(input: any): this {

    Object.assign(this, input);

    if (this.questoes.length) {
    this.questoes = input.questoes.map(questao => new Questao().deserialize(questao));
    }
    if (this.resultados.length) {
    this.resultados = input.resultados.map(resultado => new Resultado().deserialize(resultado));
    }
    return this;
  }
}
