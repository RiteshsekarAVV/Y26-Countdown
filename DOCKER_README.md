# Docker Setup for Yugam Date Launch

This project is dockerized and can be run using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Build and run the container:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f frontend
   ```

## Access the Application

Once the container is running, access the application at:
- **http://localhost:5133**

## Environment Variables

If you need to set environment variables (e.g., Firebase configuration), create a `.env` file in the project root. The `.env` file is excluded from the Docker build for security.

For production, you can:
1. Use Docker secrets
2. Pass environment variables in `docker-compose.yml`
3. Use a `.env` file (not recommended for production)

## Building Manually

If you want to build the Docker image manually:

```bash
docker build -t yugam-date-launch .
docker run -p 5133:80 yugam-date-launch
```

## Troubleshooting

- **Port already in use:** Change the port in `docker-compose.yml` (e.g., `"5134:80"`)
- **Build fails:** Make sure all dependencies are in `package.json`
- **Assets not loading:** Check that the `public` folder is included in the build

## Production Deployment

For production:
1. Set up proper environment variables
2. Use a reverse proxy (nginx/traefik) in front of the container
3. Enable HTTPS/SSL
4. Set up proper logging and monitoring

