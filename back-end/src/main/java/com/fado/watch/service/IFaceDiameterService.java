package com.fado.watch.service;

import com.fado.watch.entity.FaceDiameter;

import java.util.List;

public interface IFaceDiameterService {
    List<FaceDiameter> getAll();

    FaceDiameter create(FaceDiameter faceDiameter);
    FaceDiameter update(FaceDiameter faceDiameter);
}
