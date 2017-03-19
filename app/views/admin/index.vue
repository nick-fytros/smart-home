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
                <div class="tabs is-centered">
                    <ul>
                        <li class="is-active">
                            <a>
                                <span class="icon is-small"><i class="fa fa-user"></i></span>
                                <span>Users</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div v-for="user in users"
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
        return {}
    }
}

</script>
<style>

</style>
