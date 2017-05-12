const config = require('../config');

/**
 * @export
 * @class VueScope
 */
class VueScope {

    /**
     * Creates an instance of VueScope.
     */
    constructor() {
        this.scope = {
            data: {
                title: 'Smart Home',
                subtitle: 'Grünerløkka, Oslo',
                config: config,
                flash: {}
            },
            vue: {
                head: {
                    title: 'Smart Home',
                    meta: [
                        { name: 'application-name', content: 'Smart Home by Nikos' },
                        { name: 'description', content: 'Smart Home by Nikos Fytros', id: 'desc' }
                    ]
                },
                components: ['appheader', 'appfooter', 'messagebox', 'userbar', 'notification']
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

    addScriptUrl(scriptUrl) {
        this.scope.vue.head.meta.push({
            script: scriptUrl
        });
    }

    addComponents(componentsNameArray) {
        this.scope.vue.components = this.scope.vue.components.concat(componentsNameArray);
    }

    addData(data) {
        Object.assign(this.scope.data, data);
    }

    getScope() {
        return this.scope;
    }

}

module.exports = VueScope;
