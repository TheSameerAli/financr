import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private title: EventEmitter<string> = new EventEmitter();
  constructor() { }

  public getTitle() {
    return this.title;
  }

  public setTitle(title: string) {
    return this.title.emit(`${title} | Financr`);
  }
}
