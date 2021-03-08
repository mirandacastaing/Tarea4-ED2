"use strict";
exports.__esModule = true;
var BPNode = /** @class */ (function () {
    function BPNode(max) {
        this.key = new Array(max);
        this.children = new Array(max + 1);
    }
    BPNode.prototype.getIsLeaf = function () {
        return this.isLeaf;
    };
    BPNode.prototype.setIsLeaf = function (isLeaf) {
        this.isLeaf = isLeaf;
    };
    BPNode.prototype.getKey = function () {
        return this.key;
    };
    BPNode.prototype.setKey = function (key) {
        this.key = key;
    };
    BPNode.prototype.getSize = function () {
        return this.size;
    };
    BPNode.prototype.setSize = function (size) {
        this.size = size;
    };
    BPNode.prototype.getChildren = function () {
        return this.children;
    };
    BPNode.prototype.setChildren = function (children) {
        this.children = children;
    };
    return BPNode;
}());
exports["default"] = BPNode;
