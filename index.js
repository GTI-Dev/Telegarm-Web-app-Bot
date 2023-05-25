require('dotenv').config()
const { Telegraf } = require('telegraf')
const express = require('express');

const app = express();
app.use(express.json());


const bot = new Telegraf(process.env.BOT_TOKEN)


const web_home = "https://google.com";
const web_login = "https://google.com";
const web_register = "https://google.com";
const web_coupon = "https://google.com";

bot.start((ctx) => {
    // Send welcome message and inline keyboard
    ctx.reply("Welcome to Google \n\nHow can I help you today?", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Bet Now", web_app: { url: web_home } },
                    { text: "Check Coupon", web_app: { url: web_coupon } },
                ],
                [
                    { text: "Login", web_app: { url: web_login } },
                    { text: "Register", web_app: { url: web_register } },
                ],
            ],
            resize_keyboard: true
        }
    });
});

bot.action("check_coupon", (ctx) => {
    // Perform action when "Check Coupon" button is clicked
    ctx.reply("Please enter your coupon code:");
});

bot.action("login", (ctx) => {
    // Perform action when "Login" button is clicked
    ctx.reply("Please enter your login credentials:");
});

bot.action("register", (ctx) => {
    // Perform action when "Register" button is clicked
    ctx.reply("Please enter your registration details:");
});

// Set up the webhook route
app.post(`/telegram`, (req, res) => {
    bot.handleUpdate(req.body, res);
});

// Set the webhook URL
bot.telegram.setWebhook(`telegarm-web-app-573qbe1hb-gettechinfobots-gmailcom.vercel.app/telegram`);

// Start the Express.js server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});

// Start the bot
bot.launch();