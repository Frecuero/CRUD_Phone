import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TypeContact } from '../interfaces/type-contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeContactsService {

  private url:string = environment.endPoint;
  private apiURL:string = this.url + 'interfaceTypeContacts';

  constructor(private http: HttpClient) { }

  getList(): Observable<TypeContact[]> {
    return this.http.get<TypeContact[]>(this.apiURL);
  }
}
