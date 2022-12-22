package com.fado.watch.repository;

import com.fado.watch.dto.response.StatusCheckPromotionalDto;
import com.fado.watch.entity.Promotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionalRepository extends JpaRepository<Promotional, Integer> {

    @Override
    @Query("select p from promotionals p order by p.id desc ")
    List<Promotional> findAll();

    Optional<Promotional> findByName(String name);

    @Query("select p from promotionals p where p.status = 1 or p.status = 2")
    List<Promotional> findAllByStatusTrue();

    @Query("select new StatusCheckPromotionalDto (c.status) from promotionals c where c.id in (:id)")
    List<StatusCheckPromotionalDto> checkStatusById(@Param("id") List<Integer> id);

    @Query("select p from promotionals p where 1 = 1" +
            "and (:startDate is null or p.startDate >= :startDate)" +
            "and (:endDate is null or p.endDate <= :endDate)" +
            "and (:status is null or p.status = :status) order by p.id desc")
    List<Promotional> filter(@Param("startDate") LocalDate startDate
            , @Param("endDate") LocalDate endDate
            , @Param("status") Integer status);

}