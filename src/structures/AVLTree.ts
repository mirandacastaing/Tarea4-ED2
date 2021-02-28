import Nodo from './Nodo';
import Tree from './Tree';


export default class AVLTree extends Tree{

    //Override regular Tree insert
    protected insertRecursive(nodo:Nodo, num:number):void{
        if(num < nodo.num){
            if(nodo.leftNodo != null)
                this.insertRecursive(nodo.leftNodo, num);
            else{
                nodo.leftNodo = new Nodo(num);
                //Difference from Tree
                nodo.leftNodo.setFather(nodo);
                this.balance(nodo,'LEFT', true);
            }
        }                
        else if(num > nodo.num){
            if(nodo.rightNodo != null)
                this.insertRecursive(nodo.rightNodo, num);
            else{
                nodo.rightNodo = new Nodo(num);
                //Difference from Tree
                nodo.rightNodo.setFather(nodo);
                this.balance(nodo,'RIGHT', true);

            }
        }
        else if(num == nodo.num)
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
            if(nodo.leftNodo.getBF() == 1)
                this.doubleRightRotation(nodo);
            else
                this.simpleRightRotation(nodo);
            return;
        }
        else if(nodo.getBF() == 2){
            if(nodo.rightNodo.getBF() == -1)
                this.doubleLeftRotation(nodo);
            else
                this.simpleLeftRotation(nodo);
            return;
        }

        if(nodo.getFather() != null){
            nodo.getFather().rightNodo == nodo ? leafSide = 'RIGHT' : leafSide = 'LEFT';
            this.balance(nodo.getFather(), leafSide, newNodo);
        }

    }

    

    private simpleRightRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.leftNodo;
        let B : Nodo = Q.rightNodo;

        if(father!=null)
            father.rightNodo == P ? father.rightNodo = Q : father.leftNodo = Q;
        else
            this.root = Q;

        P.leftNodo = B;
        Q.rightNodo = P;

        P.setFather(Q);

        B != null ? B.setFather(P) : Q.setFather(father);

        P.setBF(0);
        Q.setBF(0);
    }

    private simpleLeftRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.rightNodo;
        let B : Nodo = Q.leftNodo;

        if(father!=null)
            father.leftNodo == P ? father.leftNodo = Q : father.rightNodo = Q;
        else
            this.root = Q;

        P.rightNodo = B;
        Q.leftNodo = P;

        P.setFather(Q);

        B != null ? B.setFather(P) : Q.setFather(father);

        P.setBF(0);
        Q.setBF(0);
    }

    private doubleRightRotation(nodo:Nodo):void{
        let father : Nodo = nodo.getFather();
        let P : Nodo = nodo;
        let Q : Nodo = P.leftNodo;
        let R : Nodo = Q.rightNodo;
        let B : Nodo = R.leftNodo;
        let C : Nodo = R.rightNodo;

        if(father!=null)
            father.rightNodo == P ? father.rightNodo = R : father.leftNodo = R;
        else
            this.root = Q;

        P.leftNodo = C;
        Q.rightNodo = B;
        R.leftNodo = Q;
        R.rightNodo = P;

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
        let Q : Nodo = P.rightNodo;
        let R : Nodo = Q.leftNodo;
        let B : Nodo = R.leftNodo;
        let C : Nodo = R.rightNodo;

        if(father!=null)
            father.rightNodo == P ? father.rightNodo = R : father.leftNodo = R;
        else
            this.root = Q;

        //Rebuild tree
        P.rightNodo = C;
        Q.leftNodo = B;
        R.leftNodo = P;
        R.rightNodo = Q;

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