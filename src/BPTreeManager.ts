import BPTree from "./structures/BPTree";

export default class BPTreeManager {
    private b: BPTree;

    public constructor(max: number) {
        this.b = new BPTree(max);
    }

    public search(x: number): boolean {
        if (BPTree)
            return this.b.search(x);
        return false;
    }

    public insert(x: number): void {
        if (BPTree)
            this.b.insert(x);
    }

    public traverse(): string {
        if (BPTree)
            return this.b.traverse();
        return "";
    }
}