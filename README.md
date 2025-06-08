# DSM

A high-end, modular Discord bot for advanced moderation, ticketing, verification, and community management. Built with [discord.js](https://discord.js.org/) and MongoDB

---

## 🚀 Features

- **Slash Commands**: Modern, intuitive slash commands for all bot features.
- **Moderation Tools**: Ban, kick, and clear commands with role hierarchy checks and detailed feedback.
- **Ticket System**: Advanced ticket creation, management, and transcript generation with HTML export.
- **Verification System**: Secure, button-based member verification with role assignment.
- **Welcome System**: Customizable welcome messages and automatic role assignment for new members.
- **Anti-Spam & Anti-Link**: Automatic detection and banning of link spammers and blocked users.
- **System Information**: `/sysinfo` command to display server hardware and OS stats.
- **Extensible Event & Command Handlers**: Easily add new features and events.
- **MongoDB Integration**: Persistent ticket and user data storage.
- **Configurable**: All IDs and settings managed via `config.json` and `.env`.

---

## ⚙️ Configuration

### `.env`
```env
TOKEN=your-bot-token-here
MONGODB_URI=your-mongodb-uri-here
```

### `config.json`
Configure all role IDs, channel IDs, welcome messages, and more.

KEEP IN MIND
```json
  "blockedUserIds": [], //ment for admins to remove all restrictions for them
```

---

## 🛠️ Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/CecuTheMag/DSM-Discord-Bot
   cd DSM-Discord-Bot
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment and bot settings**
   - Fill in `.env` with your Discord bot token and MongoDB URI.
   - Edit `config.json` with your server's role and channel IDs.

4. **Run the bot**
   ```sh
   node scr/index.js
   ```

---

## 🧩 Commands Overview

| Command         | Description                                 | Permissions Required         |
|-----------------|---------------------------------------------|-----------------------------|
| `/help`         | Show all available commands                 | Everyone                    |
| `/ping`         | Test bot responsiveness                     | Everyone                    |
| `/info`         | Show bot/server info                        | Everyone                    |
| `/clear`        | Bulk delete messages                        | Manage Messages             |
| `/kick`         | Kick a user                                 | Kick Members                |
| `/ban`          | Ban a user                                  | Ban Members                 |
| `/ticket`       | Send ticket creation message                | Manage Channels             |
| `/createverify` | Send verification embed to a channel        | Administrator               |
| `/sysinfo`      | Show server system information              | Everyone                    |

---

## 📝 Event System

- **Dynamic event loading** via `scr/Handlers/eventHandler.js`
- **Client events**: Ready, messageCreate, etc.
- **Guild events**: Member join, etc.
- **Interaction events**: Slash commands, buttons, etc.
- **Ticket events**: Creation, close, lock, unlock, transcript.

---

## 🗃️ Database

- Uses [MongoDB](https://www.mongodb.com/) via [mongoose](https://mongoosejs.com/) for ticket persistence.
- Ticket schema defined in `scr/Events/Models/Ticket.js`.

---

## 🛡️ Security & Permissions

- All moderation commands check role hierarchy.
- Ticket and verification systems check for required permissions.
- Anti-spam and anti-link logic in `scr/Events/Client/MessageCreate.js`.

---

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please open an issue first to discuss changes.


---

**Made by CecuTheMag**