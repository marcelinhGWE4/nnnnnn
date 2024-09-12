const express = require('express');
const app = express();
const port = 3000; // Измените порт, если нужно

// База данных (используем в памяти, для простоты)
const users = {}; // Объект для хранения данных пользователей

// Обработчик запросов на главную страницу
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Обработчик запросов на получение данных пользователя
app.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users[userId];
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('Пользователь не найден');
  }
});

// Обработчик запросов на создание/обновление данных пользователя
app.post('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const userData = req.body; // Получаем данные пользователя из тела запроса
  users[userId] = userData; // Сохраняем данные пользователя в базе данных
  res.send('Данные пользователя обновлены');
});

// Обработчик запросов на получение времени начала таймера
app.get('/timer/:timerId', (req, res) => {
  const timerId = req.params.timerId;
  // Логика получения времени начала таймера из базы данных
  // (в данном примере мы просто возвращаем текущее время)
  const startTime = Date.now();
  res.send(startTime.toString());
});

// Обработчик запросов на создание/обновление времени начала таймера
app.post('/timer/:timerId', (req, res) => {
  const timerId = req.params.timerId;
  const startTime = req.body.startTime; // Получаем время начала из тела запроса
  // Логика сохранения времени начала таймера в базе данных
  // (в данном примере мы просто сохраняем в памяти)
  users[timerId] = { startTime };
  res.send('Время начала таймера обновлено');
});

app.listen(port, () => {
  console.log(Сервер запущен на http://localhost:${port});
});
