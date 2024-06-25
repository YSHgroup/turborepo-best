interface City {
	id: number
	name: string
}

export interface Location {
	region: string
	cities: City[]
}
