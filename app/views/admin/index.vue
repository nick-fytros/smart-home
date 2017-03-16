<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content">
            <div class="container">
                <userbar :isActive="isActive" :user="user"></userbar>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <messagebox v-if="flash[0]" :flash="flash"></messagebox>
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
            </div>
        </section>
        <smfooter></smfooter>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            isActive: 'admin'
        }
    }
}

</script>
<style>

</style>
