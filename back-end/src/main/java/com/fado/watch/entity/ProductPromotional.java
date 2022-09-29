// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;
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
@Entity(name="product_promotionals")
public class ProductPromotional implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="promotional_id", nullable=false)
    private Promotional promotional;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="product_detail_id", nullable=false)
    private ProductDetail productDetail;

}
