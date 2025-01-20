package com.daimler.fleetsystem.service;

import com.daimler.fleetsystem.dto.TruckDTO;
import com.daimler.fleetsystem.entity.Truck;
import com.daimler.fleetsystem.exception.TruckNotFoundException;
import com.daimler.fleetsystem.repository.TruckRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Data
@AllArgsConstructor
public class TruckService {

    @Autowired
    private TruckRepository truckRepository;

//    public TruckService(TruckRepository truckRepository){
//        this.truckRepository = truckRepository;
//    }

    public List<TruckDTO> getAllTrucks(){
        return truckRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    //Get the Truck By ID
    public TruckDTO getTruckById(Long id){
         Truck truck =  truckRepository.findById(id).orElseThrow(
                 () -> new TruckNotFoundException("Truck not found with ID: " + id)
         );

         return mapToDTO(truck);
    }
    //Create Truck
    public TruckDTO createTruck(TruckDTO truckDTO){
        Truck truck = new Truck();
        truck.setModel(truckDTO.getModel());
        truck.setStatus(Truck.Status.valueOf(truckDTO.getStatus().toUpperCase()));
        truck.setDetails(truckDTO.getDetails());

        Truck saveTruck = truckRepository.save(truck);

        return mapToDTO(saveTruck);
    }

    //Update Truck
    public TruckDTO updateTruck(Long id, TruckDTO truckDTO){

        Truck truck =  truckRepository.findById(id).orElseThrow(
                () -> new TruckNotFoundException("Truck not found with ID: " + id));

       // Truck truck = new Truck();
        truck.setModel(truckDTO.getModel());
        truck.setStatus(Truck.Status.valueOf(truckDTO.getStatus().toUpperCase()));
        truck.setDetails(truckDTO.getDetails());

        Truck updatedTruck = truckRepository.save(truck);

        return mapToDTO(updatedTruck);
    }


    //Pagination
    public Page<TruckDTO> getTrucks(Pageable pageable){
       Page<Truck> truckPage =  truckRepository.findAll(pageable);

       return truckPage.map(this::mapToDTO);
    }

    //Delete Truck
    public void deleteTruck(Long id){
        if(!truckRepository.existsById(id)){
            throw new TruckNotFoundException("Truck not found with ID: " + id);
        }
        truckRepository.deleteById(id);
    }

    private  TruckDTO mapToDTO(Truck truck){
        return new TruckDTO(
                truck.getId(),
                truck.getModel(),
                truck.getStatus().name(),
                truck.getDetails()
        );
    }
}
