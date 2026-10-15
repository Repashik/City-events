// Я вибираю React бо в методичці він виглядає зрозумілішим і я чув про нього раніше

// Підтверджує, що javascript підключено
console.log('script.js підключено');

// Адреса, з якої ми беремо дані
const API_URL = 'https://date.nager.at/api/v3/PublicHolidays/2026/UA';

// === Початок React частини ===

// Створення компоненту списку
// function EventCard({ title, category, date }) {
//     // Вибір категорії події 
//     const categoryNames = {
//         movie: 'Кіно',
//         concert: 'Концерт',
//         standup: 'Стендап',
//         show: 'Шоу',
//         other: 'Інше'
//     };
//     const categoryText = categoryNames[category] || 'Інше';
    
//     // Парсинг дати
//     const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
//     const dateObj = new Date(date);
//     const displayDay = dateObj.getDate();
//     const displayMonth = monthNames[dateObj.getMonth()];
    
//     // Розрахунок кількості днів до події
//     const today = new Date();
//     const diffTime = dateObj - today;
//     const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     let daysText = '';
//     if (daysLeft > 0) {
//         daysText = `Залишилося днів: ${daysLeft}`;
//     } else if (daysLeft === 0) {
//         daysText = 'Подія відбувається сьогодні!';
//     } else {
//         daysText = `Подія відбулася ${Math.abs(daysLeft)} дн. тому`;
//     }
    
//     return (
//         <article className={'card'}>
//             <img src="assets/img/The Odyssey.webp" alt={title} />
//             <h3>{title}</h3>
//             <div className="badges">
//                 <time className="date" dateTime={date}>
//                     <span className="month">{displayMonth}</span>
//                     <span className="day">{displayDay}</span>
//                 </time>
//                 <p className="badge">{categoryText}</p>
//             </div>
//             <p className="days-left">{daysText}</p>
//         </article>
//     );
// }

// Головна функція
// function App() {
//     // Переведення в реактивний стан 
//     const [events, setEvents] = React.useState([]);
//     const [isLoading, setIsLoading] = React.useState(true);
//     const [error, setError] = React.useState(null);
    
//     // Опис зміни стану 
//     React.useEffect(() => {
//         async function loadData() {
//             try {
//                 const response = await fetch(API_URL);
//                 if (!response.ok) throw new Error('Дані про події не знайдено');
//                 const data = await response.json();
                
//                 const formattedEvents = data.map((event, index) => ({
//                     id: crypto.randomUUID(),
//                     title: event.localName,
//                     category: 'other',
//                     date: event.date
//                 }));
                
//                 setEvents(formattedEvents);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
        
//         loadData();
//     }, []);
    
//     if (error) {
//         return <p className="error-message">Помилка: {error}</p>;
//     }
    
//     if (isLoading) {
//         return <p className="loading">Завантаження подій...</p>;
//     }
    
//     return (
//         <>
//             {events.map(event => (
//                 <EventCard
//                 key={event.id}
//                 title={event.title}
//                 category={event.category}
//                 date={event.date}
//                 />
//             ))}
//         </>
//     );
// }

// Знаходження кореня і рендер
// const root = ReactDOM.createRoot(document.getElementById('events-list'));
// root.render(<App />);

// === Кінець React частини ===

/**
 * Модель даних події:
 * @typedef {Object} Event 
 * @property {number} id 
 * @property {string} date 
 * @property {string} title 
 * @property {string} countryCode 
 * @property {string} category 
*/

// Масив подій
let events = [];

// Список обраних подій
// const savedEvents = loadFromLocalStorage();

// === Рендер ===

