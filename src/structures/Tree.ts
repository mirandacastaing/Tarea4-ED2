import Nodo from './Nodo';

export default class Tree {
    protected root:Nodo = null;

    constructor(){}

    protected insertRecursive(nodo:Nodo, num:number):void{
        if(num < nodo.num){
            if(nodo.leftNodo != null)
                this.insertRecursive(nodo.leftNodo, num);
            else
                nodo.leftNodo = new Nodo(num);
        }
        else if(num > nodo.num){
            if(nodo.rightNodo != null)
                this.insertRecursive(nodo.rightNodo, num);
            else
                nodo.rightNodo = new Nodo(num);
        }
    }

    public insert(num:number):void{
        if(!this.root)
            this.root = new Nodo(num);
        else
            this.insertRecursive(this.root, num);
    }

    private showPreOrderRec(nodo:Nodo):void{
        if(nodo!=null){
            process.stdout.write(String(nodo.num)+',');
            this.showPreOrderRec(nodo.leftNodo);
            this.showPreOrderRec(nodo.rightNodo);
        }
    }
    private showInOrderRec(nodo:Nodo):void{
        if(nodo!=null){
            this.showInOrderRec(nodo.leftNodo);
            process.stdout.write(String(nodo.num)+',');
            this.showInOrderRec(nodo.rightNodo);
        }
    }
    private showPostOrderRec(nodo:Nodo):void{
        if(nodo!=null){
            this.showPostOrderRec(nodo.leftNodo);
            this.showPostOrderRec(nodo.rightNodo);
            process.stdout.write(String(nodo.num)+',');
        }
    }
    public showInOrder():void{
        this.showInOrderRec(this.root);
    }

    public showPreOrder():void{
        this.showPreOrderRec(this.root);
    }

    public showPostOrder():void{
        this.showPostOrderRec(this.root);
    }

    public isEmpty():boolean{
        if(this.root==null)
            return  true;
        else
            return false;
    }

    

}