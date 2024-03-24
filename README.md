# Story Verse

Introduction
Welcome to our project, a unique venture into storytelling, gaming, and the expansive possibilities of Web3. Here, we craft a digital realm where each participant shapes narratives, creating a dynamic universe of stories through simple yet profound interactions. Dive into a world where your decisions forge new paths, explore infinite storylines, and contribute to a collective adventure. Join us in pushing the boundaries of storytelling within the innovative landscape of Farcaster.

## Getting Started
These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

## Backend Setup
Ensure you have Go and Docker installed on your system. Then, follow these steps to set up the backend environment:

### Install Go, Docker

### Make scripts executable
chmod +x ./backend/bin/gen-env.sh
chmod +x ./backend/bin/setup-db.sh

### Source environment variables
source config/local.sh

### Setup environment and database with Docker
make setup

### Run the web server (available at port 8030)
make run

### To interact with the server, send requests to the specified port

## Frontend Setup
For the frontend, ensure you have Bun installed. Then proceed with the following setup:

### Install dependencies
bun install

### Run the development server
bun run dev --port 3000

Add the following environment variables to your .env.local file:

NEXT_PUBLIC_BFF_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WARPCAST_URI=https://warpcast.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

BE_API_URL=http://localhost:8030
NEYMAR_API_KEY=<YOUR_NEYNAR_API_KEY>
