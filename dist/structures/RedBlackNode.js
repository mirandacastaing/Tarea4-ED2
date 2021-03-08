"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedBlackNode = exports.Color = void 0;
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLACK"] = 1] = "BLACK";
})(Color = exports.Color || (exports.Color = {}));
class RedBlackNode {
    constructor() {
        this.color = Color.BLACK;
    }
    leftMost() {
        var node = this;
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
    rightMost() {
        var node = this;
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    }
    predecessor() {
        if (this.left !== null) {
            return this.left.rightMost();
        }
        var child = this;
        var node = child.parent;
        while (node !== null && child === node.left) {
            child = node;
            node = child.parent;
        }
        return node;
    }
    successor() {
        if (this.right !== null) {
            return this.right.leftMost();
        }
        var child = this;
        var node = child.parent;
        while (node !== null && child === node.right) {
            child = node;
            node = child.parent;
        }
        return node;
    }
    _copyMetadata(srcNode) {
        this.color = srcNode.color;
    }
}
exports.RedBlackNode = RedBlackNode;
