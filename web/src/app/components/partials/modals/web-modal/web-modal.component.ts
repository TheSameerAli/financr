import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-modal',
  templateUrl: './web-modal.component.html',
  styleUrls: ['./web-modal.component.scss']
})
export class WebModalComponent implements OnInit {
  public createAccountModalOpen = false;
  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.createAccountModalOpen = false;
  }

  openModal() {
    this.createAccountModalOpen = true;
  }

}
