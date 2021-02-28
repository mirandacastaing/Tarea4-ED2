import AVLTreeMenu from './AVLTreeMenu';
import BTreeMenu from './BTreeMenu';
const promptly = require('promptly');

let aVLTreeMenu = new AVLTreeMenu();
let bTreeMenu = new BTreeMenu();

(async () => {
    let menu:string = `
    \r **** Select type of tree *****
    \r 1. AVL Tree.
    \r 2. B Tree.
    \r 0. Salir.`;
    let opcion:string;
    do{
        console.log(menu);
        opcion = await promptly.choose('Escoger opcion de menu: ',['1','2','0']);
        switch(opcion){
            case '1':
                await aVLTreeMenu.menu();
                break;
            case '2':
                await bTreeMenu.menu();
                break;
            case '0':
                break;
            default:
                break;
        }
    
    }while(opcion!='0')

})();
