package com.fado.watch.repository;

import com.fado.watch.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {

    @Query("SELECT p FROM product_details p WHERE ((:product_id IS NULL OR p.product.id = :product_id)" +
                                                   " OR (:brand_id IS NULL OR p.brand.id = :brand_id)" +
                                                   " OR (:material_id IS NULL OR p.material.id = :material_id)" +
                                                   " OR (:origin_id IS NULL OR p.origin.id = :origin_id))" +
                                                   " AND (:status IS NULL OR p.status = :status)" +
                                                   " AND (:gender IS NULL OR p.gender = :gender)")
    List<ProductDetail> findProductWithFilter(@Param("product_id") Integer product_id, @Param("brand_id") Integer brand_id,
                                              @Param("material_id") Integer material_id, @Param("origin_id") Integer origin_id,
                                              @Param("status") Integer status, @Param("gender") Boolean gender);

    @Query("SELECT p FROM product_details p WHERE p.product.id = :id")
    List<ProductDetail> getSimilarProduct(@Param("id") Integer id);

    @Query("SELECT p FROM product_details p WHERE p.name like %:name%")
    List<ProductDetail> getProductByName(@Param("name") String name);


    //--- hiên lấy ra tất cả sản phẩm trong order----
    @Query("select p from product_details p where p.id in (select o.productDetail.id from order_details o where o.order.id = :id)")
    List<ProductDetail> findAllProductInOrder(@Param("id") Integer id);

    @Query("SELECT p FROM product_details p " +
            "WHERE ((p.product.category.id IN (:category_id)) " +
                    "OR (p.brand.id IN (:brand_id)) " +
                    "OR (p.material.id IN (:material_id)) " +
                    "OR (p.origin.id IN (:origin_id))) " +
            "AND (p.gender IN (:gender)) " +
            "AND (p.price BETWEEN :startPrice AND :endPrice) " +
            "AND (p.status = 1)")
    Page<ProductDetail> findAll(Pageable pageable, @Param("category_id") Integer[] category_id
            ,@Param("brand_id") Integer[] brand_id, @Param("material_id") Integer[] material_id
            ,@Param("origin_id") Integer[] origin_id, @Param("gender") Boolean[] gender
            ,@Param("startPrice") Integer startPrice, @Param("endPrice") Integer endPrice);
}