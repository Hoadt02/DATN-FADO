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
    @Query("select p from product_details p where p.id not in (select c.productDetail.id from product_promotionals c where c.promotional.id =:idPromotional)")
    List<ProductDetail> getProductNotInPromotional(@Param("idPromotional") Integer idPromotional);


}