package com.fado.watch.repository;

import com.fado.watch.entity.WaterProof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WaterProofRepository extends JpaRepository<WaterProof, Integer> {
    Optional<WaterProof> findByName(String name);

    @Query("SELECT wp.id FROM water_proofs wp")
    Integer[] getAllIdWaterProof();
}
