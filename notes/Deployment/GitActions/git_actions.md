Setting up CI/CD for a Spring Boot and Angular app with **GitHub Actions** involves building, testing, and deploying the applications. Here's a step-by-step guide to achieve this:

---

## **1. Define the Workflow Directory**
GitHub Actions workflows are defined in YAML files located in `.github/workflows` in your repository.

---

## **2. Spring Boot Workflow**
For the Spring Boot app, we will:
- Build the JAR file.
- Run tests.
- Push the Docker image to a container registry.
- Deploy it to Kubernetes.

### Workflow: `.github/workflows/springboot-ci-cd.yaml`
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
    name: Build and Push Docker Image
    needs: build-test
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and Push Docker Image
      run: |
        docker build -t ${{ secrets.DOCKER_USERNAME }}/springboot-app:latest .
        docker push ${{ secrets.DOCKER_USERNAME }}/springboot-app:latest

  deploy:
    name: Deploy to Kubernetes
    needs: build-docker
    runs-on: ubuntu-latest

    steps:
    - name: Set up kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.26.0'

    - name: Configure Kubernetes
      run: |
        echo "${{ secrets.KUBECONFIG_JSON }}" > kubeconfig.json
        export KUBECONFIG=kubeconfig.json

    - name: Apply Kubernetes Manifests
      run: |
        kubectl apply -f k8s/springboot-deployment.yaml
```

---

## **3. Angular Workflow**
For the Angular app, we will:
- Install dependencies.
- Run tests.
- Build the production code.
- Push the Docker image to a container registry.
- Deploy it to Kubernetes.

### Workflow: `.github/workflows/angular-ci-cd.yaml`
```yaml
name: Angular CI/CD

on:
  push:
    branches:
      - main

jobs:
  build-test:
    name: Build and Test Angular App
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Cache Node Modules
      uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: ${{ runner.os }}-node

    - name: Install Dependencies
      run: npm install

    - name: Run Tests
      run: npm test

    - name: Build Angular App
      run: npm run build -- --configuration production

  build-docker:
    name: Build and Push Docker Image
    needs: build-test
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and Push Docker Image
      run: |
        docker build -t ${{ secrets.DOCKER_USERNAME }}/angular-app:latest .
        docker push ${{ secrets.DOCKER_USERNAME }}/angular-app:latest

  deploy:
    name: Deploy to Kubernetes
    needs: build-docker
    runs-on: ubuntu-latest

    steps:
    - name: Set up kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.26.0'

    - name: Configure Kubernetes
      run: |
        echo "${{ secrets.KUBECONFIG_JSON }}" > kubeconfig.json
        export KUBECONFIG=kubeconfig.json

    - name: Apply Kubernetes Manifests
      run: |
        kubectl apply -f k8s/angular-deployment.yaml
```

---

## **4. Setting Up Secrets**
You need to add the following secrets in your GitHub repository:
1. **DOCKER_USERNAME**: Your Docker Hub username.
2. **DOCKER_PASSWORD**: Your Docker Hub password.
3. **KUBECONFIG_JSON**: The kubeconfig file contents to authenticate with your Kubernetes cluster.

To add secrets:
1. Go to your repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions > New repository secret**.
3. Add the secrets with their corresponding values.

---

## **5. Kubernetes Manifests**
Ensure you have Kubernetes manifests for both applications. Place them in a `k8s/` directory in your repository.

### Spring Boot Deployment: `k8s/springboot-deployment.yaml`
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
        image: <your-docker-username>/springboot-app:latest
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

### Angular Deployment: `k8s/angular-deployment.yaml`
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
        image: <your-docker-username>/angular-app:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: angular-service
spec:
  type: NodePort
  selector:
    app: angular
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
```

---

## **6. Run the Workflows**
1. Push your changes to the `main` branch.
2. Navigate to the **Actions** tab in your GitHub repository.
3. Monitor the workflows for success.

---

