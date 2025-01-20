package com.daimler.fleetsystem.repository;

import com.daimler.fleetsystem.entity.Truck;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TruckRepository extends JpaRepository<Truck, Long> {
    @Override
    Page<Truck> findAll(Pageable pageable);

}
