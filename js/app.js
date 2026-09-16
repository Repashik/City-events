// Підтверджує, що javascript підключено
console.log('script.js підключено');

// Масив подій
const events = [
    { title: "Одіссея", category: "Кіно" },
    { title: "Кузьма Скрябін", category: "Концерт" },
    { title: "Смішна сімка", category: "Стендап" },
    { title: "Промінь", category: "Шоу" }
]

// Вибираємо список карт
const listContainer = document.querySelector('#events-list');

// Функція рендеру
function renderEvents(events) {
    // Очищаємо внутрощі списку та створюємо лічильник
    listContainer.innerHTML = '';
    let eventsCount = 0;

    // Циклом проходимся по подіям 
    events.forEach(event => {
        // Стоврюємо HTML-теги
        const card = document.createElement('article');
        const title = document.createElement('h3');
        const category = document.createElement('p');

        // Пишемо потрібний текст
        title.textContent = event.title;
        category.textContent = event.category;

        // Додаємо теги в тег card
        card.append(title);
        card.append(category);

        // Додаємо класи картці
        card.classList.add('card');
        card.dataset.category = event.category; 
        if (event.category === "Кіно") {
            card.classList.add('movie');
        } else if (event.category === "Концерт") {
            card.classList.add('concert');
        } else if (event.category === "Стендап") {
            card.classList.add('standup');
        } else if (event.category === "Шоу") {
            card.classList.add('show');
        }
        else {
            card.classList.add('other');
        }

        // Додаємо катру в список карт і збільшуємо лічильник
        listContainer.append(card);
        eventsCount++;
    });

    // Пишемо потрібне число в тег лічильника
    const pContainer = document.querySelector('#events-count');
    pContainer.textContent = 'Кількість подій: ' + eventsCount;
}

// Викликаємо функцію рендеру
renderEvents(events);

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