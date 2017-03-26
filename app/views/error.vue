<template>
    <div>
        <appheader :title="title" :subtitle="subtitle"></appheader>
        <section class="section content main-section">
            <div class="container">
                <div class="columns">
                    <div class="column is-one-third is-offset-one-third">
                        <p>{{error}}</p>
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
        return {}
    }
}
</script>
<style>


</style>
