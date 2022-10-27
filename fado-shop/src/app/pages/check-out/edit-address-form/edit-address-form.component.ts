import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edit-address-form',
  templateUrl: './edit-address-form.component.html',
  styleUrls: ['./edit-address-form.component.css']
})
export class EditAddressFormComponent implements OnInit {

  formGroup = this.fb.group({
    id: [],
    customer: this.fb.group({
      id: []
    }),
    province: [],
    district: [],
    commune: [],
    other: [],
  })

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

}
