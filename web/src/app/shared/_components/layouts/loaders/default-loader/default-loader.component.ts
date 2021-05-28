import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-loader',
  templateUrl: './default-loader.component.html',
  styleUrls: ['./default-loader.component.scss']
})
export class DefaultLoaderComponent implements OnInit {
  @Input('width') width: number = 100;
  @Input('height') height: number = 100;
  constructor() { }

  ngOnInit(): void {
  }

}
