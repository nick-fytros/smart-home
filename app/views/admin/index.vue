<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content">
            <div class="container">
                <userbar :user="user"></userbar>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <messagebox v-if="flash[0]"
                                    :flash="flash"></messagebox>
                    </div>
                </div>
                <div class="tabs is-right">
                    <ul>
                        <li v-on:click="activateTab('users')"
                            v-bind:class="{ 'is-active': tabs['users'] }">
                            <a>
                                <span class="icon is-small"><i class="fa fa-user"></i></span>
                                <span>Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="/apps">
                                <span class="icon is-small"><i class="fa fa-arrow-left"></i></span>
                                <span>Back to apps</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- users tabs -->
                <div v-bind:class="{ 'is-hidden': !tabs['users'] }"
                     v-for="user in users"
                     class="box">
                    <div class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p>{{user.email}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p>{{user.createdOn}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p>{{user.lastLogin}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p>{{user.role}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <a><span class="icon"><i class="fa fa-pencil"></i></span></a>
                            <a><span class="icon"><i class="fa fa-check"></i></span></a>
                            <br>
                            <a><span class="icon"><i class="fa fa-trash"></i></span></a>
                        </div>
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
