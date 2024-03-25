# Story Verse

<p align="center">
  <img width="250" height="250" src="./frontend/public/logo.webp">
</p>

Welcome to Story Verse, where the fusion of storytelling, gaming, and Web3 technologies creates an unparalleled ecosystem. Here, every choice you make not only shapes your narrative but weaves into a collective tapestry of adventures. In this realm, each interaction kindles new stories, unfurling infinite realms of exploration and innovation. Together, let's chart new territories in storytelling within the thriving Farcaster community.

## Vision

Our mission is to harness the power of interactive narratives and decentralized technology to foster a community where everyone can be a storyteller. By blending elements of gaming and Web3, Story Verse offers a unique platform for creators and explorers alike to imagine, build, and share their stories across a dynamic multiverse.

## Demo

Dive into the Story Verse experience and begin your adventure:

- [Genesis Frame](https://warpcast.com/kuannnn/0xd60a1422)
- [Story Verse Web](https://story-multiverse.vercel.app)

## Features

- **Interactive Storytelling:** Navigate through branching narratives where your decisions lead to unique outcomes.
- **Community Collaboration:** Join forces with other creators to expand the stories in directions only limited by collective imagination.
- **Open Frame Standard Integration:**Leverage the Open Frame Standard for dynamic, interactive storytelling within a seamless, interactive frame.

## Getting Started

Set up your local Story Verse environment for development and testing with these instructions.

### Backend Setup

Prepare your backend with Go and Docker by following these steps:

#### Prerequisites

- Install Go
- Install Docker

#### Environment Preparation

Make necessary scripts executable and set up your environment:

### Make scripts executable:

- `chmod +x ./backend/bin/gen-env.sh`
- `chmod +x ./backend/bin/setup-db.sh`

### Source environment variables:

- `source config/local.sh`

### Initialize with Docker:

- `make setup`

#### Running the Server

Launch the web server on port 8030:

### Start the server:

- `make run`

Interact with the server through the specified port for API requests.

### Frontend Setup

Set up the frontend with Bun by following these instructions:

#### Prerequisites

- Install Bun

#### Project Setup

Install dependencies and launch the development server:

### Install dependencies:

- `bun install`

### Run the server:

- `bun run dev --port 3000`

#### Environment Configuration

Configure your project environment in `.env.local`:

### Add environment variables:

- `NEXT_PUBLIC_BFF_API_URL=http://localhost:3000/api`
- `NEXT_PUBLIC_WARPCAST_URI=https://warpcast.com`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- `BE_API_URL=http://localhost:8030`
- `NEYMAR_API_KEY=<YOUR_NEYNAR_API_KEY>`

Embrace the limitless possibilities of digital storytelling with Story Verse. Your next chapter is waiting to be written. Let the adventure begin!

## Meet the Team

Our project is brought to life by a dedicated team of professionals. Get to know the individuals behind this innovative project:

### Kuan - FullStack Developer

<p align="left">
  <img src="https://github.com/kuan0808.png" width="100" height="100" style="border-radius:50%; margin-right: 20px;" alt="Kuan">
  <strong>Kuan</strong> spearheads our project's frontend UI/UX design and integration with the Open Frame Standard, crafting intuitive interfaces that bridge users seamlessly to our backend systems. His pivotal role in establishing a Backend-for-Frontend (BFF) layer enhances communication and data flow between frontend and backend, ensuring a cohesive and user-centric experience.  <a href="https://github.com/kuan0808">Profile</a>
</p>

### Jason SP Chien - Backend Developer

<p align="left">
  <img src="https://github.com/Jason-SP-Chien.png" width="100" height="100" style="border-radius:50%; margin-right: 20px;" alt="Jason-SP-Chien">
  <strong>Jason SP Chien</strong> is our Backend Developer, specializing in complex data structures and advanced data processing techniques. As a pivotal member of our team, Jason's expertise in optimizing backend operations ensures our project thrives on robust and sophisticated technical foundations, facilitating a seamless and dynamic user experience. <a href="https://github.com/Jason-SP-Chien">Profile</a>
</p>

## License

MIT License - Story Verse
