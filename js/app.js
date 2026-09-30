// Підтверджує, що javascript підключено
console.log('script.js підключено');

// Масив подій
const events = [
    { title: "Одіссея", category: "movie" },
    { title: "Кузьма Скрябін", category: "concert" },
    { title: "Смішна сімка", category: "standup" },
    { title: "Промінь", category: "show" }
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
        if (event.category === "movie") category.textContent = "Кіно";
        else if (event.category === "concert") category.textContent = "Концерт";
        else if (event.category === "standup") category.textContent = "Стендап";
        else if (event.category === "show") category.textContent = "Шоу";
        else category.textContent = "Інше";

        // Додаємо теги в тег card
        card.append(title);
        card.append(category);

        // Додаємо класи картці
        card.classList.add('card');
        card.dataset.category = event.category; 
        if (event.category === "movie") {
            card.classList.add('movie');
        } else if (event.category === "concert") {
            card.classList.add('concert');
        } else if (event.category === "standup") {
            card.classList.add('standup');
        } else if (event.category === "show") {
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

// Вибираємо форму
const form = document.querySelector('#event-form');

// Вибираємо поле форми
const titleInput = form.elements['title'];

// Подія валідації
titleInput.addEventListener('input', () => {
    if (titleInput.value.trim().length < 3) {
        titleInput.setCustomValidity('Мінімум 3 символи');
    } else {
        titleInput.setCustomValidity('');
    }
});

// Подія відправлення форми
form.addEventListener('submit', (event) => {
    // Без перезавантажень
    event.preventDefault();

    // Дістаємо дані з форми
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const category = formData.get('category');
    const date = formData.get('date');

    // Створюємо нову подію
    const newEvent = {
        title: title, 
        category: category, 
        date: date
    };

    // Додаємо подію в масив
    events.push(newEvent);
    renderEvents(events);
    form.reset();
});

// Контейнер із кнопками-фільтрами
const filterContainer = document.querySelector('#filter-buttons');

// Змінна для відстеження поточного активного фільтра 
let currentFilter = null;

// Подія фільтру
filterContainer.addEventListener('click', (event) => {
    // Валідація від натискання на дочірній елемент
    const button = event.target.closest('button');
    if (!button) return;

    // Змінна для зберігання категорії
    const clickedCategory = button.dataset.category;

    // Якщо натиснули на ту саму кнопку, що вже активна — скидаємо фільтр
    if (currentFilter === clickedCategory) {
        currentFilter = null;
        button.classList.remove('active');
        renderEvents(events);
    } else {
        // Змінюємо поточний фільтр
        currentFilter = clickedCategory;

        // Оновлюємо клас активності 
        const allButtons = filterContainer.querySelectorAll('button');
        allButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Фільтруємо масив і рендеримо тільки збіги
        const filtered = events.filter(item => item.category === clickedCategory);
        renderEvents(filtered);
    }
});

// // Цикл, що перебирає масив подій та класифікує їх по категоріям
// for (let i = 0; i < events.length; i++) {
//     if (events[i].category === "Кіно") {
//         console.log("Фільм:", events[i].title)
//     } else 
//     if (events[i].category === "Концерт") {
//         console.log("Концерт:", events[i].title)
//     } else 
//     if (events[i].category === "Стендап") {
//         console.log("Стендап:", events[i].title)
//     } else 
//     if (events[i].category === "Шоу") {
//         console.log("Шоу:", events[i].title)
//     }
// }

// // Стрілкова функція, яка скорочує текст до n символів та додає три крапки
// const shorten = (text, n) => text.length > n ? text.slice(0, n) + '...' : text

// // Перевірка стрілкової функції
// console.log("Оригінал:", events[1].title)
// console.log("Обрізано:", shorten(events[1].title, 9))