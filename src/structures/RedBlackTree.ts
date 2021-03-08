import { RedBlackNode } from './RedBlackNode';
export class RedBlackTree {
    private root: RedBlackNode;
    private TNULL: RedBlackNode;

    private preOrderHelper(node: RedBlackNode): void {
        if (node != this.TNULL) {
            console.log(node.data + " ");
            this.preOrderHelper(node.left);
            this.preOrderHelper(node.right);
        }
    }

    private inOrderHelper(node: RedBlackNode): void {
        if (node != this.TNULL) {
            this.inOrderHelper(node.left);
            console.log(node.data + " ");
            this.inOrderHelper(node.right);
        }
    }

    private postOrderHelper(node: RedBlackNode): void {
        if (node != this.TNULL) {
            this.postOrderHelper(node.left);
            this.postOrderHelper(node.right);
            console.log(node.data + " ");
        }
    }

    private searchTreeHelper(node: RedBlackNode, key: number): RedBlackNode {
        if (node == this.TNULL || key == node.data) {
            return node;
        }

        if (key < node.data) {
            return this.searchTreeHelper(node.left, key);
        }
        return this.searchTreeHelper(node.right, key);
    }

    // fix the rb tree modified by the delete operation
    private fixDelete(x: RedBlackNode): void {
        var s;
        while (x != this.root && x.color == 0) {
            if (x == x.parent.left) {
                s = x.parent.right;
                if (s.color == 1) {
                    // case 3.1
                    s.color = 0;
                    x.parent.color = 1;
                    this.leftRotate(x.parent);
                    s = x.parent.right;
                }

                if (s.left.color == 0 && s.right.color == 0) {
                    // case 3.2
                    s.color = 1;
                    x = x.parent;
                } else {
                    if (s.right.color == 0) {
                        // case 3.3
                        s.left.color = 0;
                        s.color = 1;
                        this.rightRotate(s);
                        s = x.parent.right;
                    }

                    // case 3.4
                    s.color = x.parent.color;
                    x.parent.color = 0;
                    s.right.color = 0;
                    this.leftRotate(x.parent);
                    x = this.root;
                }
            } else {
                s = x.parent.left;
                if (s.color == 1) {
                    // case 3.1
                    s.color = 0;
                    x.parent.color = 1;
                    this.rightRotate(x.parent);
                    s = x.parent.left;
                }

                if (s.right.color == 0 && s.right.color == 0) {
                    // case 3.2
                    s.color = 1;
                    x = x.parent;
                } else {
                    if (s.left.color == 0) {
                        // case 3.3
                        s.right.color = 0;
                        s.color = 1;
                        this.leftRotate(s);
                        s = x.parent.left;
                    }

                    // case 3.4
                    s.color = x.parent.color;
                    x.parent.color = 0;
                    s.left.color = 0;
                    this.rightRotate(x.parent);
                    x = this.root;
                }
            }
        }
        x.color = 0;
    }


