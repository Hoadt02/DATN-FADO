package com.fado.watch.dto.request;

import lombok.Data;

@Data
public class FilterModel {
    private Integer product_id;
    private Integer brand_id;
    private Integer material_id;
    private Integer origin_id;
    private Integer waterproof_id;
    private Integer facediameter_id;
    private Integer batterypower_id;
    private Integer status;
    private Boolean gender;
}
