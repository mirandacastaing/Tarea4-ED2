import BPNode from "./BPNode"

export default class BPTree {
    private max: number;
    private root: BPNode;

    private insertInternal(x: number, cursor: BPNode, child: BPNode): void {
        if (cursor.getSize() < this.max) {
            let i: number = 0;
            while (Number(x) > Number(cursor.getKey()[i]) && i < cursor.getSize())
                i++;
            for (let j: number = cursor.getSize(); j > i; j--) {
                cursor.getKey()[j] = cursor.getKey()[j - 1];
            }
            for (let j: number = cursor.getSize() + 1; j > i + 1; j--) {
                cursor.getChildren()[j] = cursor.getChildren()[j - 1];
            }
            cursor.getKey()[i] = x;
            cursor.setSize(cursor.getSize() + 1);
            cursor.getChildren()[i + 1] = child;
        } else {
            let newInternal: BPNode = new BPNode(this.max);
            let virtualKey: number[] = new Array(Number(this.max) + 1);
            let virtualChildren: BPNode[] = new Array(Number(this.max) + 2);
            for (let i: number = 0; i < this.max; i++) {
                virtualKey[i] = cursor.getKey()[i];
            }
            for (let i: number = 0; i < this.max + 1; i++) {
                virtualChildren[i] = cursor.getChildren()[i];
            }
            let i: number = 0;
            let j: number;
            while (Number(x) > virtualKey[i] && i < this.max)
                i++;
            for (let j: number = this.max + 1; j > i; j--) {
                virtualKey[j] = virtualKey[j - 1];
            }
            virtualKey[i] = x;
            for (let j: number = this.max + 2; j > i + 1; j--) {
                virtualChildren[j] = virtualChildren[j - 1];
            }
            virtualChildren[i + 1] = child;
            newInternal.setIsLeaf(false);
            cursor.setSize((Number(this.max) + 1) / 2);
            newInternal.setSize(Number(this.max) - (Number(this.max) + 1) / 2);
            for (i = 0, j = cursor.getSize() + 1; i < newInternal.getSize(); i++, j++) {
                newInternal.getKey()[i] = virtualKey[j];
            }
            for (i = 0, j = cursor.getSize() + 1; i < newInternal.getSize() + 1; i++, j++) {
                newInternal.getChildren()[i] = virtualChildren[j];
            }
            if (cursor === this.root) {
                let newRoot: BPNode = new BPNode(this.max);
                cursor.setKey(new Array(this.max));
                cursor.setChildren(new Array(Number(this.max) + 1));
                for (i = 0; i < cursor.getSize(); i++)
                    cursor.getKey()[i] = virtualKey[i];
                for (i = 0; i < cursor.getSize() + 1; i++)
                    cursor.getChildren()[i] = virtualChildren[i];
                newRoot.getKey()[0] = virtualKey[cursor.getSize()];
                newRoot.getChildren()[0] = cursor;
                newRoot.getChildren()[1] = newInternal;
                newRoot.setIsLeaf(false);
                newRoot.setSize(1);
                this.root = newRoot;
            } else {
                this.insertInternal(cursor.getKey()[cursor.getSize()], this.findParent(this.root, cursor), newInternal);
            }
        }
    }

    private findParent(cursor: BPNode, child: BPNode): BPNode {
        let parent: BPNode;
        if (cursor.getIsLeaf() || (cursor.getChildren()[0]).getIsLeaf()) {
            return null;
        }
        for (let i: number = 0; i < cursor.getSize() + 1; i++) {
            if (cursor.getChildren()[i] === child) {
                parent = cursor;
                return parent;
            } else {
                parent = this.findParent(cursor.getChildren()[i], child);
                if (parent != null)
                    return parent;
            }
        }
        return parent;
    }

    private display(cursor: BPNode): string {
        let tree: string = "";
        if (cursor != null) {
            for (let i: number = 0; i < cursor.getSize(); i++) {
                tree += cursor.getKey()[i] + " ";
            }
            tree += "\n";
            if (cursor.getIsLeaf() != true) {
                for (let i: number = 0; i < cursor.getSize() + 1; i++) {
                    tree += this.display(cursor.getChildren()[i]);
                }
            }
            return tree;
        }
    }

