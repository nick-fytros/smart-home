<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content main-section">
            <div class="container">
                <userbar :user="user"></userbar>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <messagebox :flash="flash"></messagebox>
                    </div>
                </div>
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
                         class="box">
                        <userrow :user="user"
                                 :config="config"
                                 :csrf="csrfToken"></userrow>
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
                         class="box">
                        <tokenrow :token="token"
                                  :config="config"
                                  :csrf="csrfToken"></tokenrow>
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
                this.updateStatus = 'Error';
            });
            this.editMode = false;
        }
    }
}

</script>
<style>

</style>
