<template>
    <div>
		{{ bulb.name }}
		<input type="color" :value="bulb.color" v-model="currentColor" v-on:input="changeColor">
	</div>
</template>

<script>
export default {
    props: ['bulb'],
    data: function () {
        return {
			currentColor: '',
			timeoutId: 0
		}
    },
    methods: {
		changeColor: function() {
			if (this.timeoutId != 0){
				clearTimeout(this.timeoutId);
				this.timeoutId = 0;
			}
			this.timeoutId = setTimeout(() => {
				this.$emit('changecolor', { bulbId: this.bulb.id, color: this.currentColor });
			}, 500);
		}
    }
}

</script>

<style>

</style>