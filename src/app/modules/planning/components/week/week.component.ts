import { Component, Input } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass']
})
export class WeekComponent {


  @Input() week: Array<any>;
  

  constructor(private dialog: MatDialog) {}


}
