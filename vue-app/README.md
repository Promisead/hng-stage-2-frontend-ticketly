# ticketly - Seamless Ticket Management

This is a simple ticketing application built with Vue.js, Pinia, and Tailwind CSS. It allows users to sign up, log in, create tickets, and view their tickets.

## Features

-   User authentication (signup and login)
-   Create new tickets
-   View all tickets
-   Dashboard with ticket statistics

## Technologies Used

-   [Vue.js](https://vuejs.org/)
-   [Vite](https://vitejs.dev/)
-   [Pinia](https://pinia.vuejs.org/) for state management
-   [Vue Router](https://router.vuejs.org/) for routing
-   [Tailwind CSS](https://tailwindcss.com/) for styling
-   [VeeValidate](https://vee-validate.logaretm.com/v4/) for form validation
-   [Oh Vue Icons](https://oh-vue-icons.netlify.app/) for icons
-   [Vue Toastification](https://vue-toastification.maronato.dev/) for notifications

## Project Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Navigate to the `vue-app` directory:
    ```bash
    cd vue-app
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build, run the following command:

```bash
npm run build
```

This will create a `dist` directory with the production-ready files.

## Project Structure

```
.
├── public
│   ├── about-1.png
│   ├── about-2.png
│   ├── about-3.png
│   └── favicon.ico
├── src
│   ├── assets
│   │   └── main.css
│   ├── components
│   │   ├── AboutApp.vue
│   │   ├── AppContainer.vue
│   │   ├── AppLayout.vue
│   │   ├── Bar.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── Hero.vue
│   │   ├── NavLink.vue
│   │   ├── SampleCard.vue
│   │   ├── Sidebar.vue
│   │   ├── StatCard.vue
│   │   ├── TicketCard.vue
│   │   └── TicketForm.vue
│   ├── router
│   │   └── index.js
│   ├── stores
│   │   ├── authStore.js
│   │   └── ticketsStore.js
│   ├── views
│   │   ├── DashboardView.vue
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── SignupView.vue
│   │   └── TicketsView.vue
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── README.md
└── vite.config.js
```