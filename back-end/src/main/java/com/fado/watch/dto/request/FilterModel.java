package com.fado.watch.dto.request;

import lombok.Data;

@Data
public class FilterModel {
    private Integer[] category_id;
    private Integer[] brand_id;
    private Integer[] material_id;
    private Integer[] origin_id;
    private Boolean[] gender;
    private Integer startPrice;
    private Integer endPrice;
}
