<script setup lang="ts">
	import { ref } from 'vue'
	import html2pdf from 'html2pdf.js'

  	import GraphCard from '@/components/business/GraphCard.vue'
	import GraphicCardTable from '@/components/business/GraphicCardTable.vue'
	import CkEditor from '@/components/business/CkEditor.vue'

	const contentToPrint = ref(null)
	const cols = ref(6)

	const downloadPdf = () => {
		const element = contentToPrint.value
		const options = {
			margin: 0.5,
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
				<v-col cols="12" :sm="cols">
					<graph-card></graph-card>
				</v-col>
				<v-col cols="12" :sm="cols">
					<graphic-card-table></graphic-card-table>
				</v-col>
				<v-col cols="12">
					<ck-editor></ck-editor>
				</v-col>
			</v-row>
		</div>
		<v-btn-toggle elevation="1" color="primary" divided>
			<v-btn variant="outlined" @click="() => cols = cols == 6? 12: 6">{{cols == 6? "Vertical list": "Reset"}}</v-btn>
			<v-btn
				prepend-icon="mdi-download-circle"
				variant="tonal"
				class="text-subtitle-1"
				@click="downloadPdf"
				>Download as PDF</v-btn
			>
		</v-btn-toggle>
	</div>
</template>

<style scoped lang="scss">
	#pdf-content {
		text-align: center;
	}
</style>
