<script setup lang="ts"></script>

<template>
	<v-sheet rounded="lg">
		<v-list rounded="lg">
			<v-list-item
				v-for="n in 5"
				:key="n"
				:title="`List Item ${n}`"
				link
			></v-list-item>

			<v-divider class="my-2"></v-divider>

			<v-list-item
				color="grey-lighten-4"
				title="Refresh"
				link
			></v-list-item>
		</v-list>
	</v-sheet>
</template>

<style scoped></style>
