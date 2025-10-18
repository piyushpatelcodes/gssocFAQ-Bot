const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Events,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");
const stringSimilarity = require("string-similarity");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const formatMatchReply = require("./formatMatchReply");
const documentationRoute = require("./routes/documentation");
const funQuotes = require("./funQuotes"); 
// Adjust the path if needed
let lastFunQuoteIndex = -1;

require("dotenv").config();

const faqs = require("./faqs.json");
const { sendPaginatedProjects } = require("./chunkMessage");

const phase1Projects = JSON.parse(fs.readFileSync("./projects-phase1.json"));
const phase2Projects = JSON.parse(fs.readFileSync("./projects-phase2.json"));
let usedIndexes = []; // To track shown quotes

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const idKeywords = [
  "id",
  "id card",
  "identity",
  "card",
  "profile picture",
  "photo",
  "pic",
  "photo",
  "apply",
  "app",
  "insight app",
  "insights app",
  "developer",
  "developed",
];

// Pagination constants
const FAQ_PAGE_SIZE = 15;

// Helper to get FAQ content for a page
function getFaqPageContent(page, faqs) {
  const start = page * FAQ_PAGE_SIZE;
  const end = start + FAQ_PAGE_SIZE;
  const slice = faqs.slice(start, end);

  let content = slice
    .map((f, i) => `**${start + i + 1}.** ${f.question}`)
    .join("\n");

  if (!content) content = "*No questions on this page.*";

  return content;
}

// Helper to create a select menu for a page of FAQs
function getFaqSelectMenu(page, faqs) {
  const start = page * FAQ_PAGE_SIZE;
  const end = start + FAQ_PAGE_SIZE;
  const slice = faqs.slice(start, end);

  const options = slice.map((f, i) => ({
    label: f.question.length > 100 ? f.question.slice(0, 97) + "..." : f.question,
    description: `Question #${start + i + 1}`,
    value: `${start + i + 1}`, // question number as string (1-based)
  }));

  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("faq_select_question")
      .setPlaceholder("Select a question to get its answer")
      .addOptions(options)
  );
}

const serverId = "1378813132788727970";
const TARGET_GUILD_ID = "1378813132788727970";

const promoMessage = `
📢 **Unofficial GSSOC FAQ Bot is Live!**  
> Get answers to common GSSOC questions, project details, and more — all through easy slash commands!  
> Built by contributors, for contributors 💖

---

🔹 **Try It Privately** *(since the bot isn't hosted publicly yet)*  
➕ [Add the Bot as an App](https://discord.com/oauth2/authorize?client_id=1396740851056640091&scope=applications.commands) *(slash command only)*

🔹 **Test Full Bot Invite (Admin)**  
🤖 [Add Full Bot to Your Server](https://discord.com/oauth2/authorize?client_id=1396740851056640091&permissions=8&integration_type=0&scope=bot+applications.commands)

---

### 💬 Slash Commands

**\`/faq\`**  
> 📚 *Ask any GSSoC-related question from our FAQ list*  
Example:  
\`/faq question: How do I register?\`

**\`/project\`**  
> 🔍 *Search for project info, like GitHub links, tech stack, and contribution guide*  
Example:  
\`/project project-name: GSSOC Bot question: how to contribute\`

---

💡 *Bot Name:* \`gssocFaq\` *(temporary, will change after approval)*

📦 **Contribute or ⭐ Star the GitHub Repo**  
🔧 [github.com/piyushpatelcodes/gssocFAQ-Bot](https://github.com/piyushpatelcodes/gssocFAQ-Bot)

---

📣 **Share with GSSoC friends!** Let’s make open source more accessible ✨
`;

client.once("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

function getNonRepeatingQuote() {
  // Reset when all quotes have been shown
  if (usedIndexes.length === funQuotes.length) {
    usedIndexes = [];
  }

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * funQuotes.length);
  } while (usedIndexes.includes(randomIndex) && funQuotes.length > 1);

  usedIndexes.push(randomIndex);
  return funQuotes[randomIndex];
}


