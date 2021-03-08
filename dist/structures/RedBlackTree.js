"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedBlackTree = void 0;
const RedBlackNode_1 = require("./RedBlackNode");
class RedBlackTree {
    constructor() {
        this.root = null;
    }
    first() {
        return this.root === null ? null :
            this.root.leftMost();
    }
    last() {
        return this.root === null ? null :
            this.root.rightMost();
    }
    insertBefore(newNode, refNode) {
        if (refNode === null) {
            var lastNode = this.last();
            if (lastNode === null) {
                this.insertNode(newNode);
            }
            else {
                this.insertAfter(newNode, lastNode);
            }
        }
        else {
            if (refNode.right === null) {
                this.insertNode(newNode, refNode, true);
            }
            else {
                this.insertNode(newNode, refNode.left.rightMost(), true);
            }
        }
    }
    insertAfter(newNode, refNode) {
        if (refNode === null) {
            var firstNode = this.first();
            if (firstNode === null) {
                this.insertNode(newNode);
            }
            else {
                this.insertBefore(newNode, firstNode);
            }
        }
        else {
            if (refNode.right === null) {
                this.insertNode(newNode, refNode, false);
            }
            else {
                this.insertNode(newNode, refNode.right.leftMost(), true);
            }
        }
    }
    insertNode(newNode, parentNode = null, leftOrRight = false) {
        if (parentNode === null) {
            this.root = newNode;
        }
        else {
            if (leftOrRight) {
                parentNode.left = newNode;
            }
            else {
                parentNode.right = newNode;
            }
        }
        newNode.parent = parentNode;
        newNode.color = RedBlackNode_1.Color.RED;
        this.fixInsert(newNode);
    }
    fixInsert(node) {
        var parent = node.parent;
        if (parent === null) {
            node.color = RedBlackNode_1.Color.BLACK;
            return;
        }
        if (parent.color === RedBlackNode_1.Color.BLACK) {
            return;
        }
        var grandparent = parent.parent;
        var uncle = (parent === grandparent.left) ?
            grandparent.right : grandparent.left;
        if (uncle !== null && uncle.color === RedBlackNode_1.Color.RED) {
            parent.color = RedBlackNode_1.Color.BLACK;
            uncle.color = RedBlackNode_1.Color.BLACK;
            grandparent.color = RedBlackNode_1.Color.RED;
            this.fixInsert(grandparent);
            return;
        }
        if (node === parent.right && parent === grandparent.left) {
            this.leftRotate(parent);
            parent = node;
            node = node.left;
            grandparent = parent.parent;
        }
        else if (node === parent.left && parent === grandparent.right) {
            this.rightRotate(parent);
            parent = node;
            node = node.right;
            grandparent = parent.parent;
        }
        parent.color = RedBlackNode_1.Color.BLACK;
        grandparent.color = RedBlackNode_1.Color.RED;
        if (node === parent.left && parent === grandparent.left) {
            this.rightRotate(grandparent);
        }
        else {
            this.leftRotate(grandparent);
        }
    }
    removeNode(node) {
        this.deleteNode(node);
    }
    deleteNode(node) {
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
        if (node.color === RedBlackNode_1.Color.BLACK && child !== null) {
            if (child.color === RedBlackNode_1.Color.RED) {
                child.color = RedBlackNode_1.Color.BLACK;
            }
            else {
                this.fixDeleteOneChild(child);
            }
        }
    }
    fixDeleteOneChild(node) {
        if (node.parent === null) {
            return;
        }
        var parent = node.parent;
        var sibling = (node === parent.left) ?
            parent.right : parent.left;
        if (sibling.color === RedBlackNode_1.Color.RED) {
            parent.color = RedBlackNode_1.Color.RED;
            sibling.color = RedBlackNode_1.Color.BLACK;
            if (node === parent.left) {
                this.leftRotate(parent);
                sibling = parent.right;
            }
            else {
                this.rightRotate(parent);
                sibling = parent.left;
            }
        }
        var slb = sibling.left === null || sibling.left.color === RedBlackNode_1.Color.BLACK;
        var srb = sibling.right === null || sibling.right.color === RedBlackNode_1.Color.BLACK;
        if (sibling.color === RedBlackNode_1.Color.BLACK && slb && srb) {
            sibling.color = RedBlackNode_1.Color.RED;
            if (parent.color === RedBlackNode_1.Color.RED) {
                parent.color = RedBlackNode_1.Color.BLACK;
            }
            else {
                this.fixDeleteOneChild(parent);
            }
            return;
        }
        if (node === parent.left) {
            if (srb) {
                sibling.color = RedBlackNode_1.Color.RED;
                sibling.left.color = RedBlackNode_1.Color.BLACK;
                this.rightRotate(sibling);
                sibling = sibling.parent;
            }
        }
        else {
            if (slb) {
                sibling.color = RedBlackNode_1.Color.RED;
                sibling.right.color = RedBlackNode_1.Color.BLACK;
                this.leftRotate(sibling);
                sibling = sibling.parent;
            }
        }
        sibling.color = parent.color;
        parent.color = RedBlackNode_1.Color.BLACK;
        if (node === parent.left) {
            if (sibling.right !== null) {
                sibling.right.color = RedBlackNode_1.Color.BLACK;
            }
            this.leftRotate(parent);
        }
        else {
            if (sibling.left !== null) {
                sibling.left.color = RedBlackNode_1.Color.BLACK;
            }
            this.rightRotate(parent);
        }
    }
    leftRotate(node) {
        var temp = node.right;
        this.replaceNode(node, temp);
        node.right = temp.left;
        if (node.right !== null) {
            node.right.parent = node;
        }
        temp.left = node;
        node.parent = temp;
    }
    rightRotate(node) {
        var temp = node.left;
        this.replaceNode(node, temp);
        node.left = temp.right;
        if (node.left !== null) {
            node.left.parent = node;
        }
        temp.right = node;
        node.parent = temp;
    }
    replaceNode(oldNode, newNode) {
        var parent = oldNode.parent;
        if (newNode !== null) {
            newNode.parent = parent;
        }
        if (parent === null) {
            this.root = newNode;
        }
        else {
            if (oldNode === parent.left) {
                parent.left = newNode;
            }
            else {
                parent.right = newNode;
            }
        }
    }
}
exports.RedBlackTree = RedBlackTree;
