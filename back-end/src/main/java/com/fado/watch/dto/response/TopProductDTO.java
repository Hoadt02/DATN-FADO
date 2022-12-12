package com.fado.watch.dto.response;

import lombok.Data;

@Data
public class TopProductDTO {
    private Integer id;
    private String name;
    private Integer quantity;
    private Integer soLuongBan;
    private Double tongTien;
}
