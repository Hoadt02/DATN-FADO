package com.fado.watch.dto.response;

import com.fado.watch.entity.Cart;
import lombok.Data;

import java.util.List;

@Data
public class CartResponse {
    private Integer orderId;
    private List<Cart> cartList;
}
