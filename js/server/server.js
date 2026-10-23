// Підключаємо Express
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '../../')));
const PORT = 3000;

// Локальні дані
const events = [
    {
        id: 1,
        date: "2026-11-10",
        title: "Великий благодійний стендап",
        countryCode: "UA",
        category: "standup"
    },
    {
        id: 2,
        date: "2026-11-15",
        title: "Кінопоказ фестивальних короткометражок",
        countryCode: "UA",
        category: "movie"
    },
    {
        id: 3,
        date: "2026-11-20",
        title: "Акустичний концерт на даху",
        countryCode: "UA",
        category: "concert"
    },
    {
        id: 4,
        date: "2026-12-01",
        title: "Світлове шоу дронів",
        countryCode: "UA",
        category: "show"
    },
    {
        id: 5,
        date: "2026-12-25",
        title: "Різдвяний міський ярмарок",
        countryCode: "UA",
        category: "other"
    }
];

// Ендпоінт для отримання всього списку подій
app.get('/api/events', (req, res) => {
    res.json(events);
});

// Ендпоінт деталей конкретної події
app.get('/api/events/:id', (req, res) => {
    // Шукаємо подію в нашому масиві, де id збігається з переданим параметром URL
    const event = events.find((i) => String(i.id) === req.params.id);
    
    // Якщо подію не знайдено, припиняємо виконання, встановлюємо статус 404 і відправляємо JSON з помилкою
    if (!event) {
        return res.status(404).json({ error: 'Не знайдено' });
    }
    
    // Відправляємо цей об'єкт
    res.json(event);
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// Запуск сервера
// app.listen(PORT, () => {
//     console.log(`Сервер успішно запущено на http://localhost:${PORT}`);
// });

// Vercel
module.exports = app;