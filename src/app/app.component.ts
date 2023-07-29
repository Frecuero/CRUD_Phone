import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PhoneBookService } from './Services/phone-book.service';
import { PhoneBook } from './interfaces/phone-book';
import { TypeContactsService } from './Services/type-contacts.service';
import { TypeContact } from './interfaces/type-contact';
import { ModalServiceService } from './Services/modal-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public phoneBook: PhoneBook[] = []; 
  public contacType: TypeContact[] = [];
  public selectedContactTypeId: number | null = null;
  public showContent: boolean = false;
  private subscription: Subscription[] = [];
  
  public titleModal = '';

  constructor(
    private phoneBookService: PhoneBookService,
    private contacTypeService: TypeContactsService,
    private modalService: ModalServiceService
    ) { } 
  
   
  ngOnInit(): void {
    this, this.subscription.push(
    this.phoneBookService.getList().subscribe({ 
      next: (dataPhone) => {
        this.phoneBook = dataPhone.filter(entry => entry.status !== false);
      },
      error: (error) => {
        console.log(error);
      }}
    ),
    this.contacTypeService.getList().subscribe({
      next: (dataContacType) => {
        this.contacType = dataContacType; 
      },
      error: (error) => {
        console.log(error);
      }})
    );
  }

  onContactTypeSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedContactTypeId = +selectedValue;
    this.filterPhoneBookByContactType();
  }

  filterPhoneBookByContactType(): void {
    if (this.selectedContactTypeId) {
      this.phoneBookService.getList().subscribe(
        data => {
          this.phoneBook = data.filter((entry: PhoneBook) =>
          entry.contactType.id === this.selectedContactTypeId
          && entry.status === true
          );
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.phoneBookService.getList().subscribe(
        data => {
          this.phoneBook = data.filter((entry: PhoneBook) => entry.status === true
          );
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  openModal(item?: PhoneBook): void {
    this.modalService.setError('');
    this.showContent = true;
    let isEditV = false;
    let itemV = null;

    if (item) {
      isEditV = true;
      itemV = item
    }
    this.titleModal = isEditV ? 'Edit Contact' : 'Add Contact';

    this.modalService.modalShow$.next({
      isEdit: isEditV,
      phoneBook: itemV
    });
  }

  reloadTable(): void {
    this.phoneBookService.getList().subscribe({
      next: (dataPhone) => {
        this.phoneBook = dataPhone.filter(entry => entry.status !== false);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteModal(item: PhoneBook): void {
    this.showContent = false;
    this.titleModal = 'Delete Contact';
    console.log("click");
    this.modalService.modalShowDelete$.next({
      phoneBook: item
    });
  }

  ngOnDestroy(): void {
    if (this.subscription.length > 0){
      this.subscription.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }
}
