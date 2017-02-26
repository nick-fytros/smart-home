<template>
    <div id="message-box">
        <article v-if="flash.info" class="message is-info">
            <div class="message-body">
                {{flash.info.message}}
            </div>
        </article>
        <article v-if="flash.success" class="message is-success">
            <div class="message-body">
                {{flash.success.message}}
            </div>
        </article>
        <article v-if="flash.warning" class="message is-warning">
            <div class="message-body">
                {{flash.warning.message}}
            </div>
        </article>
        <article v-if="flash.error" class="message is-danger">
            <div class="message-body">
                {{flash.error.message}}
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        props: ['flash']
    }

</script>

<style>


</style>
