package com.fado.watch.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FilterOrder {

    private LocalDate startDate;
    private LocalDate endDate;
    private Integer customerId;

}
