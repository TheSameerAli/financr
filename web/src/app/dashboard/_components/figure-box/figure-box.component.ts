import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-figure-box',
  templateUrl: './figure-box.component.html',
  styleUrls: ['./figure-box.component.scss']
})
export class FigureBoxComponent implements OnInit {
  @Input() figure: number;
  @Input() title: string;
  @Input() change: number;
  @Input() isLoading: boolean = false;
  @Input() descriptionColor: string;
  constructor() { }

  ngOnInit(): void {
  }

}
