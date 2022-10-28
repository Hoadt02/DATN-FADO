package com.fado.watch.service;

import com.fado.watch.dto.response.CartResponse;
import com.fado.watch.entity.Order;

import java.util.List;

public interface IOrderDetailService {

    void save(CartResponse response);

}
