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
const AVLTree_1 = require("./structures/AVLTree");
const promptly = require('promptly');
class AVLTreeMenu {
    constructor() {
        this.tree = new AVLTree_1.default();
    }
    menu() {
        return __awaiter(this, void 0, void 0, function* () {
            let menu = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar 'preorden'.
        \r 3. Mostrar 'inorden'.
        \r 4. Mostrar 'postorden'.
        \r 0. Salir.`;
            let opcion;
            do {
                console.log(menu);
                opcion = yield promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '4', '0']);
                switch (opcion) {
                    case '1':
                        let numero = yield promptly.prompt('Ingresar numero: ');
                        this.tree.insert(Number(numero));
                        break;
                    case '2':
                        this.tree.showPreOrder();
                        break;
                    case '3':
                        this.tree.showInOrder();
                        break;
                    case '4':
                        this.tree.showPostOrder();
                        break;
                    case '0':
                        break;
                    default:
                        break;
                }
            } while (opcion != '0');
        });
    }
}
exports.default = AVLTreeMenu;
