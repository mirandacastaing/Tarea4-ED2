import BPTreeManager from "./BPTreeManager";
import * as promptly from 'promptly';

export default class BPTreeMenu {

    constructor() { }

    private m: BPTreeManager;

    public async menu(): Promise<any> {

        let menu: string = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar.
        \r 3. Buscar.
        \r 0. Salir.`;
        let opcion: string;
        do {
            console.log(menu);
            opcion = await promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '0']);

            switch (opcion) {
                case '1':
                    await this.insert();
                    break;
                case '2':
                    console.log(this.m.traverse());
                    break;
                case '3':
                    await this.search();
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

    private async insert(): Promise<any> {
        if (this.m == null) {
            let degree = await promptly.prompt('Ingresar grado/orden de arbol: ');
            this.m = new BPTreeManager(Number(degree));
        }

        let numero = await promptly.prompt('Ingresar numero: ');
        this.m.insert(Number(numero));
    }

    private async search(): Promise<any> {
        let numero = await promptly.prompt('Ingresar numero: ');
        if (this.m.search(Number(numero)))
            console.log('Numero encontrado.');
        else
            console.log('Numero no encontrado.');
    }
}