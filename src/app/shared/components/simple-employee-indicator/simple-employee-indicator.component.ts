import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { IEmployee } from '@shared/models/employee';
import { ImageService } from '@shared/services/image.service';

@Component({
  selector: 'app-simple-employee-indicator',
  templateUrl: './simple-employee-indicator.component.html',
  styleUrls: ['./simple-employee-indicator.component.sass']
})
export class SimpleEmployeeIndicatorComponent {

  @Input() employee: IEmployee;
  
  showInitials: boolean = false;

  constructor(private el: ElementRef, private imageService: ImageService) {
    imageService.imageLoading(el.nativeElement);
  }
  
  @HostListener('error')
  onError() {
    this.imageService.imageLoadedOrError(this.el.nativeElement);
    this.showInitials = !this.showInitials;
  }
}
