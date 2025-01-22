Monitoring Kubernetes using Grafana with Helm can be broken down into simple steps. I'll guide you through the process, step by step, to set up Grafana monitoring on your Kubernetes cluster.

### Prerequisites:
- You need a Kubernetes cluster (e.g., Minikube, EKS, GKE, AKS, etc.)
- Helm 3.x installed
- kubectl configured to access your Kubernetes cluster

### Step 1: Install Helm
If you don't have Helm installed, follow these commands:

#### For macOS (using Homebrew):
```bash
brew install helm
```

#### For Linux:
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### Step 2: Add the Grafana Helm repository
To start, you need to add the Helm repository that contains the Grafana charts.

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

### Step 3: Install Prometheus
Prometheus is often used with Grafana for collecting metrics from your Kubernetes cluster. We will use Helm to install Prometheus.

```bash
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

This will:
- Install Prometheus
- Install the Prometheus Operator
- Set up basic monitoring for your Kubernetes cluster

### Step 4: Verify the Installation
Check the pods in the `monitoring` namespace to make sure everything is running:

```bash
kubectl get pods -n monitoring
```

You should see multiple pods running for Prometheus, Grafana, and the necessary exporters.

### Step 5: Get the Grafana Admin Password
The Grafana dashboard is installed as part of the `kube-prometheus-stack` chart. To log in, you'll need to get the default admin password.

```bash
kubectl get secret prometheus-grafana -n monitoring -o jsonpath='{.data.admin-password}' | base64 --decode ; echo
```

### Step 6: Port-Forward to Access Grafana
Now that Grafana is installed, you can access the Grafana dashboard by port-forwarding to your local machine.

```bash
kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80
```

This will make Grafana available at `http://localhost:3000` on your local machine.

### Step 7: Log in to Grafana
- Open your browser and go to `http://localhost:3000`
- Username: `admin`
- Password: The one you obtained from the previous step

### Step 8: Configure Data Source in Grafana
Grafana should automatically detect Prometheus as a data source (since Prometheus was installed via the `kube-prometheus-stack` chart). However, if you need to configure it manually, follow these steps:

1. Go to the Grafana web UI (http://localhost:3000).
2. Log in with the `admin` credentials.
3. On the left side, click on the gear icon ⚙️ (Configuration).
4. Click on **Data Sources**.
5. Add a new data source and select **Prometheus**.
6. For the **URL**, use the following:
   ```
   http://prometheus-operated.monitoring.svc.cluster.local:9090
   ```
7. Click **Save & Test** to ensure it connects.

### Step 9: Import Dashboards
Grafana has a wide selection of pre-built dashboards for Kubernetes monitoring. You can import them by following these steps:

1. In the Grafana UI, click on the `+` icon on the left panel.
2. Click **Import**.
3. You can enter the dashboard ID or use a file. For Kubernetes, a popular dashboard ID is `315` (Kubernetes cluster monitoring).

For ID `315`, use the following:
- Dashboard ID: `315`
- Data Source: **Prometheus**

Click **Load** and then **Import**.

### Step 10: Explore the Dashboards
Once the dashboard is imported, you can explore various metrics such as:
- Node stats
- Pod stats
- CPU/Memory usage
- Network Traffic
- Disk I/O

### Step 11: (Optional) Set Up Persistent Storage for Prometheus
By default, Prometheus does not have persistent storage. You can enable persistent storage by editing the Prometheus Helm release:

```bash
helm upgrade prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=10Gi
```

This will request a Persistent Volume for Prometheus with 10GB of storage.

### Step 12: (Optional) Set Up Alerts in Grafana
You can configure alerts to monitor your cluster. To do so:
1. Go to **Alerting** in the left menu.
2. Select **Notification Channels** to set up email, Slack, etc.
3. Create **Alert Rules** to monitor specific metrics.

### Step 13: Cleanup (Optional)
If you want to remove the monitoring stack (Prometheus + Grafana) from your Kubernetes cluster:

```bash
helm uninstall prometheus -n monitoring
kubectl delete namespace monitoring
```

### Conclusion
You’ve successfully set up Grafana with Prometheus to monitor your Kubernetes cluster using Helm! You can now explore metrics and even set up alerts for your Kubernetes resources.