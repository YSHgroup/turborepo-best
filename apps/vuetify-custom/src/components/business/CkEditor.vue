<template>
	<div>
		<ckeditor
			:editor="editor"
			v-model="editorData"
			:config="editorConfig"
		></ckeditor>
	</div>
</template>

<script setup lang="ts">
	import {
		Bold,
		BlockToolbar,
		BlockQuote,
		Code,
		CodeBlock,
		ClassicEditor,
		Essentials,
		Font,
		Italic,
		ImageUpload,
		ImageInsertUI,
		Image,
		Indent,
		Link,
		List,
		TodoList,
		Subscript,
		Strikethrough,
		Superscript,
		Mention,
		Paragraph,
		Undo,
		ParagraphButtonUI,
		Heading,
	} from 'ckeditor5'

	import 'ckeditor5/ckeditor5.css'

	const editor = ClassicEditor
	const editorData = '<p>Hello from CKEditor 5 in Vue!</p>'
	const editorConfig = {
		plugins: [
			Bold,
			BlockToolbar,
			BlockQuote,
			Code,
			CodeBlock,
			Essentials,
			Italic,
			Indent,
			Image,
			ImageUpload,
			ImageInsertUI,
			TodoList,
			Subscript,
			Strikethrough,
			Superscript,
			Mention,
			Heading,
			Paragraph,
			Undo,
			Font,
			Link,
			List,
			ParagraphButtonUI,
		],
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'|',
				'fontfamily',
				'fontsize',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'strikethrough',
				'subscript',
				'superscript',
				'code',
				'|',
				'link',
				'uploadImage',
				'blockQuote',
				'codeBlock',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'outdent',
				'indent',
			],
			shouldNotGroupWhenFull: false,
		},
	}
</script>

<style scoped></style>
