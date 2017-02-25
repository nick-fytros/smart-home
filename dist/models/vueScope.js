"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VueScope = (function () {
    function VueScope(scopeObject) {
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
                components: ['smheader', 'smfooter']
            }
        };
        if (scopeObject !== undefined) {
            Object.assign(this.scope, scopeObject);
        }
    }
    VueScope.prototype.changeApplicationTitle = function (appTitle) {
        this.scope.vue.meta.title = appTitle;
    };
    VueScope.prototype.changeApplicationName = function (appName) {
        this.scope.vue.meta.head[0].content = appName;
    };
    VueScope.prototype.changeApplicationDescription = function (appDescription) {
        this.scope.vue.meta.head[1].content = appDescription;
    };
    VueScope.prototype.addStyleUrl = function (styleUrl) {
        this.scope.vue.meta.head.push({
            style: styleUrl
        });
    };
    VueScope.prototype.addComponent = function (componentName) {
        this.scope.vue.components.push(componentName);
    };
    VueScope.prototype.addData = function (data) {
        this.scope.data = Object.assign(this.scope.data, data);
    };
    VueScope.prototype.getScope = function () {
        return this.scope;
    };
    return VueScope;
}());
exports.default = VueScope;
