<script setup lang="ts">
	import avatar from '../../public/avatar.jpg'
	
	const links = [
		{
			title: 'Dashboard',
			to: '/welcome?message=Welcome+to+here',
		},
		{
			title: 'Vuetify Components',
			to: '/vuetify',
		},
		{
			title: 'Business components',
			to: '/business',
		},
		{
			title: 'No speicific',
			to: '/',
		},
	]
</script>

<template>
	<v-app-bar
		flat
		color="primary"
	>
		<v-container class="mx-auto d-flex align-center justify-center">
			<v-avatar
				class="me-4"
				color="grey-lighten-2"
				size="38"
				:image="avatar"
			></v-avatar>

			<v-btn
				v-for="link in links"
				:key="link.title"
				:text="link.title"
				:to="link.to"
				variant="text"
			></v-btn>

			<v-spacer></v-spacer>

			<v-responsive max-width="1460">
				<v-text-field
					density="compact"
					label="Search"
					rounded="lg"
					variant="solo-filled"
					prepend-inner-icon="mdi-magnify"
					flat
					hide-details
					single-line
				></v-text-field>
			</v-responsive>
		</v-container>
	</v-app-bar>
</template>

<style scoped></style>
