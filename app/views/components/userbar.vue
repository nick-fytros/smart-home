<template>
    <nav class="level">
        <div class="level-left"></div>
        <div class="level-right"
             v-if="user">
            <div class="level-item">
                <div>
                    <p>
                        <a v-on:click="showMenu"
                           class=" button is-link">{{user.email}}</a>
                        <a v-on:click="showMenu"
                           class=" button is-primary">
                            <span class="icon">
                                <i class="fa fa-angle-up" v-bind:class="{ 'fa-angle-down': isHidden }"></i>
                            </span>
                        </a>
                    </p>
                    <div v-bind:class="{ hidden: isHidden }"
                         class="submenu">
                        <nav class="panel">
                            <a v-if="user.role == 'admin'"
                               href="/admin"
                               class="panel-block">
                                <span class="panel-icon">
                                    <i class="fa fa-cogs"></i>
                                </span> Admin
                            </a>
                            <a href="/auth/logout"
                               class="panel-block">
                                <span class="panel-icon">
                                    <i class="fa fa-sign-out"></i>
                                </span> Sign out
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['user'],
    data: function () {
        return {
            isHidden: true
        }
    },
    methods: {
        showMenu: function (event) {
            this.isHidden = !this.isHidden;
        }
    }
}

</script>

<style>

</style>
