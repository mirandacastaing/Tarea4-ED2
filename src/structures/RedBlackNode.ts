// data structure that represents a node in the tree
export class RedBlackNode {
  data: number; // holds the key
  parent: RedBlackNode; // pointer to the parent
  left: RedBlackNode; // pointer to left child
  right: RedBlackNode; // pointer to right child
  color: number; // 1 . Red, 0 . Black
}