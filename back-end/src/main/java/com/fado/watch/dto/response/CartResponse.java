package com.fado.watch.dto.response;

import lombok.Data;

import java.util.List;


//Thằng này để nhận list data để thêm vào orderdetails
@Data
public class CartResponse {
    private Integer orderId;
    private List<CartDto> cartList;
}
