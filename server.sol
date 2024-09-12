const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

// Подключение к MongoDB (или другой базе данных)
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы для хранения счетчиков
const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    counter: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// Создание бота
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// Обработка команд
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    // Проверка, существует ли пользователь в базе данных
    let user = await User.findOne({ userId: chatId });
    if (!user) {
        user = new User({ userId: chatId });
        await user.save();
    }

    bot.sendMessage(chatId, Привет! Ваш текущий счетчик: ${user.counter});
});

bot.onText(/\/increment/, async (msg) => {
    const chatId = msg.chat.id;

    // Увеличение счетчика
    await User.updateOne({ userId: chatId }, { $inc: { counter: 1 } });
    const user = await User.findOne({ userId: chatId });

    bot.sendMessage(chatId, Счетчик увеличен! Текущий счетчик: ${user.counter});
});
