package com.fado.watch.service.impl;

import com.fado.watch.entity.BatteryPowers;
import com.fado.watch.exception.UniqueException;
import com.fado.watch.repository.BatteryPowerRepository;
import com.fado.watch.repository.OriginRepository;
import com.fado.watch.service.IBatteryPowerService;
import com.fado.watch.service.IOriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BatteryPowerServiceImpl implements IBatteryPowerService {
    @Autowired
    BatteryPowerRepository repository;

    @Override
    public List<BatteryPowers> getAll() {
        return repository.findAll();
    }

    @Override
    public BatteryPowers create(BatteryPowers batteryPower) {
        if (this.repository.findByName(batteryPower.getName()).isPresent()){
            throw new UniqueException("Tên năng lượng pin đã tồn tại");
        }
        return this.repository.save(batteryPower);
    }

    @Override
    public BatteryPowers update(BatteryPowers batteryPower) {
        BatteryPowers batteryPowerBefore = this.repository.findById(batteryPower.getId()).get();

        if (this.repository.findByName(batteryPower.getName()).isPresent()
        && !Objects.equals(batteryPower.getName(),batteryPowerBefore.getName())){
            throw new UniqueException("Tên năng lượng pin đã tồn tại");
        }
        return this.repository.save(batteryPower);
    }
}
