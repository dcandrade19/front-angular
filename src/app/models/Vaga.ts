import { Teste } from './Teste';
import { Deserializable } from './Deserializable';


export class Vaga implements Deserializable {
    public id: number;
    public nome: string;
    public testes: Teste[];

    deserialize(input: any): this {

      Object.assign(this, input);

      // Iterate over all cars for our user and map them to a proper `Car` model
      this.testes = input.testes.map(teste => new Teste().deserialize(teste));

      return this;
    }
}
