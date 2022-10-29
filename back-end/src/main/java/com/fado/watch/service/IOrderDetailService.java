package com.fado.watch.service;

import com.fado.watch.dto.response.CartResponse;
import com.fado.watch.entity.Order;
import com.fado.watch.entity.OrderDetail;

import java.util.List;

public interface IOrderDetailService {

    List<OrderDetail> getAllOrderDetailInOrder(Integer id);

    void save(CartResponse response);

}
