#!/usr/bin/env bash
set -e

PROJECT_NAME=my-next-app-test
COMPOSE_FILE=docker-compose.testing.yml

echo "Starting test containers..."
docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d

cleanup() {
  echo "Stopping test containers..."
  docker compose -p $PROJECT_NAME -f $COMPOSE_FILE down -v
}
trap cleanup EXIT

echo "Waiting for Postgres to be healthy..."

until docker inspect --format='{{.State.Health.Status}}' unido-postgres-test 2>/dev/null | grep -q healthy; do
  sleep 1
done

echo "Postgres is ready"

echo "Running integration tests..."
npm run test