export default class Nodo {
    public num: number = 0;
    public rightNodo: Nodo = null;
    public leftNodo: Nodo = null;
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
