import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-account-step1',
  templateUrl: './add-account-step1.component.html',
  styleUrls: ['./add-account-step1.component.scss']
})
export class AddAccountStep1Component implements OnInit {
  @Output('selection') selection = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  select(type) {
    this.selection.emit(type);
  }

}
