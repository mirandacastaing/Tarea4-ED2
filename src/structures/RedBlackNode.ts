export enum Color {
    RED,
    BLACK
}

export class RedBlackNode {
    public parent: RedBlackNode;
    public left: RedBlackNode;
    public right: RedBlackNode;

    public color: Color = Color.BLACK;

    public leftMost(): RedBlackNode {
        var node: RedBlackNode = this;
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    public rightMost(): RedBlackNode {
        var node: RedBlackNode = this;
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    }

    public predecessor(): RedBlackNode {
        if (this.left !== null) {
            return this.left.rightMost();
        }
        var child: RedBlackNode = this;
        var node = child.parent;
        while (node !== null && child === node.left) {
            child = node;
            node = child.parent;
        }
        return node;
    }

    public successor(): RedBlackNode {
        if (this.right !== null) {
            return this.right.leftMost();
        }
        var child: RedBlackNode = this;
        var node = child.parent;
        while (node !== null && child === node.right) {
            child = node;
            node = child.parent;
        }
        return node;
    }

    public _copyMetadata(srcNode: RedBlackNode) {
        this.color = srcNode.color;
    }
}