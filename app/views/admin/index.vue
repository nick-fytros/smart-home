<template>
    <div>
        <appheader :title="title"
                   :subtitle="subtitle"></appheader>
        <section class="section content main-section">
            <div class="container">
                <!-- message and timeout needed for notification component -->
                <userbar :message="message"
                         :timeout="3000"
                         :user="user"></userbar>
                <div class="tabs is-centered">
                    <ul>
                        <li v-on:click="activateTab('users')"
                            v-bind:class="{ 'is-active': tabs['users'] }">
                            <a>
                                <span class="icon is-small"><i class="fa fa-user"></i></span>
                                <span>Users</span>
                            </a>
                        </li>
                        <li v-on:click="activateTab('onetimetokens')"
                            v-bind:class="{ 'is-active': tabs['onetimetokens'] }">
                            <a>
                                <span class="icon is-small"><i class="fa fa-user"></i></span>
                                <span>Tokens</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div v-bind:class="{ 'is-hidden': !tabs['users'] }">
                    <div v-for="user in users"
                         :key="user._id"
                         class="box">
                        <userrow :user="user"
                                 :config="config"
                                 v-on:updateuser="updateUser"
                                 v-on:deleteuser="deleteUser"></userrow>
                    </div>
                </div>
                <div v-bind:class="{ 'is-hidden': !tabs['onetimetokens'] }">
                    <div class="box">
                        <div class="block">
                            <a v-on:click="generateToken"
                               class="button is-primary">Generate token</a>
                        </div>
                    </div>
                    <div v-for="token in tokens"
                         :key="token._id"
                         class="box">
                        <tokenrow :token="token"
                                  v-on:deletetoken="deleteToken"></tokenrow>
                    </div>
                </div>
            </div>
        </section>
        <appfooter></appfooter>
    </div>
</template>
<script>

export default {
    data: function () {
        return {
            tabs: {
                users: true,
                onetimetokens: false
            },
            message: {
                text: ''
            }
        }
    },
    methods: {
        activateTab: function (tabName) {
            // hide all tabs and enable the one clicked
            Object.keys(this.tabs).forEach((key, value) => {
                return this.tabs[key] = false;
            });
            this.tabs[tabName] = true;
        },
        generateToken: function () {
            axios.post(this.config.routes.admin.token.generate, {
                _csrf: this.csrfToken
            }).then((response) => {
                this.tokens.push(response.data.token);
                this._setMessage('success', 'Token generated successfully');
            }).catch((error) => {
                this._setMessage('error', 'Token generation failed');
            });
            this.editMode = false;
        },
        updateUser: function (data) {
            axios.post(this.config.routes.admin.user.update, {
                _csrf: this.csrfToken,
                user: data.user,
                update: { role: data.roleSelected }
            }).then((response) => {
                user.role = response.data.user.role;
                this._setMessage('success', 'User data updated successfully');
            }).catch((error) => {
                this._setMessage('error', 'User data update failed');
            });
        },
        deleteUser: function (data) {
            if (confirm(`Are you sure you want to delete! ${data.user.email}`) === true) {
                axios.post(this.config.routes.admin.user.delete, {
                    _csrf: this.csrfToken,
                    user: data.user
                }).then((response) => {
                    this.users.splice(_.findIndex(this.users, (u) => {
                        return u._id === response.data.user._id;
                    }), 1);
                    this._setMessage('success', 'User deleted successfully');
                }).catch((error) => {
                    this._setMessage('error', 'User delete failed');
                });
            }
        },
        deleteToken: function (data) {
            axios.post(this.config.routes.admin.token.delete, {
                _csrf: this.csrfToken,
                token: data.token
            }).then((response) => {
                this.tokens.splice(_.findIndex(this.tokens, (t) => {
                    return t._id === response.data.token._id;
                }), 1);
                this._setMessage('success', 'Token deleted successfully');
            }).catch((error) => {
                this._setMessage('error', 'Token delete failed');
            });
        },
        _setMessage: function (status, text) {
            this.message.error = false;
            this.message.success = false;
            this.message.waring = false;
            this.message.info = false;
            this.message[status] = true;
            this.message.text = text;
        }
    }
}

</script>
<style>

</style>
