# Next.js To-Do App

This is a simple to-do list web application built with Next.js. It allows users to create, manage, and organize their tasks and to-dos effectively.

### Tech Stack
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Prisma](https://www.prisma.io)
- [MongoDB](https://www.mongodb.com)

### Features

- User-friendly task management.
- Real-time task updates.
- Mobile responsive design.
- Use the filter buttons to view all tasks, active tasks, or completed tasks.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) (Node Package Manager) or [Yarn](https://yarnpkg.com/) for managing project dependencies.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/AdylshaY/nextjs-todo-app.git

2. Navigate to the project directory:

   ```bash
   cd nextjs-todo-app

3. Install dependencies:

    ```bash
    npm install

4. Add your .env file:

    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    
    DATABASE_URL=
    BASE_URL="http://localhost:3000"

5. Run the development server:

    ```bash
    npm run dev
    ```
    The app will be available at http://localhost:3000.

### Contributing

Contributions are welcome! If you'd like to improve this project, feel free to open an issue, create a pull request, or suggest new features and enhancements.
