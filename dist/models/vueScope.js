'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VueScope = function () {
    function VueScope() {
        var scopeObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, VueScope);

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
                    }, {
                        name: 'description',
                        content: 'Smart Home by Nikos Fytros',
                        id: 'desc'
                    }, {
                        style: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
                    }, {
                        style: 'css/style.css'
                    }]
                },
                components: ['smheader', 'smfooter']
            }
        };
        /* if a scope object is passed ovveride the given properties with the same keys and add new ones */
        if (!Object.is(scopeObject, {})) {
            Object.assign(this.scope, scopeObject);
        }
    }

    _createClass(VueScope, [{
        key: 'changeApplicationTitle',
        value: function changeApplicationTitle(appTitle) {
            this.scope.vue.meta.title = appTitle;
        }
    }, {
        key: 'changeApplicationName',
        value: function changeApplicationName(appName) {
            this.scope.vue.meta.head[0].content = appName;
        }
    }, {
        key: 'changeApplicationDescription',
        value: function changeApplicationDescription(appDescription) {
            this.scope.vue.meta.head[1].content = appDescription;
        }
    }, {
        key: 'addStyleUrl',
        value: function addStyleUrl(styleUrl) {
            this.scope.vue.meta.head.push({
                style: styleUrl
            });
        }
    }, {
        key: 'addComponent',
        value: function addComponent(componentName) {
            this.scope.vue.components.push(componentName);
        }
    }, {
        key: 'addData',
        value: function addData(dataObject) {
            this.scope.data = Object.assign(this.scope.data, dataObject);
        }
    }, {
        key: 'getScope',
        value: function getScope() {
            return this.scope;
        }
    }]);

    return VueScope;
}();

exports.default = VueScope;