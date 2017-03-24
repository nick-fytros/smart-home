<template>
	<div class="level">
		<div class="level-item has-text-centered">
			<div>
				<p>{{user.email}}</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div title="Created on">
				<p>{{formatDate(user.createdOn)}}</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div title="Last login">
				<p>{{formatDate(user.lastLogin)}}</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<div class="field">
				<p class="control">
					<span class="select"><select :disabled="!editMode" v-model="selectedRole"><option v-for="role in config.availableRoles" :value="role">{{role}}</option></select></span>
				</p>
			</div>
		</div>
		<div class="level-item has-text-centered">
			<a v-on:click="editMode = true"
			   :class="{'is-hidden': editMode}"><span class="icon"><i class="fa fa-pencil"></i></span></a>
			<a v-on:click="saveNewData(user)"
			   :class="{'is-hidden': !editMode}"><span class="icon"><i class="fa fa-check"></i></span></a>
			<a v-on:click="deleteUser(user)"
			   class="left-gap"><span class="icon"><i class="fa fa-trash"></i></span></a>
		</div>
	</div>
</template>

<script>

export default {
	data: function () {
		return {
			editMode: false,
			roleSelected: ''
		}
	},
	props: ['user', 'config'],
	computed: {
		selectedRole: {
			get: function () {
				return this.roleSelected || this.user.role;
			},
			set: function (newValue) {
				this.roleSelected = newValue;
			}
		}
	},
	methods: {
		formatDate: function (date) {
			return moment(date).format('D MMM YYYY, H:mm:ss');
		},
		saveNewData: function (user) {
			if (this.roleSelected && this.roleSelected !== user.role) {
				this.$emit('updateuser', { user: user, roleSelected: this.roleSelected });
			}
			this.editMode = false;
		},
		deleteUser: function (user) {
			this.$emit('deleteuser', { user: user });
			this.editMode = false;
		}
	}
}

</script>
<style>

</style>