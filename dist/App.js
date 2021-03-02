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
const AVLTreeMenu_1 = require("./AVLTreeMenu");
const BTreeMenu_1 = require("./BTreeMenu");
const promptly = require("promptly");
let aVLTreeMenu = new AVLTreeMenu_1.default();
let bTreeMenu = new BTreeMenu_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let menu = `
    \r **** Select type of tree *****
    \r 1. AVL Tree.
    \r 2. B Tree.
    \r 0. Salir.`;
    let opcion;
    do {
        console.log(menu);
        opcion = yield promptly.choose('Escoger opcion de menu: ', ['1', '2', '0']);
        switch (opcion) {
            case '1':
                yield aVLTreeMenu.menu();
                break;
            case '2':
                yield bTreeMenu.menu();
                break;
            case '0':
                break;
            default:
                break;
        }
    } while (opcion != '0');
}))();
