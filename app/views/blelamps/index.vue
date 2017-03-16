<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content">
            <div class="container">
                <userbar :user="user"></userbar>
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <messagebox v-if="flash[0]" :flash="flash"></messagebox>
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
