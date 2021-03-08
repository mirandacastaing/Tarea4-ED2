"use strict";
exports.__esModule = true;
exports.RedBlackNode = exports.Color = void 0;
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLACK"] = 1] = "BLACK";
})(Color = exports.Color || (exports.Color = {}));
var RedBlackNode = /** @class */ (function () {
    function RedBlackNode() {
        this.color = Color.BLACK;
    }
    RedBlackNode.prototype.leftMost = function () {
        var node = this;
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    };
    RedBlackNode.prototype.rightMost = function () {
        var node = this;
        while (node.right !== null) {
            node = node.right;
        }
        return node;
    };
    RedBlackNode.prototype.predecessor = function () {
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
    };
    RedBlackNode.prototype.successor = function () {
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
    };
    RedBlackNode.prototype._copyMetadata = function (srcNode) {
        this.color = srcNode.color;
    };
    return RedBlackNode;
}());
exports.RedBlackNode = RedBlackNode;
