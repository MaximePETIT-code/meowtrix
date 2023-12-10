# Meowtrix Chat App

Meowtrix is a real-time chat application developed in Next.js. You can watch a demo video of Meowtrix and try it at [https://meowtrix.vercel.app](https://meowtrix.vercel.app).


https://github.com/Thanh-0dev/meowtrix/assets/74910872/81fd7227-baf3-43da-8f2a-f1c681c82600


## Database Modeling

The Meowtrix platform's database is modeled using Prisma, a modern toolkit for TypeScript and Node.js. In conjunction with MongoDB, the schema includes the following entities:

![Meowtrix diagram](https://github.com/Thanh-0dev/meowtrix/assets/74910872/e315507f-ddac-4ed5-b0d3-8ee31ecc47f2)

## Features

### Authentication

Meowtrix implements secure authentication using NextAuth with integration for Google and GitHub. This ensures a streamlined and secure login process for users.

### Real-time Communication

The app leverages Pusher for real-time communication, allowing users to exchange messages instantly and seamlessly.

### User Listing

Meowtrix fournit une fonctionnalité de liste d'utilisateurs, permettant aux utilisateurs de voir qui est disponible pour discuter.

### Conversation History

The application keeps track of the conversation history, allowing users to review past messages.

### Real-time Notifications

Users receive real-time notifications for new messages, ensuring they stay informed and engaged during their conversations.

## Stack

Meowtrix is built using the following technologies:

- **Next.js**: A React framework for building server-side rendered and static web applications.

- **NextAuth**: Provides authentication for the application, with support for various providers.

- **Pusher**: Enables real-time communication by facilitating instant message updates.

- **Prisma**: A modern database toolkit for TypeScript and Node.js, used for data modeling and access.

- **MongoDB**: A NoSQL database used to store and retrieve data efficiently.

- **Material-UI (MUI)**: A React UI framework that implements Google's Material Design.

## API Routes and Functions

Here's a summary of the API routes and their corresponding functionality in the Meowtrix application:

| Route                               | Type   | Description                                             |
|-------------------------------------|--------|---------------------------------------------------------|
| `/api/conversations`                 | POST   | Creates a new conversation or returns an existing one.  |
| `/api/conversations/[conversationId]/seen` | POST | Marks the last message in a conversation as seen.        |
| `/api/messages`                      | POST   | Sends a new message in a conversation.                   |
| `/api/register`                      | POST   | Registers a new user with provided email, name, and password. |
| `/api/settings`                      | DELETE | Deletes the user account along with associated data.    |
| `/api/settings`                      | POST   | Updates the user's name in the application settings.    |
| `/api/auth/[...nextauth]`           | GET/POST | Handles authentication using NextAuth with various providers. |



Here are some utility functions using Prisma for fetching data:


| Function                             | Description                                             |
|--------------------------------------|---------------------------------------------------------|
| `getConversations`                   | Retrieves user conversations, orders by last message. Includes users and messages with senders and seen status. |
| `getConversationById`                | Retrieves a conversation by ID, including participating users. |
| `getCurrentUser`                     | Fetches current user details from the database. Enhances user object with creation timestamp. |
| `getMessages`                        | Retrieves messages for a conversation, including sender and seen status. |
| `getUsers`                           | Fetches a list of users, excluding the current user. Orders by creation timestamp. Used for user listing. |


## Deployment on Vercel

Meowtrix is deployed on Vercel for seamless hosting and continuous integration.
