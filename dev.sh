#!/bin/bash

set -e

echo "Starting backend..."
cd backend
yarn dev &
BACKEND_PID=$!

echo "Starting frontend..."
cd ../frontend
yarn dev &
FRONTEND_PID=$!

# Cleanup on exit
cleanup() {
	echo "Stopping servers..."
	kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
}
trap cleanup EXIT

echo "Both servers running."
wait $BACKEND_PID $FRONTEND_PID
