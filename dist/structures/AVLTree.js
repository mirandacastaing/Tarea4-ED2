"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Nodo_1 = require("../../src/structures/Nodo");
var Tree_1 = require("../../src/structures/Tree");
var AVLTree = /** @class */ (function (_super) {
    __extends(AVLTree, _super);
    function AVLTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //Override regular Tree insert
    AVLTree.prototype.insertRecursive = function (nodo, num) {
        if (num < nodo.num) {
            if (nodo.leftNodo != null)
                this.insertRecursive(nodo.leftNodo, num);
            else {
                nodo.leftNodo = new Nodo_1["default"](num);
                //Difference from Tree
                nodo.leftNodo.setFather(nodo);
                this.balance(nodo, 'LEFT', true);
            }
        }
        else if (num > nodo.num) {
            if (nodo.rightNodo != null)
                this.insertRecursive(nodo.rightNodo, num);
            else {
                nodo.rightNodo = new Nodo_1["default"](num);
                //Difference from Tree
                nodo.rightNodo.setFather(nodo);
                this.balance(nodo, 'RIGHT', true);
            }
        }
        else if (num == nodo.num)
            console.log("Can't add an existing number.");
    };
    AVLTree.prototype.balance = function (nodo, leafSide, newNodo) {
        if (newNodo)
            leafSide == 'LEFT' ? nodo.decreaseBF() : nodo.increaseBF();
        else
            leafSide == 'LEFT' ? nodo.increaseBF() : nodo.increaseBF();
        //It's balanced, don't do anything else
        if (nodo.getBF() == 0)
            return;
        else if (nodo.getBF() === -2) {
            if (nodo.leftNodo.getBF() == 1)
                this.doubleRightRotation(nodo);
            else
                this.simpleRightRotation(nodo);
            return;
        }
        else if (nodo.getBF() == 2) {
            if (nodo.rightNodo.getBF() == -1)
                this.doubleLeftRotation(nodo);
            else
                this.simpleLeftRotation(nodo);
            return;
        }
        if (nodo.getFather() != null) {
            nodo.getFather().rightNodo == nodo ? leafSide = 'RIGHT' : leafSide = 'LEFT';
            this.balance(nodo.getFather(), leafSide, newNodo);
        }
    };
    AVLTree.prototype.simpleRightRotation = function (nodo) {
        var father = nodo.getFather();
        var P = nodo;
        var Q = P.leftNodo;
        var B = Q.rightNodo;
        if (father != null)
            father.rightNodo == P ? father.rightNodo = Q : father.leftNodo = Q;
        else
            this.root = Q;
        P.leftNodo = B;
        Q.rightNodo = P;
        P.setFather(Q);
        B != null ? B.setFather(P) : Q.setFather(father);
        P.setBF(0);
        Q.setBF(0);
    };
    AVLTree.prototype.simpleLeftRotation = function (nodo) {
        var father = nodo.getFather();
        var P = nodo;
        var Q = P.rightNodo;
        var B = Q.leftNodo;
        if (father != null)
            father.leftNodo == P ? father.leftNodo = Q : father.rightNodo = Q;
        else
            this.root = Q;
        P.rightNodo = B;
        Q.leftNodo = P;
        P.setFather(Q);
        B != null ? B.setFather(P) : Q.setFather(father);
        P.setBF(0);
        Q.setBF(0);
    };
    AVLTree.prototype.doubleRightRotation = function (nodo) {
        var father = nodo.getFather();
        var P = nodo;
        var Q = P.leftNodo;
        var R = Q.rightNodo;
        var B = R.leftNodo;
        var C = R.rightNodo;
        if (father != null)
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
        if (B != null)
            B.setFather(Q);
        if (C != null)
            B.setFather(P);
        switch (R.getBF()) {
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
    };
    AVLTree.prototype.doubleLeftRotation = function (nodo) {
        var father = nodo.getFather();
        var P = nodo;
        var Q = P.rightNodo;
        var R = Q.leftNodo;
        var B = R.leftNodo;
        var C = R.rightNodo;
        if (father != null)
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
        if (B != null)
            B.setFather(Q);
        if (C != null)
            B.setFather(P);
        switch (R.getBF()) {
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
    };
    return AVLTree;
}(Tree_1["default"]));
exports["default"] = AVLTree;
