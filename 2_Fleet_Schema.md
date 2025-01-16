SQL schema based on the provided details, along with sample data for each table:

---

### **1. Schema Definitions**

```sql
-- Truck Table
CREATE TABLE Truck (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    status ENUM('Operational', 'In Maintenance') NOT NULL,
    details TEXT
);

-- Driver Table
CREATE TABLE Driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    license VARCHAR(50) NOT NULL,
    details TEXT
);

-- Maintenance Table
CREATE TABLE Maintenance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    truckId INT NOT NULL,
    serviceDate DATE NOT NULL,
    serviceType VARCHAR(255) NOT NULL,
    details TEXT,
    FOREIGN KEY (truckId) REFERENCES Truck(id)
);

-- Route Table
CREATE TABLE Route (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startLocation VARCHAR(255) NOT NULL,
    endLocation VARCHAR(255) NOT NULL,
    details TEXT
);
```

---

### **2. Sample Data**

#### **Truck Table**
```sql
INSERT INTO Truck (model, status, details) VALUES
('Volvo FH16', 'Operational', 'Long-distance truck.'),
('Scania R500', 'In Maintenance', 'Undergoing engine repair.'),
('MAN TGX', 'Operational', 'Fuel-efficient truck for regional delivery.');
```

#### **Driver Table**
```sql
INSERT INTO Driver (name, license, details) VALUES
('John Doe', 'DL12345678', '10 years of experience in long-distance trucking.'),
('Jane Smith', 'DL98765432', 'Expert in regional deliveries.'),
('Bob Brown', 'DL11121314', 'Specializes in hazardous materials transport.');
```

#### **Maintenance Table**
```sql
INSERT INTO Maintenance (truckId, serviceDate, serviceType, details) VALUES
(1, '2025-01-10', 'Oil Change', 'Routine oil change and filter replacement.'),
(2, '2025-01-12', 'Engine Repair', 'Fixing engine overheating issue.'),
(1, '2025-01-14', 'Tire Replacement', 'Replaced all tires with new ones.');
```

#### **Route Table**
```sql
INSERT INTO Route (startLocation, endLocation, details) VALUES
('New York', 'Los Angeles', 'Cross-country route for delivering electronics.'),
('Chicago', 'Houston', 'Transporting construction materials.'),
('Seattle', 'San Francisco', 'Regional delivery of groceries.');
```

---

### **3. Sample Queries**

- **Retrieve all operational trucks:**
  ```sql
EXPLAIN SELECT * FROM Truck WHERE status = 'Operational';
  ```

- **Find maintenance records for a specific truck:**
  ```sql
  SELECT * FROM Maintenance WHERE truckId = 1;
  ```

- **Get details of routes starting in a specific location:**
  ```sql
  SELECT * FROM Route WHERE startLocation = 'Chicago';
  ```

- **List drivers with details:**
  ```sql
  SELECT * FROM Driver;
  ```

