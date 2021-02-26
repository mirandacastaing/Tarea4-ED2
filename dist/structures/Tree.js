"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("./Nodo");
class Tree {
    constructor() {
        this.root = null;
    }
    insertRecursive(nodo, num) {
        if (num < nodo.num) {
            if (nodo.leftNodo != null)
                this.insertRecursive(nodo.leftNodo, num);
            else
                nodo.leftNodo = new Nodo_1.default(num);
        }
        else if (num > nodo.num) {
            if (nodo.rightNodo != null)
                this.insertRecursive(nodo.rightNodo, num);
            else
                nodo.rightNodo = new Nodo_1.default(num);
        }
    }
    insert(num) {
        if (!this.root)
            this.root = new Nodo_1.default(num);
        else
            this.insertRecursive(this.root, num);
    }
    showPreOrderRec(nodo) {
        if (nodo != null) {
            process.stdout.write(String(nodo.num) + ',');
            this.showPreOrderRec(nodo.leftNodo);
            this.showPreOrderRec(nodo.rightNodo);
        }
    }
    showInOrderRec(nodo) {
        if (nodo != null) {
            this.showInOrderRec(nodo.leftNodo);
            process.stdout.write(String(nodo.num) + ',');
            this.showInOrderRec(nodo.rightNodo);
        }
    }
    showPostOrderRec(nodo) {
        if (nodo != null) {
            this.showPostOrderRec(nodo.leftNodo);
            this.showPostOrderRec(nodo.rightNodo);
            process.stdout.write(String(nodo.num) + ',');
        }
    }
    showInOrder() {
        this.showInOrderRec(this.root);
    }
    showPreOrder() {
        this.showPreOrderRec(this.root);
    }
    showPostOrder() {
        this.showPostOrderRec(this.root);
    }
    isEmpty() {
        if (this.root == null)
            return true;
        else
            return false;
    }
}
exports.default = Tree;
