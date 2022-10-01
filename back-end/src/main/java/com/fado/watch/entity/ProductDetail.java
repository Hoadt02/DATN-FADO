// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="product_details")
public class ProductDetail implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;
    
    @Column(nullable=false, length=255)
    private String name;
    
	@Column(nullable=false, length=16777215)
    private String price;
    
	@Column(nullable=false, precision=10)
    private Integer quantity;
    
	@Column(nullable=false, length=1)
    private boolean gender;
    
	@Column(nullable=false, length=20)
    private String imei;
    
	@Column(nullable=false, length=255)
    private String avatar;
    
	@Column(name="create_date")
    private LocalDate createDate;
    
	@Column(length=255)
    private String description;
    
	@Column(precision=10)
    private Integer status;
    
	@OneToMany(mappedBy="productDetail")
    @JsonIgnore
    private List<Assess> assessList;
    
	@OneToMany(mappedBy="productDetail")
    @JsonIgnore
    private List<Image> imageList;
    
	@OneToMany(mappedBy="productDetail")
    @JsonIgnore
    private List<Like> like;
    
	@OneToMany(mappedBy="productDetail")
    @JsonIgnore
    private List<OrderDetail> orderDetailList;
    
	@ManyToOne(optional=false)
    @JoinColumn(name="product_id", nullable=false)
    private Product product;
    
	@ManyToOne(optional=false)
    @JoinColumn(name="brand_id", nullable=false)
    private Brand brand;
    
	@ManyToOne(optional=false)
    @JoinColumn(name="material_id", nullable=false)
    private Origin origin;
    
	@ManyToOne(optional=false)
    @JoinColumn(name="origin_id", nullable=false)
    private Material material;
    
	@OneToMany(mappedBy="productDetail")
    @JsonIgnore
    private List<ProductPromotional> productPromotionalList;

}
