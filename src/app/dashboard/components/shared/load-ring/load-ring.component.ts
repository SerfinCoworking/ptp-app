import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-ring',
  templateUrl: './load-ring.component.html',
  styleUrls: ['./load-ring.component.sass']
})
export class LoadRingComponent implements OnInit {
  @Input() signedIn: string;
  @Input() signedOut: string;
  circunferenceIn: number = 0;
  circunferenceOut: number = 0;

  constructor() { }
  // obtener input con los valores del stroke ingreso / salida
  ngOnInit(): void {
  }

}
