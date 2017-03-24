<template>
    <div v-if="!_.isEmpty(flash)" class="columns">
        <div class="column is-one-third is-offset-one-third">
            <div id="message-box">
                <article v-if="flash && flash.info"
                         class="message is-info">
                    <div class="message-body">
                        {{flash.info.message}}
                    </div>
                </article>
                <article v-if="flash && flash.success"
                         class="message is-success">
                    <div class="message-body">
                        {{flash.success.message}}
                    </div>
                </article>
                <article v-if="flash && flash.warning"
                         class="message is-warning">
                    <div class="message-body">
                        {{flash.warning.message}}
                    </div>
                </article>
                <article v-if="flash && flash.error"
                         class="message is-danger">
                    <div class="message-body">
                        {{flash.error.message}}
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['flash']
}

</script>

<style>

</style>
