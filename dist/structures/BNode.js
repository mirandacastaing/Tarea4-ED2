"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BNode {
    constructor(degree, isLeaf) {
        this.keys = [];
        this.childs = []; //childs
        this.currKeys = 0; //n
        this.degree = degree;
        this.isLeaf = isLeaf;
    }
    traverse() {
        let i;
        for (i = 0; i < this.currKeys; i++) {
            if (!this.isLeaf)
                this.childs[i].traverse();
            process.stdout.write(' ' + this.keys[i]);
        }
        if (!this.isLeaf)
            this.childs[this.currKeys - 1].traverse();
    }
    findKey(key) {
        let idx = 0;
        while (idx < this.currKeys && this.keys[idx] < key)
            ++idx;
        return idx;
    }
    removeFromLeaf(idx) {
        for (let i = idx + 1; i < this.currKeys; ++i)
            this.keys[i - 1] = this.keys[i];
        this.currKeys--;
        return;
    }
    removeFromNonLeaf(idx) {
        let k = this.keys[idx];
        // If the child that precedes k (childs[idx]) has atleast t keys, 
        // find the predecessor 'pred' of k in the subtree rooted at 
        // childs[idx]. Replace k by pred. Recursively delete pred 
        // in childs[idx] 
        if (this.childs[idx].currKeys >= this.degree) {
            let pred = this.getPred(idx);
            this.keys[idx] = pred;
            this.childs[idx].remove(pred);
        }
        // If the child childs[idx] has less that t keys, examine childs[idx+1]. 
        // If childs[idx+1] has atleast t keys, find the successor 'succ' of k in 
        // the subtree rooted at childs[idx+1] 
        // Replace k by succ 
        // Recursively delete succ in childs[idx+1] 
        else if (this.childs[idx + 1].currKeys >= this.degree) {
            let succ = this.getSucc(idx);
            this.keys[idx] = succ;
            this.childs[idx + 1].remove(succ);
        }
        // If both childs[idx] and childs[idx+1] has less that t keys,merge k and all of childs[idx+1] 
        // into childs[idx] 
        // Now childs[idx] contains 2t-1 keys 
        // Free childs[idx+1] and recursively delete k from childs[idx] 
        else {
            this.merge(idx);
            this.childs[idx].remove(k);
        }
        return;
    }
    // A function to get predecessor of keys[idx] 
    getPred(idx) {
        // Keep moving to the right most node until we reach a leaf 
        let cur = this.childs[idx];
        while (!cur.isLeaf)
            cur = cur.childs[cur.currKeys];
        // Return the last key of the leaf 
        return cur.keys[cur.currKeys - 1];
    }
    getSucc(idx) {
        // Keep moving the left most node starting from childs[idx+1] until we reach a leaf 
        let cur = this.childs[idx + 1];
        while (!cur.isLeaf)
            cur = cur.childs[0];
        // Return the first key of the leaf 
        return cur.keys[0];
    }
    // A function to borrow a key from childs[idx-1] and insert it 
    // into childs[idx] 
    borrowFromPrev(idx) {
        let child = this.childs[idx];
        let sibling = this.childs[idx - 1];
        // The last key from childs[idx-1] goes up to the parent and key[idx-1] 
        // from parent is inserted as the first key in childs[idx]. Thus, the  loses 
        // sibling one key and child gains one key 
        // Moving all key in childs[idx] one step ahead 
        for (let i = child.currKeys - 1; i >= 0; --i)
            child.keys[i + 1] = child.keys[i];
        // If childs[idx] is not a leaf, move all its child pointers one step ahead 
        if (!child.isLeaf) {
            for (let i = child.currKeys; i >= 0; --i)
                child.childs[i + 1] = child.childs[i];
        }
        // Setting child's first key equal to keys[idx-1] from the current node 
        child.keys[0] = this.keys[idx - 1];
        // Moving sibling's last child as childs[idx]'s first child 
        if (!child.isLeaf)
            child.childs[0] = sibling.childs[sibling.currKeys];
        // Moving the key from the sibling to the parent 
        // This reduces the number of keys in the sibling 
        this.keys[idx - 1] = sibling.keys[sibling.currKeys - 1];
        child.currKeys += 1;
        sibling.currKeys -= 1;
        return;
    }
    // A function to borrow a key from the childs[idx+1] and place 
    // it in childs[idx] 
    borrowFromNext(idx) {
        let child = this.childs[idx];
        let sibling = this.childs[idx + 1];
        // keys[idx] is inserted as the last key in childs[idx] 
        child.keys[(child.currKeys)] = this.keys[idx];
        // Sibling's first child is inserted as the last child 
        // into childs[idx] 
        if (!(child.isLeaf))
            child.childs[(child.currKeys) + 1] = sibling.childs[0];
        //The first key from sibling is inserted into keys[idx] 
        this.keys[idx] = sibling.keys[0];
        // Moving all keys in sibling one step behind 
        for (let i = 1; i < sibling.currKeys; ++i)
            sibling.keys[i - 1] = sibling.keys[i];
        // Moving the child pointers one step behind 
        if (!sibling.isLeaf) {
            for (let i = 1; i <= sibling.currKeys; ++i)
                sibling.childs[i - 1] = sibling.childs[i];
        }
        // Increasing and decreasing the key count of childs[idx] and childs[idx+1] 
        // respectively 
        child.currKeys += 1;
        sibling.currKeys -= 1;
        return;
    }
    // A function to merge childs[idx] with childs[idx+1] 
    // childs[idx+1] is freed after merging 
    merge(idx) {
        let child = this.childs[idx];
        let sibling = this.childs[idx + 1];
        // Pulling a key from the current node and inserting it into (t-1)th 
        // position of childs[idx] 
        child.keys[this.degree - 1] = this.keys[idx];
        // childsopying the keys from childs[idx+1] to childs[idx] at the end 
        for (let i = 0; i < sibling.currKeys; ++i)
            child.keys[i + this.degree] = sibling.keys[i];
        // childsopying the child pointers from childs[idx+1] to childs[idx] 
        if (!child.isLeaf) {
            for (let i = 0; i <= sibling.currKeys; ++i)
                child.childs[i + this.degree] = sibling.childs[i];
        }
        // Moving all keys after idx in the current node one step before - 
        // to fill the gap created by moving keys[idx] to childs[idx] 
        for (let i = idx + 1; i < this.currKeys; ++i)
            this.keys[i - 1] = this.keys[i];
        // Moving the child pointers after (idx+1) in the current node one 
        // step before 
        for (let i = idx + 2; i <= this.currKeys; ++i)
            this.childs[i - 1] = this.childs[i];
        // Updating the key count of child and the current node 
        child.currKeys += sibling.currKeys + 1;
        this.currKeys--;
        // Freeing the memory occupied by sibling 
        return;
    }
    remove(key) {
        let idx = this.findKey(key);
        // The key to be removed is present in this node 
        if (idx < this.currKeys && this.keys[idx] == key) {
            // If the node is a leaf node - removeFromLeaf is called 
            // Otherwise, removeFromNonLeaf function is called 
            if (this.isLeaf)
                this.removeFromLeaf(idx);
            else
                this.removeFromNonLeaf(idx);
        }
        else {
            // If this node is a leaf node, then the key is not present in tree 
            if (this.isLeaf) {
                console.log("The key " + key + " is does not exist in the tree\n");
                return;
            }
            // The key to be removed is present in the sub-tree rooted with this node 
            // The flag indicates whether the key is present in the sub-tree rooted 
            // with the last child of this node 
            let flag = ((idx == this.currKeys) ? true : false);
            // If the child where the key is supposed to exist has less that t keys, 
            // we fill that child 
            if (this.childs[idx].currKeys < this.degree)
                this.fill(idx);
            // If the last child has been merged, it must have merged with the previous 
            // child and so we recurse on the (idx-1)th child. Else, we recurse on the 
            // (idx)th child which now has atleast t keys 
            if (flag && idx > this.currKeys)
                this.childs[idx - 1].remove(key);
            else
                this.childs[idx].remove(key);
        }
        return;
    }
    search(key) {
        let i = 0;
        process.stdout.write("+");
        while (i < this.currKeys && key > this.keys[i]) {
            i++;
        }
        if (this.keys[i] == key) {
            return this;
        }
        if (this.isLeaf)
            return null;
        return this.childs[i].search(key);
    }
    insertNonFull(key) {
        let i = this.currKeys - 1;
        if (this.isLeaf) {
            while (i >= 0 && this.keys[i] > key) {
                this.keys[i + 1] = this.keys[i];
                i--;
            }
            this.keys[i + 1] = key;
            this.currKeys++;
        }
        else {
            while (i >= 0 && this.keys[i] > key)
                i--;
            //childsheck if child is full
            let isFull = this.childs[i + 1].currKeys == 2 * this.degree - 1;
            if (isFull) {
                this.splitChild(i + 1, this.childs[i + 1]);
                //childsheck which two new parts will have the new key
                if (this.keys[i + 1] < key)
                    i++;
            }
            this.childs[i + 1].insertNonFull(key);
        }
    }
    splitChild(i, y) {
        let z = new BNode(y.degree, y.isLeaf);
        z.currKeys = this.degree - 1;
        for (let j = 0; j < this.degree - 1; j++) {
            z.keys[j] = y.keys[j + this.degree];
        }
        if (!y.isLeaf) {
            for (let j = 0; j < this.degree; j++) {
                z.childs[j] = y.childs[j + this.degree];
            }
        }
        y.currKeys = this.degree - 1;
        //childsreate space to new child
        for (let j = this.currKeys; j >= i + 1; j--) {
            this.childs[j + 1] = this.childs[j];
        }
        //Link new child to this one
        this.childs[i + 1] = z;
        //
        for (let j = this.currKeys - 1; j >= i; j--) {
            this.keys[j + 1] = this.keys[j];
        }
        //childsopy middle keyof y to this node
        this.keys[i] = y.keys[this.degree - 1];
        //Increment current keys
        this.currKeys++;
    }
    // A function to fill child C[idx] which has less than t-1 keys 
    fill(idx) {
        // If the previous child(C[idx-1]) has more than t-1 keys, borrow a key 
        // from that child 
        if (idx != 0 && this.childs[idx - 1].currKeys >= this.degree)
            this.borrowFromPrev(idx);
        // If the next child(C[idx+1]) has more than t-1 keys, borrow a key 
        // from that child 
        else if (idx != this.currKeys && this.childs[idx + 1].currKeys >= this.degree)
            this.borrowFromNext(idx);
        // Merge C[idx] with its sibling 
        // If C[idx] is the last child, merge it with with its previous sibling 
        // Otherwise merge it with its next sibling 
        else {
            if (idx != this.currKeys)
                this.merge(idx);
            else
                this.merge(idx - 1);
        }
        return;
    }
}
exports.default = BNode;
