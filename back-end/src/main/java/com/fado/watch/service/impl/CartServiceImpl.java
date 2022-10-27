package com.fado.watch.service.impl;

import com.fado.watch.entity.Cart;
import com.fado.watch.repository.CartRepository;
import com.fado.watch.service.ICartService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements ICartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart addToCart(Cart cart) {
        Cart newCart = this.cartRepository.checkTrung(cart.getProductDetail().getId(), cart.getCustomer().getId());
        if (newCart == null) {
            newCart = new Cart();
            newCart.setProductDetail(cart.getProductDetail());
            newCart.setCustomer(cart.getCustomer());
            newCart.setQuantity(cart.getQuantity());
        } else {
            newCart.setQuantity(newCart.getQuantity() + cart.getQuantity());
        }
        return this.cartRepository.save(newCart);
    }

    @Override
    public Cart updateQuantity(Cart cart) {
        Cart newCart = this.cartRepository.checkTrung(cart.getProductDetail().getId(), cart.getCustomer().getId());

        newCart.setQuantity(cart.getQuantity());
        return this.cartRepository.save(newCart);
    }

    @Override
    public List<Cart> findAllByCustomerId(Integer id) {
        return this.cartRepository.findAllByCustomerId(id);
    }


    @Override
    public void delete(Integer id) {
        this.cartRepository.deleteById(id);
    }

    @Override
    public void deleteAll(List<Integer> idList) {
        this.cartRepository.deleteAllById(idList);
    }
}
