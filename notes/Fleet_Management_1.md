
### **1. Introduction to the Fleet Management System**
The Fleet Management System manages entities like **Trucks**, **Drivers**, **Maintenance**, and **Routes**. These entities are interconnected to provide an efficient way to track fleet operations, driver assignments, maintenance schedules, and routes.

---

### **2. SQL Basics and Table Schemas**

#### **Creating the Table Schemas**
- **Truck Table**: Stores information about trucks, including their license plate, model, and capacity.
- **Driver Table**: Stores details about drivers, such as their name, phone number, and license number.
- **Maintenance Table**: Tracks maintenance records for trucks, including the date, description, and cost of maintenance activities.
- **Route Table**: Tracks routes assigned to trucks and drivers, including starting and ending locations and distance.

**Example Queries**:
1. Creating tables ensures a structured way to store data.
2. Foreign keys establish relationships between tables, e.g., `TruckID` in the `Maintenance` table references the `Truck` table.

---

### **3. Basic Queries in SQL**

#### **1. Retrieve All Trucks**
**Query**:
```sql
SELECT * FROM Truck;
```
- **Description**: Retrieves all records from the `Truck` table, showing details like license plate, model, and capacity.

#### **2. Insert a New Truck**
**Query**:
```sql
INSERT INTO Truck (LicensePlate, Model, Capacity) 
VALUES ('XYZ789', 'MAN TGX', 22000);
```
- **Description**: Adds a new truck with the license plate "XYZ789", model "MAN TGX", and capacity of 22,000 kg to the database.

#### **3. Update Truck Capacity**
**Query**:
```sql
UPDATE Truck 
SET Capacity = 21000 
WHERE TruckID = 1;
```
- **Description**: Updates the capacity of the truck with `TruckID = 1` to 21,000 kg.

#### **4. Delete a Driver**
**Query**:
```sql
DELETE FROM Driver 
WHERE DriverID = 2;
```
- **Description**: Deletes the driver with `DriverID = 2` from the `Driver` table.

---

### **4. Foreign Keys and Joins**

#### **1. Retrieve All Maintenance Records with Truck Details**
**Query**:
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
- **Description**: Joins the `Maintenance` and `Truck` tables to display maintenance records along with the truck's license plate.

#### **2. Retrieve Routes with Driver and Truck Details**
**Query**:
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
- **Description**: Joins the `Route`, `Truck`, and `Driver` tables to display details of each route, including the truck and driver assigned.

#### **3. Retrieve All Drivers Assigned to Routes**
**Query**:
```sql
SELECT DISTINCT Driver.Name, Driver.PhoneNumber
FROM Driver
JOIN Route ON Driver.DriverID = Route.DriverID;
```
- **Description**: Retrieves unique drivers assigned to at least one route, showing their names and phone numbers.

#### **4. Retrieve Trucks Without Maintenance Records**
**Query**:
```sql
SELECT Truck.LicensePlate, Truck.Model
FROM Truck
LEFT JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
WHERE Maintenance.TruckID IS NULL;
```
- **Description**: Uses a `LEFT JOIN` to find trucks that do not have any associated maintenance records, showing their license plates and models.

---

### **Hands-On Approach**
The schema and queries outlined above provide a step-by-step implementation of the Fleet Management System. Start by creating the tables, inserting sample data, and practicing basic and advanced queries to understand how the data is structured and related.

