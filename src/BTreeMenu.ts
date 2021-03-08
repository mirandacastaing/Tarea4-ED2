import BTreeGestor  from "./BTreeGestor";
import * as promptly from 'promptly';

export default class BTreeMenu {

    constructor() { }

    private gestor: BTreeGestor = new BTreeGestor();

    public async menu(): Promise<any> {

        let menu: string = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar.
        \r 3. Buscar.
        \r 4. Remover.
        \r 0. Salir.`;
        let opcion: string;
        do {
            console.log(menu);
            opcion = await promptly.choose('Escoger opcion de menu: ', ['1', '2', '3','4', '0']);

            switch (opcion) {
                case '1':
                    await this.gestor.insert();
                    break;
                case '2':
                    this.gestor.traverseTree();
                    break;
                case '3':
                    await this.gestor.search();
                    break;
                case '4':
                    await this.gestor.remove();
                    break;
                case '0':
                    return;
                    break;
                default:
                    break;
            }

        } while (opcion != '0');
        return 1;
    }
}