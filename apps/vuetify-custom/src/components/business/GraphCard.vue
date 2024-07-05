<template>
	<v-card
		class="mx-auto text-center"
		max-width="500"
		color="info"
		outlined
		dark
	>
		<v-card-text>
			<v-sheet color="rgba(0, 0, 0, .12)">
				<v-sparkline
					:model-value="value"
					color="rgba(255, 255, 255, .7)"
					height="100"
					padding="24"
					stroke-linecap="round"
					smooth
				>
					<template v-slot:label="item"> ${{ item.value }} </template>
				</v-sparkline>
			</v-sheet>
		</v-card-text>

		<v-card-text>
			<div class="text-h4 font-weight-thin">Sales Last 24h</div>
		</v-card-text>

		<v-divider></v-divider>

		<v-card-actions class="justify-center">
			<v-btn
				variant="text"
				block
			>
				Go to Report
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	const value = ref([423, 446, 675, 510, 590, 610, 760])
</script>

<style scoped></style>
