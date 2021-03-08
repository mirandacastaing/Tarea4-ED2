"use strict";
exports.__esModule = true;
var BNode = /** @class */ (function () {
    function BNode(degree, isLeaf) {
        this.keys = [];
        this.childs = []; //C
        this.currKeys = 0; //n
        this.degree = degree;
        this.isLeaf = isLeaf;
    }
    BNode.prototype.traverse = function () {
        var i;
        for (i = 0; i < this.currKeys; i++) {
            if (!this.isLeaf)
                this.childs[i].traverse();
            process.stdout.write(' ' + this.keys[i]);
        }
        if (!this.isLeaf)
            this.childs[this.currKeys - 1].traverse();
    };
    BNode.prototype.search = function (key) {
        var i = 0;
        while (i < this.currKeys && key > this.keys[i])
            i++;
        if (this.keys[i] == key) {
            return this;
        }
        if (this.isLeaf)
            return null;
        return this.childs[i].search(key);
    };
    BNode.prototype.insertNonFull = function (key) {
        var i = this.currKeys - 1;
        if (this.isLeaf) {
            while (i >= 0 && this.keys[i] > key) {
                this.keys[i + 1] = this.keys[i];
                i--;
            }
            this.keys[i + 1] = key;
            this.currKeys++;
        }
        else {
            while (i >= 0 && this.keys[i] > key)
                i--;
            //Check if child is full
            var isFull = this.childs[i + 1].currKeys == 2 * this.degree - 1;
            if (isFull) {
                this.splitChild(i + 1, this.childs[i + 1]);
                //Check which two new parts will have the new key
                if (this.keys[i + 1] < key)
                    i++;
            }
            this.childs[i + 1].insertNonFull(key);
        }
    };
    BNode.prototype.splitChild = function (i, y) {
        var z = new BNode(y.degree, y.isLeaf);
        z.currKeys = this.degree - 1;
        for (var j = 0; j < this.degree - 1; j++) {
            z.keys[j] = y.keys[j + this.degree];
        }
        if (!y.isLeaf) {
            for (var j = 0; j < this.degree; j++) {
                z.childs[j] = y.childs[j + this.degree];
            }
        }
        y.currKeys = this.degree - 1;
        //Create space to new child
        for (var j = this.currKeys; j >= i + 1; j--) {
            this.childs[j + 1] = this.childs[j];
        }
        //Link new child to this one
        this.childs[i + 1] = z;
        //
        for (var j = this.currKeys - 1; j >= i; j--) {
            this.keys[j + 1] = this.keys[j];
        }
        //Copy middle keyof y to this node
        this.keys[i] = y.keys[this.degree - 1];
        //Increment current keys
        this.currKeys++;
    };
    return BNode;
}());
exports["default"] = BNode;
