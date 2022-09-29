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
@Entity(name="vouchers")
public class Voucher implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(unique=true, nullable=false, precision=10)
    private Integer id;
    
    @Column(name="start_date", nullable=false)
    private LocalDate startDate;
   
    @Column(name="end_date", nullable=false)
    private LocalDate endDate;
    
    @Column(nullable=false, length=16777215)
    private String discount;
    
    @Column(nullable=false, length=20)
    private String code;
    
    @Column(nullable=false, precision=10)
    private Integer quantity;
    
    @Column(length=255)
    private String description;
    
    @Column(precision=10)
    private Integer status;
    
    @ManyToOne(optional=false)
    @JoinColumn(name="staff_id", nullable=false)
    private Staff staff;

}
