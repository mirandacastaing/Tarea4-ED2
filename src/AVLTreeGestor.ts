import { AVLTree } from "./structures";

export default class AVLTreeGestor {

    constructor() { }

    private tree: AVLTree = new AVLTree();

    public insert(num:number):void{
        this.tree.insert(num);
    }

    public showPreOrder():void{
        this.tree.showPreOrder();
    }
    
    public showInOrder():void{
        this.tree.showPreOrder();
    }
    
    public showPostOrder():void{
        this.tree.showPreOrder();
    }

    public search(num:number):void{
        let nodo = this.tree.search(num);
        console.log('nodo:' + nodo);

        if( nodo == null)
            console.log('Numero no encontrado.');
        else
            console.log('Numero encontrado.')
    }
}