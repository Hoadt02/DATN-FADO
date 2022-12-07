package com.fado.watch.repository;

import com.fado.watch.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {

    @Query("SELECT p FROM product_details p WHERE ((:product_id IS NULL OR p.product.id = :product_id)" +
                                                   " OR (:brand_id IS NULL OR p.brand.id = :brand_id)" +
                                                   " OR (:material_id IS NULL OR p.material.id = :material_id)" +
                                                   " OR (:origin_id IS NULL OR p.origin.id = :origin_id)" +
                                                   " OR (:waterproof_id IS NULL OR p.waterproof.id = :waterproof_id)" +
                                                   " OR (:facediameter_id IS NULL OR p.facediameter.id = :facediameter_id)" +
                                                   " OR (:batterypower_id IS NULL OR p.batterypower.id = :batterypower_id))" +
                                                   " AND (:status IS NULL OR p.status = :status)" +
                                                   " AND (:gender IS NULL OR p.gender = :gender)")
    List<ProductDetail> findProductWithFilter(@Param("product_id") Integer product_id, @Param("brand_id") Integer brand_id,
                                              @Param("material_id") Integer material_id, @Param("origin_id") Integer origin_id,
                                              @Param("waterproof_id") Integer waterproof_id, @Param("facediameter_id") Integer facediameter_id,
                                              @Param("batterypower_id") Integer batterypower_id,
                                              @Param("status") Integer status, @Param("gender") Boolean gender);

    @Query("SELECT p FROM product_details p WHERE p.product.id = :id AND p.status = 1 AND p.quantity > 0")
    List<ProductDetail> getSimilarProduct(@Param("id") Integer id);

    @Query("SELECT p FROM product_details p WHERE p.name LIKE CONCAT('%',:name,'%') AND p.status = 1 AND p.quantity > 0")
    List<ProductDetail> getProductByName(@Param("name") String name);

    @Query("select pd from product_details pd where pd.imei = :imei")
    ProductDetail getProductDetailByImei(String imei);
    // Kết thúc phần của Vinh

    //--- hiên lấy ra tất cả sản phẩm trong order----
    @Query("select p from product_details p where p.id in (select o.productDetail.id from order_details o where o.order.id = :id)")
    List<ProductDetail> findAllProductInOrder(@Param("id") Integer id);


    @Query("SELECT p FROM product_details p " +
            "WHERE ((p.name LIKE CONCAT('%',:search,'%'))" +
                    "OR (p.product.category.id IN (:category_id)) " +
                    "OR (p.brand.id IN (:brand_id)) " +
                    "OR (p.material.id IN (:material_id)) " +
                    "OR (p.origin.id IN (:origin_id)) " +
                    "OR (p.waterproof.id IN (:waterproof_id)) " +
                    "OR (p.facediameter.id IN (:facediameter_id)) " +
                    "OR (p.batterypower.id IN (:batterypower_id))) " +
            "AND (p.gender IN (:gender)) " +
            "AND (p.price BETWEEN :startPrice AND :endPrice) " +
            "AND (p.status = 1)")
    Page<ProductDetail> findAll(Pageable pageable, @Param("search") String search, @Param("category_id") Integer[] category_id
            ,@Param("brand_id") Integer[] brand_id, @Param("material_id") Integer[] material_id
            ,@Param("origin_id") Integer[] origin_id
            ,@Param("waterproof_id") Integer[] waterproof_id, @Param("facediameter_id") Integer[] facediameter_id
            ,@Param("batterypower_id") Integer[] batterypower_id, @Param("gender") Boolean[] gender
            ,@Param("startPrice") Integer startPrice, @Param("endPrice") Integer endPrice);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.product.category.id = :id AND p.status = 1")
    Integer getCountProductByCategory(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.brand.id = :id AND p.status = 1")
    Integer getCountProductByBrand(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.material.id = :id AND p.status = 1")
    Integer getCountProductByMaterial(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.origin.id = :id AND p.status = 1")
    Integer getCountProductByOrigin(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.waterproof.id = :id AND p.status = 1")
    Integer getCountProductByWaterproof(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.facediameter.id = :id AND p.status = 1")
    Integer getCountProductByFacediameter(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.batterypower.id = :id AND p.status = 1")
    Integer getCountProductByBatterypower(@Param("id") Integer id);

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.gender = true AND p.status = 1")
    Integer getCountProductByMale();

    @Query("SELECT COUNT(p.id) FROM product_details p WHERE p.gender = false AND p.status = 1")
    Integer getCountProductByFemale();

    @Query(value = "SELECT * FROM product_details WHERE status = 1 AND quantity > 0 ORDER BY id DESC LIMIT 8", nativeQuery = true)
    List<ProductDetail> getLatestProductDetail();

    @Query(value = "SELECT pd.id, pd.product_id, pd.brand_id, pd.material_id, pd.origin_id, pd.name, pd.price, pd.quantity, pd.gender, pd.imei, pd.avatar, pd.create_date, pd.description, pd.status" +
            " FROM product_promotionals AS pp JOIN product_details pd ON pp.product_detail_id = pd.id" +
            " JOIN promotionals p ON pp.promotional_id = p.id" +
            " WHERE p.status = 1 AND pd.quantity > 0 AND pd.status = 1" +
            " ORDER BY pp.id DESC LIMIT 8", nativeQuery = true)
    List<ProductDetail> getProductDetailInPromotional();

    @Query("SELECT p FROM product_details p WHERE p.id = :id AND p.status = 1")
    Optional<ProductDetail> findById(@Param("id") Integer id);

    @Query(value = "SELECT * FROM product_details " +
                   "WHERE id IN (SELECT d.product_detail_id " +
                         "FROM order_details d JOIN orders o ON d.order_id = o.id " +
                         "WHERE o.status = 3 " +
                         "GROUP BY d.product_detail_id " +
                         "ORDER BY count(d.product_detail_id) DESC) LIMIT 8", nativeQuery = true)
    List<ProductDetail> getFeaturedProductDetail();
}