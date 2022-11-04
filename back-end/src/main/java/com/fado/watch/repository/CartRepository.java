package com.fado.watch.repository;

import com.fado.watch.dto.response.CartDto;
import com.fado.watch.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    @Query("select new CartDto(c.id,c.quantity,c.productDetail.price,c.productDetail,c.customer) from carts c where c.customer.id = :id")
    List<CartDto> findAllByCustomerId(Integer id);

    void deleteAllByCustomerId(Integer id);

    @Query("select c from carts c where c.productDetail.id =:idPrd and c.customer.id =:ctmId")
    Cart checkTrung(@Param("idPrd") Integer idPrd, @Param("ctmId") Integer ctmId);
}
