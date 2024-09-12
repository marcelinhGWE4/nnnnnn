const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    counter: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

const token = '7362596092:AAG145_s4PYxIyNp9bjMqSLpG5G4x7qkd0E';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {node server.js

    const chatId = msg.chat.id;

    try {
        let user = await User.findOne({ userId: chatId });
        if (!user) {
            user = new User({ userId: chatId });
            await user.save();
        }

        bot.sendMessage(chatId, `Привет! Ваш текущий счетчик: ${user.counter}`);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Произошла ошибка при выполнении операции. Попробуйте позже.');
    }
});

bot.onText(/\/increment/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        await User.updateOne({ userId: chatId }, { $inc: { counter: 1 } });
        const user = await User.findOne({ userId: chatId });

        bot.sendMessage(chatId, `Привет! Ваш текущий счетчик: ${user.counter}`);
        bot.sendMessage(chatId, `Счетчик увеличен! Текущий счетчик: ${user.counter}`);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Произошла ошибка при выполнении операции. Попробуйте позже.');
    }
});
