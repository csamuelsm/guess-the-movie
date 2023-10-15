interface SearchTreeNode {
    isEnd?: boolean;
    name?: string;
    children: Map<string, SearchTreeNode>;
    failPointer?: SearchTreeNode;
    parent?: SearchTreeNode;
    length: number;
}

interface SearchResult {
    word?: string;
    start?: number;
    end?: number;
}

type Formatter = (result: unknown[], word: string, start: number, end: number) => void

interface Search {
    search(content: string, formatter?: Formatter): unknown[] | SearchResult[]
}

interface Describe {
    <T>(node: T): boolean
}

export type { SearchTreeNode, SearchResult, Search, Describe, Formatter }
