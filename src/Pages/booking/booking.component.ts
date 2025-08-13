import { ReservationService } from './../../Services/reservation.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AllReservation } from '../../interfaces/all-reservation';
import { MonthGroup, TransformedReservation } from '../../interfaces/transformed-reservation';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit ,OnDestroy {
  private subscription: Subscription[] = [];
  reservations:AllReservation[]=[]
  loading:boolean=false
  transformedReservations: TransformedReservation[] = [];
  groupedByMonth:MonthGroup[] = [];
  activeStatus: string = 'Pending';

  _ReservationService=inject(ReservationService);

  ngOnInit() {
    this.loading=true
    setTimeout(() => {
      this.getAllReservation('Pending');
    }, 1000);
     
  
   };

  getAllReservation(status: string ) {
    this.activeStatus = status;
     const sub= this._ReservationService.AllReservation().subscribe({

      next:(data) =>{
        const today = new Date();
        this.reservations=data
        this.reservations = data.filter(r =>{
          const statusMatch = r.status?.trim().toLowerCase() === status.trim().toLowerCase();
          if (status.toLowerCase() === 'pending' || status.toLowerCase() === 'confirmed') {
             const publishDate = new Date(r.reservationDate);
            //  return statusMatch && publishDate >= today;
          }

        return statusMatch;
      });
        this.Transform();
        this.GroupedMonth();
      
        this.loading=false
      },error:(err)=>{
        console.log(err);
        this.loading=false
      }
    })
    this.subscription.push(sub);
    
  }

   Transform(){
     this.transformedReservations = this.reservations.map(r => {
    const date = new Date(r.reservationDate);

    return {
      id: r.id,
      status: r.status,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      daynumber: date.getDate(),
      hour: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      location: r.location,
      name: r.name,
      phoneNumber: r.phoneNumber,
      email: r.email,
      appointmentId: r.appointmentId
    };
  });
   }

   GroupedMonth(){
    this.groupedByMonth=[]
    this.transformedReservations.forEach(res => {
    let group = this.groupedByMonth.find(g => g.month === res.month);
    if (!group) {
      group = { month: res.month, reservations: [] };
      this.groupedByMonth.push(group);
    }
    group.reservations.push(res);
  });
  
   }
   onActionChange(event: Event,id:number) {
  const value = (event.target as HTMLSelectElement).value;
  if (value === 'Edit') {
    return; 
  }
  const sub=this._ReservationService.EditReservation(value,id).subscribe({
    next:(res)=>{
      console.log(`result${res.message}`);
      this.getAllReservation(value)
      
    },error:(err) => {
      console.log(`result${err.message}`);
      
    }
  })
  this.subscription.push(sub);
  }
  ngOnDestroy(): void {
  this.subscription.forEach(sub => sub.unsubscribe());
  this.subscription=[]
}
}

