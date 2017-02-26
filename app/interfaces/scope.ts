export interface IHeadObject {
    name?: string;
    content?: string;
    id?: string;
    style?: string;
}

export interface IScope {
    data: object;
    vue: {
        meta: {
            title: string;
            head: IHeadObject[];
        };
        components: string[];
    };
}
