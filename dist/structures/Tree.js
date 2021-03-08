"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("./Nodo");
class Tree {
    constructor() {
        this.root = null;
    }
    insertRecursive(nodo, num) {
        if (num < nodo.getNum()) {
            if (nodo.getLeftNodo() != null)
                this.insertRecursive(nodo.getLeftNodo(), num);
            else
                nodo.setLeftNodo(new Nodo_1.default(num));
        }
        else if (num > nodo.getNum()) {
            if (nodo.getRightNodo() != null)
                this.insertRecursive(nodo.getRightNodo(), num);
            else
                nodo.setRightNodo(new Nodo_1.default(num));
        }
    }
    insert(num) {
        if (!this.root)
            this.root = new Nodo_1.default(num);
        else
            this.insertRecursive(this.root, num);
    }
    searhRecursive(nodo, num) {
        if (nodo == null || nodo.getNum())
            return nodo;
        if (nodo.getNum() < num)
            return this.searhRecursive(nodo.getRightNodo(), num);
        if (nodo.getNum() > num)
            return this.searhRecursive(nodo.getLeftNodo(), num);
    }
    search(num) {
        let nodo = this.searhRecursive(this.root, num);
        return nodo.getNum();
    }
    showPreOrderRec(nodo) {
        if (nodo != null) {
            process.stdout.write(String(nodo.getNum()) + ',');
            this.showPreOrderRec(nodo.getLeftNodo());
            this.showPreOrderRec(nodo.getRightNodo());
        }
    }
    showInOrderRec(nodo) {
        if (nodo != null) {
            this.showInOrderRec(nodo.getLeftNodo());
            process.stdout.write(String(nodo.getNum()) + ',');
            this.showInOrderRec(nodo.getRightNodo());
        }
    }
    showPostOrderRec(nodo) {
        if (nodo != null) {
            this.showPostOrderRec(nodo.getLeftNodo());
            this.showPostOrderRec(nodo.getRightNodo());
            process.stdout.write(String(nodo.getNum()) + ',');
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
