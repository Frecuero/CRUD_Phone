import { Injectable } from '@angular/core';
import { PhoneBook } from '../interfaces/phone-book';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor() { }
  modalShow$ = new Subject<EmitEventBtn>();
  modalShowDelete$ = new Subject<EmitEventBtn>();

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  setError(message: string) {
    this.errorMessageSubject.next(message);
  }
}

export interface EmitEventBtn {
  isEdit?: boolean;
  phoneBook?: PhoneBook;
}