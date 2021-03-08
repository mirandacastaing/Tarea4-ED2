"use strict";
exports.__esModule = true;
var Nodo = /** @class */ (function () {
    function Nodo(num) {
        this.num = 0;
        this.rightNodo = null;
        this.leftNodo = null;
        //Balance factor
        this.bf = 0;
        this.num = num;
    }
    Nodo.prototype.getBF = function () {
        return this.bf;
    };
    Nodo.prototype.setBF = function (bf) {
        this.bf = bf;
    };
    Nodo.prototype.increaseBF = function () {
        this.bf++;
    };
    Nodo.prototype.decreaseBF = function () {
        this.bf--;
    };
    Nodo.prototype.setFather = function (father) {
        this.father = father;
    };
    Nodo.prototype.getFather = function () {
        return this.father;
    };
    return Nodo;
}());
exports["default"] = Nodo;
