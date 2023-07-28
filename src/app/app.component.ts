import { Component, OnInit, ViewChild } from '@angular/core';
import { PhoneBookService } from './Services/phone-book.service';
import { PhoneBook } from './interfaces/phone-book';
import { TypeContactsService } from './Services/type-contacts.service';
import { TypeContact } from './interfaces/type-contact';
import { ModalAddComponent } from './Pages/modal-add/modal-add.component';
import { ModalServiceService } from './Services/modal-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public phoneBook: PhoneBook[] = []; 
  public contacType: TypeContact[] = [];
  public selectedContactTypeId: number | null = null;
  public modalSwich: boolean = false;

  @ViewChild(ModalAddComponent)
  private modalAddComponent!: ModalAddComponent;

  constructor(
    private phoneBookService: PhoneBookService,
    private contacTypeService: TypeContactsService,
    private modalService: ModalServiceService
    ) { } 
   
  ngOnInit(): void {
    this.phoneBookService.getList().subscribe(
      dataPhone => {
        this.phoneBook = dataPhone.filter(entry => entry.status !== false);
        console.log(this.phoneBook);
      },
      (error) => {
        console.log(error);
      }
    );
    this.contacTypeService.getList().subscribe(
      dataContacType => {
        this.contacType = dataContacType; 
        console.log(this.contacType);
      },
      (error) => {
        console.log(error);
      }
    );

    this.modalService.$modalEdit.subscribe((value)=>{this.modalSwich = value;});
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
          this.phoneBook = data.filter((entry: PhoneBook) => entry.contactType.id === this.selectedContactTypeId);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.phoneBookService.getList().subscribe(
        data => {
          this.phoneBook = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  editContact(user: PhoneBook): void {
    console.log('editContact');
    this.modalSwich = true;
  } 
}
