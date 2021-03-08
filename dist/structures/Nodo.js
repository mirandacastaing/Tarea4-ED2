"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nodo {
    constructor(num) {
        this.num = 0;
        this.rightNodo = null;
        this.leftNodo = null;
        //Balance factor
        this.bf = 0;
        this.num = num;
    }
    setNum(num) {
        this.num = num;
    }
    getNum() {
        return this.num;
    }
    setRightNodo(nodo) {
        this.rightNodo = nodo;
    }
    setLeftNodo(nodo) {
        this.leftNodo = nodo;
    }
    getRightNodo() {
        return this.rightNodo;
    }
    getLeftNodo() {
        return this.leftNodo;
    }
    getBF() {
        return this.bf;
    }
    setBF(bf) {
        this.bf = bf;
    }
    increaseBF() {
        this.bf++;
    }
    decreaseBF() {
        this.bf--;
    }
    setFather(father) {
        this.father = father;
    }
    getFather() {
        return this.father;
    }
}
exports.default = Nodo;
