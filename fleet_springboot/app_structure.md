### **File Structure**

### **File Structure**
```
src/main/java/com/fleetsystem/
├── controller/                     req/
│   └── TruckController.java
├── dto/                            data  
│   └── TruckDTO.java
├── entity/                         truck, driver, maintenance, route etc..
│   └── Truck.java
├── repository/                     data jpa --> db 
│   └── TruckRepository.java
├── service/                        business logic
│   └── TruckService.java
├── exception/                      error/exception handling 
│   ├── GlobalExceptionHandler.java
│   └── TruckNotFoundException.java
└── FleetSystemApplication.java

utility
    emails
    ...
