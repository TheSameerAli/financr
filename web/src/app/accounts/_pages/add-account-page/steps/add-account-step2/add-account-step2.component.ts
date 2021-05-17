import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-account-step2',
  templateUrl: './add-account-step2.component.html',
  styleUrls: ['./add-account-step2.component.scss']
})
export class AddAccountStep2Component implements OnInit {
  @Output('previous') previous = new EventEmitter();
  @Output('next') next = new EventEmitter();

  accountForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.minLength(2)]],
      initialBalance: ['', [Validators.required, Validators.pattern('^[0-9.]*$')]]
    });
  }

  get accountName() {
    return this.accountForm.get('accountName');
  }

  get initialBalance() {
    return this.accountForm.get('initialBalance');
  }

  previousSelection() {
    this.previous.emit();
  }

  nextSelection() {
    if (this.accountForm.valid) {
      this.next.emit({'name': this.accountForm.get('accountName').value, 'balance': this.accountForm.get('initialBalance').value});

    }
  }



}
