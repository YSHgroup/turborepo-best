<script setup lang="ts">
	import { Location } from '@/models/location';
  import { ref } from 'vue'

  import locationData from '@/mock/location.json'

	const locations = ref<Location[]>([
		{
			region: 'America',
			cities: locationData.america,
		},
		{
			region: 'Europ',
			cities: locationData.europ,
		},
		{
			region: 'Asia',
			cities: locationData.asia,
		},
	])
</script>

<template>
	<v-row class="h-100 ma-0">
		<v-col cols="4">
			<p class="text-h6">VAutocomplete field for</p>
			<p class="text-h6"><b>Multi Search functionality</b></p>
		</v-col>
		<v-divider vertical></v-divider>
		<v-col cols="8">
			<v-autocomplete 
        label="Mulit Search"
        variant="solo-filled"
        :items="locations"
        item-title="region"
        chips
        no-filter
      >
        <template v-slot:item="{item, props}">
          <v-list class="my-n4">
            <v-list-item-title class="bg-primary pa-3">
              {{ item.title }}
            </v-list-item-title>

            <v-list-item
              v-for="option in item.raw.cities"
            >{{ option.name }}</v-list-item>
          </v-list>
        </template>
    </v-autocomplete>
		</v-col>
	</v-row>
</template>

<style scoped></style>
