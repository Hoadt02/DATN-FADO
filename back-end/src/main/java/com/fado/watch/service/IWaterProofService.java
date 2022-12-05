package com.fado.watch.service;

import com.fado.watch.entity.WaterProof;

import java.util.List;

public interface IWaterProofService {
    List<WaterProof> getAll();

    WaterProof create(WaterProof waterProof);
    WaterProof update(WaterProof waterProof);
}
