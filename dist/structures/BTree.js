"use strict";
exports.__esModule = true;
var BNode_1 = require("./BNode");
var BTree = /** @class */ (function () {
    function BTree(degree) {
        this.degree = degree;
        this.root = null;
    }
    BTree.prototype.traverse = function () {
        if (this.root != null)
            this.root.traverse();
    };
    BTree.prototype.search = function (key) {
        if (this.root != null)
            this.root.search(key);
    };
    BTree.prototype.insert = function (key) {
        if (this.root == null) {
            this.root = new BNode_1["default"](this.degree, true);
            this.root.keys[0] = key; //Insert key
            this.root.currKeys++;
        }
        else {
            //If root is fill
            var rootFull = this.root.currKeys == 2 * this.degree - 1;
            if (rootFull) {
                var newRoot = new BNode_1["default"](this.degree, false);
                // console.log('New Root:'+ newRoot.degree);
                //Old root will be child now
                newRoot.childs[0] = this.root;
                //Split old root and move 1 key to new root
                newRoot.splitChild(0, this.root);
                //New root now has to childs. Check which one will have the new key
                var i = 0;
                if (newRoot.keys[0] < key)
                    i++;
                newRoot.childs[i].insertNonFull(key);
                //Change root
                this.root = newRoot;
            }
            else {
                this.root.insertNonFull(key);
            }
        }
    };
    return BTree;
}());
exports["default"] = BTree;
