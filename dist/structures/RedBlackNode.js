"use strict";
// _parent, _left, _right are really OptNode<K, V>, however there was a
// problem with type guards, so I forced Node<K, V> instead.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedBlackNode = void 0;
/** Node has two tasks: first they are used to maintain the red-black tree's
 * internal order. For that properties starting with _ (underscore) are used,
 * these are internal and not officially documented, for example `_black` and
 * `_red` for the node's color. The second task is as a pointer into the tree,
 * for example to define iteration start and end, but also to mutate the value
 * in-place. Keys shouldn't be modified (there is no public writable property
 * anyway).
 */
class RedBlackNode {
    /** Construct a new standalone Node with key and value */
    constructor(key, value) {
        /** @internal */ this._parent = RedBlackNode.nilNode;
        /** @internal */ this._left = RedBlackNode.nilNode;
        /** @internal */ this._right = RedBlackNode.nilNode;
        /** @internal */ this._black = true;
        this._key = key;
        this._value = value;
    }
    /** @internal */ get _red() { return !this._black; }
    /** @internal */ set _red(value) { this._black = !value; }
    /** The key of the entry which the Node represents */
    get key() { return this._key; }
    /** The value of the entry which the Node represents, can be mutated */
    get value() { return this._value; }
    set value(value) { this._value = value; }
    /** True if node is nil */
    get nil() { return this === RedBlackNode.nilNode; }
    /** True if node is not nil */
    get ok() { return this !== RedBlackNode.nilNode; }
    /** The entry which the Node represents */
    entry() { return [this.key, this.value]; }
    /** Compact display of the node */
    toString(maxLength = 20) {
        const key = ('' + this.key).substr(0, maxLength);
        const value = ('' + this.value).substr(0, maxLength);
        return `[${key}:${value}]`;
    }
    // Compact display of the node with more details, <> for red and () for black
    /** @internal */ _details(maxLength = 20) {
        const cut = (s) => ('' + s).substr(0, maxLength);
        const o = this._black ? '(' : '<';
        const c = this._black ? ')' : '>';
        const key = cut(this.key);
        const value = cut(this.value);
        const left = this._left.nil ? '·' : this._left.key;
        const right = this._right.nil ? '·' : this._right.key;
        return `${o}${cut(left)} ${key}:${value} ${cut(right)}${c}`;
    }
}
exports.RedBlackNode = RedBlackNode;
/** The one and only nil Node */
RedBlackNode.nilNode = _nilNode();
// Nust be called only once because we should have only one nil Node!
function _nilNode() {
    return Object.freeze(new class extends RedBlackNode {
        toString() { return '·'; }
        _details() { return '(·)'; }
        // get _black() { return true }
        // set _black(value: boolean) {} // ignoring, see [[Nil]]
        constructor() {
            super(Symbol('nilNode.key'), Symbol('nilNode.value'));
            this._parent = this._left = this._right = this;
        }
    });
}
// Below didn't work out because of a problem with type guards. The idea was
// to typify that Node.nilNode is special, for example that the less operation
// in the tree doesn't work with nil. However for this to work I need to make
// Node.ok and Node.nil reliable type guards. I keep this in the code so I
// don't forget this failed attempt.
//
// /** The nil node (see the Null Object Pattern), used for leaf nodes or for
//  * the parent of the root node. Nil nodes are always black and can't be
//  * mutated. Changing the color doesn't cause an error but also has no
//  * effect. This simplifies the rebalancing algorithms.
//  */
// export type Nil = ReadonlyNil & { _black: boolean, _red: boolean }
//
// type UntypedNode = Node<unknown, unknown>
// type Diff<T, U> = T extends U ? never : T
// type ReadonlyNilKeys = Diff<keyof UntypedNode, '_black' | '_red'>
// type ReadonlyNil = Readonly<Pick<UntypedNode, ReadonlyNilKeys>>
//
// /** Optional Node: either Node<K, V> or Nil. */
// export type OptNode<K, V> = Node<K, V> | Nil
