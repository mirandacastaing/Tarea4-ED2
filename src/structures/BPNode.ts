export default class BPNode {
    private isLeaf: boolean;
    private key: number[];
    private size: number;
    private children: BPNode[];

    public constructor(max: number) {
        this.key = new Array(max);
        this.children = new Array(max + 1);
    }

    public getIsLeaf(): boolean {
        return this.isLeaf;
    }

    public setIsLeaf(isLeaf: boolean): void {
        this.isLeaf = isLeaf;
    }

    public getKey(): number[] {
        return this.key;
    }

    public setKey(key: number[]): void {
        this.key = key;
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public getChildren(): BPNode[] {
        return this.children;
    }

    public setChildren(children: BPNode[]): void {
        this.children = children;
    }
}