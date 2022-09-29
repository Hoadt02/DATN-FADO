package com.fado.watch.repository;

import com.fado.watch.entity.Assess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessRepository extends JpaRepository<Assess, Integer> {
}