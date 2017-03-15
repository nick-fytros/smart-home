<template>
    <div>
        <smheader :title="title" :subtitle="subtitle"></smheader>
        <section class="section content">
            <div class="container">
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <messagebox :flash="flash"></messagebox>
                        <form action="/auth/login" method="post">
                            <p class="control has-icon">
                                <input class="input" type="email" placeholder="Email" name="email">
                                <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                            </p>
                            <p class="control has-icon">
                                <input class="input" type="password" placeholder="Password" name="password">
                                <span class="icon is-small"><i class="fa fa-lock"></i></span>
                            </p>
                            <div class="control is-grouped">
                                <p class="control">
                                    <button class="button is-primary">Sign in</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <smfooter></smfooter>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }

</script>
<style>


</style>
