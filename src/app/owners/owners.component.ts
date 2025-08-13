import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminService, Owners, Transfer } from '../../Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owners',
  standalone:true,
    imports: [CommonModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss'
})
export class OwnersComponent implements OnInit ,OnDestroy{
allOwners!:Owners[]
transfer:boolean=false
transferDTO:Transfer={
  oldOwnerId:'',
  newOwnerId:''
}
private subscriptions: Subscription[] = [];
  TransferForm: FormGroup = new FormGroup({
    newOwnerId: new FormControl(null, [Validators.required]),  
  });

_adminService=inject(AdminService)
toastr=inject(ToastrService)

ngOnInit(): void {
    this.GetOwners()
}

GetOwners():void{
const sub=this._adminService.getAllOwners().subscribe({
 next:(data) => {
      this.allOwners=data
    },error:(err) =>{
      console.log(err);
    }
  })
this.subscriptions.push(sub);

}

openTransfer(oldOwner:string)
{
this.transferDTO.oldOwnerId=oldOwner
this.transfer=true
console.log(this.transferDTO.oldOwnerId)
}

TransferFn(newId:string){

this.transferDTO.newOwnerId=newId
console.log(this.transferDTO.newOwnerId)
}

cancelTransfer():void{
  this.transfer=false
}

confirmTransfer():void
{
  if(this.transferDTO.oldOwnerId==null || this.transferDTO.newOwnerId=='' || this.transferDTO.newOwnerId==undefined|| this.transferDTO.newOwnerId=="0")
  {
    this.toastr.error("You didn't choose any owner.")
  }

  else{
  const sub=this._adminService.TransferTo(this.transferDTO).subscribe({
  next:(res) => {
      console.log(res)
      this.transfer=false
      this.toastr.success("Transfered Successfully.")
      this.GetOwners()
    },error:(err) =>{
      console.log(err);
          this.toastr.error("Faild to Transfer.")
    }
  })
  this.subscriptions.push(sub);
  }
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
}
}


