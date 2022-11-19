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
@Entity(name = "orders")
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, precision = 10)
    private Integer id;

    @Column(name = "ship_address", nullable = false, length = 255)
    private String shipAddress;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "payment_type", nullable = false, precision = 10)
    private Integer paymentType;

    @Column(nullable = false, precision = 10)
    private Integer status;

    @Column(nullable = false)
    private Integer total;

    @Column(nullable = false)
    private Integer discount;

    @Column(name = "total_payment", nullable = false)
    private Integer totalPayment;

    @Column(name = "fee_shipping", nullable = false)
    private Integer feeShipping;

    @Column(nullable = true)
    private Integer type;

    @Column(nullable = true, length = 60)
    private String fullname;

    @Column(nullable = true, length = 10)
    private String phoneNumber;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<OrderDetail> orderDetailList;

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(optional = false)
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

}
