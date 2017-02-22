<template>
    <header class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    {{title}}
                </h1>
                <h2 class="subtitle">
                    {{subtitle}}
                </h2>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        props: ['title', 'subtitle']
    }

</script>

<style>


</style>
