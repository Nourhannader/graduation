import { Component, inject, OnInit } from '@angular/core';
import { AdminService, Renters } from '../../Services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-renters',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './renters.component.html',
  styleUrl: './renters.component.scss'
})
export class RentersComponent implements OnInit{

allRenters!:Renters[]

_adminService=inject(AdminService)

ngOnInit(): void {
    this.GetRenters()
}

GetRenters():void{
this._adminService.getAllRenters().subscribe({
 next:(data) => {
      this.allRenters=data
    },error:(err) =>{
      console.log(err);
    }
  })


}


}
