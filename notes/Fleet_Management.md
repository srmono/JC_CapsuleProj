Fleet Management System with SQL 

---

### **1. Introduction to the Fleet Management System**

Key entities in this system are:
- **Truck**
- **Driver**
- **Maintenance**
- **Route**

These tables will help manage fleet operations effectively.

---

### **2. SQL Basics and Table Schemas**

#### **Creating the Table Schemas**
```sql
-- Truck Table
CREATE TABLE Truck (
    TruckID INT PRIMARY KEY AUTO_INCREMENT,
    LicensePlate VARCHAR(20) NOT NULL,
    Model VARCHAR(50),
    Capacity INT
);

-- Driver Table
CREATE TABLE Driver (
    DriverID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    PhoneNumber VARCHAR(15),
    LicenseNumber VARCHAR(20)
);

-- Maintenance Table
CREATE TABLE Maintenance (
    MaintenanceID INT PRIMARY KEY AUTO_INCREMENT,
    TruckID INT,
    MaintenanceDate DATE,
    Description TEXT,
    Cost DECIMAL(10, 2),
    FOREIGN KEY (TruckID) REFERENCES Truck(TruckID)
);

-- Route Table
CREATE TABLE Route (
    RouteID INT PRIMARY KEY AUTO_INCREMENT,
    TruckID INT,
    DriverID INT,
    StartLocation VARCHAR(100),
    EndLocation VARCHAR(100),
    Distance INT,
    FOREIGN KEY (TruckID) REFERENCES Truck(TruckID),
    FOREIGN KEY (DriverID) REFERENCES Driver(DriverID)
);
```

#### **Inserting Sample Data**
```sql
-- Insert into Truck
INSERT INTO Truck (LicensePlate, Model, Capacity) VALUES
('ABC123', 'Volvo FH16', 20000),
('DEF456', 'Scania R500', 18000);

-- Insert into Driver
INSERT INTO Driver (Name, PhoneNumber, LicenseNumber) VALUES
('John Doe', '1234567890', 'DL12345'),
('Jane Smith', '9876543210', 'DL67890');

-- Insert into Maintenance
INSERT INTO Maintenance (TruckID, MaintenanceDate, Description, Cost) VALUES
(1, '2025-01-10', 'Engine oil change', 250.00),
(2, '2025-01-12', 'Tire replacement', 500.00);

-- Insert into Route
INSERT INTO Route (TruckID, DriverID, StartLocation, EndLocation, Distance) VALUES
(1, 1, 'City A', 'City B', 500),
(2, 2, 'City C', 'City D', 300);
```

---

### **3. Basic Queries in SQL**

#### **1. Retrieve All Trucks**
```sql
SELECT * FROM Truck;
```

#### **2. Insert a New Truck**
```sql
INSERT INTO Truck (LicensePlate, Model, Capacity) 
VALUES ('XYZ789', 'MAN TGX', 22000);
```

#### **3. Update Truck Capacity**
```sql
UPDATE Truck 
SET Capacity = 21000 
WHERE TruckID = 1;
```

#### **4. Delete a Driver**
```sql
DELETE FROM Driver 
WHERE DriverID = 2;
```

---

### **4. Foreign Keys and Joins**

#### **1. Retrieve All Maintenance Records with Truck Details**
```sql
SELECT 
    Maintenance.MaintenanceID,
    Truck.LicensePlate,
    Maintenance.MaintenanceDate,
    Maintenance.Description,
    Maintenance.Cost
FROM Maintenance
JOIN Truck ON Maintenance.TruckID = Truck.TruckID;
```

#### **2. Retrieve Routes with Driver and Truck Details**
```sql
SELECT 
    Route.RouteID,
    Truck.LicensePlate,
    Driver.Name AS DriverName,
    Route.StartLocation,
    Route.EndLocation,
    Route.Distance
FROM Route
JOIN Truck ON Route.TruckID = Truck.TruckID
JOIN Driver ON Route.DriverID = Driver.DriverID;
```

#### **3. Retrieve All Drivers Assigned to Routes**
```sql
SELECT DISTINCT Driver.Name, Driver.PhoneNumber
FROM Driver
JOIN Route ON Driver.DriverID = Route.DriverID;
```

#### **4. Retrieve Trucks Without Maintenance Records**
```sql
SELECT Truck.LicensePlate, Truck.Model
FROM Truck
LEFT JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
WHERE Maintenance.TruckID IS NULL;
```

