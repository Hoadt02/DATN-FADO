package com.fado.watch.repository;

import com.fado.watch.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {


    List<Cart> findAllByCustomerId(Integer id);

    @Query("select c from carts c where c.productDetail.id =:idPrd and c.customer.id =:ctmId")
    Cart checkTrung(@Param("idPrd") Integer idPrd, @Param("ctmId") Integer ctmId);
}
