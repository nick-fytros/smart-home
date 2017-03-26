<template>
    <div>
        <appheader :title="title"
                  :subtitle="subtitle"></appheader>
        <section class="section content main-section">
            <div class="container">
                <userbar :user="user"></userbar>
                <messagebox :flash="flash"></messagebox>
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
