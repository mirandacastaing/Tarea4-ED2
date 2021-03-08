import {BTree}  from "./structures/";
import * as promptly from 'promptly';

export default class BTreeGestor {

    constructor() { }

    private tree: BTree;

    public traverseTree():void{
        this.tree.traverse();
    }

    public async insert(): Promise<any> {
        if (this.tree == null) {
            let degree = await promptly.prompt('Ingresar grado/orden de arbol: ');
            this.tree = new BTree(Number(degree));
        }

        let numero = await promptly.prompt('Ingresar numero: ');
        this.tree.insert(Number(numero));
    }

    public async search(): Promise<any> {
        if (this.tree == null)
            return console.log('Debe crear un arbol primero.');

        let numero = await promptly.prompt('Ingresar numero: ');
        let arr = this.tree.search(Number(numero));
        if ( arr != null)
            console.log('Numero encontrado.');
        else
            console.log('Numero no encontrado.');
    }

    public async remove(): Promise<any> {
        if (this.tree == null)
            return console.log('Debe crear un arbol primero.');

        let numero = await promptly.prompt('Ingresar numero: ');
        let arr = this.tree.remove(Number(numero));
    }
}