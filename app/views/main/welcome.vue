<template>
    <div>
        <smheader :title="title" :subtitle="subtitle"></smheader>
        <section class="section content">
            <div class="container">
                <userbar :user="user"></userbar>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <messagebox :flash="flash"></messagebox>
                    </div>
                </div>
                <div class="columns is-multiline">
                    <div v-for="app in applications" class="column is-half">
                        <div class="box">
                            <article class="media">
                                <div class="media-left">
                                    <figure class="image is-64x64">
                                        <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                                            <br>
                                            Πρώτη εφαρμογή
                                        </p>
                                    </div>
                                    <nav class="level">
                                        <div class="level-left">
                                            <a class="level-item">
                                                <span class="icon"><i class="fa fa-sign-in"></i></span>
                                            </a>
                                        </div>
                                    </nav>
                                </div>
                            </article>
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
        data: function() {
            return {
                applications: ['first', 'second', 'third', 'fourth']
            }
        }
    }

</script>
<style>


</style>
