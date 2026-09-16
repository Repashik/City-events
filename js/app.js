// Підтверджує, що javascript підключено
console.log('script.js підключено')

// Масив подій
const events = [
    { title: "Одіссея", category: "Кіно" },
    { title: "Кузьма Скрябін", category: "Концерт" },
    { title: "Смішна сімка", category: "Стендап" },
    { title: "Промінь", category: "Шоу" }
]

// Цикл, що перебирає масив подій та класифікує їх по категоріям
for (let i = 0; i < events.length; i++) {
    if (events[i].category === "Кіно") {
        console.log("Фільм:", events[i].title)
    } else 
    if (events[i].category === "Концерт") {
        console.log("Концерт:", events[i].title)
    } else 
    if (events[i].category === "Стендап") {
        console.log("Стендап:", events[i].title)
    } else 
    if (events[i].category === "Шоу") {
        console.log("Шоу:", events[i].title)
    }
}

// Стрілкова функція, яка скорочує текст до n символів та додає три крапки
const shorten = (text, n) => text.length > n ? text.slice(0, n) + '...' : text

// Перевірка стрілкової функції
console.log("Оригінал:", events[1].title)
console.log("Обрізано:", shorten(events[1].title, 9))