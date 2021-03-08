export default class Nodo {
    private num: number = 0;
    private rightNodo: Nodo = null;
    private leftNodo: Nodo = null;

    public setNum(num:number):void{
        this.num = num;
    }
    public getNum():number{
        return this.num;
    }

    public setRightNodo(nodo:Nodo):void{
        this.rightNodo = nodo;
    }

    public setLeftNodo(nodo:Nodo):void{
        this.leftNodo = nodo;
    }
    
    public getRightNodo():Nodo{
        return this.rightNodo;
    }
    public getLeftNodo():Nodo{
        return this.leftNodo;
    }
    //Balance factor
    private bf: number = 0;
    private father:Nodo

    constructor(num: number){
        this.num = num;
    }

    public getBF():number{
        return this.bf;
    }
    public setBF(bf:number):void{
        this.bf= bf;
    }
    public increaseBF():void{
        this.bf++;
    }
    public decreaseBF():void{
        this.bf--;
    }

    public setFather(father:Nodo):void{
        this.father = father
    }
    public getFather():Nodo{
        return this.father;
    }
}
