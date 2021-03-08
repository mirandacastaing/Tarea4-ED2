import AVLTreeMenu from './AVLTreeMenu';
import BTreeMenu from './BTreeMenu';
import BPTreeMenu from './BPTreeMenu';
import RedBlackMenu from './RedBlackMenu';
import * as promptly from 'promptly';

let aVLTreeMenu = new AVLTreeMenu();
let bTreeMenu = new BTreeMenu();
let bPTreeMenu = new BPTreeMenu();
let redBlackMenu = new RedBlackMenu();

(async () => {
    let menu: string = `
    \r **** Select type of tree *****
    \r 1. AVL Tree.
    \r 2. B Tree.
    \r 3. B+ Tree.
    \r 4. RedBlack Tree.
    \r 0. Salir.`;
    let opcion: string;
    do {
        console.log(menu);
        opcion = await promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '4', '0']);
        switch (opcion) {
            case '1':
                await aVLTreeMenu.menu();
                break;
            case '2':
                await bTreeMenu.menu();
                break;
            case '3':
                await bPTreeMenu.menu();
                break;
            case '4':
                await redBlackMenu.menu();
                break;
            case '0':
                break;
            default:
                break;
        }

    } while (opcion != '0')

})();
