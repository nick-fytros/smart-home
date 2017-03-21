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
                    </ul>
                </div>
                <div v-bind:class="{ 'is-hidden': !tabs['users'] }"
                     v-for="user in users"
                     class="box">
                     <userrow :user="user" :config="config" :csrf="csrfToken"></userrow>
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
                users: true
            }
        }
    },
    methods: {
        activateTab: function (tabName) {
            // hide all tabs and enable the one clicked
            Object.keys(this.tabs).forEach((key, value) => { return this.tabs[key] = false; });
            this.tabs[tabName] = true;
        }
    }
}

</script>
<style>

</style>
