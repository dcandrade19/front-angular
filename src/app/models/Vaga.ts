import { Teste } from './Teste';
import { Deserializable } from './Deserializable';


export class Vaga implements Deserializable {
    public id: number;
    public nome: string;
    public empresa: string;
    public descricao: string;
    public cidade: string;
    public estado: string;
    public data: Date;
    public periodo: string;
    public testes: Teste[];

    deserialize(input: any): this {

      Object.assign(this, input);

      this.testes = input.testes.map(teste => new Teste().deserialize(teste));

      return this;
    }
}
