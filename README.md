# Build Docker Image after changes in src or similar
sudo docker build -t ipn-generator-web:0.1.1 .

# Start the docker image
sudo docker compose up -d