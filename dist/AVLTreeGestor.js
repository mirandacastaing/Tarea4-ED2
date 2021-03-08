"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("./structures");
class AVLTreeGestor {
    constructor() {
        this.tree = new structures_1.AVLTree();
    }
    insert(num) {
        this.tree.insert(num);
    }
    showPreOrder() {
        this.tree.showPreOrder();
    }
    showInOrder() {
        this.tree.showPreOrder();
    }
    showPostOrder() {
        this.tree.showPreOrder();
    }
    search(num) {
        let nodo = this.tree.search(num);
        console.log('nodo:' + nodo);
        if (nodo == null)
            console.log('Numero no encontrado.');
        else
            console.log('Numero encontrado.');
    }
}
exports.default = AVLTreeGestor;
