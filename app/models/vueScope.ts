/**
 * VueScope class to be passed in Vue views
 * by Nikos Fytros
 */
import {
    Scope
} from "./interfaces/scope";

export default class VueScope {
    scope: Scope;

    constructor(scopeObject ? : Scope) {
        this.scope = {
            data: {
                dafaultData: 'default'
            },
            vue: {
                meta: {
                    title: 'Smart Home by Nikos',
                    head: [{
                            name: 'application-name',
                            content: 'Smart Home by Nikos'
                        },
                        {
                            name: 'description',
                            content: 'Smart Home by Nikos Fytros',
                            id: 'desc'
                        },
                        {
                            style: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
                        },
                        {
                            style: 'css/style.css'
                        }
                    ]
                },
                components: ['smheader', 'smfooter']
            }
        };
        /* if a scope object is passed ovveride the given properties with the same keys and add new ones */
        if (scopeObject != undefined) {
            Object.assign(this.scope, scopeObject);
        }
    }

    changeApplicationTitle(appTitle: string): void {
        this.scope.vue.meta.title = appTitle;
    }

    changeApplicationName(appName: string): void {
        this.scope.vue.meta.head[0].content = appName;
    }

    changeApplicationDescription(appDescription: string): void {
        this.scope.vue.meta.head[1].content = appDescription;
    }

    addStyleUrl(styleUrl: string): void {
        this.scope.vue.meta.head.push({
            style: styleUrl
        });
    }

    addComponent(componentName: string): void {
        this.scope.vue.components.push(componentName);
    }

    addData(data: object): void {
        this.scope.data = Object.assign(this.scope.data, data);
    }

    getScope(): Scope {
        return this.scope;
    }

}
