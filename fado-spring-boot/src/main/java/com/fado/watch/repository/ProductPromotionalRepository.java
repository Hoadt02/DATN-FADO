package com.fado.watch.repository;

import com.fado.watch.entity.ProductPromotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPromotionalRepository extends JpaRepository<ProductPromotional, Integer> {
}