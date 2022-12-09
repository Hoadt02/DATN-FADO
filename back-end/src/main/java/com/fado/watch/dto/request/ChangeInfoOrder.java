package com.fado.watch.dto.request;

import lombok.Data;

@Data
public class ChangeInfoOrder {
    private Integer id;
    private String shipAddress;
    private String fullname;
    private String phoneNumber;
    private Integer feeShipping;
    private Integer totalPayment;
}
