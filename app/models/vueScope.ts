/**
 * VueScope class to be passed in Vue views
 * @class VueScope
 */
import {
    IScope
} from '../interfaces/scope';

export default class VueScope {
    public scope: IScope;

    constructor(scopeObject ?: IScope) {
        this.scope = {
            data: {
                title: 'Smart Home - Login',
                subtitle: 'Grünerløkka, Oslo',
                flash: {}
            },
            vue: {
                meta: {
                    title: 'Smart Home',
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
                components: ['smheader', 'smfooter', 'messagebox']
            }
        };
        /* if a scope object is passed ovveride the given properties with the same keys and add new ones */
        if (scopeObject !== undefined) {
            Object.assign(this.scope, scopeObject);
        }
    }

    public changeApplicationTitle(appTitle: string): void {
        this.scope.vue.meta.title = appTitle;
    }

    public changeApplicationName(appName: string): void {
        this.scope.vue.meta.head[0].content = appName;
    }

    public changeApplicationDescription(appDescription: string): void {
        this.scope.vue.meta.head[1].content = appDescription;
    }

    public addStyleUrl(styleUrl: string): void {
        this.scope.vue.meta.head.push({
            style: styleUrl
        });
    }

    public addComponent(componentName: string): void {
        this.scope.vue.components.push(componentName);
    }

    public addData(data: object): void {
        this.scope.data = Object.assign(this.scope.data, data);
    }

    public getScope(): IScope {
        return this.scope;
    }

}
