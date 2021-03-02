import { AVLTree } from "./structures/";
import * as promptly from 'promptly';

export default class AVLTreeMenu {

    constructor() { }

    private tree: AVLTree = new AVLTree();

    public async menu(): Promise<any> {

        let menu: string = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar 'preorden'.
        \r 3. Mostrar 'inorden'.
        \r 4. Mostrar 'postorden'.
        \r 0. Salir.`;
        let opcion: string;
        do {
            console.log(menu);
            opcion = await promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '4', '0']);
            switch (opcion) {
                case '1':
                    let numero = await promptly.prompt('Ingresar numero: ');
                    this.tree.insert(Number(numero));
                    break;
                case '2':
                    this.tree.showPreOrder();
                    break;
                case '3':
                    this.tree.showInOrder();
                    break;
                case '4':
                    this.tree.showPostOrder();
                    break;
                case '0':
                    break;
                default:
                    break;
            }

        } while (opcion != '0');
    }
}