    private rbTransplant(u: RedBlackNode, v: RedBlackNode) {
        if (u.parent == null) {
            this.root = v;
        } else if (u == u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    private deleteNodeHelper(node: RedBlackNode, key: number): void {
        // find the node containing key
        var z = this.TNULL;
        var x, y;
        while (node != this.TNULL) {
            if (node.data == key) {
                z = node;
            }

            if (node.data <= key) {
                node = node.right;
            } else {
                node = node.left;
            }
        }

        if (z == this.TNULL) {
            console.log("Couldn't find key in the tree");
            return;
        }

        y = z;
        var yOriginalColor = y.color;
        if (z.left == this.TNULL) {
            x = z.right;
            this.rbTransplant(z, z.right);
        } else if (z.right == this.TNULL) {
            x = z.left;
            this.rbTransplant(z, z.left);
        } else {
            y = this.minimum(z.right);
            yOriginalColor = y.color;
            x = y.right;
            if (y.parent == z) {
                x.parent = y;
            } else {
                this.rbTransplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }

            this.rbTransplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (yOriginalColor == 0) {
            this.fixDelete(x);
        }
    }

    // fix the red-black tree
    private fixInsert(k: RedBlackNode): void {
        var u: RedBlackNode;
        while (k.parent.color == 1) {
            if (k.parent == k.parent.parent.right) {
                u = k.parent.parent.left; // uncle
                if (u?.color == 1) {
                    // case 3.1
                    u.color = 0;
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    k = k.parent.parent;
                } else {
                    if (k == k.parent.left) {
                        // case 3.2.2
                        k = k.parent;
                        this.rightRotate(k);
                    }
                    // case 3.2.1
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    this.leftRotate(k.parent.parent);
                }
            } else {
                u = k.parent.parent.right; // uncle

                if (u?.color == 1) {
                    // mirror case 3.1
                    u.color = 0;
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    k = k.parent.parent;
                } else {
                    if (k == k.parent.right) {
                        // mirror case 3.2.2
                        k = k.parent;
                        this.leftRotate(k);
                    }
                    // mirror case 3.2.1
                    k.parent.color = 0;
                    k.parent.parent.color = 1;
                    this.rightRotate(k.parent.parent);
                }
            }
            if (k == this.root) {
                break;
            }
        }
        this.root.color = 0;
    }

    private printHelper(root: RedBlackNode, indent: string, last: boolean): void {
        // print the tree structure on the screen
        if (root != this.TNULL) {
            console.log(indent);
            if (last) {
                console.log("R----");
                indent += "     ";
            } else {
                console.log("L----");
                indent += "|    ";
            }

            var sColor = root.color == 1 ? "RED" : "BLACK";
            console.log(root.data + "(" + sColor + ")");
            this.printHelper(root.left, indent, false);
            this.printHelper(root.right, indent, true);
        }
    }

    public RedBlackTree() {
        this.TNULL = new RedBlackNode();
        this.TNULL.color = 0;
        this.TNULL.left = null;
        this.TNULL.right = null;
        this.root = this.TNULL;
    }

    // Pre-Order traversal
    // RedBlackNode.Left Subtree.Right Subtree
    public preorder(): void {
        this.preOrderHelper(this.root);
    }

    // In-Order traversal
    // Left Subtree . RedBlackNode . Right Subtree
    public inorder(): void {
        this.inOrderHelper(this.root);
    }

    // Post-Order traversal
    // Left Subtree . Right Subtree . RedBlackNode
    public postorder(): void {
        this.postOrderHelper(this.root);
    }

    // search the tree for the key k
    // and return the corresponding node
    public searchTree(k: number): RedBlackNode {
        return this.searchTreeHelper(this.root, k);
    }

    // find the node with the minimum key
    public minimum(node: RedBlackNode): RedBlackNode {
        while (node.left != this.TNULL) {
            node = node.left;
        }
        return node;
    }

    // find the node with the maximum key
    public maximum(node: RedBlackNode): RedBlackNode {
        while (node.right != this.TNULL) {
            node = node.right;
        }
        return node;
    }

    // find the successor of a given node
    public successor(x: RedBlackNode): RedBlackNode {
        // if the right subtree is not null,
        // the successor is the leftmost node in the
        // right subtree
        if (x.right != this.TNULL) {
            return this.minimum(x.right);
        }

        // else it is the lowest ancestor of x whose
        // left child is also an ancestor of x.
        var y = x.parent;
        while (y != this.TNULL && x == y.right) {
            x = y;
            y = y.parent;
        }
        return y;
    }

    // find the predecessor of a given node
    public predecessor(x: RedBlackNode): RedBlackNode {
        // if the left subtree is not null,
        // the predecessor is the rightmost node in the 
        // left subtree
        if (x.left != this.TNULL) {
            return this.maximum(x.left);
        }

        var y = x.parent;
        while (y != this.TNULL && x == y.left) {
            x = y;
            y = y.parent;
        }

        return y;
    }

    // rotate left at node x
    public leftRotate(x: RedBlackNode): void {
        var y = x.right;
        x.right = y.left;
        if (y.left != this.TNULL) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent == null) {
            this.root = y;
        } else if (x == x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    // rotate right at node x
    public rightRotate(x: RedBlackNode): void {
        var y = x.left;
        x.left = y.right;
        if (y.right != this.TNULL) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent == null) {
            this.root = y;
        } else if (x == x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        y.right = x;
        x.parent = y;
    }

    // insert the key to the tree in its appropriate position
    // and fix the tree
    public insert(key: number): void {
        // Ordinary Binary Search Insertion
        var node = new RedBlackNode();
        node.parent = null;
        node.data = key;
        node.left = this.TNULL;
        node.right = this.TNULL;
        node.color = 1; // new node must be red

        var y = null;
        var x = this.root;

        while (x != this.TNULL) {
            y = x;
            if (node.data < x.data) {
                x = x.left;
            } else {
                x = x.right;
            }
        }

        // y is parent of x
        node.parent = y;
        if (y == null) {
            this.root = node;
        } else if (node.data < y.data) {
            y.left = node;
        } else {
            y.right = node;
        }

        // if new node is a root node, simply return
        if (node.parent == null) {
            node.color = 0;
            return;
        }

        // if the grandparent is null, simply return
        if (node.parent.parent == null) {
            return;
        }

        // Fix the tree
        this.fixInsert(node);
    }

    public getRoot(): RedBlackNode {
        return this.root;
    }

    // delete the node from the tree
    public deleteNode(data: number): void {
        this.deleteNodeHelper(this.root, data);
    }

    // print the tree structure on the screen
    public prettyPrint(): void {
        this.printHelper(this.root, "", true);
    }
}