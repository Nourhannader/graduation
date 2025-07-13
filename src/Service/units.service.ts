import { Unit } from '../Interface/unit';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  constructor() { }

  getAllUnit():Unit[]{
    const units: Unit[] = [
  {
    id:1,
    status: "Available",
    price: 3500,
    description: "Spacious 3-bedroom flat near main road",
    type: "Rent",
    street: "Talaat Harb",
    area: "Downtown",
    flatNumber: "5A",
    buildingNumber: "12",
    image1: "images/unit1-1.webp",
    image2: "images/unit1-2.webp",
    image3: "images/unit1-3.webp",
    electricityNum: "E123456789",
    waterNum: "W123456789",
    gasNum: "G123456789"
  },
  {
    id:2,
    status: "Rented",
    price: 2800,
    description: "2-bedroom apartment with balcony",
    type: "Ownership",
    street: "Ahmed Orabi",
    area: "Mohandessin",
    flatNumber: "3B",
    buildingNumber: "7",
    image1: "images/unit2-1.webp",
    image2: "images/unit2-2.webp",
    image3: "images/unit2-3.webp",
    electricityNum: "E987654321",
    waterNum: "W987654321",
    gasNum: "G987654321"
  },
  {
    id:3,
    status: "Available",
    price: 5000,
    description: "Villa with private garden",
    type: "Ownership",
    street: "El-Narges",
    area: "New Cairo",
    flatNumber: null,
    buildingNumber: "Villa 9",
    image1: "images/unit3-1.webp",
    image2: "images/unit3-2.webp",
    image3: "images/unit3-3.webp",
    electricityNum: "E456789123",
    waterNum: "W456789123",
    gasNum: "G456789123"
  },
  {
    id:4,
    status: "Rented",
    price: 4200,
    description: "Modern flat under maintenance",
    type: "Rent",
    street: "October Gardens",
    area: "6th of October City",
    flatNumber: "6C",
    buildingNumber: "22",
    image1: "images/unit4-1.webp",
    image2: "images/unit4-2.webp",
    image3: "images/unit4-3.webp",
    electricityNum: "E456789124",
    waterNum: "W456789124",
    gasNum: "G456789124"
  }
];
return units;
}

getUnitById(id:number):Unit | undefined {

  const units: Unit[] = this.getAllUnit();
  return units.find(u => u.id === id);
}

}
