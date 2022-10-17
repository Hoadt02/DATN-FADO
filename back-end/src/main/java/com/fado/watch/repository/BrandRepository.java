package com.fado.watch.repository;

import com.fado.watch.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {

    Optional<Brand> findByName(String name);

    @Query("SELECT b.id FROM brands b")
    Integer[] getAllIdBrand();
}