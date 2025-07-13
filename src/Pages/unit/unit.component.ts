import { log } from 'console';
import { Unit } from '../../Interface/unit';
import { Component, inject, input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unit',
  imports: [RouterLink],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
}) 
export class UnitComponent implements OnInit,OnDestroy {
  item=input<Unit>()
  currentImage: string = '';
  private imageIndex = 0;
  private imageInterval: any;
  images:string[]=[]
  showDeleteConfirm : boolean = false;
  private observer?: IntersectionObserver;

  constructor(private elRef: ElementRef) {}
  
  ngOnInit(): void {
    const unit = this.item();
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
  }

  onEdit(){
    console.log('edit');
    
  }
  
  onDeleteClick() {
  this.showDeleteConfirm = true;
  }

  onCancelDelete() {
  this.showDeleteConfirm = false;
  }

  onConfirmDelete() {
  const unit = this.item();
  console.log('Confirmed delete for:', unit);
  this.showDeleteConfirm = false;
  }


}
