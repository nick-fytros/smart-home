<template>
    <div class="content">
        <smheader></smheader>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <h1>{{otherData}}</h1>
                <form>
                    <p class="control has-icon">
                        <input class="input" type="email" placeholder="Email">
                        <span class="icon is-small"><i class="fa fa-envelope"></i></span>
                    </p>
                    <p class="control has-icon">
                        <input class="input" type="password" placeholder="Password">
                        <span class="icon is-small"><i class="fa fa-lock"></i></span>
                    </p>
                    <div class="control is-grouped">
                        <p class="control">
                            <button class="button is-primary">Submit</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
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
