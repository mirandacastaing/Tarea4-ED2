"use strict";
exports.__esModule = true;
var BPTree_1 = require("./structures/BPTree");
var BPTreeManager = /** @class */ (function () {
    function BPTreeManager(max) {
        this.b = new BPTree_1["default"](max);
    }
    BPTreeManager.prototype.search = function (x) {
        if (BPTree_1["default"])
            return this.b.search(x);
        return false;
    };
    BPTreeManager.prototype.insert = function (x) {
        if (BPTree_1["default"])
            this.b.insert(x);
    };
    BPTreeManager.prototype.traverse = function () {
        if (BPTree_1["default"])
            return this.b.traverse();
        return "";
    };
    return BPTreeManager;
}());
exports["default"] = BPTreeManager;
