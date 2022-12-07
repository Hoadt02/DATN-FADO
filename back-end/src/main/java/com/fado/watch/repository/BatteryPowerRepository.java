package com.fado.watch.repository;

import com.fado.watch.entity.BatteryPowers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BatteryPowerRepository extends JpaRepository<BatteryPowers, Integer> {
    Optional<BatteryPowers> findByName(String name);

    @Query("SELECT bp.id FROM battery_powers bp")
    Integer[] getAllIdBatteryPowers();
}
