"use strict";
exports.__esModule = true;
var Nodo_1 = require("./Nodo");
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = null;
    }
    Tree.prototype.insertRecursive = function (nodo, num) {
        if (num < nodo.num) {
            if (nodo.leftNodo != null)
                this.insertRecursive(nodo.leftNodo, num);
            else
                nodo.leftNodo = new Nodo_1["default"](num);
        }
        else if (num > nodo.num) {
            if (nodo.rightNodo != null)
                this.insertRecursive(nodo.rightNodo, num);
            else
                nodo.rightNodo = new Nodo_1["default"](num);
        }
    };
    Tree.prototype.insert = function (num) {
        if (!this.root)
            this.root = new Nodo_1["default"](num);
        else
            this.insertRecursive(this.root, num);
    };
    Tree.prototype.showPreOrderRec = function (nodo) {
        if (nodo != null) {
            process.stdout.write(String(nodo.num) + ',');
            this.showPreOrderRec(nodo.leftNodo);
            this.showPreOrderRec(nodo.rightNodo);
        }
    };
    Tree.prototype.showInOrderRec = function (nodo) {
        if (nodo != null) {
            this.showInOrderRec(nodo.leftNodo);
            process.stdout.write(String(nodo.num) + ',');
            this.showInOrderRec(nodo.rightNodo);
        }
    };
    Tree.prototype.showPostOrderRec = function (nodo) {
        if (nodo != null) {
            this.showPostOrderRec(nodo.leftNodo);
            this.showPostOrderRec(nodo.rightNodo);
            process.stdout.write(String(nodo.num) + ',');
        }
    };
    Tree.prototype.showInOrder = function () {
        this.showInOrderRec(this.root);
    };
    Tree.prototype.showPreOrder = function () {
        this.showPreOrderRec(this.root);
    };
    Tree.prototype.showPostOrder = function () {
        this.showPostOrderRec(this.root);
    };
    Tree.prototype.isEmpty = function () {
        if (this.root == null)
            return true;
        else
            return false;
    };
    return Tree;
}());
exports["default"] = Tree;
