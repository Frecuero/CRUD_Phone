import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { EmitEventBtn, ModalServiceService } from 'src/app/Services/modal-service.service';
import { PhoneBookService } from 'src/app/Services/phone-book.service';
import { TypeContactsService } from 'src/app/Services/type-contacts.service';
import { PhoneBook } from 'src/app/interfaces/phone-book';
import { TypeContact } from 'src/app/interfaces/type-contact';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit, OnDestroy {
  public contacType: TypeContact[] = [];
  public selectGender: string[] = ['Other','Female','Male'];
  public userEdit$: Observable<PhoneBook>;
  public isEdit: boolean = false;
  private suscriptionsList: Subscription[] = [];
  private errorMessage: Subscription;
  public error = '';

  public id: number;
  public name: string;
  public phoneNumber: string;
  public contactTypeId: number;
  public comments: string;
  public gender: string;
  public email: string;
  public status: boolean;
  
  constructor(
    private modalService: ModalServiceService,
    private contacTypeService: TypeContactsService,
    private phoneBookService: PhoneBookService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.initSusbcriptions();
   }
 
  ngOnInit(): void {
    this, this.suscriptionsList.push(
      this.contacTypeService.getList().subscribe({
          next: (dataContacType) => {
          this.contacType = dataContacType; 
        },
        error: (error) => {
          console.log(error);
        }}
      ),
      this.errorMessage = this.modalService.errorMessage$.subscribe(
        (errorMessage: string) => {
          this.error = errorMessage;
          this.clearForm();
        }
      )
    );
    this.userEdit$ = this.modalService.modalShow$.pipe(
      map((res: EmitEventBtn) => {
        if (res) {
          return res.isEdit ? res.phoneBook : null;
        }
        return null;
      })
    );
    this.changeDetectorRef.markForCheck();
  }
  
  initSusbcriptions(): void {
    this.suscriptionsList.push(
      this.modalService.modalShow$.subscribe((res: EmitEventBtn) => {
        if (res) {
          if (res.isEdit) {
            this.id = res.phoneBook.id;
            this.name = res.phoneBook.name;
            this.phoneNumber = res.phoneBook.phoneNumber.toString();
            this.contactTypeId = res.phoneBook.contactTypeId;
            this.comments = res.phoneBook.comments;
            this.gender = res.phoneBook.gender;
            this.email = res.phoneBook.email;
            this.status = res.phoneBook.status;
            this.isEdit = true;
          } else {
            // reset al form.
            this.isEdit = false;
          }
        }
      })
    );
  }

  sendData(){
    this.error = '';
    if (!this.validateForm()) {
      const phoneBookData: PhoneBook = {
        name: this.name,
        phoneNumber: this.phoneNumber.toString(),
        contactTypeId: this.contactTypeId,
        comments: this.comments,
        gender: this.gender == undefined ? 'Other' : 'Other',
        status: true,
        email: this.email
      };
      this.phoneBookService.add(phoneBookData).subscribe({
        next: (dataContacType) => {
        this.clearForm();
      },
      error: (error) => {
        console.log(error);
        }}
      );
      this.error = '';
    }
  }

  validateForm(): boolean {
    if (!this.name || this.name.trim().length === 0) {
      this.error = 'Name is required'; 
    }else if (!this.phoneNumber || this.phoneNumber.length < 8) {
      this.error = 'Phone Number is required';
    }else if (!this.contactTypeId || this.contactTypeId === 0) {
      this.error = 'Contact Type is required';
    }else if (!this.comments || this.comments.trim().length < 4) {
      this.error = 'Comments is required and more than 4 characters';
    }else if (!this.email || this.email.trim().length === 0 || this.validateEmail(this.email)) {
      this.error = 'Email is required';
    }
    return this.error.length > 0 ? true : false;
  }
  
  clearForm(): void {
    this.name = null; 
    this.phoneNumber = null; 
    this.contactTypeId = null; 
    this.comments = null; 
    this.gender = null; 
    this.email = null; 
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? false : true;
  }

  updateData(){
    this.error = '';
    if (!this.validateForm()){
      const updatedUser: PhoneBook = {
        id: this.id,
        name: this.name,
        phoneNumber: this.phoneNumber.toString(),
        contactTypeId: this.contactTypeId,
        comments: this.comments,
        gender: this.gender,
        email: this.email,
        status: true,
      };
      this.phoneBookService.update(updatedUser).subscribe({
        next: (dataContacType) => {
        this.clearForm();
      },
      error: (error) => {
        console.log(error);
        }}
      );
      this.error = '';
    }
  }

  ngOnDestroy(): void {
    this.suscriptionsList.forEach(subscription => subscription.unsubscribe());
  }
}
