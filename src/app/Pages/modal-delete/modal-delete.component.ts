import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { ModalServiceService, EmitEventBtn } from 'src/app/Services/modal-service.service';
import { PhoneBookService } from 'src/app/Services/phone-book.service';
import { PhoneBook } from 'src/app/interfaces/phone-book';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit, OnDestroy {
  public userDelete$: Observable<PhoneBook>;
  private suscriptionsList: Subscription[] = [];
  public id: number;
  public name: string;
  public phoneNumber: string;
  public contactTypeId: number;
  public comments: string;
  public gender: string;
  public email: string;
  public status: boolean;
  public isEdit: boolean = false;
  public message: string = '';
  
  constructor(
    private modalService: ModalServiceService,
    private phoneBookService: PhoneBookService,
  ) { 
    this.initSusbcriptions();
  }

  ngOnInit(): void {
    this.userDelete$ = this.modalService.modalShowDelete$.pipe(
      map((res: EmitEventBtn) => {
        if (res) {
          return  res.phoneBook;
        }
        return null;
      })
    );
  }

  initSusbcriptions(): void {
    this.suscriptionsList.push(
      this.modalService.modalShowDelete$.subscribe((res: EmitEventBtn) => {
        this.id = res.phoneBook.id;
        this.name = res.phoneBook.name;
        this.phoneNumber = res.phoneBook.phoneNumber.toString();
        this.contactTypeId = res.phoneBook.contactTypeId;
        this.comments = res.phoneBook.comments;
        this.gender = res.phoneBook.gender;
        this.email = res.phoneBook.email;
        this.status = res.phoneBook.status;
        this.isEdit = true;
      })
    );
  }

  deleteUser(): void {
    this.message='';
    if (this.id){
      const updatedUser: PhoneBook = {
        id: this.id,
        name: this.name,
        phoneNumber: this.phoneNumber.toString(),
        contactTypeId: this.contactTypeId,
        comments: this.comments,
        gender: this.gender,
        email: this.email,
        status: false,
      };
      this.phoneBookService.delete(updatedUser).subscribe({
        next: (dataContacType) => {
         this.message = 'Contact deleted successfully';          
      },
      error: (error) => {
        console.log(error);
        }}
      );
      setTimeout(() => {
        this.message='';
      }, 5000);
    }
  }
  ngOnDestroy(): void {
    this.suscriptionsList.forEach(subscription => subscription.unsubscribe());
  }

}
