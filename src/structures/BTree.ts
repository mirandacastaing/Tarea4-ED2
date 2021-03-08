import BNode from "./BNode"

export default class BTree {
    private root:BNode;
    private degree:number; // t
    constructor(degree:number){
        this.degree = degree;
        this.root = null;
    }

    public traverse():void{
        if(this.root != null)
            this.root.traverse();
    }

    public search(key:number):number{
        if(this.root != null){
            let nodo = this.root.search(key);
            if(nodo!=null){
                let i =  nodo.findKey(key);
                //console.log('i: '+i+ ', nodo[] '+nodo.keys[i]);
                return nodo.keys[i];
            }
        }
        else{
            console.log('Numero no encontrado (private).');
            return null;
        }
    }

    public insert(key:number):void{
        if(this.root==null){
            this.root = new BNode(this.degree, true);
            this.root.keys[0] = key; //Insert key
            this.root.currKeys++;
        }
        else{
            //If root is fill
            let rootFull = this.root.currKeys == 2*this.degree-1;
            if(rootFull){
                let newRoot = new BNode(this.degree, false);
                // console.log('New Root:'+ newRoot.degree);

                //Old root will be child now
                newRoot.childs[0] = this.root;

                //Split old root and move 1 key to new root
                newRoot.splitChild(0, this.root);

                //New root now has to childs. Check which one will have the new key
                let i = 0;
                if(newRoot.keys[0] < key)
                    i++;
                newRoot.childs[i].insertNonFull(key);

                //Change root
                this.root = newRoot;
            }
            else{
                this.root.insertNonFull(key);
            }
        }

    }

    public remove(key:number):void{
        if(this.root==null)
            return console.log('Arbol esta vacio.');
        
        this.root.remove(key);

        if(this.root.currKeys == 0){
            let tmp:BNode = this.root;
            if(this.root.isLeaf)
                this.root = null;
            else
                this.root = this.root.childs[0];
        }
    }


    
}