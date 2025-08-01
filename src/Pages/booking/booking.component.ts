import { ReservationService } from './../../Services/reservation.service';
import { Component, inject, OnInit } from '@angular/core';
import { AllReservation } from '../../interfaces/all-reservation';
import { MonthGroup, TransformedReservation } from '../../interfaces/transformed-reservation';
import { CommonModule } from '@angular/common';


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
     this.getAllReservation('Pending');
  
   };

  getAllReservation(status: string ) {
  this.loading = true;
    
    setTimeout(()=>{
      this._ReservationService.AllReservation().subscribe({

      next:(data) =>{
        this.reservations=data
        this.reservations = this.reservations.filter(r => r.Status === status);
        this.Transform();
        this.GroupedMonth();
        this.loading=false
      },error:(err)=>{
        console.log(err);
        this.loading=false
      }
    })
    },2000)
    
  }

   Transform(){
     this.transformedReservations = this.reservations.map(r => {
    const date = new Date(r.reservationDate);

    return {
      id: r.id,
      Status: r.Status,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      daynumber: date.getDate(),
      hour: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      Location: r.Location,
      name: r.name,
      phoneNumber: r.phoneNumber,
      Email: r.Email,
      AppointmentId: r.AppointmentId
    };
  });
   }

   GroupedMonth(){
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

