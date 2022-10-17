package com.fado.watch.repository;

import com.fado.watch.entity.Origin;
import com.fado.watch.entity.Promotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionalRepository extends JpaRepository<Promotional, Integer> {

    Optional<Promotional> findByName(String name);

    @Query("select p from promotionals p where p.status = 1")
    List<Promotional> findAllByStatusTrue();
}