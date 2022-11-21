package com.fado.watch.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FilterPromotional {

    private LocalDate startDate;
    private LocalDate endDate;
    private Integer status;
    private boolean type;

}
