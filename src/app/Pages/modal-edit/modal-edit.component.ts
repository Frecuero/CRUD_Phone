import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from 'src/app/Services/modal-service.service';
import { TypeContactsService } from 'src/app/Services/type-contacts.service';
import { TypeContact } from 'src/app/interfaces/type-contact';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {
  public contacType: TypeContact[] = [];
  public selectGender: string[] = ['Other','Female','Male'];
  
  constructor(private modalService: ModalServiceService,private contacTypeService: TypeContactsService,) { }
  ngOnInit(): void {
    this.contacTypeService.getList().subscribe(
      dataContacType => {
        this.contacType = dataContacType; 
        console.log(this.contacType);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeModal(): void {
    this.modalService.$modalEdit.emit(false);
  } 

}
