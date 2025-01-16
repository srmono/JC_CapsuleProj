### Explanation of Annotations in Entity Classes

In all the entities I created (e.g., `Route`, `Truck`, `Driver`, etc.), I used annotations to define the entity's behavior and how it maps to the database. Here's a detailed explanation of each annotation used:

---

### **Annotations in Entity Classes**

#### 1. **`@Entity`**
- **What it is**:  
  This annotation is used to mark a class as a persistent entity. It tells Hibernate (or JPA) that this class should be mapped to a database table.

- **Purpose**:  
  Hibernate will use this class to create and manage a table in the database.

- **Example**:  
  ```java
  @Entity
  public class Route {
      // Class definition
  }
  ```
  **Effect**: The `Route` class will be mapped to a table named `route` by default (or `routes` depending on your naming strategy).

---

#### 2. **`@Table(name = "table_name")`**
- **What it is**:  
  Specifies the name of the database table to which the entity is mapped. If this annotation is omitted, JPA will use the default name derived from the class name.

- **Purpose**:  
  Customize the table name or schema.

- **Example**:  
  ```java
  @Table(name = "routes")
  ```
  **Effect**: The `Route` entity will now correspond to the table named `routes` in the database.

---

#### 3. **`@Id`**
- **What it is**:  
  Marks a field as the primary key for the entity.

- **Purpose**:  
  Indicates the unique identifier for each row in the database table.

- **Example**:  
  ```java
  @Id
  private Long id;
  ```
  **Effect**: The `id` field will be the primary key of the table.

---

#### 4. **`@GeneratedValue(strategy = GenerationType.IDENTITY)`**
- **What it is**:  
  Configures how the primary key value is generated.  
  `GenerationType.IDENTITY` means the database will automatically generate the ID value, typically using an auto-increment column.

- **Purpose**:  
  Allows the database to handle primary key generation.

- **Example**:  
  ```java
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  ```
  **Effect**: The database (e.g., MySQL, PostgreSQL) will auto-increment the `id` field whenever a new record is added.

---

#### 5. **`@Column`**
- **What it is**:  
  Maps a field to a specific column in the database. By default, JPA uses the field name as the column name, but this annotation allows customization.

- **Attributes**:  
  - `nullable`: Specifies whether the column can store `NULL` values (`true` by default).  
  - `length`: Specifies the maximum length for a `VARCHAR` column.  
  - `unique`: Enforces uniqueness at the database level.

- **Purpose**:  
  - Define specific attributes for database columns.
  - Control nullable constraints, column lengths, etc.

- **Examples**:  
  ```java
  @Column(nullable = false)
  private String startLocation;

  @Column(length = 500)
  private String details;
  ```
  **Effect**:  
  - `startLocation`: Cannot be `NULL` in the database.  
  - `details`: The maximum length for this column is 500 characters.

---

#### 6. **`@ManyToOne`**
- **What it is**:  
  Establishes a many-to-one relationship between two entities. For example, multiple routes may belong to a single truck.

- **Attributes**:  
  - `fetch`: Defines the fetch type (e.g., `LAZY` or `EAGER`).

- **Purpose**:  
  - Links two entities via a foreign key.
  - Allows navigation between the related entities.

- **Example**:  
  ```java
  @ManyToOne
  @JoinColumn(name = "truck_id", nullable = false)
  private Truck truck;
  ```
  **Effect**:  
  - A `truck_id` column will be created in the `routes` table.
  - This column will store the foreign key referencing the `Truck` entity.

---

#### 7. **`@OneToMany`**
- **What it is**:  
  Establishes a one-to-many relationship between two entities. For example, a truck can have multiple maintenance records.

- **Attributes**:  
  - `mappedBy`: Specifies the field in the other entity that maps this relationship.
  - `fetch`: Defines the fetch type (`LAZY` or `EAGER`).

- **Purpose**:  
  - Creates a relationship where one entity is linked to multiple instances of another.

- **Example**:  
  ```java
  @OneToMany(mappedBy = "truck", cascade = CascadeType.ALL)
  private List<Route> routes;
  ```
  **Effect**:  
  - The `Route` entity has a foreign key (`truck_id`) pointing to the `Truck` entity.
  - Deleting a truck will also delete its associated routes (`CascadeType.ALL`).

---

#### 8. **`@JoinColumn(name = "column_name")`**
- **What it is**:  
  Defines the foreign key column name in the owning entity's table.

- **Purpose**:  
  Links the two tables by specifying the foreign key.

- **Example**:  
  ```java
  @JoinColumn(name = "truck_id", nullable = false)
  private Truck truck;
  ```
  **Effect**: A column named `truck_id` is created in the `routes` table to store the foreign key.

---

#### 9. **`@Enumerated(EnumType.STRING)`**
- **What it is**:  
  Maps an enum to a database column. `EnumType.STRING` stores the enum's name as a string in the database.

- **Purpose**:  
  Store enums in a human-readable format.

- **Example**:  
  ```java
  @Enumerated(EnumType.STRING)
  private TruckStatus status;
  ```
  **Effect**: The `status` field stores values like `"Operational"` or `"In Maintenance"` instead of numeric codes.

---

### Summary of Annotations

| Annotation                  | Purpose                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| `@Entity`                   | Marks the class as a database entity.                                  |
| `@Table`                    | Specifies the table name and other attributes.                         |
| `@Id`                       | Marks the primary key field.                                           |
| `@GeneratedValue`           | Configures primary key generation strategy.                            |
| `@Column`                   | Maps a field to a database column and sets constraints.                |
| `@ManyToOne` / `@OneToMany` | Defines relationships between entities.                                |
| `@JoinColumn`               | Specifies the foreign key column name in relationships.                |
| `@Enumerated`               | Maps enums to database columns.                                        |

Let me know if you'd like further clarification or additional examples!