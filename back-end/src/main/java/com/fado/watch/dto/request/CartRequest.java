package com.fado.watch.dto.request;

import com.fado.watch.dto.response.CartPriceResponse;
import lombok.Data;

import java.util.List;


//Thằng này để nhận list data để thêm vào orderdetails
@Data
public class CartRequest {
    private Integer orderId;
    private List<CartPriceResponse> cartList;
}
