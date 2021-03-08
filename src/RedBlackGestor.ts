import { RedBlackTree } from "./structures/";
import * as promptly from 'promptly';

export default class RedBlackGestor {

    constructor() { }

    private tree: RedBlackTree;

    //     public traverseTree():void{
    //         this.tree.traverse();
    //     }

    public async insert(): Promise<any> {
        if (this.tree == null) {
            this.tree = new RedBlackTree();
        }

        let key = await promptly.prompt('Ingresar la llave: ');
        let num = await promptly.prompt('Ingresar numero: ');
        this.tree.insert(key, num);
    }

        public async search(): Promise<any> {
            if (this.tree == null)
                return console.log('Debe crear un arbol primero.');

            let key = await promptly.prompt('Ingresar key: ');
            let arr = this.tree.getNode(key);
            if ( arr != null)
                console.log('Numero encontrado.');
            else
                console.log('Numero no encontrado.');
        }

    //     public async remove(): Promise<any> {
    //         if (this.tree == null)
    //             return console.log('Debe crear un arbol primero.');

    //         let numero = await promptly.prompt('Ingresar numero: ');
    //         let arr = this.tree.remove(Number(numero));
    //     }
}