<script setup lang="ts">
	import { Location } from '@/models/location'
	import { ref } from 'vue'

	import locationData from '@/mock/location.json'

	const locations = [
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
	]

  const locationList = ref<Location[]>(locations)
	const selectedValue = ref<Location>()

  const searchItem = (value: string) => {
    const filteredLocations = locations.map((location) => {
      const filteredCities = location.cities.filter((city) => city.name.toLowerCase().includes(value.toLowerCase()))
      return { ...location, cities: filteredCities }
    })

    locationList.value = filteredLocations
  }

	const selectItem = (value: Location) => {
		selectedValue.value = value
	}
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
				chips
				no-filter
				:items="locationList"
				item-title="region"
				v-model="selectedValue"
        @update:search="searchItem"
			>
        <template v-slot:chip="{item}">
          <span>{{item.value.name}}</span>
        </template>
				<template v-slot:item="{ item }">
					<v-list class="my-n4">
						<v-list-item-title class="bg-primary pa-3">
							{{ item.title }}
						</v-list-item-title>

						<v-list-item
							v-for="option in item.raw.cities"
							@click="() => selectItem(option)"
							>{{ option.name }}</v-list-item
						>
					</v-list>
				</template>
			</v-autocomplete>
		</v-col>
	</v-row>
</template>

<style scoped></style>
