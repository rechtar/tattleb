# Backend for Tattle

## DB entities

- User
  - id
  - email
  - password
  - updated_at
  - created_at
- ChatThread
  - id
  - user_id
  - updated_at
  - created_at
- ChatMessage
  - id
  - user_id
  - thread_id
  - content
  - updated_at
  - created_at

## API usage scenario

- User signs up

      POST /api/user/register

- User logs in

      POST /api/user/login

- User lists all convos

      GET /api/chat

      {
        chats: [
          {
            id: 0,
            title: "Chat title",
            created_at: "",
            updated_at: ""
          }
        ]
      }

- User lists messages of convo

      GET /api/chat/:id

      {
        messages: [
          {
            id: 0,
            content: { message: "Message" },
            created_at: ""
          }
        ]
      }

- User starts new convo

      POST /api/chat
      {
        title: "Convo title"
      }

      {
        chat: {
          id: 0,
          content: { title: "Chat title" },
          created_at: "",
          updated_at: ""
        }
      }

- User sends a message in convo

      POST /api/chat/:id
      {
        content: { message: "Message" },
      }

      {
        message: {
          id: 0,
          content: { message: "Message" },
          created_at: ""
        },
        response: {
          id: 0,
          content: "Response content",
          created_at: ""
        }
      }
