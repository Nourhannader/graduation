import { Component,  inject, OnInit } from '@angular/core';
import { AdsByOwner, AdvertisementService, Appointment, AppointmentByOwner } from '../../Services/advertisement.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {
  selectedDate = new Date();
  showAdd:boolean=false
  form!:FormGroup
  timeSlots = [
    '10:00 am', '11:00 am', '12:00 pm',
    '01:00 pm', '02:00 pm', '03:00 pm',
    '04:00 pm', '05:00 pm', '06:00 pm',
    '07:00 pm', '08:00 pm', '09:00 pm'
  ];
  days = this.getNextDays(4);
  AdsAvailable:AdsByOwner[]=[]
  AllAppointment:AppointmentByOwner[]=[]
  selectedAdId!: number
 
  _AdvertisementService=inject(AdvertisementService);

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getAdsAvailable()
    this.getAllAppointment()
    this.form=this.fb.group({
      day: ['',[Validators.required]],
      hour: ['',[Validators.required]]
    })
  }

  onSelectAd(event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  this.selectedAdId = Number(value) 
}

  getNextDays(count: number): string[] {
    const today = new Date();
    return Array.from({ length: count }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toLocaleDateString('en-GB', {
      weekday: 'long',     
      day: '2-digit',     
      month: 'short'   
    });
    });
  }

  formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long', // e.g., Wednesday
    day: '2-digit',  // e.g., 20
    month: 'short'   // e.g., Sep
  });
 }
 
 getAdsAvailable(){
  this._AdvertisementService.getByOwner().subscribe({
    next:(data)=>{
      this.AdsAvailable=data
      console.log(this.AdsAvailable);
    },error:(err)=>{
      console.log(err);
      
    }
  })
 }
 
renderAppointments() {
  this.AllAppointment.forEach(app => {
    const date = new Date(app.dateTime);
    const dayLabel = date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'short'
    }); // e.g., "Saturday 26 Jul"

    let hour = date.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;
    const formattedTime = `${hour.toString().padStart(2, '0')}:00 ${ampm}`; // e.g., "01:00 pm"

    const slotId = `day-${dayLabel}`;
    const slotElement = document.getElementById(slotId);

    if (slotElement) {
      const timeSlotElement = slotElement.querySelector(`[id="${formattedTime}"]`) as HTMLElement;

      if (timeSlotElement) {
        timeSlotElement.innerHTML = `
          <div class="appointment">
            <div>
              <strong>${app.street}</strong>
              <button style="border:none; outline:none; background-color:transparent" class="delete-btn" data-id="${app.id}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
            Bldg ${app.buildingNumber}, Flat ${app.flatNumber}
          </div>
        `;

        setTimeout(() => {
          const btn = timeSlotElement.querySelector('.delete-btn') as HTMLElement;
          if (btn) {
            btn.addEventListener('click', () => this.DeleteClick(app.id));
          }
        }, 0);
      }
    }
  });
}


 toggelShowAdd(){
  console.log('hi');
  
  this.showAdd=!this.showAdd;
 }
 close(){
  this.showAdd=false;
 }

 save(){
  if (this.form.valid) {
    const selected = this.form.value;
    const appointmentDate1: Date=this.convertToDate(selected.day,selected.hour)
    const appointment={
      appointmentDate :appointmentDate1,
      advertisementId: this.selectedAdId
    }
    console.log(appointment);
    
    this._AdvertisementService.AddAppointment(appointment).subscribe({
      next:(res)=>{
        console.log(res.message);
        this.getAllAppointment();
      },error:(err)=> {
        console.log(err.message);
        
      }
    })
    this.close();
    
  }

 }
 
 getAllAppointment(){
  this._AdvertisementService.getAppointmentByOwner().subscribe({
    next:(data)=>{
      this.AllAppointment=data
      console.log(this.AllAppointment);
      this.renderAppointments()
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
 }

 DeleteClick(id:number){
   this._AdvertisementService.deleteAppointment(id).subscribe({
    next:(res)=>{
      console.log(res.message);
      this.getAllAppointment();
    },error:(err)=>{
      console.log(err);
      
    }
   })

 }

 convertToDate(fullDay: string, hour: string): Date {
  const [dayName, dayNumberStr, monthStr] = fullDay.split(' ');
  const dayNumber = parseInt(dayNumberStr);
  const currentYear = new Date().getFullYear();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = months.indexOf(monthStr);

  if (monthIndex === -1 || isNaN(dayNumber)) {
    throw new Error("Invalid day format");
  }

  // Create base date: e.g., "2025-07-26"
  const date = new Date(currentYear, monthIndex, dayNumber);

  // Detect if time is in 12-hour format (with am/pm)
  let hours = 0, minutes = 0;
  const hourLower = hour.toLowerCase().trim();

  if (hourLower.includes('am') || hourLower.includes('pm')) {
    // 12-hour format
    const [timePart, period] = hourLower.split(' ');
    [hours, minutes] = timePart.split(':').map(Number);

    if (period === 'pm' && hours < 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;
  } else {
    // 24-hour format
    [hours, minutes] = hourLower.split(':').map(Number);
  }

  date.setHours(hours, minutes, 0, 0);

  return date;
}



 
}
