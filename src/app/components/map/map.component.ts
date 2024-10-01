import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [FormsModule],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map: any;
  address: string = '';

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  // Method to geocode an address
  public geocodeAddress(address: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const location = data[0];
          const lat = location.lat;
          const lon = location.lon;

          const displayName = location.display_name.split(', ');
          const city = displayName[0] || 'Unknown';
          const country = displayName[displayName.length - 1] || 'Unknown';
          const postalCode = displayName[displayName.length - 2] || 'Unknown';

          console.log('City:', city);
          console.log('Country:', country);
          console.log('Postal Code:', postalCode);
          console.log(lat, lon);

          // Set the map view to the new location and add a marker
          this.map.setView([lat, lon], 13);
          L.marker([lat, lon])
            .addTo(this.map)
            .bindPopup(`${city}, ${country}, ${postalCode}`)
            .openPopup();
        } else {
          console.error('No results found');
        }
      })
      .catch((error) => console.error('Error:', error));
  }
}
