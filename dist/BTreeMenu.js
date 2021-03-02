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
class BTreeMenu {
    constructor() { }
    menu() {
        return __awaiter(this, void 0, void 0, function* () {
            let menu = `
        \r 1. Agregar numero al arbol.
        \r 2. Mostrar.
        \r 0. Salir.`;
            let opcion;
            do {
                console.log(menu);
                opcion = yield promptly.choose('Escoger opcion de menu: ', ['1', '2', '0']);
                switch (opcion) {
                    case '1':
                        yield this.insert();
                        break;
                    case '2':
                        this.tree.traverse();
                        break;
                    case '3':
                        yield this.search();
                        break;
                    case '0':
                        return;
                        break;
                    default:
                        break;
                }
            } while (opcion != '0');
            return 1;
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tree == null) {
                let degree = yield promptly.prompt('Ingresar grado/orden de arbol: ');
                this.tree = new structures_1.BTree(degree);
            }
            let numero = yield promptly.prompt('Ingresar numero: ');
            this.tree.insert(Number(numero));
            // this.tree.insert(10); 
            // this.tree.insert(20); 
            // this.tree.insert(5); 
            // this.tree.insert(6); 
            // this.tree.insert(12); 
            // this.tree.insert(30); 
            // this.tree.insert(7); 
            // this.tree.insert(17); 
            // return 1;
        });
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            let numero = yield promptly.prompt('Ingresar numero: ');
            if (this.tree.search(numero) != null)
                console.log('Numero encontrado.');
            else
                console.log('Numero no encontrado.');
        });
    }
}
exports.default = BTreeMenu;
