<script setup lang="ts">
    const links = ['Dashboard', 'Messages', 'Profile', 'Updates']
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
					size="32"
				></v-avatar>

				<v-btn
					v-for="link in links"
					:key="link"
					:text="link"
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

<style scoped>

</style>