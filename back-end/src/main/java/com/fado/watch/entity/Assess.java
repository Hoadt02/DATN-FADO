// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="assess")
public class Assess implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;
    
    @Column(precision=12)
    private float rate;
    
    @Column(length=255)
    private String comment;
    
    @Column(name="create_date")
    private LocalDate createDate;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="product_details_id", nullable=false)
    private ProductDetail productDetail;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="customer_id", nullable=false)
    private Customer customer;

}
