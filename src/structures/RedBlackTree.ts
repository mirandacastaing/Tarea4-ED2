import { Color, RedBlackNode } from './RedBlackNode';

export class RedBlackTree {
    public root: RedBlackNode = null;

    public first(): RedBlackNode {
        return this.root === null ? null :
            this.root.leftMost();
    }

    public last(): RedBlackNode {
        return this.root === null ? null :
            this.root.rightMost();
    }

    public insertBefore(newNode: RedBlackNode, refNode: RedBlackNode) {
        if (refNode === null) {
            var lastNode = this.last();
            if (lastNode === null) {
                this.insertNode(newNode);
            } else {
                this.insertAfter(newNode, lastNode);
            }
        } else {
            if (refNode.right === null) {
                this.insertNode(newNode, refNode, true);
            } else {
                this.insertNode(newNode, refNode.left.rightMost(), true);
            }
        }
    }

    public insertAfter(newNode: RedBlackNode, refNode: RedBlackNode) {
        if (refNode === null) {
            var firstNode = this.first();
            if (firstNode === null) {
                this.insertNode(newNode);
            } else {
                this.insertBefore(newNode, firstNode);
            }
        } else {
            if (refNode.right === null) {
                this.insertNode(newNode, refNode, false);
            } else {
                this.insertNode(newNode, refNode.right.leftMost(), true);
            }
        }
    }

    private insertNode(newNode: RedBlackNode, parentNode: RedBlackNode = null, leftOrRight: boolean = false) {
        if (parentNode === null) {
            this.root = newNode;
        } else {
            if (leftOrRight) {
                parentNode.left = newNode;
            } else {
                parentNode.right = newNode;
            }
        }
        newNode.parent = parentNode;
        newNode.color = Color.RED;
        this.fixInsert(newNode);
    }

    private fixInsert(node: RedBlackNode) {
        var parent = node.parent;
        if (parent === null) {
            node.color = Color.BLACK;
            return
        }

        if (parent.color === Color.BLACK) {
            return;
        }

        var grandparent = parent.parent;
        var uncle = (parent === grandparent.left) ?
            grandparent.right : grandparent.left;

        if (uncle !== null && uncle.color === Color.RED) {
            parent.color = Color.BLACK;
            uncle.color = Color.BLACK;
            grandparent.color = Color.RED;
            this.fixInsert(grandparent);
            return;
        }

        if (node === parent.right && parent === grandparent.left) {
            this.leftRotate(parent);
            parent = node;
            node = node.left;
            grandparent = parent.parent;
        } else if (node === parent.left && parent === grandparent.right) {
            this.rightRotate(parent);
            parent = node;
            node = node.right;
            grandparent = parent.parent;
        }

        parent.color = Color.BLACK;
        grandparent.color = Color.RED;

        if (node === parent.left && parent === grandparent.left) {
            this.rightRotate(grandparent);
        } else {
            this.leftRotate(grandparent);
        }
    }

    public removeNode(node: RedBlackNode) {
        this.deleteNode(node);
    }

    private deleteNode(node: RedBlackNode) {
        if (node.left !== null && node.right !== null) {
            var nextNode = node.right.leftMost();
            this.deleteNode(nextNode);
            this.replaceNode(node, nextNode);
            nextNode.left = node.left;
            if (nextNode.left !== null) {
                nextNode.left.parent = nextNode;
            }
            nextNode.right = node.right;
            if (nextNode.right !== null) {
                nextNode.right.parent = nextNode;
            }
            nextNode._copyMetadata(node);
            return;
        }

        var child = (node.left !== null) ?
            node.left : node.right;
        this.replaceNode(node, child);

        if (node.color === Color.BLACK && child !== null) {
            if (child.color === Color.RED) {
                child.color = Color.BLACK;
            } else {
                this.fixDeleteOneChild(child);
            }
        }
    }

    private fixDeleteOneChild(node: RedBlackNode) {
        if (node.parent === null) {
            return;
        }

        var parent = node.parent;
        var sibling = (node === parent.left) ?
            parent.right : parent.left;

        if (sibling.color === Color.RED) {
            parent.color = Color.RED;
            sibling.color = Color.BLACK;
            if (node === parent.left) {
                this.leftRotate(parent);
                sibling = parent.right;
            } else {
                this.rightRotate(parent);
                sibling = parent.left;
            }
        }

        var slb = sibling.left === null || sibling.left.color === Color.BLACK;
        var srb = sibling.right === null || sibling.right.color === Color.BLACK;

        if (sibling.color === Color.BLACK && slb && srb) {
            sibling.color = Color.RED;
            if (parent.color === Color.RED) {
                parent.color = Color.BLACK;
            } else {
                this.fixDeleteOneChild(parent);
            }
            return;
        }

        if (node === parent.left) {
            if (srb) {
                sibling.color = Color.RED;
                sibling.left.color = Color.BLACK;
                this.rightRotate(sibling);
                sibling = sibling.parent;
            }
        } else {
            if (slb) {
                sibling.color = Color.RED;
                sibling.right.color = Color.BLACK;
                this.leftRotate(sibling);
                sibling = sibling.parent;
            }
        }

        sibling.color = parent.color;
        parent.color = Color.BLACK;

        if (node === parent.left) {
            if (sibling.right !== null) {
                sibling.right.color = Color.BLACK;
            }
            this.leftRotate(parent);
        } else {
            if (sibling.left !== null) {
                sibling.left.color = Color.BLACK;
            }
            this.rightRotate(parent);
        }
    }

    private leftRotate(node: RedBlackNode) {
        var temp = node.right;
        this.replaceNode(node, temp);
        node.right = temp.left;
        if (node.right !== null) {
            node.right.parent = node;
        }
        temp.left = node;
        node.parent = temp;
    }

    private rightRotate(node: RedBlackNode) {
        var temp = node.left;
        this.replaceNode(node, temp);
        node.left = temp.right;
        if (node.left !== null) {
            node.left.parent = node;
        }
        temp.right = node;
        node.parent = temp;
    }

    private replaceNode(oldNode: RedBlackNode, newNode: RedBlackNode) {
        var parent = oldNode.parent;

        if (newNode !== null) {
            newNode.parent = parent;
        }

        if (parent === null) {
            this.root = newNode;
        } else {
            if (oldNode === parent.left) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        }
    }

}


