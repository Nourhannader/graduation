import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AdsSingleComponent } from '../ads-single/ads-single.component';
import { Advertisement } from '../../interfaces/advertisement';
import { AdvertisementService } from '../../Services/advertisement.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentAv } from '../../interfaces/appointmentAv';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-advertisements',
  imports: [CommonModule,AdsSingleComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.scss'
})
export class AdvertisementsComponent implements OnInit {
  showPrice = false;
  showBeds = false;
  showTypes = false;
  loading:boolean=false
  loadingAppoint:boolean=false
  loadingHour:boolean=false
  searchTerm = '';
  selectDate:string=''
  selectTime:string=''
  selectedBeds: number | null=null;
  ShowReservation:boolean=false
  groupedAppointments: { [key: string]: string[] } = {};
  advertisements:Advertisement[]=[]
  filteredAds:Advertisement[]=[]
  appointment:AppointmentAv[]=[]
  dates: string[] = [];
  times:string[]=[];
  appointmentForm!:FormGroup
  _AdvertisementService=inject(AdvertisementService)

   constructor(private fb: FormBuilder,private toastr:ToastrService) {}
  ngOnInit(): void {
    this.loading=true
    setTimeout(()=>{
      this.getAllAdvertisements()
    },1000)
    
    this.appointmentForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      name:['',[Validators.required]],
      phoneNumber:['',Validators.required],
      date:['',[Validators.required]],
      time:['',[Validators.required]]
    })
  }

  toggle(dropdown: string) {
    this.showPrice = dropdown === 'price' ? !this.showPrice : false;
    this.showBeds = dropdown === 'beds' ? !this.showBeds : false;
    this.showTypes = dropdown === 'types' ? !this.showTypes : false;
  }

  getAllAdvertisements(){
    this._AdvertisementService.getAllAds().subscribe({
      next:(data) =>{
        console.log(data);
        this.advertisements=data;
        this.filteredAds = [...this.advertisements]; 
        this.loading=false
      },error:(err) => {
        console.log(err);
        this.loading=false
      }
    })
  }
   
  delete(id:number){
    this._AdvertisementService.DeleteAds(id).subscribe({
      next:(res) =>{
        setTimeout(() => {
          this.toastr.success(res.message);
        })
      },error:(err) => {
        setTimeout(() => {
          this.toastr.success(err.message);
        })
      }
    })
  }

  applyFilters() {
  const search = this.searchTerm.trim().toLowerCase();

  this.filteredAds = this.advertisements.filter(ad => {

    if (search === '') return true;

    return (
      ad.city?.toLowerCase().includes(search) ||
      ad.area?.toLowerCase().includes(search) ||
      ad.street?.toLowerCase().includes(search)
    );
  });
}

FilterPrice(price:string){
  if(price === '< 10000'){
    this.filteredAds=this.advertisements.filter(ads => ads.price < 10000)
  }else{
    this.filteredAds=this.advertisements.filter(ads => ads.price > 10000)
  }
}

filterType(type:string){
   const lowerType = type.toLowerCase();
  this.filteredAds = this.advertisements.filter(ad =>
    ad.description.toLowerCase().includes(lowerType)
  );
}

setBeds(beds:number|null){
  this.selectedBeds=beds;
  this.filterBeds();
}

filterBeds(){
  this.filteredAds=this.advertisements.filter(ads => {
    const bedsMatch = (() => {
      if (this.selectedBeds == null) return true;

      const match = ads.description?.match(/(\d+)\s*beds?/i);
      const beds = match ? parseInt(match[1]) : null;
      return beds === this.selectedBeds;
    })();
    return bedsMatch;
  });
 }

  LoadAll(){
    this.filteredAds=this.advertisements;
  }

  getAllAppointmment(id:number){
    this.ShowReservation=true
    this.loadingAppoint=true
    setTimeout(() => {
      this._AdvertisementService.getAppointmentAvailble(id).subscribe({
    next:(data)=>{
      this.appointment=data
      const grouped=this.groupAppointmentsByDay(this.appointment);
      this.groupedAppointments=grouped
      this.dates=Object.keys(grouped)
      this.loadingAppoint=false
      
    },error:(err)=>{
      console.log(err);
      this.loadingAppoint=false
    }
   })
  }, 1000);
     
 }
  
 groupAppointmentsByDay(data: AppointmentAv[]): { [key: string]: string[] } {
  const result: { [key: string]: string[] } = {};

  data.forEach(app => {
    const dateObj = new Date(app.appointmentDate);
    const day = dateObj.toISOString().split('T')[0]; 
    const time = dateObj.toTimeString().split(':').slice(0, 2).join(':'); 

    if (!result[day]) {
      result[day] = [];
    }

    result[day].push(time);
  });

  return result; 
}
  updateDate(date:string){
    this.selectDate=date;
    this.times = this.groupedAppointments[date];
    console.log(this.times);
    
  this.selectTime = ''; 
  }
  updateTime(time:string){
     this.selectTime=time
  }

  onSubmit(){
    if (this.appointmentForm.invalid) {
    this.appointmentForm.markAllAsTouched();
    return;
  }

  const temp=this.appointmentForm.value;
  const fullDateTime = `${temp.date}T${temp.time}:00`;
  console.log(this.appointment);
  
  console.log(fullDateTime);
  
  const found= this.appointment.find(app => app.appointmentDate==fullDateTime)
  if(found){
    const reservation1={
      name:temp.name ,
      phoneNumber: temp.phoneNumber,
      email: temp.email,
      appointmentId: found.id
    }
   this._AdvertisementService.AddReservarion(reservation1).subscribe({
    next:(res)=>{
     this.ShowReservation = false
      setTimeout(() => {
        this.toastr.success(res.message)
      }, 1000);
    },error:(err)=>{
      this.ShowReservation = false
      setTimeout(() => {
        this.toastr.error(err.message)
      }, 1000);
    }
   });
    
  }
  else{
    console.log('Not found');
    
  }
  }
}
