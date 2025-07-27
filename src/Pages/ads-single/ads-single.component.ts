import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Advertisement } from '../../interfaces/advertisement';
import { ApartmentInfo } from '../../interfaces/apartment-info';
import { info } from 'console';
import { AppointmentAv } from '../../interfaces/appointmentAv';
import { AdvertisementService } from '../../Services/advertisement.service';

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

  const typeMatch = text.match(/\b(apartment|villa|flat|unit)\b/i);
  if (typeMatch) {
    info.type = typeMatch[1].toLowerCase();
  }

  const bedroomMatch = text.match(/(\d+)\s*bed(room)?s?/i);
  if (bedroomMatch) {
    info.bedrooms = parseInt(bedroomMatch[1]);
  }

  const bathroomMatch = text.match(/(\d+)\s*bath(room)?s?/i);
  if (bathroomMatch) {
    info.bathrooms = parseInt(bathroomMatch[1]);
  }

  const areaMatch = text.match(/(\d+)\s*(square\s*meters|sqm|m²)/i);
  if (areaMatch) {
    info.area = parseInt(areaMatch[1]);
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

  if (diffDays > 0) return `${diffDays} D`;
  if (diffHours > 0) return `${diffHours} H`;
  if (diffMinutes > 0) return `${diffMinutes} M`;
  return `just now`;
}

 getAllAppointmment(id:number){
  this.AllAppointment.emit(id); 
 }


}
