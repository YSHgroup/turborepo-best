<script setup lang="ts">
	import HeadAppBar from './layouts/HeadAppBar.vue'
</script>

<template>
	<v-app id="inspire">
		<head-app-bar></head-app-bar>

		<v-main class="bg-grey-lighten-3">
			<v-container fluid>
				<v-row>
					<v-col cols="2">
						<RouterView
							name="LeftSidebar"
							class="view w-full"
						></RouterView>
					</v-col>

					<v-col>
						<RouterView class="view w-full"></RouterView>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<style scoped lang="scss"></style>
