<template>
    <div>
        <appheader :title="title"
                  :subtitle="subtitle"></appheader>
        <section class="section content main-section">
            <div class="container">
                <messagebox :flash="flash"></messagebox>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <form ref="form"
                              action="/auth/signup"
                              method="post">
                            <p class="control has-icon">
                                <input type="hidden"
                                       name="_csrf"
                                       :value="csrfToken">
                                <input class="input"
                                       type="text"
                                       placeholder="One time code"
                                       name="onetimecode"
                                       required
                                       pattern="[A-Za-z0-9]{8}">
                                <span class="icon is-small"><i class="fa fa-terminal"></i></span>
                            </p>
                            <p class="control has-icon">
                                <input class="input"
                                       :class="{ 'is-danger': form.email.hasError }"
                                       type="email"
                                       placeholder="Email"
                                       name="email"
                                       v-model="email"
                                       required
                                       autocomplete="email">
                                <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                            </p>
                            <p :class="{ 'is-hidden': !form.email.hasError }"
                               class="help is-danger">{{form.email.message}}</p>
                            <p class="control has-icon">
                                <input class="input"
                                       :class="{ 'is-danger': form.password.hasError }"
                                       type="password"
                                       placeholder="Password"
                                       name="password"
                                       required
                                       v-model="password">
                                <span class="icon is-small"><i class="fa fa-lock"></i></span>
                            </p>
                            <p :class="{ 'is-hidden': !form.password.hasError }"
                               class="help is-danger">{{form.password.message}}</p>
                            <p class="control has-icon">
                                <input class="input"
                                       :class="{ 'is-danger': form.repeatpassword.hasError }"
                                       type="password"
                                       placeholder="Repeat password"
                                       name="repeatpassword"
                                       required
                                       v-model="repeatpassword">
                                <span class="icon is-small"><i class="fa fa-lock"></i></span>
                            </p>
                            <p :class="{ 'is-hidden': !form.repeatpassword.hasError }"
                               class="help is-danger">{{form.repeatpassword.message}}</p>
                            <div class="control is-grouped">
                                <p class="control">
                                    <a v-on:click="submit"
                                       :class="{ 'is-loading': isLoading, 'is-disabled': (form.email.hasError || form.password.hasError || form.repeatpassword.hasError) }"
                                       class="button is-primary">Sign up</a>
                                </p>
                                <p class="control control-or">
                                    <span>or</span>
                                </p>
                                <p class="control">
                                    <a href="/"
                                       class="button is-link">Sign in</a>
                                </p>
                            </div>
                        </form>
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
            isLoading: false,
            form: {
                email: { hasError: false, message: '' },
                password: { hasError: false, message: '' },
                repeatpassword: { hasError: false, message: '' }
            },
            email: '',
            password: '',
            repeatpassword: '',
        }
    },
    methods: {
        submit: function () {
            this.isLoading = !this.isLoading;
            this.$refs.form.submit();
        },
        clearPassErrors: function () {
            this.form.password.hasError = false;
            this.form.password.message = '';
            this.form.repeatpassword.hasError = false;
            this.form.repeatpassword.message = '';
        }
    },
    watch: {
        email: function (val, prev) {
            const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(val)) {
                this.form.email.hasError = true;
                this.form.email.message = 'Email is not valid';
            } else {
                this.form.email.hasError = false;
                this.form.email.message = '';
            }
        },
        password: function (val, prev) {
            if (val !== this.repeatpassword) {
                this.form.password.hasError = true;
                this.form.password.message = 'Passwords do not match';
            } else {
                this.clearPassErrors();
            }
        },
        repeatpassword: function (val, prev) {
            if (val !== this.password) {
                this.form.repeatpassword.hasError = true;
                this.form.repeatpassword.message = 'Passwords do not match';
            } else {
                this.clearPassErrors();
            }
        }
    }
}
</script>

<style>

</style>
