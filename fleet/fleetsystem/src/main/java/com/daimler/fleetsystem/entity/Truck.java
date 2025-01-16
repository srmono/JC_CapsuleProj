package com.daimler.fleetsystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
//@Table(name="trucktable")
public class Truck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;

    @Enumerated(EnumType.STRING)
    private Status status;

    //@Column(name ="truck_dtailes")
    private String details;

    public enum Status {
        OPERATIONAL,
        IN_MAINTENANCE
    }

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public Status getStatus() {
        return status;
    }

    public String getDetails() {
        return details;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
