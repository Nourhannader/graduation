import { ReservationService } from './../../Services/reservation.service';
import { Component, inject, OnInit } from '@angular/core';
import { AllReservation } from '../../interfaces/all-reservation';
import { MonthGroup, TransformedReservation } from '../../interfaces/transformed-reservation';
import { CommonModule } from '@angular/common';
import { log } from 'console';


@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  reservations:AllReservation[]=[]
  loading:boolean=false
  transformedReservations: TransformedReservation[] = [];
  groupedByMonth:MonthGroup[] = [];

  _ReservationService=inject(ReservationService);

  ngOnInit() {
    this.loading=true
    setTimeout(() => {
      this.getAllReservation('Pending');
    }, 1000);
     
  
   };

  getAllReservation(Status: string ) {
      this._ReservationService.AllReservation().subscribe({

      next:(data) =>{
        this.reservations=data
        this.reservations = data.filter(r =>
         r.status?.trim().toLowerCase() === Status.trim().toLowerCase()
        );
        console.log(this.reservations);
        
        this.Transform();
        this.GroupedMonth();
      console.log(this.groupedByMonth);
      
        this.loading=false
      },error:(err)=>{
        console.log(err);
        this.loading=false
      }
    })
    
    
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
  this._ReservationService.EditReservation(value,id).subscribe({
    next:(res)=>{
      console.log(res.message);
      
    },error:(err) => {
      console.log(err.message);
      
    }
  })

  }
}

