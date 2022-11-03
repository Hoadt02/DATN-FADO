package com.fado.watch.service.impl;

import com.fado.watch.dto.response.CartDto;
import com.fado.watch.entity.Cart;
import com.fado.watch.entity.ProductPromotional;
import com.fado.watch.repository.CartRepository;
import com.fado.watch.repository.ProductPromotionalRepository;
import com.fado.watch.service.ICartService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class CartServiceImpl implements ICartService {

    private final CartRepository cartRepository;
    private final ProductPromotionalRepository productPromotionalRepository;

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
    public void delete(Integer id) {
        this.cartRepository.deleteById(id);
    }

    @Override
    public void deleteAllByCustomerId(Integer id) {
        this.cartRepository.deleteAllByCustomerId(id);
    }


    // load lai rỏ hàng nếu có km sẽ tính tiền, ko thì sẽ trả ra rỏ hàng bth ko km
    @Override
    public List<CartDto> findAllByCustomerId(Integer id) {
        List<ProductPromotional> productPromotionals = this.productPromotionalRepository.findAllProductPromotionalInCart(id);
        List<CartDto> cartList = this.cartRepository.findAllByCustomerId(id);
        if (null == productPromotionals) {
            return cartList;
        }
        for (CartDto x : cartList) {
            for (ProductPromotional y : productPromotionals) {
                if (x.getProductDetail().getId() == y.getProductDetail().getId()) {
                    if (y.getPromotional().isType()) {
                        x.setPrice(x.getProductDetail().getPrice() - (x.getProductDetail().getPrice() * y.getPromotional().getDiscount() / 100));
                        break;
                    } else {
                        x.setPrice(x.getPrice() - y.getPromotional().getDiscount());
                        break;
                    }
                }
            }
        }
        return cartList;
    }

}
