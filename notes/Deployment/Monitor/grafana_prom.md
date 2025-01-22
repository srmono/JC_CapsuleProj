

---

### **Step-by-Step Guide for Monitoring Spring Boot with Prometheus and Grafana Locally**

---

### **1. Verify Spring Boot Metrics Exposure**

You already have the **Spring Boot** app exposing Prometheus metrics at the `/actuator/prometheus` endpoint. You can check this by navigating to:

- `http://localhost:8081/actuator/prometheus` from your browser.

If you see a list of metrics (e.g., `http_server_requests_seconds_count`, `jvm_memory_used_bytes`, etc.), then everything is set up correctly on the Spring Boot side.

---

### **2. Install Prometheus on Your Local System**

#### **Step 1: Download Prometheus**

1. Go to the [Prometheus Download Page](https://prometheus.io/download/).
2. Download the latest version for **Windows**.
3. Extract the ZIP file to a location on your system (e.g., `C:\prometheus`).

#### **Step 2: Configure Prometheus to Scrape Spring Boot Metrics**

1. In the **Prometheus folder** (`C:\prometheus`), open the `prometheus.yml` configuration file in a text editor.
2. Add the configuration to scrape your Spring Boot application:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'springboot'
    static_configs:
      - targets: ['localhost:8081']
```

- This config tells Prometheus to scrape metrics from your Spring Boot app every 15 seconds.

#### **Step 3: Run Prometheus**

1. Open a Command Prompt window (`cmd`).
2. Navigate to the folder where you extracted Prometheus:
   ```bash
   cd C:\prometheus
   ```
3. Run Prometheus with the following command:
   ```bash
   prometheus.exe --config.file=prometheus.yml
   ```
4. You should see Prometheus start up. It will now be scraping the Spring Boot app at `http://localhost:8081/actuator/prometheus`.

- You can access Prometheus at `http://localhost:9090` to see the data being scraped.

---

### **3. Install Grafana Locally on Windows**

#### **Step 1: Download Grafana**

1. Go to the [Grafana Download Page](https://grafana.com/grafana/download).
2. Download the latest **Windows version**.
3. Extract the ZIP file to a location on your system (e.g., `C:\grafana`).

#### **Step 2: Run Grafana**

1. Open a new Command Prompt window (`cmd`).
2. Navigate to the Grafana folder:
   ```bash
   cd C:\grafana
   ```
3. Run Grafana:
   ```bash
   bin\grafana-server.exe
   ```
4. You should see Grafana start up. It will be available at `http://localhost:3000`.

#### **Step 3: Access Grafana**

- Open your browser and go to `http://localhost:3000`.
- Log in with the default credentials:
  - **Username**: `admin`
  - **Password**: `admin`

---

### **4. Configure Grafana to Use Prometheus as a Data Source**

#### **Step 1: Add Prometheus Data Source in Grafana**

1. In Grafana, click on the **gear icon** (Configuration) in the left sidebar and choose **Data Sources**.
2. Click on **Add data source**.
3. Select **Prometheus**.
4. In the **URL** field, enter:
   ```
   http://localhost:9090
   ```
   (This is the URL where Prometheus is running).
5. Click **Save & Test** to ensure Grafana can connect to Prometheus.

---

### **5. Create a Dashboard in Grafana to Visualize Spring Boot Metrics**

#### **Step 1: Create a New Dashboard**

1. Click on the **+** icon in the left sidebar and choose **Dashboard**.
2. Click on **Add new panel**.

#### **Step 2: Query Prometheus for Spring Boot Metrics**

1. In the **Query** section of the panel, select **Prometheus** as the data source.
2. Type the metric you want to visualize. For example:
   - **HTTP Requests Count**:
     ```promql
     http_server_requests_seconds_count
     ```
   - **JVM Memory Used (Heap)**:
     ```promql
     jvm_memory_used_bytes{area="heap"}
     ```
   - **JVM Garbage Collection Time**:
     ```promql
     jvm_gc_pause_seconds_sum
     ```

#### **Step 3: Visualize the Data**

- You can choose different types of visualizations for each metric:
  - **Graph**: For metrics like request count over time.
  - **Gauge**: For single values like memory usage.
  - **Table**: For displaying raw data.

#### **Step 4: Save the Dashboard**

- Once you’ve added your panels, click the **Save** icon at the top of the dashboard screen.
- Name your dashboard (e.g., "Spring Boot Monitoring") and click **Save**.

---

### **6. Monitor Spring Boot Metrics in Grafana**

Now, you should see real-time metrics of your **Spring Boot** application in **Grafana**. Some useful Spring Boot Prometheus metrics that you can visualize include:

1. **HTTP request count** (`http_server_requests_seconds_count`).
2. **JVM memory usage** (`jvm_memory_used_bytes`).
3. **JVM garbage collection time** (`jvm_gc_pause_seconds_sum`).
4. **Active threads** (`jvm_threads_current`).

You can create multiple panels for each metric type and customize the layout to your preference.

---

### **Summary**

1. **Prometheus** is configured to scrape metrics from your **Spring Boot** app running locally at `http://localhost:8081/actuator/prometheus`.
2. **Grafana** is configured to use Prometheus as a data source.
3. You created a dashboard in Grafana to visualize metrics like HTTP request counts, JVM memory usage, and garbage collection times.

This setup allows you to monitor your **Spring Boot** application metrics on your local system using **Prometheus** and **Grafana**.

