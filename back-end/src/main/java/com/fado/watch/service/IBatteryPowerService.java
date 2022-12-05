package com.fado.watch.service;

import com.fado.watch.entity.BatteryPowers;

import java.util.List;

public interface IBatteryPowerService {
    List<BatteryPowers> getAll();

    BatteryPowers create(BatteryPowers batteryPowers);
    BatteryPowers update(BatteryPowers batteryPowers);
}
