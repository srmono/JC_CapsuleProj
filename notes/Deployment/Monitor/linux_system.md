**Monitoring and Logging** 

---

### **1. Introduction to Monitoring and Logging**
#### **Monitoring**
- **What is Monitoring?**
  - Tracking the performance and health of your applications and infrastructure.
- **Why Monitoring is Important?**
  - Helps identify issues before they become critical.
  - Provides insights into system performance.
- **Prometheus + Grafana Overview:**
  - **Prometheus:** Open-source monitoring and alerting tool.
  - **Grafana:** Visualization and dashboarding tool, integrates with Prometheus.

#### **Logging**
- **What is Logging?**
  - Capturing and storing system and application logs.
- **Why Logging is Important?**
  - Debugging and identifying the root cause of issues.
- **ELK Stack Overview:**
  - **Elasticsearch:** Stores and indexes logs.
  - **Logstash:** Processes and ships logs.
  - **Kibana:** Visualizes logs.

---

### **2. Monitoring with Prometheus and Grafana**

#### **Step 1: Set Up Prometheus**
1. Download the Prometheus binary:
   ```bash
   wget https://github.com/prometheus/prometheus/releases/download/v2.46.0/prometheus-2.46.0.linux-amd64.tar.gz
   tar -xvf prometheus-2.46.0.linux-amd64.tar.gz
   cd prometheus-2.46.0.linux-amd64
   ```
2. Modify `prometheus.yml` (default config file) to scrape your local system:
   ```yaml
   scrape_configs:
     - job_name: 'local-system'
       static_configs:
         - targets: ['localhost:9090']
   ```
3. Start Prometheus:
   ```bash
   ./prometheus
   ```
4. Access the Prometheus UI at `http://localhost:9090`.

#### **Step 2: Set Up Grafana**
1. Download and install Grafana:
   ```bash
   wget https://dl.grafana.com/enterprise/release/grafana-enterprise-10.1.0.linux-amd64.tar.gz
   tar -xvf grafana-enterprise-10.1.0.linux-amd64.tar.gz
   cd grafana-10.1.0
   ./bin/grafana-server
   ```
2. Access Grafana at `http://localhost:3000` (default credentials: `admin` / `admin`).
3. Add Prometheus as a Data Source:
   - Go to **Settings > Data Sources > Add Data Source**.
   - Choose **Prometheus** and provide the URL: `http://localhost:9090`.

#### **Step 3: Create a Dashboard in Grafana**
1. Go to **Create > Dashboard**.
2. Add a new panel and query Prometheus metrics (e.g., `up`, `node_cpu_seconds_total`).
3. Save the dashboard and explain how it helps monitor metrics.

---

### **3. Logging with ELK Stack**

#### **Step 1: Set Up Elasticsearch**
1. Download Elasticsearch:
   ```bash
   wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.10.2-linux-x86_64.tar.gz
   tar -xvf elasticsearch-8.10.2-linux-x86_64.tar.gz
   cd elasticsearch-8.10.2
   ./bin/elasticsearch
   ```
2. Access Elasticsearch at `http://localhost:9200`.

#### **Step 2: Set Up Kibana**
1. Download Kibana:
   ```bash
   wget https://artifacts.elastic.co/downloads/kibana/kibana-8.10.2-linux-x86_64.tar.gz
   tar -xvf kibana-8.10.2-linux-x86_64.tar.gz
   cd kibana-8.10.2
   ./bin/kibana
   ```
2. Access Kibana at `http://localhost:5601`.

#### **Step 3: Set Up Logstash**
1. Download Logstash:
   ```bash
   wget https://artifacts.elastic.co/downloads/logstash/logstash-8.10.2-linux-x86_64.tar.gz
   tar -xvf logstash-8.10.2-linux-x86_64.tar.gz
   cd logstash-8.10.2
   ```
2. Create a configuration file `logstash.conf`:
   ```bash
   input {
     file {
       path => "/var/log/syslog"
       start_position => "beginning"
     }
   }
   output {
     elasticsearch {
       hosts => ["http://localhost:9200"]
       index => "logs"
     }
   }
   ```
3. Start Logstash:
   ```bash
   ./bin/logstash -f logstash.conf
   ```

#### **Step 4: Visualize Logs in Kibana**
1. In Kibana, go to **Management > Index Patterns** and create an index for `logs`.
2. Navigate to **Discover** to view real-time logs.



