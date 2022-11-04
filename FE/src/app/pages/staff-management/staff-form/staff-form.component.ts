import {Component, Inject, OnInit} from "@angular/core";
import {StaffService} from "../../../shared/services/api-service-impl/staff.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {Constants} from "../../../shared/Constants";
import {checkSpace} from "../../../shared/validator/validatorForm";
import {Regex} from "../../../shared/validator/regex";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-staff-form",
  templateUrl: "./staff-form.component.html",
  styleUrls: ["./staff-form.component.scss"],
})
export class StaffFormComponent implements OnInit {

  isLoading = false;
  title: String;
  hide = true;
  hidePassword = true;

  formGroup = this.fb.group({
    id: [""],
    firstname: ["", [checkSpace, Validators.pattern(Regex.name)]],
    lastname: ["", [checkSpace, Validators.pattern(Regex.name)]],
    dateOfBirth: [new Date(), Validators.required],
    image: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png",
    ],
    username: ["", [
      Validators.required,
      Validators.pattern(Regex.username),
      Validators.minLength(8),
      Validators.maxLength(24)]],
    password: [
      "", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
        // Validators.pattern(Regex.password),
      ],
    ],
    email: ["", [Validators.required, Validators.pattern(Regex.email)]],
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern(Regex.phoneNumber)],
    ],
    gender: [1],
    address: ["", checkSpace],
    status: [1],
    role: this.fb.group({
      id: [4],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<StaffFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any
  ) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = "Thêm mới nhân viên";
    } else {
      // console.log('ta đã ở đây')
      this.title = "Chỉnh sửa nhân viên";
      this.hidePassword = false;
      if (this.dataDiaLog.row) {
        this.formGroup.patchValue(this.dataDiaLog.row);
      }
    }
  }

  save() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.staffService.create(this.formGroup.getRawValue()).subscribe({
        next: (_: any) => {
          this.toastrService.success('Thêm nhân viên thành công!');
          this.isLoading = false;
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        }, error: err => {
          console.log(err);
          if (err.error.code == 'UNIQUE') {
            this.toastrService.warning(err.error.message);
            this.isLoading = false;
            return;
          }
          this.toastrService.error('Thêm nhân viên thất bại!');
          this.isLoading = false;
        }
      });
    } else {
      this.staffService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue()).subscribe({
        next: (_: any) => {
          this.toastrService.success('Sửa nhân viên thành công!');
          this.isLoading = false;
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        }, error: err => {
          console.log(err);
          if (err.error.code == 'UNIQUE') {
            this.toastrService.warning(err.error.message);
            this.isLoading = false;
            return;
          }
          this.toastrService.error('Sửa nhân viên thất bại!');
          this.isLoading = false;
        }
      });
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
