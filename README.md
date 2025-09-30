# Aegis Command: Real-Time Dispatch Hub

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Pauolosavery/generated-app-20250930-205302)

Aegis Command is a sophisticated, real-time dispatch and monitoring dashboard. It provides a centralized command center view for dispatchers to track, manage, and get insights on various assets in the field. The core of the application is an interactive map displaying markers for each asset. The markers are color-coded based on their real-time status (e.g., Online, Idle, Alert). Clicking on a marker or a corresponding entry in a filterable sidebar list opens a detailed modal view. This modal provides in-depth, real-time telemetry for the selected asset, including key metrics, status history via sparkline charts, and quick action controls. The entire interface is designed for high information density and immediate readability, with a visually stunning, dark-themed 'command center' aesthetic.

## Key Features

-   **Real-Time Interactive Map**: Visualize all field assets on a live map.
-   **Status-Aware Markers**: Asset markers are dynamically colored based on their current status (Online, Idle, Alert).
-   **Detailed Asset Modal**: Click an asset to view in-depth, real-time telemetry, status history, and performance charts.
-   **Resizable Sidebar**: A filterable and searchable list of all assets in a collapsible, resizable panel.
-   **High-Performance Backend**: Built on Cloudflare Workers with a single Durable Object for consistent, low-latency state management.
-   **Modern UI/UX**: A sleek, dark-themed "command center" aesthetic built with Tailwind CSS and shadcn/ui.
-   **Responsive Design**: Flawless performance and layout across all device sizes, from mobile to large desktops.

## Technology Stack

-   **Frontend**:
    -   React & Vite
    -   TypeScript
    -   Tailwind CSS
    -   shadcn/ui (Component Library)
    -   Zustand (State Management)
    -   React Leaflet (Mapping)
    -   Recharts (Charting)
    -   Framer Motion (Animations)
-   **Backend**:
    -   Cloudflare Workers
    -   Hono (Web Framework)
    -   Durable Objects (State Persistence)

## Project Structure

The project is a monorepo with a clear separation of concerns:

-   `src/`: Contains the entire React frontend application.
    -   `src/pages/`: Main pages/views of the application.
    -   `src/components/`: Reusable React components.
    -   `src/stores/`: Zustand state management stores.
    -   `src/hooks/`: Custom React hooks.
-   `worker/`: Contains the Cloudflare Worker backend code.
    -   `worker/userRoutes.ts`: Hono API route definitions.
    -   `worker/durableObject.ts`: The core logic for the global Durable Object.
-   `shared/`: Contains TypeScript types and interfaces shared between the frontend and backend.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) logged into your Cloudflare account.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd aegis_command
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

### Running in Development Mode

To start the local development server, which includes both the Vite frontend and the Wrangler backend, run:

```bash
bun dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will be available in your browser, and the Hono API will be running and accessible from the same origin.

## Development

-   **Frontend**: All frontend code is located in the `src` directory. Vite provides Hot Module Replacement (HMR) for a fast development experience.
-   **Backend**: API endpoints are defined in `worker/userRoutes.ts` using the Hono framework.
-   **State Management**: All persistent state is managed by the `GlobalDurableObject` class in `worker/durableObject.ts`.
-   **Shared Types**: To maintain type safety between the client and server, define shared data structures in `shared/types.ts`.

## Available Scripts

-   `bun dev`: Starts the local development server.
-   `bun build`: Builds the frontend application for production.
-   `bun lint`: Lints the codebase using ESLint.
-   `bun deploy`: Builds and deploys the application to your Cloudflare account.

## Deployment

This application is designed for seamless deployment to the Cloudflare network.

1.  **Build the project:**
    The deploy script handles this automatically, but you can build manually with `bun build`.

2.  **Deploy with Wrangler:**
    Ensure you are logged in to Wrangler (`wrangler login`). Then, run the deploy script:
    ```bash
    bun run deploy
    ```
    This command will build the application and deploy it to the Cloudflare global network. Wrangler will provide you with the public URL for your deployed application.

Or, deploy directly from your GitHub repository:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Pauolosavery/generated-app-20250930-205302)