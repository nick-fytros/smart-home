<template>
	<div class="notification animated pulse"
	     v-if="message.text"
	     :class="messageColorClass()">
		<button v-on:click="close" class="delete"></button>
		{{message.text}}
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			open: true
		}
	},
	props: ['message', 'timeout'],
	methods: {
		messageColorClass: function () {
			let className = '';
			if (this.message.error) {
				className = 'is-danger';
			} else if (this.message.info) {
				className = 'is-info';
			} else if (this.message.success) {
				className = 'is-success';
			} else if (this.message.warning) {
				className = 'is-warning';
			}
			if (this.timeout) {
				setTimeout(() => {
					this.message.text = '';
				}, this.timeout);
			}
			return className;
		},
		close: function () {
			this.message.text = '';
		}
	}
}
</script>