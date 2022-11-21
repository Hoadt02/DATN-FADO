import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {ApiPromotionalService} from "../api-services/api-promotional.service";
import {formatDate} from "../../format/formatData";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class PromotionalService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiPromotional: ApiPromotionalService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiPromotional.getAll();
  }

  findAllByStatusTrue() {
    return this.apiPromotional.findAllByStatusTrue();
  }

  findById(id: number) {
    return this.apiPromotional.getById(id).subscribe({
      next: (data: any) => {
        console.log(data);
      }, error: err => {
        if (err.error.code == 'NOT_FOUND') {
          this.toastrService.warning(err.error.message);
        }
        console.log(err);
      }
    })
  }

  dataInput(data: any) {
    data.name = data.name.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.description = data.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    if (formatDate(data.startDate) > formatDate(new Date())) {
      data.status = 2;
    } else if (formatDate(data.endDate) < formatDate(new Date())) {
      data.status = 0;
    } else {
      data.status = 1;
    }
  }

  dataInputUpdate(data: any) {
    data.name = data.name.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.description = data.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    if (formatDate(data.startDate) > formatDate(new Date())) {
      data.status = 2;
    } else if (formatDate(data.endDate) < formatDate(new Date())) {
      data.status = 0;
    } else if (formatDate(data.endDate) > formatDate(new Date())) {
      data.status = 1;
    }

  }

  dataInputUpdateStatus(data: any) {
    if (formatDate(data.startDate) > formatDate(new Date()) && data.status == 1) {
      data.status = 2;
    }
  }

  dataInputUpdateCheckIn(data: any) {
    data.name = data.name.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.description = data.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    if (formatDate(data.endDate) < formatDate(new Date()) && data.status == 1) {
      data.status = 0;
    } else if (formatDate(data.startDate) <= formatDate(new Date()) && data.status == 2) {
      data.status = 1;
    }
  }

  create(data: any) {
    this.dataInput(data);
    return this.apiPromotional.create(data);
  }

  update(id: number, data: any) {
    this.dataInputUpdate(data);
    return this.apiPromotional.update(id, data);
  }

  updateStatus(id: number, data: any) {
    this.dataInputUpdateStatus(data);
    return this.apiPromotional.update(id, data);
  }

  updateCheckIn(id: number, data: any) {
    this.dataInputUpdateCheckIn(data);
    return this.apiPromotional.update(id, data);
  }

  dataFilter(data: any) {
    if (null != data.startDate) {
      data.startDate = formatDate(data.startDate);
    }
    if (null != data.endDate) {
      data.endDate = formatDate(data.endDate);
    }
  }

  filterAll(data: any) {
    this.dataFilter(data)
    return this.apiPromotional.filterAll(data);
  }
}
