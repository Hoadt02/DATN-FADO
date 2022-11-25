package com.fado.watch.dto.request;

import lombok.Data;

@Data
public class FilterAndPagingAndSortingModel {
    private Integer page;
    private Integer size;
    private Integer sort;
    private String search;
    private Integer[] category_id;
    private Integer[] brand_id;
    private Integer[] material_id;
    private Integer[] origin_id;
    private Boolean[] gender;
    private Integer startPrice;
    private Integer endPrice;
}
