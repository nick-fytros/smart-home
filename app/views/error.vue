<template>
    <div>
        <smheader :title="title" :subtitle="subtitle"></smheader>
        <section class="section content main-section">
            <div class="container">
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <p>{{error}}</p>
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
