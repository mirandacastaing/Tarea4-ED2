"use strict";
exports.__esModule = true;
var BPNode_1 = require("./BPNode");
var BPTree = /** @class */ (function () {
    function BPTree(max) {
        this.max = max;
        this.root = null;
    }
    BPTree.prototype.insertInternal = function (x, cursor, child) {
        if (cursor.getSize() < this.max) {
            var i = 0;
            while (Number(x) > Number(cursor.getKey()[i]) && i < cursor.getSize())
                i++;
            for (var j = cursor.getSize(); j > i; j--) {
                cursor.getKey()[j] = cursor.getKey()[j - 1];
            }
            for (var j = cursor.getSize() + 1; j > i + 1; j--) {
                cursor.getChildren()[j] = cursor.getChildren()[j - 1];
            }
            cursor.getKey()[i] = x;
            cursor.setSize(cursor.getSize() + 1);
            cursor.getChildren()[i + 1] = child;
        }
        else {
            var newInternal = new BPNode_1["default"](this.max);
            var virtualKey = new Array(Number(this.max) + 1);
            var virtualChildren = new Array(Number(this.max) + 2);
            for (var i_1 = 0; i_1 < this.max; i_1++) {
                virtualKey[i_1] = cursor.getKey()[i_1];
            }
            for (var i_2 = 0; i_2 < this.max + 1; i_2++) {
                virtualChildren[i_2] = cursor.getChildren()[i_2];
            }
            var i = 0;
            var j = void 0;
            while (Number(x) > virtualKey[i] && i < this.max)
                i++;
            for (var j_1 = this.max + 1; j_1 > i; j_1--) {
                virtualKey[j_1] = virtualKey[j_1 - 1];
            }
            virtualKey[i] = x;
            for (var j_2 = this.max + 2; j_2 > i + 1; j_2--) {
                virtualChildren[j_2] = virtualChildren[j_2 - 1];
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
                var newRoot = new BPNode_1["default"](this.max);
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
            }
            else {
                this.insertInternal(cursor.getKey()[cursor.getSize()], this.findParent(this.root, cursor), newInternal);
            }
        }
    };
    BPTree.prototype.findParent = function (cursor, child) {
        var parent;
        if (cursor.getIsLeaf() || (cursor.getChildren()[0]).getIsLeaf()) {
            return null;
        }
        for (var i = 0; i < cursor.getSize() + 1; i++) {
            if (cursor.getChildren()[i] === child) {
                parent = cursor;
                return parent;
            }
            else {
                parent = this.findParent(cursor.getChildren()[i], child);
                if (parent != null)
                    return parent;
            }
        }
        return parent;
    };
    BPTree.prototype.display = function (cursor) {
        var tree = "";
        if (cursor != null) {
            for (var i = 0; i < cursor.getSize(); i++) {
                tree += cursor.getKey()[i] + " ";
            }
            tree += "\n";
            if (cursor.getIsLeaf() != true) {
                for (var i = 0; i < cursor.getSize() + 1; i++) {
                    tree += this.display(cursor.getChildren()[i]);
                }
            }
            return tree;
        }
    };
    BPTree.prototype.search = function (x) {
        if (this.root == null) {
            return false;
        }
        else {
            var cursor = this.root;
            while (cursor.getIsLeaf() == false) {
                for (var i = 0; i < cursor.getSize(); i++) {
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
            for (var i = 0; i < cursor.getSize(); i++) {
                if (Number(cursor.getKey()[i]) == Number(x)) {
                    return true;
                }
            }
            return false;
        }
    };
    BPTree.prototype.insert = function (x) {
        if (this.root == null) {
            this.root = new BPNode_1["default"](this.max);
            this.root.getKey()[0] = x;
            this.root.setIsLeaf(true);
            this.root.setSize(1);
        }
        else {
            var cursor = this.root;
            var parent_1;
            while (cursor.getIsLeaf() == false) {
                parent_1 = cursor;
                for (var i = 0; i < cursor.getSize(); i++) {
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
                var i = 0;
                while (Number(x) > Number(cursor.getKey()[i]) && i < cursor.getSize())
                    i++;
                for (var j = cursor.getSize(); j > i; j--) {
                    cursor.getKey()[j] = cursor.getKey()[j - 1];
                }
                cursor.getKey()[i] = x;
                cursor.setSize(cursor.getSize() + 1);
                cursor.getChildren()[cursor.getSize()] = cursor.getChildren()[cursor.getSize() - 1];
                cursor.getChildren()[cursor.getSize() - 1] = null;
            }
            else {
                var newLeaf = new BPNode_1["default"](this.max);
                var virtualNode = new Array(Number(this.max) + 1);
                for (var i_3 = 0; i_3 < this.max; i_3++) {
                    virtualNode[i_3] = cursor.getKey()[i_3];
                }
                var i = 0;
                var j = void 0;
                while (Number(x) > virtualNode[i] && i < this.max)
                    i++;
                for (var j_3 = this.max + 1; j_3 > i; j_3--) {
                    virtualNode[j_3] = virtualNode[j_3 - 1];
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
                    var newRoot = new BPNode_1["default"](this.max);
                    newRoot.getKey()[0] = newLeaf.getKey()[0];
                    newRoot.getChildren()[0] = cursor;
                    newRoot.getChildren()[1] = newLeaf;
                    newRoot.setIsLeaf(false);
                    newRoot.setSize(1);
                    this.root = newRoot;
                }
                else {
                    this.insertInternal(newLeaf.getKey()[0], parent_1, newLeaf);
                }
            }
        }
    };
    BPTree.prototype.traverse = function () {
        return this.display(this.root);
    };
    return BPTree;
}());
exports["default"] = BPTree;
