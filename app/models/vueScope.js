/**
 * @export
 * @class VueScope
 */
class VueScope {

    /**
     * Creates an instance of VueScope.
     * 
     * @memberOf VueScope
     */
    constructor() {
        this.scope = {
            data: {
                title: 'Smart Home',
                subtitle: 'Grünerløkka, Oslo',
                flash: {}
            },
            vue: {
                head: {
                    title: 'Smart Home',
                    meta: [
                        { name: 'application-name', content: 'Smart Home by Nikos' },
                        { name: 'description', content: 'Smart Home by Nikos Fytros', id: 'desc' },
                        { script: '/js/moment.js' }
                    ]
                },
                components: ['smheader', 'smfooter', 'messagebox', 'userbar']
            }
        };
    }

    changeApplicationTitle(appTitle) {
        this.scope.vue.head.title = appTitle;
    }

    changeApplicationName(appName) {
        this.scope.vue.head.meta[0].content = appName;
    }

    changeApplicationDescription(appDescription) {
        this.scope.vue.head.meta[1].content = appDescription;
    }

    addStyleUrl(styleUrl) {
        this.scope.vue.head.meta.push({
            style: styleUrl
        });
    }

    addComponent(componentName) {
        this.scope.vue.components.push(componentName);
    }

    addData(data) {
        Object.assign(this.scope.data, data);
    }

    getScope() {
        return this.scope;
    }

}

module.exports = VueScope;
