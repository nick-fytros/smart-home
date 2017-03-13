<template>
    <nav class="level">
        <div class="level-left"></div>
        <div class="level-right" v-if="user">
            <div class="level-item">
                <div>
                    <p>Hello, <a v-on:click="showMenu">{{user.email}}</a></p>
                    <div v-bind:class="{ hidden: isHidden }" class="submenu">
                        <p><a class="button is-link" href="/auth/logout">Sign out</a></p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['user'],
        data: function() {
            return {
                isHidden: true
            }
        },
        methods: {
            showMenu: function(event){
                this.isHidden = !this.isHidden;
            }
        }
    }

</script>

<style>


</style>
