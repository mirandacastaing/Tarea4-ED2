"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const structures_1 = require("./structures/");
const promptly = require("promptly");
class BTreeGestor {
    constructor() { }
    traverseTree() {
        this.tree.traverse();
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tree == null) {
                let degree = yield promptly.prompt('Ingresar grado/orden de arbol: ');
                this.tree = new structures_1.BTree(Number(degree));
            }
            let numero = yield promptly.prompt('Ingresar numero: ');
            this.tree.insert(Number(numero));
        });
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tree == null)
                return console.log('Debe crear un arbol primero.');
            let numero = yield promptly.prompt('Ingresar numero: ');
            let arr = this.tree.search(Number(numero));
            if (arr != null)
                console.log('Numero encontrado.');
            else
                console.log('Numero no encontrado.');
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tree == null)
                return console.log('Debe crear un arbol primero.');
            let numero = yield promptly.prompt('Ingresar numero: ');
            let arr = this.tree.remove(Number(numero));
        });
    }
}
exports.default = BTreeGestor;
