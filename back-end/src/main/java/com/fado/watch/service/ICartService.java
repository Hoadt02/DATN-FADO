package com.fado.watch.service;

import com.fado.watch.entity.Cart;

import java.util.List;

public interface ICartService {

    Cart addToCart(Cart cart);

    List<Cart> findAllByCustomerId(Integer id);

    void delete(Integer id);

    void deleteAll(List<Integer> idList);


}
