import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { IEmployeeShort } from '@shared/models/employee';
import { ImageService } from '@shared/services/image.service';

@Component({
  selector: 'app-employee-indicator',
  templateUrl: './employee-indicator.component.html',
  styleUrls: ['./employee-indicator.component.sass']
})
export class EmployeeIndicatorComponent implements OnInit {

  @Input() employee: IEmployeeShort;
  
  showInitials: boolean = false;

  constructor(private el: ElementRef, private imageService: ImageService) {
    imageService.imageLoading(el.nativeElement);
  }

  // @HostListener('load')
  // onLoad() {
  //   this.imageService.imageLoadedOrError(this.el.nativeElement);
  //   this.showInitials = false;
  // }
  
  @HostListener('error')
  onError() {
    this.imageService.imageLoadedOrError(this.el.nativeElement);
    this.showInitials = !this.showInitials;
  }

  ngOnInit(): void {
  }


}
