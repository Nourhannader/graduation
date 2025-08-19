
import { AdvertisementService } from './../../Services/advertisement.service';
import { Component, inject, Input, OnInit, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Unit } from '../../interfaces/unit';
import { UnitsService } from '../../Services/units.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unit',
  imports: [RouterLink],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
}) 
export class UnitComponent implements OnInit,OnDestroy {
  @Input() item!: Unit;

  @Output() delete = new EventEmitter<number>();
  @Output() addAds = new EventEmitter<number>();
  private subscriptions: Subscription[] = [];
  currentImage: string = '';
  private imageIndex = 0;
  private imageInterval: any;
  images:string[]=[]
  showDeleteConfirm : boolean = false;
  private observer?: IntersectionObserver;


  _unitsService = inject(UnitsService);
  _AdvertisementService = inject(AdvertisementService)
  _router = inject(Router);

  constructor(private elRef: ElementRef,private toastr:ToastrService) {}
  
  ngOnInit(): void {
    const unit = this.item;
    
    if(!unit) return;

    this.images = unit
      ? [unit.image1, unit.image2, unit.image3].filter(img => !!img) as string[]
      : [];

    if (this.images.length > 0) {
      this.currentImage = this.images[0];
      const delay = 1000 + Math.random() * 3000;
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.slideShow();
          this.observer?.disconnect(); 
        }
      });

      this.observer.observe(this.elRef.nativeElement);
    }
  }

  slideShow(){
       this.imageInterval = setInterval(() => {
       this.imageIndex = (this.imageIndex + 1) % this.images.length;
       this.currentImage = this.images[this.imageIndex];
      }, 2000);
  }
  ngOnDestroy(): void {
    if(this.imageInterval){
      clearInterval(this.imageInterval);
    }
     this.observer?.disconnect();
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  onEdit(){
    console.log('edit');
    
    this._router.navigate([`/ownerHome/editUnit/${this.item.id}`]) 
  }
  
  onDeleteClick() {
  this.showDeleteConfirm = true;
  }

  onCancelDelete() {
  this.showDeleteConfirm = false;
  }

  onConfirmDelete() {
  const unit = this.item;

  //call api
  if (unit) {
    this.delete.emit(unit.id);
    
  }
  this.showDeleteConfirm = false;
  }

  onAddAds(){
    const unit=this.item
    if(!unit) return;
    this.addAds.emit(unit.id);

  }
  

}
