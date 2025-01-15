### Fleet Management System: Entity Details and Relationships

#### **Truck**
- **Attributes**:
  - **id**: Integer, unique identifier for the truck.
  - **model**: String, model name of the truck.
  - **status**: String, operational status (e.g., Operational, In Maintenance).
  - **details**: String, additional information about the truck.

- **Purpose**: Stores information about trucks in the fleet, including their status and any relevant details.

#### **Driver**
- **Attributes**:
  - **id**: Integer, unique identifier for the driver.
  - **name**: String, name of the driver.
  - **license**: String, license number of the driver.
  - **details**: String, additional information about the driver.

- **Purpose**: Manages data related to drivers, ensuring proper assignment and licensing details are maintained.

#### **Maintenance**
- **Attributes**:
  - **id**: Integer, unique identifier for the maintenance record.
  - **truckId**: Integer, ID of the truck serviced.
  - **serviceDate**: Date, date of the service.
  - **serviceType**: String, type of service performed (e.g., Oil Change).
  - **details**: String, details about the maintenance performed.

- **Purpose**: Tracks maintenance activities for each truck, including dates, types of services, and detailed notes.

#### **Route**
- **Attributes**:
  - **id**: Integer, unique identifier for the route.
  - **startLocation**: String, starting point of the route.
  - **endLocation**: String, ending point of the route.
  - **details**: String, additional details about the route.

- **Purpose**: Documents routes traveled by trucks, including start and end points and any additional route-related information.

### **Relationships**
1. **Truck - Maintenance**:
   - **One-to-Many**: Each truck can have multiple maintenance records.
   - **Foreign Key**: `truckId` in the Maintenance table references the `id` in the Truck table.

2. **Truck - Route**:
   - **One-to-Many**: A truck can be assigned to multiple routes.

3. **Driver - Route**:
   - **One-to-Many**: A driver can be assigned to multiple routes.

4. **Truck - Driver**:
   - **Optional Relationship**: Drivers can be assigned to specific trucks if necessary, though this may depend on additional business logic.

### **Usage Scenarios**
- **Truck**: Query the operational status or retrieve a list of all trucks that are under maintenance.
- **Driver**: Find available drivers or retrieve details for a specific driver by their license number.
- **Maintenance**: Analyze maintenance history for a specific truck or identify trucks that need maintenance.
- **Route**: Track completed routes or analyze the distance covered by specific trucks or drivers.

### **Potential Enhancements**
- Add **Assignment Table**:
  - Tracks the assignment of drivers to trucks for specific periods or routes.
- Introduce **Fuel Log**:
  - Records fuel consumption per route to monitor efficiency.
- Add **Route Metrics**:
  - Distance, duration, and cost tracking for each route.

