package com.fado.watch.repository;

import com.fado.watch.dto.response.StatusCheckPromotionalDto;
import com.fado.watch.entity.Promotional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionalRepository extends JpaRepository<Promotional, Integer> {

    Optional<Promotional> findByName(String name);

    @Query("select p from promotionals p where p.status = 1")
    List<Promotional> findAllByStatusTrue();

    @Query("select new StatusCheckPromotionalDto (c.status) from promotionals c where c.id in (:id)")
    List<StatusCheckPromotionalDto> checkStatusById(List<Integer> id);

    @Query("select p from promotionals p where 1 = 1" +
            "and (:startDate is null or p.startDate >= :startDate)" +
            "and (:endDate is null or p.endDate <= :endDate)" +
            "and (:status is null or p.status = :status)" +
            "and (:type is null or p.type = :type)")
    List<Promotional> filter(@Param("startDate") LocalDate startDate
            , @Param("endDate") LocalDate endDate
            , @Param("status") Integer status
            , @Param("type") boolean type);

}