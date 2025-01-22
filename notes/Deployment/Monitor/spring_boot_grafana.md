Setting up **Grafana with Prometheus** and monitoring your **Spring Boot** and **Angular** apps already deployed on your Minikube Kubernetes cluster.

Here’s how to configure **Prometheus and Grafana** to monitor your existing Spring Boot and Angular applications step by step.

---

### **Steps to Monitor Existing Spring Boot and Angular Deployments**

#### **1. Understand What to Monitor**
You can monitor:
1. **Spring Boot Application Metrics**:
   - Using the **Micrometer** library, Spring Boot can expose metrics at `/actuator/prometheus`.
2. **Application Resource Usage**:
   - CPU, Memory, and other pod-level metrics.
3. **Custom Metrics** (Optional):
   - Application-specific business metrics (e.g., number of active users).

---

### **2. Expose Spring Boot Metrics to Prometheus**
#### **Step 1: Enable Prometheus Metrics in Spring Boot**
Ensure you have the following dependencies in your `pom.xml`:
```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### **Step 2: Update `application.properties`**
Add the following to your `application.properties` to enable Prometheus metrics:
```properties
management.endpoints.web.exposure.include=prometheus,health
management.endpoint.prometheus.enabled=true
management.metrics.export.prometheus.enabled=true
```

The metrics will now be available at `http://<springboot-service>:8081/actuator/prometheus`.

---

### **3. Configure Prometheus to Scrape Spring Boot Metrics**
Prometheus needs to scrape the metrics endpoint of your Spring Boot app.

#### **Step 1: Edit the Prometheus Config Map**
Update the Prometheus configuration to scrape metrics from your Spring Boot app. Run the following to edit the Prometheus ConfigMap:
```bash
kubectl edit configmap prometheus-stack-kube-prometheus-prometheus -n monitoring
```

Add a new `scrape_config` entry for your Spring Boot app:
```yaml
- job_name: 'springboot-app'
  static_configs:
    - targets: ['springboot-service:8081']
```

> Replace `springboot-service` with the name of your Spring Boot service.

#### **Step 2: Reload Prometheus**
Prometheus automatically reloads its configuration when the ConfigMap changes.

---

### **4. Monitor Angular App Resource Usage**
For the Angular app, since it’s a static app served via a web server, you don’t typically expose metrics. Instead, monitor its **resource usage** in Kubernetes (e.g., CPU, memory).

1. Grafana’s built-in **Kubernetes Pods** dashboards will show pod-level metrics for the Angular deployment.
2. No additional configuration is needed as Prometheus already scrapes Kubernetes metrics.

---

### **5. Visualize Metrics in Grafana**
#### **Step 1: Access Grafana**
- Open Grafana at `http://localhost:3000`.
- Log in using the default credentials (`admin`/`prom-operator`).

#### **Step 2: Import a Dashboard**
1. Go to **Dashboards > Import**.
2. Use a pre-built dashboard ID:
   - Spring Boot Dashboard: **4701**
   - Kubernetes Pods Dashboard: **6417**
3. Configure the data source as Prometheus.

#### **Step 3: Explore Metrics**
1. View metrics for the Spring Boot app under the Spring Boot dashboard.
   - Example metrics: `http_server_requests_seconds_count`, `jvm_memory_used_bytes`.
2. Check resource usage for Angular pods in the Kubernetes dashboard.

---

### **6. Verify Monitoring**
1. Deploy your Spring Boot app:
   ```bash
   kubectl apply -f k8s/springboot-deployment.yaml
   ```
2. Deploy your Angular app:
   ```bash
   kubectl apply -f k8s/angular-deployment.yaml
   ```
3. Check the Prometheus UI (`http://localhost:9090`) for Spring Boot metrics.
   - Query: `http_server_requests_seconds_count`
4. Check Grafana for visualized dashboards.

---

### **7. Summary**
1. **Spring Boot**:
   - Exposes Prometheus metrics via `/actuator/prometheus`.
   - Prometheus scrapes these metrics and visualizes them in Grafana.
2. **Angular**:
   - Monitored using Kubernetes-level metrics (CPU, memory).
3. Use Grafana dashboards to visualize application and pod performance.
