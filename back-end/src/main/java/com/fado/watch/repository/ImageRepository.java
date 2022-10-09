package com.fado.watch.repository;

import com.fado.watch.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    @Query("SELECT i FROM images i WHERE i.productDetail.id = :id")
    List<Image> getImagesByProductDetailId(@Param("id") Integer id);
}