// Вибираємо список карт
const listContainer = document.querySelector('#events-list');
// Функція рендеру
function renderEvents(events) {
    // Очищаємо внутрощі списку та створюємо лічильник
    listContainer.innerHTML = '';
    let eventsCount = 0;

    // Масив з короткими назвами місяців для відображення
    const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];

    // events = events.concat(getAllItems());

    events.sort((a, b) => { return calculateDaysLeft(a.date) - calculateDaysLeft(b.date); });
    // Циклом проходимся по подіям 
    events.forEach(event => {
        // Стоврюємо HTML-теги
        const card = document.createElement('article');

        // Пишемо потрібний текст
        let categoryText = "Інше";
        if (event.category === "movie") categoryText = "Кіно";
        else if (event.category === "concert") categoryText = "Концерт";
        else if (event.category === "standup") categoryText = "Стендап";
        else if (event.category === "show") categoryText = "Шоу";

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
        } else {
            card.classList.add('other');
        }

        let displayDay = "??";
        let displayMonth = "???";
        let daysLeft = 0; // Оголошуємо заздалегідь

        // Якщо дата існує, розбираємо її
        if (event.date) {
            // Перетворюємо рядок формату "YYYY-MM-DD" на об'єкт Date
            const dateObj = new Date(event.date); 

            displayDay = dateObj.getDate();
            displayMonth = monthNames[dateObj.getMonth()];
            
            // Розраховуємо дні одразу тут, поки dateObj існує
            const today = new Date();
            const timeDiff = dateObj - today;
            daysLeft = Math.abs(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) % 365);
        }
        // Розраховуємо ширину смуги у відсотках
        let progressPercent = Math.min((daysLeft / 365) * 100, 100);

        let status = "?";
        if (savedEvents.some(saved => String(saved.id) === String(event.id))) {
            status = "Вилучити з обраного";
        } else {
            status = "В обране";
        }

        // Підставляємо нові змінні у відповідні теги span
        card.innerHTML = `
            <h3>${event.title}</h3>
            <div class="badges">
                <time class="date" datetime="${event.date}">
                    <span class="month">${displayMonth}</span>
                    <span class="day">${displayDay}</span>
                </time>
                <p class="badge">${categoryText}</p>
                <button class="btn-fav" data-id="${event.id}">${status}</button>
            </div>
            <div class="progress-bar">
                <div class="progress-bar_fill" style="width: 0%;"></div>
            </div>
            <p class="days-text">Днів до події: ${daysLeft > 0 ? daysLeft : 0}</p>
        `;

        // Додаємо катру в список карт і збільшуємо лічильник
        listContainer.append(card);
        eventsCount++;

        const fill = card.querySelector('.progress-bar_fill');
        if (fill) {
            setTimeout(() => {
                fill.style.width = `${progressPercent}%`;
            }, 50);
        }
    });

    // Пишемо потрібне число в тег лічильника
    const pContainer = document.querySelector('#events-count');
    pContainer.textContent = 'Кількість подій: ' + eventsCount;
}

function calculateDaysLeft(dateString) {
    if (!dateString) return Infinity;
    
    const today = new Date();
    const dateObj = new Date(dateString);
    const timeDiff = dateObj - today;
    
    return Math.abs(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) % 365);
}

// === В обране ===

// Обробник натискання кнопки "В обране"
listContainer.addEventListener('click', async (e) => {
    const button = e.target.closest('.btn-fav');
    if (!button) return;

    // Отримуємо id події
    const eventId = button.dataset.id; 
    
    // Шукаємо, чи є вже ця подія в масиві збережених за її ID
    const savedIndex = savedEvents.findIndex(item => String(item.id) === eventId);
    
    if (savedIndex !== -1) {
        await deleteItem(eventId);
        savedEvents.splice(savedIndex, 1);
    } else {
        const targetEvent = events.find(item => String(item.id) === eventId);
        if (targetEvent) {
            await addItem(targetEvent);
            savedEvents.push(targetEvent);
        }
    }
    
    renderEvents(events);
});

const allEventsButton = document.querySelector('#all-events-btn');
const savedEventsButton = document.querySelector('#saved-event-btn');

allEventsButton.addEventListener('click', () => {
    renderEvents(events);
});

savedEventsButton.addEventListener('click', () => {
    renderEvents(savedEvents);
});

// === Форма ===

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
form.addEventListener('submit', async (event) => {
    // Без перезавантажень
    event.preventDefault();

    // Дістаємо дані з форми
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const category = formData.get('category');
    const date = formData.get('date');

    // Створюємо нову подію
    const newEvent = {
        id: crypto.randomUUID(), 
        date: date, 
        title: title, 
        countryCode: "UA", 
        category: category, 
    };

    // Зберігаємо безпосередньо в IndexedDB
    await addItem(newEvent);
    
    // Додаємо подію в масив для відображення
    events.push(newEvent);
    renderEvents(events);
    form.reset();
});

// === Фільтр ===

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

// === FetchAPI ===

