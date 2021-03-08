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
const BTreeGestor_1 = require("./BTreeGestor");
const promptly = require("promptly");
class BTreeMenu {
    constructor() {
        this.gestor = new BTreeGestor_1.default();
    }
    menu() {
        return __awaiter(this, void 0, void 0, function* () {
            let menu = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar.
        \r 3. Buscar.
        \r 4. Remover.
        \r 0. Salir.`;
            let opcion;
            do {
                console.log(menu);
                opcion = yield promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '4', '0']);
                switch (opcion) {
                    case '1':
                        yield this.gestor.insert();
                        break;
                    case '2':
                        this.gestor.traverseTree();
                        break;
                    case '3':
                        yield this.gestor.search();
                        break;
                    case '4':
                        yield this.gestor.remove();
                        break;
                    case '0':
                        return;
                        break;
                    default:
                        break;
                }
            });
        });
    }
}
exports.default = BTreeMenu;
