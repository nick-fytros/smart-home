<template>
    <div>
        <smheader :title="title"
                  :subtitle="subtitle"></smheader>
        <section class="section content main-section">
            <div class="container">
                <userbar :user="user"></userbar>
                <messagebox :flash="flash"></messagebox>
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
