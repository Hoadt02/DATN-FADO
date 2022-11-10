import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../shared/services/api-service-impl/staff.service";
import {FormBuilder, Validators} from "@angular/forms";
import {StorageService} from "../../shared/services/jwt/storage.service";
import {checkSpace} from "../../shared/validator/validatorForm";
import {Regex} from "../../shared/validator/regex";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";
import {UploadImageToHostService} from "../../shared/services/api-service-impl/upload-image-to-host.service";

@Component({
  selector: 'app-change-info-login',
  templateUrl: './change-info-login.component.html',
  styleUrls: ['./change-info-login.component.scss']
})
export class ChangeInfoLoginComponent implements OnInit {
  isLoading = false

  formGroup = this.fb.group({
    id: [""],
    firstname: ["", [checkSpace, Validators.pattern(Regex.name)]],
    lastname: ["", [checkSpace, Validators.pattern(Regex.name)]],
    dateOfBirth: ["", Validators.required],
    image: [""],
    username: [""],
    password: [""],
    email: ["", [Validators.required, Validators.pattern(Regex.email)]],
    phoneNumber: ["", [Validators.required, Validators.pattern(Regex.phoneNumber)]],
    gender: [1],
    address: ["", checkSpace],
    status: [1],
    role: this.fb.group({
      id: [4],
    }),
  });

  hide = true;
  file: File;
  avatar: any;
  avatarFormDb: any;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private uploadImageToHostService: UploadImageToHostService,
    private apiStaff: StaffService,
    private toastrService: ToastrService,
    private matDiaLogRef: MatDialogRef<ChangeInfoLoginComponent>
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiStaff.findById(this.storageService.getIdFromToken()).subscribe({
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
      this.toastrService.warning("Vui lòng nhập đúng dữ liệu!");
      return;
    }

    this.isLoading = true;
    if (this.avatar != null) {
      this.formGroup.patchValue({image: this.avatar[0]});
    } else {
      this.formGroup.patchValue({image: this.avatarFormDb});
    }
    console.log(this.formGroup.getRawValue());
    this.apiStaff.update(this.formGroup.value.id, this.formGroup.getRawValue()).subscribe({
      next: (data: any) => {
        this.toastrService.success("Cập nhật thành công!");
        this.isLoading = false;
      }, error: (err: any) => {
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          this.isLoading = false;
          return;
        }
        this.toastrService.error('Sửa nhân viên thất bại!');
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
