<template>
    <div>
        <appheader :title="title"
                  :subtitle="subtitle"></appheader>
        <section class="section content main-section">
            <div class="container">
                <userbar :message="message"
                         :timeout="3000"
                         :user="user"></userbar>
                <messagebox :flash="flash"></messagebox>
                <div class="columns is-multiline">
                    <div v-for="app in config.applications"
                         class="column is-half">
                        <div class="box">
                            <article class="media">
                                <div class="media-left">
                                    <figure class="image is-96x96">
                                        <img v-bind:src="app.imageUrl"
                                             v-bind:alt="app.name">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>{{app.name}}</strong>
                                            <br> {{app.description}}
                                        </p>
                                    </div>
                                    <nav class="level">
                                        <div class="level-left">
                                            <a v-bind:href="app.url"
                                               class="level-item">
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
        <appfooter></appfooter>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            message: {
                text: ''
            }
        }
    }
}

</script>
<style>

</style>
