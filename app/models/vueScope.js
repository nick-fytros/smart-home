export default class VueScope {
    contructor(scopeObject = {}) {
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
        }
        /* if a scope object is passed ovveride the given properties with the same keys and add new ones */
        if (!Object.is(scopeObject, {})){
            Object.assign(this.scope, scopeObject);
        }
    }

    changeApplicationTitle(appTitle) {
        this.scope.vue.meta.title = appTitle;
    }

    changeApplicationName(appName) {
        this.scope.vue.meta.head[0].content = appName;
    }

    changeApplicationDescription(appDescription) {
        this.scope.vue.meta.head[1].content = appDescription;
    }

    addStyleUrl(styleUrl) {
        this.scope.vue.meta.head.push({
            style: styleUrl
        });
    }

    addComponent(componentName) {
        this.scope.vue.components.push(componentName);
    }

    addData(dataObject) {
        this.scope.data = Object.assign(this.scope.data, dataObject);
    }

}
