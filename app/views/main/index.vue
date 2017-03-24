<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content main-section">
            <div class="container">
                <messagebox :flash="flash"></messagebox>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <form action="/auth/login"
                              method="post">
                            <p class="control has-icon">
                                <input type="hidden"
                                       name="_csrf"
                                       :value="csrfToken">
                                <input class="input"
                                       type="email"
                                       placeholder="Email"
                                       name="email"
                                       required
                                       autocomplete="email">
                                <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                            </p>
                            <p class="control has-icon">
                                <input class="input"
                                       type="password"
                                       placeholder="Password"
                                       name="password"
                                       required>
                                <span class="icon is-small"><i class="fa fa-lock"></i></span>
                            </p>
                            <div class="control is-grouped">
                                <p class="control">
                                    <button class="button is-primary">Sign in</button>
                                </p>
                                <p class="control control-or">
                                    <span>or</span>
                                </p>
                                <p class="control">
                                    <a href="/auth/signup"
                                       class="button is-link">Sign up</a>
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
