package com.fado.watch.repository;

import com.fado.watch.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
    Optional<Material> findByName(String name);

    @Query("SELECT m.id FROM materials m")
    Integer[] getAllIdMaterial();
}