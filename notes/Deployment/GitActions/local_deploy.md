When working on a local system and using **Kubernetes (Minikube)**, you don't need cloud services like Azure for deployment. Here's how you can adjust and implement the CI/CD process **locally** while using **GitHub Actions** for CI (build and test) but deploying manually to your local Minikube cluster for CD.

---

## **1. Steps Overview**
### Continuous Integration (CI):
- Build, test, and create Docker images for Spring Boot and Angular using GitHub Actions.

### Continuous Deployment (CD):
- Deploy Docker images to your local Minikube manually or automate deployment using a script.

---

## **2. Adjust GitHub Actions for Local Deployment**

Update your GitHub Actions workflows to skip deployment (`deploy` job). Instead, you can **push Docker images** to a local Docker registry or save them to a tarball for manual loading.

### Spring Boot Workflow (Example)
Update `.github/workflows/springboot-ci-cd.yaml`:
```yaml
name: Spring Boot CI/CD

on:
  push:
    branches:
      - main

jobs:
  build-test:
    name: Build and Test Spring Boot App
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: 17
        distribution: 'temurin'

    - name: Cache Maven Dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
        restore-keys: ${{ runner.os }}-maven

    - name: Build with Maven
      run: ./mvnw clean package

    - name: Run Tests
      run: ./mvnw test

  build-docker:
    name: Build Docker Image
    needs: build-test
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Build Docker Image
      run: |
        docker build -t springboot-app:latest .

    - name: Save Docker Image as Tarball
      run: |
        docker save springboot-app:latest > springboot-app.tar
    - name: Upload Artifact
      uses: actions/upload-artifact@v3
      with:
        name: springboot-app
        path: springboot-app.tar
```

### Angular Workflow (Example)
Update `.github/workflows/angular-ci-cd.yaml` similarly to save the Angular Docker image as a tarball:
```yaml
  build-docker:
    name: Build Docker Image
    needs: build-test
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Build Docker Image
      run: |
        docker build -t angular-app:latest .

    - name: Save Docker Image as Tarball
      run: |
        docker save angular-app:latest > angular-app.tar
    - name: Upload Artifact
      uses: actions/upload-artifact@v3
      with:
        name: angular-app
        path: angular-app.tar
```

---

## **3. Manual Deployment on Minikube**

### Step 1: Load Docker Images into Minikube
1. Download the tarball files from GitHub Actions artifacts (you can find these in the **Actions** tab under the workflow run).
2. Transfer the tarballs to your local system.
3. Load the Docker images into Minikube:
   ```bash
   minikube image load springboot-app.tar
   minikube image load angular-app.tar
   ```

### Step 2: Apply Kubernetes Manifests
Ensure your Kubernetes manifests are correctly configured for Minikube. Update image references to `springboot-app:latest` and `angular-app:latest` since these are the image tags loaded into Minikube.

Example: `k8s/springboot-deployment.yaml`
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
        image: springboot-app:latest # Use Minikube-loaded image
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
  selector:
    app: springboot
  ports:
    - port: 8081
      targetPort: 8081
```

Deploy to Minikube:
```bash
kubectl apply -f k8s/springboot-deployment.yaml
kubectl apply -f k8s/angular-deployment.yaml
```

### Step 3: Access the Applications
1. Start Minikube's tunnel to expose services:
   ```bash
   minikube tunnel
   ```
2. Access Angular using the NodePort assigned to the `angular-service` (e.g., `http://<minikube-ip>:30080`).

---

## **4. Verify Setup**
1. Monitor Pods to ensure they're running:
   ```bash
   kubectl get pods
   ```
2. Check the services:
   ```bash
   kubectl get services
   ```
3. Debug logs if needed:
   ```bash
   kubectl logs <pod-name>
   ```

---

This setup ensures that:
- GitHub Actions handles building and testing your applications.
- Docker images are stored as tarballs for manual loading into Minikube.
- Kubernetes manifests are used to deploy the applications locally.