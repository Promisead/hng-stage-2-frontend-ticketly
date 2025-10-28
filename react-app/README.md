# Ticketly - React Ticket Management App

Ticketly is a lightweight, modern web application for managing support tickets. It provides a clean and efficient interface for users to track issues from creation to resolution. This project was built as part of a frontend development track, focusing on React, modern tooling, and best practices.

## Features

-   **User Authentication**: Secure signup and login functionality.
-   **Dashboard Overview**: A comprehensive dashboard displaying key statistics:
    -   Total tickets
    -   Open tickets
    -   In-progress tickets
    -   Closed tickets
-   **Full CRUD for Tickets**:
    -   **Create**: Add new tickets with a title, description, status, and priority.
    -   **Read**: View all tickets in a clean, card-based layout.
    -   **Update**: Edit existing tickets to change their details.
    -   **Delete**: Remove tickets that are no longer needed.
-   **Client-Side Routing**: Seamless navigation between pages without full-page reloads, powered by React Router.
-   **Responsive Design**: A mobile-first approach ensuring the app is usable on all screen sizes.
-   **Toast Notifications**: User-friendly feedback for actions like login, signup, and ticket operations.

## Tech Stack

-   **Frontend**:
    -   **React**: A JavaScript library for building user interfaces.
    -   **Vite**: A next-generation frontend tooling for fast development.
    -   **React Router**: For declarative routing in the application.
    -   **React Hook Form**: For efficient and performant form handling.
    -   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Backend (Mock)**:
    -   **JSON Server**: To simulate a full REST API for development.
-   **Linting & Formatting**:
    -   **ESLint**: To find and fix problems in the JavaScript code.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

-   Node.js (v18.x or higher recommended)
-   npm (v8.x or higher recommended)

### Installation

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate to the `react-app` directory:
    ```sh
    cd react-app
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

The application requires two processes to run concurrently: the mock API server and the Vite development server.

1.  **Start the Mock API Server**:
    Open a terminal and run the following command to start the `json-server`. This will serve the data from `data/db.json` on `http://localhost:3001`.

    ```sh
    npm run api
    ```

2.  **Start the Development Server**:
    Open a second terminal and run the `dev` script. This will start the Vite development server, and the application will be available at `http://localhost:5173` (or the next available port).

    ```sh
    npm run dev
    ```

## Folder Structure

The project follows a standard React application structure:

```
react-app/
├── data/
│   └── db.json         # Mock database for json-server
├── public/             # Static assets
├── src/
│   ├── assets/         # SVG icons and other assets
│   ├── components/     # Reusable UI components (e.g., Layout, Header, Footer)
│   ├── contexts/       # React context providers (AuthProvider, TicketsProvider)
│   ├── features/       # Components related to a specific feature (e.g., ticketing)
│   ├── pages/          # Top-level page components (Dashboard, Login, etc.)
│   ├── services/       # API service definitions (currently unused)
│   ├── App.jsx         # Main application component with routing setup
│   ├── main.jsx        # Entry point of the application
│   └── index.css       # Main CSS file for Tailwind CSS
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration
```