client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "faq_select_question") {
        const selectedValue = interaction.values[0];
        const qNum = parseInt(selectedValue, 10);
        if (isNaN(qNum) || qNum < 1 || qNum > faqs.length) {
          await interaction.reply({ content: "❌ Invalid question selection.", ephemeral: true });
          return;
        }
        const faq = faqs[qNum - 1];
        await interaction.reply({
          content: `**Q${qNum}. ${faq.question}**\n\n${faq.answer}`,
          ephemeral: true,
        });
        return;
      }
    }
    
    if (interaction.isChatInputCommand()) {
      const userQuestion = interaction.options.getString("question");
      if (interaction.commandName === "fun") {
      let randomIndex;
      do {
      randomIndex = Math.floor(Math.random() * funQuotes.length);
      } while (randomIndex === lastFunQuoteIndex && funQuotes.length > 1);

      lastFunQuoteIndex = randomIndex;
      await interaction.reply(funQuotes[randomIndex]);
      return;
    }

      
      if (interaction.commandName === "faq") {
        if (!userQuestion) {
          throw new Error("No question provided");
        }

        // Check if input is a number representing FAQ index
        const trimmed = userQuestion.trim();
        const numberMatch = trimmed.match(/^(\d{1,2})$/);

      if (numberMatch) {
        const qNum = parseInt(numberMatch[1], 10);
        if (qNum >= 1 && qNum <= faqs.length) {
          const match = faqs[qNum - 1];
          await interaction.reply(`**Q${qNum}. ${match.question}**\n\n${match.answer}`);
          return;
        } else {
          await interaction.reply(
            `❌ Invalid question number. Please enter a number between 1 and ${faqs.length}.`
          );
          return;
        }
      }

          // --- "all commands" => paginated list with select menu
        if (userQuestion.toLowerCase().includes("all commands")) {
          const totalPages = Math.ceil(faqs.length / FAQ_PAGE_SIZE);
          const page = 0;

          const rowPagination = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`faq_prev_${page}`)
              .setLabel("Previous")
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true),

            new ButtonBuilder()
              .setCustomId(`faq_next_${page}`)
              .setLabel("Next")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(totalPages <= 1)
          );
          const rowSelectMenu = getFaqSelectMenu(page, faqs);

          await interaction.reply({
            content: `**📋 FAQ List (Page ${
              page + 1
            }/${totalPages}):**\n\n${getFaqPageContent(page, faqs)}\n\n*Select a question below, or type \`/faq question:<number>\` to get an answer!*`,
            components: [rowPagination, rowSelectMenu],
          });
          return;
        }

        console.time("mlreq"); // ✅ Start timer for ML request

        try {
          console.time("mlreq"); 
          const res = await axios.post(
            `${process.env.BACKEND_URL || 'http://127.0.0.1:5000'}/ask`,
            { question: userQuestion }
          );

          console.timeEnd("mlreq"); // ✅ End timer (success case)

          const { matches, message } = res.data;

          if (!matches || matches.length === 0) {
            await interaction.reply({
              content: "🤖 Sorry, I couldn’t find a good match. Try rephrasing or use `/faq question: all commands`.",
              ephemeral: false,
            });
            return;
          }

          const replyMessage = formatMatchReply(matches);

          await interaction.reply({
            content: replyMessage,
            ephemeral: false,
          });

          const lowerQ = userQuestion.toLowerCase();
          if (idKeywords.some((keyword) => lowerQ.includes(keyword))) {
            const file = new AttachmentBuilder("./public/assets/idcard.png");
            await interaction.followUp({
              content:
                "You will get an ID card like this directly in your **Insight App**. Download here: https://gssoc.girlscript.tech/#apply",
              files: [file],
            });
          }

        } catch (err) {
          console.timeEnd("mlreq"); // ✅ End timer (failure case)
          console.error("Flask API error:", err);
          await interaction.reply({
            content: "❌ Internal error. Please try again later.",
            ephemeral: true,
          });
        }

      } else if (interaction.commandName === "project") {
        const selectedProjectName =
          interaction.options.getString("project-name");
        const selectedPhase = interaction.options.getString("phase");
        const question = interaction.options.getString("question") || "";

        if (!selectedProjectName) {
          throw new Error("No project name provided");
        }

        if (selectedProjectName === "All Projects") {
          let projects = [];

          if (selectedPhase === "phase1") {
            projects = phase1Projects;
          } else if (selectedPhase === "phase2") {
            projects = phase2Projects;
          } else {
            projects = [...phase1Projects, ...phase2Projects];
          }

          await sendPaginatedProjects(interaction, projects);
          return;
        }
        const allProjects = [...phase1Projects, ...phase2Projects];

        const project = allProjects.find(
          (p) =>
            p["Project name"].toLowerCase() ===
            selectedProjectName.toLowerCase()
        );

        if (!project) {
          await interaction.reply(
            "❌ Project not found. Please check the project name and try again."
          );
          return;
        }

        if (question.toLowerCase().includes("contribute")) {
          const contributionGuide = `📘 **Guide to Contribute to [${
            project["Project name"]
          }](${project["Project link"]})**:

1. **Fork** the repository: ${project["Project link"]}
2. **Clone** your fork locally:
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/${project["Project name"]
     .split(" ")
     .join("-")}
   \`\`\`
3. **Browse open issues** and find one you'd like to work on.
4. **Comment** on the issue asking to be assigned.
5. Create a new branch:
   \`\`\`bash
   git checkout -b fix-issue-123
   \`\`\`
6. Make your changes and **commit**:
   \`\`\`bash
   git commit -m "fix: add new feature"
   \`\`\`
7. Push and create a **Pull Request**.
8. Tag a mentor for review.

💡 Stay active and engage with mentors listed for guidance! \n 
See this For more detailed info: https://www.dataschool.io/how-to-contribute-on-github/
Contribute in this unofficial GSSOC FAQ BOT
https://github.com/piyushpatelcodes/gssocFAQ-Bot

   \n

Mentors:
- ${project["mentor 1"] || "N/A"} | [GitHub](${
            project["mentor 1 github"] || "#"
          }) | [LinkedIn](${project["mentor 1 linkedin"] || "#"})`;

          return interaction.reply(contributionGuide);
        }

        // Default: Show project info
        const embed = new EmbedBuilder()
          .setTitle(`${project["Project name"]} - Link | ${project.keyword === 'phase1' ? '` PHASE 1 Project `' : '` PHASE 2 Project `'}`)
          .setURL(project["Project link"])
          .setDescription(project["Project description"])
          .addFields(
            {
              name: "🧠 Tech Stack",
              value: project["Tech stack"] || "Not specified",
            },
            {
              name: "👨‍💼 Admin",
              value: `${project["Project admin"]} - [GitHub](${project["Admin github"]}) | [LinkedIn](${project["Admin linkedin"]})`,
            }
          );

        // Add mentors
        const mentorFields = [];
        for (let i = 1; i <= 5; i++) {
          const mentor = project[`mentor ${i}`];
          if (mentor) {
            mentorFields.push({
              name: `🎓 Mentor ${i}`,
              value: `${mentor}\n[GitHub](${
                project[`mentor ${i} github`] || "#"
              }) | [LinkedIn](${project[`mentor ${i} linkedin`] || "#"})`,
            });
          }
        }
        embed.addFields(...mentorFields);
        embed.setColor("Random");

        await interaction.reply({ embeds: [embed] });
      }
    }

    if (interaction.isAutocomplete()) {
      try {
        if (interaction.commandName === "faq") {
          const focused = interaction.options.getFocused().toLowerCase();
          const choices = faqs
            .filter((f) => f.question.toLowerCase().includes(focused))
            .slice(0, 25)
            .map((f) => {
              const trimmedQuestion =
                f.question.length > 100
                  ? f.question.slice(0, 97) + "..."
                  : f.question;
              return {
                name: trimmedQuestion,
                value: f.question,
              };
            });
          await interaction.respond(choices);
        } else if (interaction.commandName === "project") {
          const focused = interaction.options.getFocused().toLowerCase();
          const allProjects = [...phase2Projects, ...phase1Projects];

          const choices = allProjects
            .filter((p) => p["Project name"].toLowerCase().includes(focused))
            .slice(0, 23)
            .map((p) => ({
              name: p["Project name"],
              value: p["Project name"],
            }));

          choices.unshift({
            name: "GSSOC FAQ Bot Project (Get a Pro Contributor GSSOC Badge)",
            value: "Gssoc FAQ Bot",
          });

          choices.unshift({
            name: `📚 All Projects (Total: ${
              phase1Projects.length + phase2Projects.length
            } Projects. - This included Phase1 and Phase2 Projects.)`,
            value: "All Projects",
          });

          await interaction.respond(choices);
        }
      } catch (error) {
        console.error("Autocomplete error:", error);
      }
    }
  } catch (error) {
    console.error("Interaction handling error:", error);
    if (interaction.isChatInputCommand() && !interaction.replied) {
      await interaction
        .reply({
          content: "Oops! Something went wrong. Please try again later.",
          ephemeral: true,
        })
        .catch((err) => console.error("Failed to send error message:", err));
    }
  }
});

