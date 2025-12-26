# <img style="width:100px" src="/public/assets/logo/2.png" loading="lazy" alt="GSSoC 25"/> GSSoC FAQ Bot
### Not an AI Wrapper

## 📖 Project Overview

The **GSSoC FAQ Bot** is an unofficial Discord bot designed to help participants of GirlScript Summer of Code (GSSoC) get instant answers to common questions. Built by contributors for contributors, this bot provides quick access to program information, project details, and helpful resources, all through simple Discord slash commands!

Whether you're a first-time contributor wondering how to get started or an experienced developer looking for specific project information, this bot has got you covered! 🚀

<img src="/public/assets/logo/logo.jpg" loading="lazy" alt="GSSoC 25"/>

## 🚀Featured In

<table>

   <tr>
      <th>Event Logo</th>
      <th>Event Name</th>
      <th>Event Description</th>
   </tr>
   <tr>
      <td><img src="https://github.com/sharmavikas4/MERN_BLOG/blob/main/gssoc.jpg" width="200" height="auto" loading="lazy" alt="GSSoC 25"/></td>
      <td>GirlScript Summer of Code (GSSOC) 2025</td>
      <td>GirlScript Summer of Code is a three-month-long Open Source Program conducted every summer by GirlScript Foundation. It is an initiative to bring more beginners to Open-Source Software Development.</td>
   </tr>
   </table>

<br />


## Statistics 📊  

<table align="center">
  <thead align="center">
      <tr border: 1px;>
          <td><b>🌟 Stars</b></td>
          <td><b>🍴 Forks</b></td>
          <td><b>🐛 Issues</b></td>
          <td><b>🔔 Open PRs</b></td>
          <td><b>🔕 Closed PRs</b></td>
          <td><b>🛠 Languages</b></td>
          <td><b>🌐 Contributors </b></td>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td><img alt="Stars" src="https://img.shields.io/github/stars/piyushpatelcodes/gssocFAQ-Bot?style=flat&logo=github"/></td>
          <td><img alt="Forks" src="https://img.shields.io/github/forks/piyushpatelcodes/gssocFAQ-Bot?style=flat&logo=github"/></td>
          <td><img alt="Issues" src="https://img.shields.io/github/issues/piyushpatelcodes/gssocFAQ-Bot"/></td>
          <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/piyushpatelcodes/gssocFAQ-Bot"/></td>
          <td><img alt="Closed Pull Requests" src="https://img.shields.io/github/issues-pr-closed/piyushpatelcodes/gssocFAQ-Bot"/></td>
          <td><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/piyushpatelcodes/gssocFAQ-Bot"/></td>
          <td><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/piyushpatelcodes/gssocFAQ-Bot?color=2b9348"/></td>
      </tr>
  </tbody>
</table>
<img src="/public/assets/logo/2.png" loading="lazy" alt="GSSoC 25"/>

> [!NOTE]
> GSSOC FAQ is not only for General Query (que/ans) but it can also Give you Details about 300+ Projects whicg are all enrolled under GSSOC25.
> This also have Projects by Phase and Tech stack. It even includes Mentor Socials  and Project owner/admin socials (Github, Linkedin, Email) to connect with them faster.
## ✨ Features

###  **FAQ Command (`/faq`)**
- Get instant answers to common GSSoC questions
- Smart search with autocomplete suggestions
- Covers topics like registration, contribution guidelines, deadlines, and more
- Fuzzy matching to find answers even with typos

### **Project Information (`/project`)**
- Search through all GSSoC projects
- Get detailed project information including:
  - Project description and tech stack
  - Admin and mentor contact details
  - GitHub and LinkedIn links
  - Step-by-step contribution guide
- Browse all projects with pagination

### **Beautiful Landing Page**
- Responsive web interface showcasing the bot
- Dark/Light theme support
- Interactive playground demonstration
- Detailed feature explanations

### **Smart Features**
- Autocomplete for both commands
- Automatic ID card sharing for relevant queries
- Paginated project listings
- Error handling with helpful suggestions

## This Project is POPULARRRRR...YAYYYY
- Star History

