import {Component, OnInit} from "@angular/core";
import {checkSpace} from "../../shared/validator/validate";
import {FormBuilder, Validators} from "@angular/forms";
import {Regex} from "../../shared/validator/regex";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {UploadImageToHostService} from "../../shared/service/api-service-impl/upload-image-to-host.service";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.css']
})
export class InfoCustomerComponent implements OnInit {
  isLoading = false

  formGroup = this.fb.group({
    id: [''],
    firstname: ['', [checkSpace, Validators.pattern(Regex.name)]],
    lastname: ['', [checkSpace,  Validators.pattern(Regex.name)]],
    dateOfBirth: [new Date(), Validators.required],
    image: [''],
    username: [''],
    password: [''],
    email: ['', [Validators.required, Validators.pattern(Regex.email)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(Regex.phoneNumber)]],
    gender: [1],
    // address: ['', checkSpace],
    status: [1],
    role: this.fb.group({
      id: [4]
    }),
  })

  hide = true;
  file!: File;
  avatar: any;
  avatarFormDb: any;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private uploadImageToHostService: UploadImageToHostService,
    private apiCustomer: CustomerService,
    private toastrService: ToastrService,
    private matDiaLogRef: MatDialogRef<InfoCustomerComponent>
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiCustomer.findById(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.formGroup.patchValue(data);
        this.avatarFormDb = data.image;
        console.log('avatar find id: ', this.avatarFormDb);
        console.log(data);
        this.isLoading = false;
      }, error: err => {
        if (err.error.code == 'NOT_FOUND') {
          this.toastrService.warning(err.error.message);
          this.isLoading = false;
        }
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.toastrService.warning('Vui lòng nhập đúng dữ liệu!');
      return;
    }

    this.isLoading = true;
    if (this.avatar != null) {
      this.formGroup.patchValue({image: this.avatar[0]});
    } else {
      this.formGroup.patchValue({image: this.avatarFormDb});
    }
    console.log(this.formGroup.getRawValue());
    this.apiCustomer.updateData(this.formGroup.value.id as any, this.formGroup.getRawValue()).subscribe({
      next: (data: any) => {
        this.toastrService.success('Cập nhật thành công!');
        this.isLoading = false;
        this.matDiaLogRef.close();
      }, error: (err: any) => {
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          this.isLoading = false;
          return;
        }
        this.toastrService.error('Sửa khách hàng thất bại!');
        this.isLoading = false;
      }
    })
  }


  close() {
    this.matDiaLogRef.close();
  }

  onChangeThumbnail(event: any) {
    this.isLoading = true;
    this.file = event.target.files;
    const formData = new FormData();
    // @ts-ignore
    formData.append('files', this.file[0]);
    return this.uploadImageToHostService.uploadImageToHost(formData)
      .toPromise().then(res => {
        console.log(res)
        this.avatar = res;
        this.isLoading = false;
      }).catch(err => {
        console.log(err)
        this.isLoading = false;
      })
  }
}