// Button pagination for FAQ list
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;
  if (!interaction.customId.startsWith("faq_")) return;

  const [_, direction, pageStr] = interaction.customId.split("_");
  let page = parseInt(pageStr);

  if (isNaN(page)) {
    await interaction.reply({
      content: "Invalid page number.",
      ephemeral: true,
    });
    return;
  }

  if (direction === "next") {
    page++;
  } else if (direction === "prev") {
    page--;
  } else {
    await interaction.reply({
      content: "Unknown button action.",
      ephemeral: true,
    });
    return;
  }

  const totalPages = Math.ceil(faqs.length / FAQ_PAGE_SIZE);
  if (page < 0) page = 0;
  if (page >= totalPages) page = totalPages - 1;

  const rowPagination = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`faq_prev_${page}`)
      .setLabel("Previous")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 0),

    new ButtonBuilder()
      .setCustomId(`faq_next_${page}`)
      .setLabel("Next")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === totalPages - 1)
  );

  const rowSelectMenu = getFaqSelectMenu(page, faqs);

  await interaction.update({
    content: `**📋 FAQ List (Page ${
      page + 1
    }/${totalPages}):**\n\n${getFaqPageContent(
      page,
      faqs
    )}\n\n*Select a question below, or type \`/faq question:<number>\` to get an answer!*`,
    components: [rowPagination, rowSelectMenu],
  });
});

// client.login(process.env.BOT_TOKEN).catch((error) => {
//   console.error("Failed to login bot:", error);
// });

// for documentation purpose
app.use("/docs", express.static(path.join(__dirname, "views")));
app.use("/docs", documentationRoute);


app.listen(3000, () => {
  console.log(`🚀 Running at http://localhost:3000/docs`);
});


