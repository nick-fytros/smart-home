export interface Scope {
    data: object;
    vue: {
        meta: {
            title: string;
            head: HeadObject[];
        };
        components: string[];
    };
}

interface HeadObject {
    name?: string;
    content?: string;
    id?: string;
    style?: string;
}