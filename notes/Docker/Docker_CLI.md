The Docker CLI (Command-Line Interface) provides a set of commands to interact with Docker's features, manage containers, images, networks, and volumes, and perform other container-related tasks. Here's an overview of some of the most commonly used Docker CLI commands:

### **1. Docker Version and Info**
- **`docker --version`**: Displays the current version of Docker installed.
  ```bash
  docker --version
  ```
- **`docker info`**: Provides detailed information about your Docker installation, including number of containers, images, and the Docker runtime.
  ```bash
  docker info
  ```

### **2. Docker Images**
- **`docker images`**: Lists all available images on your local machine.
  ```bash
  docker images
  ```
- **`docker pull <image>`**: Pulls an image from a Docker registry (e.g., Docker Hub).
  ```bash
  docker pull ubuntu:20.04
  ```
- **`docker build -t <image_name> <path>`**: Builds an image from a Dockerfile in the specified directory.
  ```bash
  docker build -t my_image .
  ```
- **`docker rmi <image_id>`**: Removes a Docker image.
  ```bash
  docker rmi my_image
  ```

### **3. Docker Containers**
- **`docker ps`**: Lists running containers.
  ```bash
  docker ps
  ```
- **`docker ps -a`**: Lists all containers, including stopped ones.
  ```bash
  docker ps -a
  ```
- **`docker run <image>`**: Runs a container from the specified image.
  ```bash
  docker run -d -p 8080:80 nginx
  ```
  - `-d`: Run in detached mode (in the background).
  - `-p`: Port mapping from the host to the container.
- **`docker exec -it <container_id> <command>`**: Executes a command inside a running container.
  ```bash
  docker exec -it my_container bash
  ```
- **`docker stop <container_id>`**: Stops a running container.
  ```bash
  docker stop my_container
  ```
- **`docker start <container_id>`**: Starts a stopped container.
  ```bash
  docker start my_container
  ```
- **`docker restart <container_id>`**: Restarts a running or stopped container.
  ```bash
  docker restart my_container
  ```
- **`docker rm <container_id>`**: Removes a stopped container.
  ```bash
  docker rm my_container
  ```

### **4. Docker Logs**
- **`docker logs <container_id>`**: Fetches logs from a running or stopped container.
  ```bash
  docker logs my_container
  ```
- **`docker logs -f <container_id>`**: Follows the logs of a container in real time.
  ```bash
  docker logs -f my_container
  ```

### **5. Docker Volumes**
- **`docker volume ls`**: Lists all Docker volumes.
  ```bash
  docker volume ls
  ```
- **`docker volume create <volume_name>`**: Creates a new volume.
  ```bash
  docker volume create my_volume
  ```
- **`docker volume rm <volume_name>`**: Removes a volume.
  ```bash
  docker volume rm my_volume
  ```

### **6. Docker Networks**
- **`docker network ls`**: Lists all Docker networks.
  ```bash
  docker network ls
  ```
- **`docker network create <network_name>`**: Creates a new Docker network.
  ```bash
  docker network create my_network
  ```
- **`docker network inspect <network_name>`**: Inspects a specific network.
  ```bash
  docker network inspect my_network
  ```

### **7. Docker Compose (if installed)**
Docker Compose is used for managing multi-container Docker applications. It is run through a `docker-compose.yml` configuration file.

- **`docker-compose up`**: Starts all the services defined in the `docker-compose.yml` file.
  ```bash
  docker-compose up
  ```
- **`docker-compose up -d`**: Starts services in detached mode (background).
  ```bash
  docker-compose up -d
  ```
- **`docker-compose down`**: Stops and removes all containers defined in the `docker-compose.yml` file.
  ```bash
  docker-compose down
  ```

### **8. Docker System Commands**
- **`docker system df`**: Shows disk space usage by Docker objects (images, containers, volumes, etc.).
  ```bash
  docker system df
  ```
- **`docker system prune`**: Removes unused Docker objects (stopped containers, unused images, volumes).
  ```bash
  docker system prune
  ```
  - To prune everything (including volumes), use `docker system prune -a`.

### **9. Docker Container Health Checks**
- **`docker inspect <container_id>`**: Provides detailed information about a container, including its health status.
  ```bash
  docker inspect my_container
  ```

### **10. Docker Registry Commands**
- **`docker login`**: Logs into Docker Hub (or any custom registry).
  ```bash
  docker login
  ```
- **`docker logout`**: Logs out from Docker Hub (or any custom registry).
  ```bash
  docker logout
  ```
- **`docker push <image>`**: Pushes an image to a Docker registry.
  ```bash
  docker push my_image
  ```

### **11. Docker Build and Push Workflow**
- **Build an Image:**
  ```bash
  docker build -t username/my_image .
  ```
- **Push the Image:**
  ```bash
  docker push username/my_image
  ```

### **12. Docker Attach and Disconnect**
- **`docker attach <container_id>`**: Attach to a running container to interact with it.
  ```bash
  docker attach my_container
  ```
- **`Ctrl+C`**: Detach from the container without stopping it.
- **`docker detach`**: Detach from the container programmatically.

### **13. Docker Events**
- **`docker events`**: Monitors real-time events from the Docker daemon.
  ```bash
  docker events
  ```

