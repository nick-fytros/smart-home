<template>
	<div class="level">
		<div class="level-item has-text-centered">
			<div>
				<p>{{token.val}}</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div title="Created on">
				<p>{{formatDate(token.createdOn)}}</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div>
				<p>{{hasExpired(token) ? 'expired' : 'valid'}}</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<a v-on:click="editMode = true"
			   :class="{'is-hidden': editMode}"><span class="icon"><i class="fa fa-pencil"></i></span></a>
			<a v-on:click="saveNewData(token)"
			   :class="{'is-hidden': !editMode}"><span class="icon"><i class="fa fa-check"></i></span></a>
			<a v-on:click="deleteToken(token)"
			   :class="{'is-hidden': !editMode}"><span class="icon"><i class="fa fa-trash"></i></span></a>
		</div>
		<div :class="{'is-hidden': updateStatus === '', 'is-success': updateStatus === 'Updated', 'is-danger': updateStatus === 'Error'}"
		     class="level-item has-text-centered notification is-small">
			<p>{{updateStatus}}</p>
		</div>
	</div>
</template>

<script>

export default {
	data: function () {
		return {
			editMode: false,
			updateStatus: ''
		}
	},
	props: ['token', 'config', 'csrf'],
	methods: {
		formatDate: function (date) {
			return moment(date).format('D MMM YYYY, H:mm:ss');
		},
		saveNewData: function (token) {
			this.editMode = false;
		},
		deleteToken: function (token) {
			// post to delete the token
			if (this.roleSelected && this.roleSelected !== token.role) {
				axios.post(this.config.routes.admin.token.delete, {
					_csrf: this.csrf,
					token: token
				}).then((response) => {
				}).catch((error) => {
					this.updateStatus = 'Error';
				});
			}
			this.editMode = false;
		},
		hasExpired: function (token) {
			const today = new Date();
			const created = new Date(token.createdOn);
			return today.getTime() - created.getTime() > token.ttl ? true : false;
		}
	}
}

</script>
<style>

</style>