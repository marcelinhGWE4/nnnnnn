lozzTask.addEventListener('click', async () => {
    // Замените этот токен на ваш токен Telegram-бота
    const telegramToken = 'YOUR_TELEGRAM_BOT_TOKEN';
    // Замените этот ID пользователя на ID пользователя, которого нужно проверить
    const userId = 'YOUR_TELEGRAM_USER_ID';
    
    try {
        const response = await fetch(https://api.telegram.org/bot${telegramToken}/getChat?chat_id=${userId});
        const data = await response.json();

        if (data.result && data.result.username) {
            const username = data.result.username;
            if (username.includes('🇦🇶')) {
                alert('LOZZ выполнено!');
            } else {
                alert('LOZZ не выполнено!');
            }
        } else {
            alert('Ошибка получения данных о пользователе.');
        }
    } catch (error) {
        alert('Ошибка проверки LOZZ.');
    }
});
