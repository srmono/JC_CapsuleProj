 **step-by-step guide with detailed commands** to deploy your Angular, Spring Boot, and MySQL apps on Minikube using Kubernetes. 

---

### **Step 1: Install Prerequisites**

1. **Install Docker**  
   Download Docker for Windows from [here](https://www.docker.com/products/docker-desktop) and install it.

2. **Install Minikube**  
   Follow the guide [here](https://minikube.sigs.k8s.io/docs/start/) to install Minikube on Windows.

3. **Install kubectl**  
   Download and install kubectl using [this guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

4. **Verify Installation**:
   Run these commands in the terminal:
   ```bash
   docker --version
   minikube version
   kubectl version --client
   ```

   If you see versions for all tools, you’re ready to proceed.

---

### **Step 2: Start Minikube**

1. Start Minikube:
   ```bash
   minikube start --driver=docker
   ```

2. Verify it’s running:
   ```bash
   minikube status
   ```

---

### **Step 3: Create Docker Images**

#### **A. MySQL**
1. Use the official MySQL image. No Dockerfile is needed.
2. Create a Kubernetes Secret to securely store the MySQL credentials later.

---

#### **B. Spring Boot**

1. **Build the JAR**:
   Navigate to your Spring Boot project directory and run:
   ```bash
   ./mvnw clean package
   ```

   This generates a `target/fleetsystem-0.0.1-SNAPSHOT.jar`.

2. **Create a Dockerfile**:
   Create a `Dockerfile` in the Spring Boot project root:
   ```dockerfile
   FROM openjdk:17-jdk-slim
   VOLUME /tmp
   ARG JAR_FILE=target/fleetsystem-0.0.1-SNAPSHOT.jar
   COPY ${JAR_FILE} app.jar
   ENTRYPOINT ["java", "-jar", "/app.jar"]
   ```

3. **Build the Docker Image**:
   Run:
   ```bash
   docker build -t fleetsystem:latest .
   ```

4. **Verify Image**:
   ```bash
   docker images
   ```

---

#### **C. Angular**

1. **Build Angular**:
   Navigate to your Angular project directory and run:
   ```bash
   npm install
   ng build --configuration production
   ```

2. **Create a Dockerfile**:
   Create a `Dockerfile` in the Angular project root:
   ```dockerfile
   FROM node:18 as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build --prod

   FROM nginx:alpine
   COPY --from=build /app/dist/<angular-app-name> /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```
   Replace `<angular-app-name>` with your Angular app name (output folder in `dist`).

3. **Build the Docker Image**:
   ```bash
   docker build -t angularapp:latest .
   ```

4. **Verify Image**:
   ```bash
   docker images
   ```

---

### **Step 4: Deploy on Kubernetes**

#### **A. Deploy MySQL**
1. Create a file named `mysql-deployment.yaml`:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mysql-deployment
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: mysql
     template:
       metadata:
         labels:
           app: mysql
       spec:
         containers:
         - name: mysql
           image: mysql:8.0
           ports:
           - containerPort: 3306
           env:
           - name: MYSQL_ROOT_PASSWORD
             value: password
           - name: MYSQL_DATABASE
             value: fleet
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: mysql-service
   spec:
     ports:
     - port: 3306
     selector:
       app: mysql
   ```

2. Apply the configuration:
   ```bash
   kubectl apply -f mysql-deployment.yaml
   ```

3. Verify the deployment:
   ```bash
   kubectl get pods
   ```

---

#### **B. Deploy Spring Boot**
1. Create a file named `springboot-deployment.yaml`:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: springboot-deployment
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: springboot
     template:
       metadata:
         labels:
           app: springboot
       spec:
         containers:
         - name: springboot
           image: fleetsystem:latest
           ports:
           - containerPort: 8081
           env:
           - name: SPRING_DATASOURCE_URL
             value: jdbc:mysql://mysql-service:3306/fleet
           - name: SPRING_DATASOURCE_USERNAME
             value: root
           - name: SPRING_DATASOURCE_PASSWORD
             value: password
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: springboot-service
   spec:
     ports:
     - port: 8081
     selector:
       app: springboot
   ```

2. Apply the configuration:
   ```bash
   kubectl apply -f springboot-deployment.yaml
   ```

3. Verify the deployment:
   ```bash
   kubectl get pods
   ```

---

#### **C. Deploy Angular**
1. Create a file named `angular-deployment.yaml`:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: angular-deployment
   spec:
     replicas: 1
     selector:
       matchLabels:
         app: angular
     template:
       metadata:
         labels:
           app: angular
       spec:
         containers:
         - name: angular
           image: angularapp:latest
           ports:
           - containerPort: 80
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: angular-service
   spec:
     type: NodePort
     ports:
     - port: 80
       nodePort: 30080
     selector:
       app: angular
   ```

2. Apply the configuration:
   ```bash
   kubectl apply -f angular-deployment.yaml
   ```

3. Verify the deployment:
   ```bash
   kubectl get pods
   ```

---

### **Step 5: Access the Applications**

1. **Angular**:
   ```bash
   minikube service angular-service
   ```

2. **Spring Boot**:
   Forward port 8081:
   ```bash
   kubectl port-forward service/springboot-service 8081:8081
   ```

3. **Verify MySQL Connection**:
   Access the Spring Boot backend and check logs to confirm the connection with MySQL.

---

Yes, you’ll need to adjust both your `application.properties` in Spring Boot and the Angular API URL to ensure they correctly access the database and backend when deployed in Kubernetes. Here's what to change:

---

### **1. Spring Boot `application.properties` Changes**
The Spring Boot application will need to connect to the MySQL database service in Kubernetes, not the local MySQL instance. Update your `application.properties` as follows:

#### Original:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fleet
spring.datasource.username=root
spring.datasource.password=password
```

#### Updated:
```properties
spring.datasource.url=jdbc:mysql://mysql-service:3306/fleet
spring.datasource.username=root
spring.datasource.password=password
```

#### Explanation:
- Replace `localhost` with the name of the MySQL service in Kubernetes, which is `mysql-service` as defined in the `mysql-deployment.yaml` file.
- The port (`3306`) and database name (`fleet`) remain unchanged.

---

### **2. Angular API URL Changes**
Your Angular app will also not connect to `localhost` when running inside Kubernetes. Instead, it needs to access the Spring Boot service through its Kubernetes service name. Update the API URL in your Angular app accordingly.

#### Original:
```typescript
private apiUrl = `http://localhost:3001/trucks`;
```

#### Updated:
```typescript
private apiUrl = `http://springboot-service:8081/trucks`;
```

#### Explanation:
- Replace `localhost:3001` with `springboot-service:8081`, which is the service name and port exposed by the Spring Boot service in Kubernetes.

---

### **3. Optional: Adjust for Local Development**
If you want to keep your existing setup for local development and only apply these changes when deploying to Kubernetes, you can use profiles or environment-specific configurations.

#### Spring Boot: Use Profiles
1. Create a new `application-kubernetes.properties` file:
   ```properties
   spring.datasource.url=jdbc:mysql://mysql-service:3306/fleet
   spring.datasource.username=root
   spring.datasource.password=password
   ```

2. Specify the profile during Kubernetes deployment by setting the `SPRING_PROFILES_ACTIVE` environment variable in the `springboot-deployment.yaml`:
   ```yaml
   env:
   - name: SPRING_PROFILES_ACTIVE
     value: kubernetes
   ```

#### Angular: Use Environment Files
1. Update `src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'http://springboot-service:8081'
   };
   ```

2. In your service, use the environment variable:
   ```typescript
   import { environment } from '../environments/environment';
   private apiUrl = `${environment.apiUrl}/trucks`;
   ```

---

### **4. Verify Connection in Kubernetes**
After deploying, test the connections:
1. Check logs of the Spring Boot app to verify it connects to the MySQL database:
   ```bash
   kubectl logs <springboot-pod-name>
   ```
   Look for messages indicating a successful database connection.

2. Access the Angular app:
   ```bash
   minikube service angular-service
   ```
   Navigate through the UI and ensure it can fetch data from the Spring Boot backend.

