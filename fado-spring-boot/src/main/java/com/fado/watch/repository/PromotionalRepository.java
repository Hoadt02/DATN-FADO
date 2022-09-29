package com.fado.watch.repository;

import com.fado.watch.entity.Promotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionalRepository extends JpaRepository<Promotional, Integer> {
}