<script setup lang="ts">
	import { ref } from 'vue'
	import html2pdf from 'html2pdf.js'

  	import GraphCard from '@/components/business/GraphCard.vue'

	const contentToPrint = ref(null)

	const downloadPdf = () => {
		const element = contentToPrint.value
		const options = {
			margin: 1,
			filename: 'webpage.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
		}

		html2pdf().set(options).from(element).save()
	}
</script>
<template>
	<div>
		<div
			ref="contentToPrint"
			id="pdf-content"
		>
			<h1>Business page</h1>
			<p>This content will be converted to PDF.</p>

			<v-row class="ma-0">
				<v-col
					cols="12"
					sm="6"
				>
					<graph-card></graph-card>
				</v-col>
				<v-col
					cols="12"
					sm="6"
				></v-col>
			</v-row>
		</div>
		<v-btn
			color="primary"
			prepend-icon="mdi-download-circle"
			variant="tonal"
			class="text-subtitle-1"
			@click="downloadPdf"
			>Download as PDF</v-btn
		>
	</div>
</template>

<style scoped lang="scss">
	#pdf-content {
		text-align: center;
	}
</style>
