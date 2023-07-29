import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PhoneBook } from '../interfaces/phone-book';

@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {
  
  private url:string = environment.endPoint;
  private apiURL:string = this.url + 'phoneBook';

  constructor(private http: HttpClient) { }

  getList(): Observable<PhoneBook[]> {
    return this.http.get<PhoneBook[]>(this.apiURL);
  }

  add(phoneBook: PhoneBook): Observable<PhoneBook> {
    return this.http.post<PhoneBook>(this.apiURL, phoneBook);
  }

  update(phoneBook: PhoneBook): Observable<PhoneBook> {
    return this.http.put<PhoneBook>(`${this.apiURL}/${phoneBook.id}`, phoneBook);
  }

  delete(phoneBook: PhoneBook): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${phoneBook.id}`);
  }
}
