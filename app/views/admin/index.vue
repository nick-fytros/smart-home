<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content main-section">
            <div class="container">
                <userbar :user="user"></userbar>
                <messagebox :flash="flash"></messagebox>
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
        <smfooter></smfooter>
    </div>
</template>
<script>

export default {
    data: function () {
        return {
            tabs: {
                users: true,
                onetimetokens: false
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
            }).catch((error) => {
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
            }).catch((error) => {
            });
        },
        deleteUser: function (data) {
            axios.post(this.config.routes.admin.user.delete, {
                _csrf: this.csrfToken,
                user: data.user
            }).then((response) => {
                this.users.splice(_.findIndex(this.users, (u) => {
                    return u._id === response.data.user._id;
                }), 1);
            }).catch((error) => {
            });
        },
        deleteToken: function (data) {
            axios.post(this.config.routes.admin.token.delete, {
                _csrf: this.csrfToken,
                token: data.token
            }).then((response) => {
                this.tokens.splice(_.findIndex(this.tokens, (t) => {
                    return t._id === response.data.token._id;
                }), 1);
            }).catch((error) => {
            });
        }
    }
}

</script>
<style>

</style>
