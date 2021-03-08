import Nodo from './Nodo';

export default class Tree {
    protected root:Nodo = null;

    constructor(){}

    protected insertRecursive(nodo:Nodo, num:number):void{
        if(num < nodo.getNum()){
            if(nodo.getLeftNodo() != null)
                this.insertRecursive(nodo.getLeftNodo(), num);
            else
                nodo.setLeftNodo(new Nodo(num));
        }
        else if(num > nodo.getNum()){
            if(nodo.getRightNodo() != null)
                this.insertRecursive(nodo.getRightNodo(), num);
            else
                nodo.setRightNodo(new Nodo(num));
        }
    }

    public insert(num:number):void{
        if(!this.root)
            this.root = new Nodo(num);
        else
            this.insertRecursive(this.root, num);
    }

    private searhRecursive(nodo:Nodo, num:Number):Nodo{
        if(nodo==null || nodo.getNum())
            return nodo;

        if (nodo.getNum() < num)
            return this.searhRecursive(nodo.getRightNodo(), num);
            
        if (nodo.getNum() > num)
            return this.searhRecursive(nodo.getLeftNodo(), num);
    }

    public search(num:number):number{
        let nodo = this.searhRecursive(this.root, num);
        return nodo.getNum();
    }

    private showPreOrderRec(nodo:Nodo):void{
        if(nodo!=null){
            process.stdout.write(String(nodo.getNum())+',');
            this.showPreOrderRec(nodo.getLeftNodo());
            this.showPreOrderRec(nodo.getRightNodo());
        }
    }
    private showInOrderRec(nodo:Nodo):void{
        if(nodo!=null){
            this.showInOrderRec(nodo.getLeftNodo());
            process.stdout.write(String(nodo.getNum())+',');
            this.showInOrderRec(nodo.getRightNodo());
        }
    }
    private showPostOrderRec(nodo:Nodo):void{
        if(nodo!=null){
            this.showPostOrderRec(nodo.getLeftNodo());
            this.showPostOrderRec(nodo.getRightNodo());
            process.stdout.write(String(nodo.getNum())+',');
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