[![Star History Chart](https://api.star-history.com/svg?repos=piyushpatelcodes/gssocFAQ-Bot&type=date&legend=top-left)](https://www.star-history.com/#piyushpatelcodes/gssocFAQ-Bot&type=date&legend=top-left)

## Tech Stack

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Discord.js v14** - Discord API wrapper for bot functionality
- **Express.js** - Web server for hosting the landing page

### **Frontend**
- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vanilla JavaScript** - Interactive functionality and animations
- **GSAP** - Professional animations and scroll effects

### **Data Management**
- **JSON files** - FAQ and project data storage
- **Excel processing** - Convert spreadsheets to JSON format

### **Deployment**
- **Vercel** - Hosting platform for the web interface
- **Environment variables** - Secure configuration management

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:
- **Node.js** (version 16 or higher) installed on your computer
- A **Discord account** and basic understanding of Discord servers
- **Git** installed for version control
- A code editor like **VS Code** (recommended)

### 📥 Installation Steps

1. **Fork and Clone the Repository**
   ```bash
   # Fork the repository on GitHub first, then:
   git clone https://github.com/YOUR_USERNAME/gssocFAQ-Bot.git
   cd gssocFAQ-Bot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env file and add your Discord bot token
   # You can get this from Discord Developer Portal
   ```

4. **Create a Discord Application**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application" and give it a name
   - Go to "Bot" section and create a bot
   - Copy the bot token to your `.env` file
   - Enable necessary bot permissions

## 🎮 How to Run

### **Run the Bot Locally**
```bash
# Start the Discord bot
node index.js
```

### **Run the Web Server**
```bash
# Navigate to views directory
cd views

# Install web dependencies
npm install

# Start development server with Tailwind CSS
npm run start:tailwind

# In another terminal, serve the HTML file
# You can use Live Server extension in VS Code
# Or use a simple HTTP server
```

### **Deploy Bot Commands**
```bash
# Register slash commands with Discord
node deploy-command.js
```

## 📁 Folder Structure

```
gssocFAQ-Bot/
├── 📄 index.js              # Main bot application
├── 📄 deploy-command.js     # Command registration script
├── 📄 faqs.json            # FAQ data storage
├── 📄 projects.json        # Project information
├── 📄 package.json         # Node.js dependencies
├── 📄 .env.example         # Environment variables template
├── 📄 vercel.json          # Vercel deployment config
├── 📁 public/              # Static assets
│   └── 📁 assets/          # Images and logos
├── 📁 views/               # Web interface
│   ├── 📄 index.html       # Landing page
│   ├── 📄 index.js         # Frontend JavaScript
│   ├── 📄 package.json     # Frontend dependencies
│   └── 📁 css/             # Stylesheets
│       ├── 📄 tailwind.css # Tailwind source
│       └── 📄 index.css    # Custom styles
└── 📁 routes/              # Express.js routes
    └── 📄 documentation.js # API documentation
```

## 🤝 Contributing to GSSoC

### **For GSSoC Participants**

We're excited to have you contribute! Here's how to get started:

#### 🌟 **First-Time Contributors**

1. **Star this repository** ⭐
2. **Join our Discord community** for support
3. **Read the codebase** to understand the project structure
4. **Look for "good first issue" labels** on GitHub Issues
5. **Ask questions** - we're here to help!

#### 📝 **How to Contribute**

1. **Find an Issue**
   - Check [open issues](https://github.com/piyushpatelcodes/gssocFAQ-Bot/issues)
   - Look for labels: `good first issue`, `beginner-friendly`, `gssoc`
   - Comment on the issue to get assigned

2. **Fork and Setup**
   ```bash
   # Fork the repo and clone your fork
   git clone https://github.com/YOUR_USERNAME/gssocFAQ-Bot.git
   cd gssocFAQ-Bot
   
   # Add upstream remote
   git remote add upstream https://github.com/piyushpatelcodes/gssocFAQ-Bot.git
   ```

3. **Create a Branch**
   ```bash
   # Create a new branch for your feature
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**
   - Write clean, commented code
   - Follow existing code style
   - Test your changes thoroughly
   - Update documentation if needed

5. **Commit and Push**
   ```bash
   # Add and commit your changes
   git add .
   git commit -m "feat: add your descriptive commit message"
   
   # Push to your fork
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill in the PR template
   - Wait for review and address feedback

#### 🎯 **Areas You Can Contribute To**

- **🐛 Bug Fixes**: Fix existing issues and improve stability
- **✨ New Features**: Add new commands or bot functionality  
- **🎨 UI/UX**: Improve the landing page design and user experience
- **📚 Documentation**: Help improve README, code comments, and guides
- **🧪 Testing**: Write tests and improve code quality
- **🔧 Performance**: Optimize bot response times and efficiency
- **🌐 Accessibility**: Make the web interface more accessible
- **📱 Responsive Design**: Improve mobile experience

#### 📋 **Contribution Guidelines**

- **Be respectful** and inclusive in all interactions
- **Follow the code of conduct** 
- **Keep commits small** and focused on one change
- **Write descriptive commit messages** following conventional commits
- **Test your changes** before submitting PR
- **Update documentation** when adding new features
- **Ask for help** when stuck - we're a friendly community!


## 📞 Support

Need help? We've got you covered!

- **💬 Discord**: Join our community server[https://discord.gg/gM3RJ3Aydj]
- **📧 Issues**: Open a GitHub issue for bugs or feature requests
- **📖 Docs**: Check our detailed documentation
- **🤝 Mentors**: Reach out to project mentors for guidance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GirlScript Foundation** for organizing GSSoC
- **All contributors** who help improve this project
- **Discord.js community** for excellent documentation
- **Open source community** for inspiration and support

---

<div align="center">
  <p><strong>Made with ❤️ for the GSSoC community</strong></p>
  <p>Happy Contributing! 🚀</p>
</div>

<a href="https://github.com/piyushpatelcodes/gssocFAQ-Bot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=piyushpatelcodes/gssocFAQ-Bot" />
</a>

