import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Advertisement } from '../../interfaces/advertisement';
import { ApartmentInfo } from '../../interfaces/apartment-info';
import { info } from 'console';
import { AppointmentAv } from '../../interfaces/appointmentAv';
import { AdvertisementService } from '../../Services/advertisement.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ads-single',
  imports: [],
  templateUrl: './ads-single.component.html',
  styleUrl: './ads-single.component.scss'
})
export class AdsSingleComponent implements OnInit {
   role!:string
   images:string[]=[]
   appointment:AppointmentAv[]=[]
   imageUrl!:string
   Info!:ApartmentInfo
   userName!:string

   @Input() item!:Advertisement 
   @Output() delete = new EventEmitter<number>();
   @Output() AllAppointment=new EventEmitter<number>();

   _AdvertisementService=inject(AdvertisementService)



   ngOnInit(): void {
     this.role=localStorage.getItem('role')!
     this.userName=localStorage.getItem('userName')!
     
     const ads=this.item;
     if(!ads) return;
     
    this.images = ads
      ? [ads.image1, ads.image2, ads.image3].filter(img => !!img) as string[]
      : [];
     this.imageUrl=this.images[0]
     this.Info=this.extractFlexibleInfo(ads.description)
     console.log(this.Info)
   }
   
   updateImage(index:number){
    console.log(index)
    this.imageUrl=this.images[index];
   }

   Remove(){
     this.delete.emit(this.item.adID);
   }

extractFlexibleInfo(text: string): ApartmentInfo {
  const info: ApartmentInfo = {};
  const lowerText = text.toLowerCase();

  // Type
  const typeMatch = text.match(/\b(apartment|villa|flat|unit|studio|duplex)\b/i);
  if (typeMatch) {
    info.typeUnit = typeMatch[1].toLowerCase();
  }

  // Bedrooms (bed, beds, BR, bdr)
  const bedroomMatch = text.match(/(\d+)\s*(bed(room)?s?|br|bdr)/i);
  if (bedroomMatch) {
    info.bedrooms = parseInt(bedroomMatch[1]);
  }

  // Bathrooms (bath, baths, bathroom, bathrooms, toilet, WC)
  const bathroomMatch = text.match(/(\d+)\s*(bath(room)?s?|toilet|wc)/i);
  if (bathroomMatch) {
    info.bathrooms = parseInt(bathroomMatch[1]);
  }

  // Area (sqm, m2, m², square meters, sq.m, ft2)
const areaMatch = text.match(/(\d+)\s*(sqm|m2|m²|square\s*meters?|sq\.?m|sqft|ft2)/i);
if (areaMatch) {
  info.areaUnit = parseInt(areaMatch[1]);
}

//status (for sale, for rent)
  const statusMatch = text.match(/\b(for\s*(rent|sale|sell))\b/i);
  if (statusMatch) {
    if (/rent/i.test(statusMatch[0])) info.statusUnit = "rent";
    if (/sale|sell/i.test(statusMatch[0])) info.statusUnit = "sale";
  }
  return info;
}


getTimeDifference(publishDate: string | Date): string {
  const now = new Date();
  const published = new Date(publishDate);
  const diffMs = now.getTime() - published.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return diffSeconds + " S";
  } else if (diffMinutes < 60) {
    return diffMinutes + " M";
  } else if (diffHours < 24) {
    return diffHours + " H";
  } else {
    return diffDays + " D";
  }
}







 getAllAppointmment(id:number){
  this.AllAppointment.emit(id); 
 }


}
