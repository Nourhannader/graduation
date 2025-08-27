import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminService, Renters } from '../../Services/admin.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-renters',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './renters.component.html',
  styleUrl: './renters.component.scss'
})
export class RentersComponent implements OnInit ,OnDestroy{
private subscriptions: Subscription[] = [];
allRenters!:Renters[]
searchTerm: string = '';

_adminService=inject(AdminService)

ngOnInit(): void {
    this.GetRenters()
}

GetRenters():void{
const sub=this._adminService.getAllRenters().subscribe({
 next:(data) => {
      this.allRenters=data.sort((a, b) => a.communityName.localeCompare(b.communityName));
    },error:(err) =>{
      console.log(err);
    }
  })
this.subscriptions.push(sub);

}

// searchByCommunity(): void {
//   const sub = this._adminService.searchRentersByCommunity(this.searchTerm).subscribe({
//     next: (data) => {
//       this.allRenters = data;
//     },
//     error: (err) => {
//       console.log(err);
//     }
//   });
//   this.subscriptions.push(sub); 
// }

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe())
  this.subscriptions=[]
} 




}