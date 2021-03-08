import Nodo from './Nodo';
import Tree from './Tree';


export default class AVLTree extends Tree{

    //Override regular Tree insert
    protected insertRecursive(nodo:Nodo, num:number):void{
        if(num < nodo.getNum()){
            if(nodo.getLeftNodo() != null)
                this.insertRecursive(nodo.getLeftNodo(), num);
            else{
                nodo.setLeftNodo(new Nodo(num));
                //Difference from Tree
                nodo.getLeftNodo().setFather(nodo);
                this.balance(nodo,'LEFT', true);
            }
        }                
        else if(num > nodo.getNum()){
            if(nodo.getRightNodo() != null)
                this.insertRecursive(nodo.getRightNodo(), num);
            else{
                nodo.setRightNodo(new Nodo(num));
                //Difference from Tree
                nodo.getRightNodo().setFather(nodo);
                this.balance(nodo,'RIGHT', true);

            }
        }
        else if(num == nodo.getNum())
            console.log(`Can't add an existing number.`);
    }

    private balance(nodo:Nodo, leafSide:string, newNodo:boolean): void {
        if(newNodo)
            leafSide == 'LEFT' ? nodo.decreaseBF() : nodo.increaseBF(); 
        else
            leafSide == 'LEFT' ? nodo.increaseBF() : nodo.increaseBF(); 

        //It's balanced, don't do anything else
        if(nodo.getBF() == 0)
            return;

        else if(nodo.getBF() === -2){
            if(nodo.getLeftNodo().getBF() == 1)
                this.doubleRightRotation(nodo);
            else
                this.simpleRightRotation(nodo);
            return;
        }
        else if(nodo.getBF() == 2){
            if(nodo.getRightNodo().getBF() == -1)
                this.doubleLeftRotation(nodo);
            else
                this.simpleLeftRotation(nodo);
            return;
        }

        if(nodo.getFather() != null){
            nodo.getFather().getRightNodo() == nodo ? leafSide = 'RIGHT' : leafSide = 'LEFT';
            this.balance(nodo.getFather(), leafSide, newNodo);
        }

    }

    

    private simpleRightRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.getLeftNodo();
        let B : Nodo = Q.getRightNodo();

        if(father!=null)
            father.getRightNodo() == P ? father.setRightNodo(Q) : father.setLeftNodo(Q);
        else
            this.root = Q;

        P.setLeftNodo(B);
        Q.setRightNodo(P);

        P.setFather(Q);

        B != null ? B.setFather(P) : Q.setFather(father);

        P.setBF(0);
        Q.setBF(0);
    }

    private simpleLeftRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.getRightNodo();
        let B : Nodo = Q.getLeftNodo();

        if(father!=null)
            father.getLeftNodo() == P ? father.setLeftNodo(Q) : father.setRightNodo(Q);
        else
            this.root = Q;

        P.setRightNodo(B);
        Q.setLeftNodo(P);

        P.setFather(Q);

        B != null ? B.setFather(P) : Q.setFather(father);

        P.setBF(0);
        Q.setBF(0);
    }

    private doubleRightRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.getLeftNodo();
        let R : Nodo = Q.getRightNodo();
        let B : Nodo = R.getLeftNodo();
        let C : Nodo = R.getRightNodo();

        if(father!=null)
            father.getRightNodo() == P ? father.setRightNodo(R) : father.setLeftNodo(R);
        else
            this.root = Q;

        P.setLeftNodo(C);
        Q.setRightNodo(B);
        R.setLeftNodo(Q);
        R.setRightNodo(P);

        R.setFather(father);
        P.setFather(R);
        Q.setFather(R);
        if(B!=null) B.setFather(Q);
        if(C!=null) B.setFather(P);

        switch(R.getBF()){
            case -1:
                Q.setBF(0);
                P.setBF(1);
                break;
            case 0:
                Q.setBF(0);
                P.setBF(0);
                break;
            case 1:
                Q.setBF(-1);
                P.setBF(0);
                break;
        }
        R.setBF(0);
    }

    private doubleLeftRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.getRightNodo();
        let R : Nodo = Q.getLeftNodo();
        let B : Nodo = R.getLeftNodo();
        let C : Nodo = R.getRightNodo();

        if(father!=null)
            father.getRightNodo() == P ? father.setRightNodo(R) : father.setLeftNodo(R);
        else
            this.root = Q;

        //Rebuild tree
        P.setRightNodo(C);
        Q.setLeftNodo(B);
        R.setLeftNodo(P);
        R.setRightNodo(Q);

        //Re-assign fathers
        R.setFather(father);
        P.setFather(R);
        Q.setFather(R);
        if(B!=null) B.setFather(Q);
        if(C!=null) B.setFather(P);

        switch(R.getBF()){
            case -1:
                P.setBF(0);
                Q.setBF(1);
                break;
            case 0:
                Q.setBF(0);
                P.setBF(0);
                break;
            case 1:
                Q.setBF(-1);
                P.setBF(0);
                break;
        }
        R.setBF(0);
    }
}