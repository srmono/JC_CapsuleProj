### Spring Boot Version
This implementation is compatible with **Spring Boot 3.x**. Ensure you are using Java 17 or higher since Spring Boot 3.x requires it.

---

### Required Dependencies for `pom.xml`
1. **Spring Boot Starter Web**  
   ```xml
   <dependency >
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   ```

2. **Spring Boot Starter Data JPA**  
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-jpa</artifactId>
   </dependency>
   ```

3. **MySQL Driver**  
   ```xml
   <dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
   </dependency>
   ```

4. **Lombok** (For reducing boilerplate code like getters, setters, etc.)  
   ```xml
   <dependency>
       <groupId>org.projectlombok</groupId>
       <artifactId>lombok</artifactId>
       <scope>provided</scope>
   </dependency>
   ```

5. **Spring Boot Starter Test** (Optional, for testing purposes)  
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-test</artifactId>
       <scope>test</scope>
   </dependency>
   ```

6. **Jakarta Persistence API (JPA)** (Required for `@Entity`)  
   This comes with `spring-boot-starter-data-jpa`, no need to add separately.

---

### Optional Dependencies
1. **Spring Boot DevTools** (For hot-reloading during development)  
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-devtools</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```

2. **Validation API (for additional DTO validation)**  
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-validation</artifactId>
   </dependency>
   ```

