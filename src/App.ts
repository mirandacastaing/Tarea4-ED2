import AVLTreeMenu from './AVLTreeMenu';
import BTreeMenu from './BTreeMenu';
import BPTreeMenu from './BPTreeMenu';
import * as promptly from 'promptly';

let aVLTreeMenu = new AVLTreeMenu();
let bTreeMenu = new BTreeMenu();
let bPTreeMenu = new BPTreeMenu();

(async () => {
    let menu: string = `
    \r **** Select type of tree *****
    \r 1. AVL Tree.
    \r 2. B Tree.
    \r 3. B+ Tree.
    \r 0. Salir.`;
    let opcion: string;
    do {
        console.log(menu);
        opcion = await promptly.choose('Escoger opcion de menu: ', ['1', '2', '3', '0']);
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
            case '0':
                break;
            default:
                break;
        }

    } while (opcion != '0')

})();
