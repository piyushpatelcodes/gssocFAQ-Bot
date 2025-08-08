const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const faqs = require('./faqs.json');
require('dotenv').config();

const commands = [
  {
    name: 'faq',
    description: 'Get an answer to a GSSoC FAQ',
    options: [
      {
        name: 'question',
        description: 'Your question',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
      }
    ]
  },
  {
    name: 'project',
    description: 'Get details about a GSSoC project',
    options: [
      {
        name: 'project-name',
        description: 'Name of the project',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
      },
      {
      name: 'phase',
      description: 'Filter projects by GSSoC phase',
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: 'Phase 1', value: 'phase1' },
        { name: 'Phase 2', value: 'phase2' }
      ]
    },
      {
        name: 'question',
        description: 'Optional follow-up question (e.g. "guide to contribute")',
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ]
  },
{
    name: 'fun',
    description: 'Get a fun nerdy joke or fact'
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Registering slash command...');
    await rest.put(
      // Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),       // for Guild commands
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash command registered.');
  } catch (err) {
    console.error(err);
  }
})();


// const data = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
// console.log("Registered commands:", data.map(cmd => cmd.name));
