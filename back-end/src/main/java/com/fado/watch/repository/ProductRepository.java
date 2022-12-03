package com.fado.watch.repository;

import com.fado.watch.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByName(String name);

    @Query("select p from products p where p.category.id = :id and p.status = 1")
    List<Product> findAllByCategoryId(@Param("id") Integer id);

}