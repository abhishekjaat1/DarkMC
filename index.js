const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

// ============================
// CONFIG
// ============================
const TOKEN = "YOUR_BOT_TOKEN"; // <-- apna bot token daalna
const SERVER_IP = "in.horizonnodes.net"; // <-- apna server IP
const SERVER_PORT = 25577; // <-- default port

// ============================
// DISCORD CLIENT
// ============================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "!players") {
    try {
      const res = await fetch(
        `https://api.mcsrvstat.us/2/${in.horizonnodes.net}:${25577}`
      );
      const data = await res.json();

      if (!data || !data.online) {
        return message.reply("❌ Server is offline or not reachable!");
      }

      const players = data.players?.list || [];
      const playerCount = data.players?.online || 0;

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`Players (${playerCount}):`)
        .setDescription(players.length > 0 ? players.join(", ") : "No players online")
        .setFooter({ text: SERVER_IP });

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply("⚠️ Error fetching server data.");
    }
  }
});

client.login(TOKEN);