// Функція для завантаження даних з API-запиту
async function loadData() {
    try{
        // Знак завантаження
        listContainer.innerHTML = '<p class="loading">Завантаження подій...</p>';

        // API-запит
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Дані про події не знайдено'); // Помилка
        const data = await response.json(); // Завантажуємо дані 
        console.log(data); // Логуємо дані
        
        events.length = 0; // Стираємо фіктивні дані з минулих практикумів
        
        // Парсинг даних
        data.forEach(event => {
            // Створюємо подію
            const newEvent = {
                id: crypto.randomUUID(), 
                date: event.date,
                title: event.localName,
                countryCode: event.countryCode, 
                category: 'other'
            };
            // Додаємо подію
            events.push(newEvent); 
        });

        // Витягуємо дані з бази даних
        const dbEvents = await getAllItems(); 
        events.push(...dbEvents);

        // Заново рендеримо дані
        renderEvents(events);
    } catch (error) {
        // Логуємо помилку
        console.error('Технічна помилка:', error);
        
        // Редагуємо повідомлення про помилку
        let userMessage = 'Не вдалося завантажити події. Перевірте з`єднання з інтернетом.';
        if (error.message === 'Дані про події не знайдено') {
            userMessage = 'Дані про події не знайдено.';
        }
        
        // Додаємо на сторінку повідомлення про помилку та кнопку перезавантаження
        listContainer.innerHTML = `
        <p class="error-message">${userMessage}</p>
        <button id="error-button">Оновити</button>
        `;

        // Обробка кнопки перезавантаження
        const reloadButton = document.querySelector('#error-button');
        reloadButton.addEventListener('click', (event) => {
            loadData();
        });
        
        // Оновлюємо лічильник 
        const pContainer = document.querySelector('#events-count');
        pContainer.textContent = 'Кількість подій: 0';
    } finally {
        // Видаляємо знак завантаження 
        const loadingElement = listContainer.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }
};

// === Локальне сховище ===

// Функція зберігання на локальне сховище 
function saveToLocalStorage(savedEvents) {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
}
// Функція завантаження з локального сховища
function loadFromLocalStorage() {
    try {
        const raw = localStorage.getItem('savedEvents');
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error('Пошкоджені дані в localStorage:', error);
        return [];
    }
}

// === IndexedDB ===

// Глобальна змінна для зберігання посилання на підключення до БД
let db = null;
// Функція відкриття бази даних
function openDB() {
    return new Promise((resolve, reject) => {
        // Відкриваємо базу даних
        const request = indexedDB.open('EventsDB', 1);

        // при першому створенні БД або коли ми збільшуємо номер версії
        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            
            // Перевіряємо, чи ще не існує сховища 'savedEvents'
            if (!database.objectStoreNames.contains('savedEvents')) {
                // Створюємо сховище 'savedEvents', де унікальним ідентифікатором буде поле 'id'
                database.createObjectStore('savedEvents', { keyPath: 'id' });
                console.log('Об\'єктне сховище "savedEvents" успішно створено!');
            }
        };

        // при кожному успішному підключенні до БД
        request.onsuccess = (event) => {
            db = event.target.result; // Зберігаємо підключення у глобальну змінну
            console.log('IndexedDB успішно відкрито!');
            resolve(db);
        };

        // помилка доступу
        request.onerror = (event) => {
            console.error('Помилка відкриття IndexedDB:', event.target.error);
            reject(event.target.error);
        };
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['savedEvents'], 'readonly');
        const store = transaction.objectStore('savedEvents');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function addItem(item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['savedEvents'], 'readwrite');
        const store = transaction.objectStore('savedEvents');
        const request = store.add(item);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function updateItem(item) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['savedEvents'], 'readwrite');
        const store = transaction.objectStore('savedEvents');
        const request = store.put(item);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function deleteItem(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['savedEvents'], 'readwrite');
        const store = transaction.objectStore('savedEvents');
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
    });
}

async function migrateFromLocalStorage() {
    const rawData = localStorage.getItem('savedEvents');
    
    if (!rawData) {
        return;
    }

    try {
        const localEvents = JSON.parse(rawData);

        // Перевіряємо, чи отримані дані дійсно є масивом
        if (Array.isArray(localEvents) && localEvents.length > 0) {
            console.log(`Початок міграції: знайдено ${localEvents.length} подій у LocalStorage...`);

            for (const item of localEvents) {
                await updateItem(item);
            }

            console.log('Міграція успішно завершена!');
        }

        // Очищаємо ключ у localStorage, щоб не виконувати міграцію повторно
        localStorage.removeItem('savedEvents');
    } catch (error) {
        console.error('Помилка під час міграції даних:', error);
    }
}

let savedEvents;

async function initApp() {
    try {
        await openDB();

        await migrateFromLocalStorage();

        savedEvents = await getAllItems();

        await loadData();
    } catch (err) {
        console.error('Помилка ініціалізації додатку:', err);
    }
}

// Запуск програми
initApp();