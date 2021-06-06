import { getUserPreferences } from './../../../shared/store/shared.selector';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserPreferences } from 'src/app/settings/_models/user-preferences';

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

  public userPreferences: Observable<UserPreferences>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userPreferences = this.store.select(getUserPreferences);
  }

}
