package com.fado.watch.service;

import com.fado.watch.entity.FaceDiameter;
import com.fado.watch.entity.Material;

import java.util.List;

public interface IFaceDiameterService {
    List<FaceDiameter> getAll();

    FaceDiameter findById(Integer id);

    FaceDiameter create(FaceDiameter faceDiameter);
    FaceDiameter update(FaceDiameter faceDiameter);
}
