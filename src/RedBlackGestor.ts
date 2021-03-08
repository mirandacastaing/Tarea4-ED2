import { RedBlackTree } from "./structures/";
import * as promptly from 'promptly';

export default class RedBlackGestor {

    constructor() { }

    private tree: RedBlackTree;

    public traverseTree(): void {
        this.tree.prettyPrint();
    }

    public async insert(): Promise<any> {
        if (this.tree == null) {
            this.tree = new RedBlackTree();
        }

        let num = await promptly.prompt('Ingresar numero: ');
        this.tree.insert(Number(num));
    }

    public async search(): Promise<any> {
        if (this.tree == null)
            return console.log('Debe crear un arbol primero.');

        let key = await promptly.prompt('Ingresar key: ');
        let arr = this.tree.searchTree(Number(key));
        if (arr != null)
            console.log('Numero encontrado.');
        else
            console.log('Numero no encontrado.');
    }

    public async remove(): Promise<any> {
        if (this.tree == null)
            return console.log('Debe crear un arbol primero.');

        let key = await promptly.prompt('Ingresar el key: ');
        let arr = this.tree.deleteNode(Number(key));
    }
}