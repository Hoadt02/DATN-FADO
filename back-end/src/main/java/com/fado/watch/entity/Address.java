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
@Entity(name = "address")
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, precision = 10)
    private Integer id;

    @JoinColumn(name = "province_id")
    private Integer provinceId;

    @Column(nullable = false, length = 50)
    private String province;

    @JoinColumn(nullable = false, name = "district_id")
    private Integer districtId;

    @Column(nullable = false, length = 50)
    private String district;

    @JoinColumn(nullable = false, name = "ward_id")
    private String wardId;

    @Column(nullable = false, length = 50)
    private String ward;

    @Column(nullable = false, length = 100)
    private String other;

    @Column(nullable = false, length = 54)
    private String fullname;

    @JoinColumn(nullable = false, name = "phone_number")
    private String phoneNumber;

    @Column()
    private Integer defaultAddress;

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

}
