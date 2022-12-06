package com.fado.watch.service;

import com.fado.watch.entity.BatteryPowers;
import com.fado.watch.entity.Material;

import java.util.List;

public interface IBatteryPowerService {
    List<BatteryPowers> getAll();

    BatteryPowers findById(Integer id);

    BatteryPowers create(BatteryPowers batteryPowers);
    BatteryPowers update(BatteryPowers batteryPowers);
}
