import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService)

  housingLocationList: HousingLocation[]
  filteredLocationList: HousingLocation[]

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations()
    this.filteredLocationList = this.housingLocationList
  }
  filterResults(text: string) {
    if(!text) {
      this.filteredLocationList = this.housingLocationList
    } else {
      this.filteredLocationList = this.housingLocationList.filter(housingLocation => housingLocation.city.toLowerCase().includes(text.toLowerCase()))
    }
  }
}
