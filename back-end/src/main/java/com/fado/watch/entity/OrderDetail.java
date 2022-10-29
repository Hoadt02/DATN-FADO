// Generated with g9.

package com.fado.watch.entity;

import java.io.Serializable;

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
@Entity(name="order_details")
public class OrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;

    @Column(nullable=false, precision=10)
    private Integer quantity;

    @Column(nullable=false)
    private Integer price;

    @ManyToOne(optional=false)
    @JoinColumn(name="product_detail_id", nullable=false)
    private ProductDetail productDetail;

    @ManyToOne(optional=false)
    @JoinColumn(name="order_id", nullable=false)
    private Order order;

}
