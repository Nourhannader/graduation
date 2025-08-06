import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AdminService, Owners } from '../../Services/admin.service';

@Component({
  selector: 'app-owners',
  standalone:true,
    imports: [CommonModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss'
})
export class OwnersComponent implements OnInit{
allOwners!:Owners[]
oldOwnerId!:string
transfer:boolean=false
_adminService=inject(AdminService)

ngOnInit(): void {
    this.GetOwners()
}

GetOwners():void{
this._adminService.getAllOwners().subscribe({
 next:(data) => {
      this.allOwners=data
    },error:(err) =>{
      console.log(err);
    }
  })


}

openTransfer(oldOwner:string)
{
this.oldOwnerId=oldOwner
this.transfer=true
console.log(oldOwner)
}

}
