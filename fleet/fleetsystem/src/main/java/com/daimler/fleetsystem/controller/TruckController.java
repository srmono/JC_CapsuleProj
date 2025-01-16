package com.daimler.fleetsystem.controller;

import com.daimler.fleetsystem.dto.TruckDTO;
import com.daimler.fleetsystem.entity.Truck;
import com.daimler.fleetsystem.service.TruckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trucks")
public class TruckController {

    @Autowired
    private TruckService truckService;

//    @GetMapping("/hello")
//    public String sayHello(){
//        return "Welcome to Fleet System";
//    }

    @GetMapping
    public ResponseEntity<List<TruckDTO> > getAllTrucks(){
       // return truckService.getAllTrucks();
        return ResponseEntity.ok(
                truckService.getAllTrucks()
        );
    }

    //Create Truct
    @PostMapping
    public ResponseEntity<TruckDTO> createTruck(@RequestBody TruckDTO truckDTO){

        TruckDTO createdTruck = truckService.createTruck(truckDTO);

        return ResponseEntity.ok(createdTruck);

    }
    //Get truck by id
    @GetMapping("/{id}")
    public ResponseEntity<TruckDTO> getTruckById(@PathVariable Long id){
        TruckDTO truck = truckService.getTruckById(id);

        return ResponseEntity.ok(truck);
    }


    //Update Truck
    @PutMapping("/{id}")
    public ResponseEntity<TruckDTO> updateTruck(
            @PathVariable Long id,
            @RequestBody TruckDTO truckDTO
    ){
        TruckDTO updateTruck = truckService.updateTruck(id, truckDTO);
        return ResponseEntity.ok(updateTruck);
    }

    //Delete Truck
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTruck(
            @PathVariable Long id
    ){
        truckService.deleteTruck(id);
        return  ResponseEntity.ok("Truck Deleted Successfully");
    }


}
