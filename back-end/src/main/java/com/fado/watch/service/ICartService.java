package com.fado.watch.service;

import com.fado.watch.dto.response.CartDto;
import com.fado.watch.entity.Cart;

import java.util.List;

public interface ICartService {

    Cart addToCart(Cart cart);

    Cart updateQuantity(Cart cart);

    List<CartDto> findAllByCustomerId(Integer id);

    void delete(Integer id);

    void deleteAllByCustomerId(Integer id);

}