    public constructor(max: number) {
        this.max = max;
        this.root = null;
    }

    public search(x: number): boolean {
        if (this.root == null) {
            return false;
        } else {
            let cursor: BPNode = this.root;
            while (cursor.getIsLeaf() == false) {
                for (let i: number = 0; i < cursor.getSize(); i++) {
                    if (Number(x) < Number(cursor.getKey()[i])) {
                        cursor = cursor.getChildren()[i];
                        break;
                    }
                    if (i == cursor.getSize() - 1) {
                        cursor = cursor.getChildren()[i + 1];
                        break;
                    }
                }
            }
            for (let i: number = 0; i < cursor.getSize(); i++) {
                if (Number(cursor.getKey()[i]) == Number(x)) {
                    return true;
                }
            }
            return false;
        }
    }

    public insert(x: number): void {
        if (this.root == null) {
            this.root = new BPNode(this.max);
            this.root.getKey()[0] = x;
            this.root.setIsLeaf(true);
            this.root.setSize(1);
        } else {
            let cursor: BPNode = this.root;
            let parent: BPNode;
            while (cursor.getIsLeaf() == false) {
                parent = cursor;
                for (let i: number = 0; i < cursor.getSize(); i++) {
                    if (Number(x) < Number(cursor.getKey()[i])) {
                        cursor = cursor.getChildren()[i];
                        break;
                    }
                    if (i == cursor.getSize() - 1) {
                        cursor = cursor.getChildren()[i + 1];
                        break;
                    }
                }
            }
            if (cursor.getSize() < this.max) {
                let i: number = 0;
                while (Number(x) > Number(cursor.getKey()[i]) && i < cursor.getSize())
                    i++;
                for (let j: number = cursor.getSize(); j > i; j--) {
                    cursor.getKey()[j] = cursor.getKey()[j - 1];
                }
                cursor.getKey()[i] = x;
                cursor.setSize(cursor.getSize() + 1);
                cursor.getChildren()[cursor.getSize()] = cursor.getChildren()[cursor.getSize() - 1];
                cursor.getChildren()[cursor.getSize() - 1] = null;
            } else {
                let newLeaf: BPNode = new BPNode(this.max);
                let virtualNode: number[] = new Array(Number(this.max) + 1);
                for (let i: number = 0; i < this.max; i++) {
                    virtualNode[i] = cursor.getKey()[i];
                }
                let i: number = 0;
                let j: number;
                while (Number(x) > virtualNode[i] && i < this.max)
                    i++;
                for (let j: number = this.max + 1; j > i; j--) {
                    virtualNode[j] = virtualNode[j - 1];
                }
                virtualNode[i] = x;
                newLeaf.setIsLeaf(true);
                cursor.setSize((Number(this.max) + 1) / 2);
                newLeaf.setSize(Number(this.max) + 1 - (Number(this.max) + 1) / 2);
                cursor.getChildren()[cursor.getSize()] = newLeaf;
                newLeaf.getChildren()[newLeaf.getSize()] = cursor.getChildren()[this.max];
                cursor.getChildren()[this.max] = null;
                for (i = 0; i < cursor.getSize(); i++) {
                    cursor.getKey()[i] = virtualNode[i];
                }
                for (i = 0, j = cursor.getSize(); i < newLeaf.getSize(); i++, j++) {
                    newLeaf.getKey()[i] = virtualNode[j];
                }
                if (cursor === this.root) {
                    let newRoot: BPNode = new BPNode(this.max);
                    newRoot.getKey()[0] = newLeaf.getKey()[0];
                    newRoot.getChildren()[0] = cursor;
                    newRoot.getChildren()[1] = newLeaf;
                    newRoot.setIsLeaf(false);
                    newRoot.setSize(1);
                    this.root = newRoot;
                } else {
                    this.insertInternal(newLeaf.getKey()[0], parent, newLeaf);
                }
            }
        }
    }

    public traverse(): string {
        return this.display(this.root);
    }
}