// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="products")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;
    
    @Column(nullable=false, length=255)
    private String name;
    
    @Column(precision=10)
    private Integer status;
   
    @Column(name="create_date")
    private LocalDate createDate;
    
    @Column(length=255)
    private String description;
    
    @OneToMany(mappedBy="product")
    @JsonIgnore
    private List<ProductDetail> productDetailList;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="category_id", nullable=false)
    private Category category;

}
