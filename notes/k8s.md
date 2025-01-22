Kubernetes (K8s) is an open-source platform for automating the deployment, scaling, and management of containerized applications. Here's a breakdown of Kubernetes fundamentals:

---

## **1. Core Concepts**
### **1.1 Cluster**
- A Kubernetes cluster is the foundation. It consists of:
  - **Control Plane**: Manages the cluster.
  - **Nodes**: Machines (physical or virtual) that run containerized applications.

### **1.2 Nodes**
- **Master Node**: Hosts the Control Plane components:
  - **API Server**: Exposes the Kubernetes API.
  - **Scheduler**: Assigns workloads (Pods) to nodes.
  - **Controller Manager**: Handles tasks like replication and node health.
  - **etcd**: Key-value store for cluster state.
- **Worker Nodes**: Run application containers and include:
  - **Kubelet**: Communicates with the API server.
  - **Kube-proxy**: Manages network communication.
  - **Container Runtime**: Runs containers (e.g., Docker, containerd).

---

## **2. Kubernetes Objects**
Kubernetes uses objects to define the desired state of applications and resources.

### **2.1 Pods**
- Smallest deployable unit in Kubernetes.
- Represents one or more containers that share:
  - Network namespace (IP address).
  - Storage (volumes).
- Example:
  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: my-pod
  spec:
    containers:
    - name: nginx-container
      image: nginx
  ```

### **2.2 Deployments**
- Manages the lifecycle of Pods.
- Enables rolling updates and rollbacks.
- Example:
  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: my-deployment
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: my-app
    template:
      metadata:
        labels:
          app: my-app
      spec:
        containers:
        - name: my-container
          image: nginx
  ```

### **2.3 Services**
- Expose Pods to external or internal traffic.
- Types:
  - **ClusterIP**: Default; accessible within the cluster.
  - **NodePort**: Exposes a port on each node.
  - **LoadBalancer**: Integrates with cloud load balancers.
- Example:
  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: my-service
  spec:
    selector:
      app: my-app
    ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
    type: ClusterIP
  ```

### **2.4 ConfigMaps and Secrets**
- **ConfigMaps**: Store non-sensitive configuration data.
- **Secrets**: Store sensitive data (e.g., passwords).
- Example ConfigMap:
  ```yaml
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: my-config
  data:
    key1: value1
  ```

---

## **3. Networking**
- Each Pod gets its own IP address.
- **CNI (Container Network Interface)** plugins (e.g., Calico, Flannel) manage networking.
- **Ingress**: Provides HTTP and HTTPS routing to services.

---

## **4. Storage**
- Persistent storage is managed via:
  - **Persistent Volumes (PV)**: Pre-provisioned storage.
  - **Persistent Volume Claims (PVC)**: Request storage from PVs.
  - Example PVC:
    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: my-pvc
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 1Gi
    ```

---

## **5. Scaling**
- **Horizontal Pod Autoscaler (HPA)**: Adjusts the number of Pods based on metrics (e.g., CPU usage).
- **Vertical Pod Autoscaler (VPA)**: Adjusts resource requests and limits.
- **Cluster Autoscaler**: Scales the number of nodes.

---

## **6. Monitoring and Logging**
- Tools:
  - **Prometheus**: Metrics collection.
  - **Grafana**: Visualization.
  - **ELK Stack (Elasticsearch, Logstash, Kibana)**: Centralized logging.

---

## **7. Commands with `kubectl`**
- View cluster info:
  ```bash
  kubectl cluster-info
  ```
- Get all nodes:
  ```bash
  kubectl get nodes
  ```
- Get all Pods:
  ```bash
  kubectl get pods
  ```
- Apply a YAML file:
  ```bash
  kubectl apply -f file.yaml
  ```

---

## **8. Advanced Concepts**
- **Namespaces**: Isolate resources within the cluster.
- **Helm**: A package manager for Kubernetes.
- **StatefulSets**: Manage stateful applications.
- **DaemonSets**: Ensure one Pod runs on each node.
- **Jobs and CronJobs**: For one-time or scheduled tasks.

---

