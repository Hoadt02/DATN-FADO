package com.fado.watch.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class CartResponse {
    private Integer orderId;
    private List<CartDto> cartList;
}
