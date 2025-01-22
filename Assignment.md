### **Revised Assignment: Fleet System Enhancement - Maintenance Task Management**

#### **Scenario**
You are tasked with enhancing the fleet management system by adding a new **Maintenance Task Management** feature. This feature will allow administrators to:
1. View maintenance tasks for vehicles.
2. Filter tasks by vehicle or status.
3. Implement pagination for large task lists.
4. Route to a detailed view of individual tasks.

---

### **Requirements**

#### **Backend Development**
1. **APIs for Maintenance Task Management**:
   - **Get All Tasks (with Pagination)**:  
     API to fetch paginated maintenance tasks.  
     Example query parameters:  
     - `_start`: Starting index for pagination.  
     - `_limit`: Number of tasks per page.  
     - `vehicleId`: Optional filter by vehicle ID.  
     - `status`: Optional filter by task status (Pending/Completed).  

   - **Get Task Details**:  
     API to fetch detailed information for a single maintenance task using its ID.

   - **Database Design**:  
     - Create a `MaintenanceTasks` table with the following fields:  
       - Task ID (Primary Key)
       - Vehicle ID (Foreign Key)
       - Task Description
       - Maintenance Date
       - Task Status (Pending/Completed)

   - Ensure proper exception handling for invalid inputs or IDs.

2. **Existing Truck API Integration**:  
   - Use the existing truck API to fetch vehicle details for maintenance tasks.

---

#### **Frontend Development**
1. **Task List Page**:
   - Display maintenance tasks in a **Bootstrap table**.
   - Include features:
     - **Pagination**: Show tasks with navigation controls (Next, Previous, Page Numbers).
     - **Filters**: Allow filtering by vehicle ID or status using query parameters. 
     - **Truck Details**: Display vehicle name and model for each task by calling the truck API.

2. **Task Details Page**:
   - Create a detailed view for a single task, accessible via routing.
   - Details to display:
     - Task Description
     - Maintenance Date
     - Status (Pending/Completed)
     - Linked Truck Details (e.g., name, model, and other relevant data).

3. **Routing**:
   - Add a route for the task list page (`/tasks`) and the task details page (`/tasks/:id`).
   - Use Angular's `RouterModule` for navigation.

4. **API Integration**:
   - Call backend APIs to fetch task data and truck details.
   - Handle and display errors gracefully in case of API failures.

---

### **Bonus Features**
1. **Search Bar**:  
   - Add a search bar to filter tasks by description.

2. **Status Toggle**:  
   - Add a button in the task list to toggle task status (e.g., Pending → Completed).

3. **Sorting**:  
   - Add sorting functionality for maintenance dates or status.

---

### **Deliverables**
1. **Backend**:  
   - Spring Boot project with all required APIs and database schema.
   - SQL script to set up the database and populate sample data.

2. **Frontend**:  
   - Angular project with:
     - Task list page with pagination and filters.
     - Task details page with routing.

3. **Documentation**:  
   - Provide a README with setup instructions and sample API requests.

---

### **Grading Criteria**
1. **Backend Functionality**:  
   Correctness and robustness of APIs (40%).

2. **Frontend Functionality**:  
   - Pagination, filtering, and routing (40%).

3. **Bonus Features**:  
   Implementing search, sorting, or status toggling (10%).

4. **Documentation**:  
   Completeness and clarity of README (10%).

