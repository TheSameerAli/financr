import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-account-step2',
  templateUrl: './add-account-step2.component.html',
  styleUrls: ['./add-account-step2.component.scss']
})
export class AddAccountStep2Component implements OnInit {
  @Output('previous') previous = new EventEmitter();
  @Output('next') next = new EventEmitter();
  public accountName: string = '';
  public initialBalance: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  previousSelection() {
    this.previous.emit();
  }

  nextSelection() {
    this.next.emit({'name': this.accountName, 'balance': this.initialBalance});
  }



}
