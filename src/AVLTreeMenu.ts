import * as promptly from 'promptly';
import AVLgestorGestor from './AVLTreeGestor';

export default class AVLgestorMenu {

    constructor() { }

    private gestor: AVLgestorGestor = new AVLgestorGestor();

    public async menu(): Promise<any> {

        let menu: string = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar 'preorden'.
        \r 3. Mostrar 'inorden'.
        \r 4. Mostrar 'postorden'.
        \r 5. Buscar.
        \r 0. Salir.`;
        let opcion: string;
        do {
            console.log(menu);
            opcion = await promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '4','5', '0']);
            let input:string;
            switch (opcion) {
                case '1':
                    input = await promptly.prompt('Ingresar numero: ');
                    this.gestor.insert(Number(input));
                    break;
                case '2':
                    this.gestor.showPreOrder();
                    break;
                case '3':
                    this.gestor.showInOrder();
                    break;
                case '4':
                    this.gestor.showPostOrder();
                    break;
                case '5':
                    input = await promptly.prompt('Ingresar numero: ');
                    this.gestor.search(Number(input));
                    break;
                case '0':
                    break;
                default:
                    break;
            }

        } while (opcion != '0');
    }
}