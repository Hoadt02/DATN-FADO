package com.fado.watch.service;

import com.fado.watch.entity.Material;
import com.fado.watch.entity.WaterProof;

import java.util.List;

public interface IWaterProofService {
    List<WaterProof> getAll();

    WaterProof findById(Integer id);

    WaterProof create(WaterProof waterProof);
    WaterProof update(WaterProof waterProof);
}
