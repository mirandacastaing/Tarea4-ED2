import BTree from "./structures/BTree";
const promptly = require('promptly');

export default class BTreeMenu{

    constructor(){}

    private tree:BTree;

    public async menu():Promise<any>{

        let menu:string = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar.
        \r 0. Salir.`;
        let opcion:string;
        do{
            console.log(menu);
            opcion = await promptly.choose('Escoger opcion de menu: ',['1','2','0']);
        
            switch(opcion){
                case '1':
                    await this.insert();
                    break;
                case '2':
                    this.tree.traverse();
                    break;
                case '3':
                    await this.search();
                    break;
                case '0':
                    break;
                default:
                    break;
            }
        
        }while(opcion!='0');
        return 1;
    }

    private async insert():Promise<any>{
        if(this.tree == null){
            let degree = await promptly.prompt('Ingresar grado/orden de arbol: ');
            this.tree = new BTree(degree);
        }

        let numero = await promptly.prompt('Ingresar numero: ');
        this.tree.insert(Number(numero));
        // this.tree.insert(10); 
        // this.tree.insert(20); 
        // this.tree.insert(5); 
        // this.tree.insert(6); 
        // this.tree.insert(12); 
        // this.tree.insert(30); 
        // this.tree.insert(7); 
        // this.tree.insert(17); 
        // return 1;
    }

    private async search():Promise<any>{
        let numero = await promptly.prompt('Ingresar numero: ');
        if(this.tree.search(numero) !=null)
            console.log('Numero encontrado.');
        else
            console.log('Numero no encontrado.');
    }
}