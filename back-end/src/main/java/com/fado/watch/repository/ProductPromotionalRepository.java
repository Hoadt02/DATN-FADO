package com.fado.watch.repository;

import com.fado.watch.entity.ProductDetail;
import com.fado.watch.entity.ProductPromotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPromotionalRepository extends JpaRepository<ProductPromotional, Integer> {

    //    @Query("select p from product_details p where p.id not in (select c.productDetail.id from product_promotionals c)")

    //    @Query("select p from product_details p where p.id not in\n" +
//            "(select c.productDetail.id from product_promotionals c where c.promotional.id not in\n" +
//            "(select d.id from promotionals d where d.id =:idPromotional and d.status = 1))")
//    @Query("select p from product_details p where p.id not in (select c.productDetail.id from product_promotionals c where c.promotional.id =:idPromotional)")
// @Param("idPromotional") Integer idPromotional
    @Query("select p from product_details p where p.id not in( \n" +
            "     select pp.productDetail.id from product_promotionals pp join promotionals p on pp.promotional.id = p.id\n" +
            "     where p.status = 1)  and p.status = 1")
    List<ProductDetail> getProductNotInPromotional();

}