package com.fado.watch.repository;

import com.fado.watch.entity.FaceDiameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FaceDiameterRepository extends JpaRepository<FaceDiameter, Integer> {
    Optional<FaceDiameter> findByName(String name);

    @Query("SELECT fd.id FROM face_diameters fd")
    Integer[] getAllIdFaceDiameters();
}
