package com.fado.watch.repository;

import com.fado.watch.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {

    @Query("SELECT p FROM product_details p WHERE (p.product.category.id IN (:category_id) OR p.brand.id IN (:brand_id) OR p.material.id IN (:material_id) OR p.origin.id IN (:origin_id)) AND (p.gender IN (:gender)) AND (p.price BETWEEN :startPrice AND :endPrice) AND (p.status = 1)")
    List<ProductDetail> getProductDetailByFilter(@Param("category_id") Integer[] category_id, @Param("brand_id") Integer[] brand_id, @Param("material_id") Integer[] material_id, @Param("origin_id") Integer[] origin_id, @Param("gender") Boolean[] gender, @Param("startPrice") Integer startPrice, @Param("endPrice") Integer endPrice);

    @Query("SELECT p FROM product_details p WHERE p.product.id = :id")
    List<ProductDetail> getSimilarProduct(@Param("id") Integer id);

    @Query("SELECT p FROM product_details p WHERE p.name like %:name%")
    List<ProductDetail> getProductByName(@Param("name") String name);


    //--- hiên lấy ra tất cả sản phẩm trong order----
    @Query("select p from product_details p where p.id in (select o.productDetail.id from order_details o where o.order.id = :id)")
    List<ProductDetail> findAllProductInOrder(@Param("id") Integer id);

//lấy top 3 sản phẩm
    @Query(value = "SELECT * FROM product_details p WHERE p.product_id = (SELECT o.product_detail_id FROM order_details o" +
            "            GROUP BY o.product_detail_id" +
            "            ORDER BY SUM(o.quantity) ASC LIMIT 3);",nativeQuery = true)
    List<ProductDetail> getListTop3Pro();
}