package com.fado.watch.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="battery_powers")
public class BatteryPowers implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false,precision = 10)
    private Integer id;

    @Column(nullable = false, length = 50, unique = true)
    private String name;

    @Column(precision=10)
    private Integer status;

    @OneToMany(mappedBy="batterypower")
    @JsonIgnore
    private List<ProductDetail> productDetailList;
}
