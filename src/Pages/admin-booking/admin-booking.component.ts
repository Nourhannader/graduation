
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminService} from '../../Services/admin.service';
import { AllReser, MonthGroupAdmin, TransformedReservationAdmin } from '../../interfaces/all-reser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-booking',
  imports: [],
  templateUrl: './admin-booking.component.html',
  styleUrl: './admin-booking.component.scss'
})
export class AdminBookingComponent implements OnInit ,OnDestroy{
  private subscriptions: Subscription[] = [];
   AllReservation:AllReser[]=[]
   loading:boolean=false
   transformedReservations: TransformedReservationAdmin[] = [];
     groupedByMonth:MonthGroupAdmin[] = [];
     activeStatus: string = 'Cancelled';
   _AdminService=inject(AdminService)
   ngOnInit(): void {
     this.loading=true
     setTimeout(() => {
        this.getAllReservation(this.activeStatus)
     },1000)
     
     
   }
   getAllReservation(status:string){
    this.activeStatus = status;
     const sub=this._AdminService.getALLREservation().subscribe({
      next:(data) => {
        this.AllReservation=data;
        console.log(data);
        
         this.AllReservation = data.filter(r =>
         r.status?.trim().toLowerCase() === this.activeStatus.trim().toLowerCase()
        );
        this.Transform();
        this.GroupedMonth();
        console.log(this.groupedByMonth);
        this.loading=false 
      },error:(err) =>{
        console.log(err);
        this.loading=false 
      }
     })
      this.subscriptions.push(sub);
   }
   Transform(){
     this.transformedReservations = this.AllReservation.map(r => {
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
      appointmentId: r.appointmentId,
      owner:r.owner
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
   ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
}
}
