// Я вибираю React бо в методичці він виглядає зрозумілішим і я чув про нього раніше

// Підтверджує, що javascript підключено
console.log('script.js підключено');

// Адреса, з якої ми беремо дані
const API_URL = 'https://date.nager.at/api/v3/PublicHolidays/2026/UA';

// Створення компоненту списку
function EventCard({ title, category, date }) {
    // Вибір категорії події 
    const categoryNames = {
        movie: 'Кіно',
        concert: 'Концерт',
        standup: 'Стендап',
        show: 'Шоу',
        other: 'Інше'
    };
    const categoryText = categoryNames[category] || 'Інше';

    // Парсинг дати
    const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
    const dateObj = new Date(date);
    const displayDay = dateObj.getDate();
    const displayMonth = monthNames[dateObj.getMonth()];

    // Розрахунок кількості днів до події
    const today = new Date();
    const diffTime = dateObj - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let daysText = '';
    if (daysLeft > 0) {
        daysText = `Залишилося днів: ${daysLeft}`;
    } else if (daysLeft === 0) {
        daysText = 'Подія відбувається сьогодні!';
    } else {
        daysText = `Подія відбулася ${Math.abs(daysLeft)} дн. тому`;
    }

    return (
        <article className={'card'}>
            <img src="assets/img/The Odyssey.webp" alt={title} />
            <h3>{title}</h3>
            <div className="badges">
                <time className="date" dateTime={date}>
                    <span className="month">{displayMonth}</span>
                    <span className="day">{displayDay}</span>
                </time>
                <p className="badge">{categoryText}</p>
            </div>
            <p className="days-left">{daysText}</p>
        </article>
    );
}

// Головна функція
function App() {
    // Переведення в реактивний стан 
    const [events, setEvents] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Опис зміни стану 
    React.useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Дані про події не знайдено');
                const data = await response.json();

                const formattedEvents = data.map((event, index) => ({
                    id: crypto.randomUUID(),
                    title: event.localName,
                    category: 'other',
                    date: event.date
                }));

                setEvents(formattedEvents);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    if (error) {
        return <p className="error-message">Помилка: {error}</p>;
    }

    if (isLoading) {
        return <p className="loading">Завантаження подій...</p>;
    }

    return (
        <>
            {events.map(event => (
                <EventCard
                    key={event.id}
                    title={event.title}
                    category={event.category}
                    date={event.date}
                />
            ))}
        </>
    );
}

// Знаходження кореня і рендер
const root = ReactDOM.createRoot(document.getElementById('events-list'));
root.render(<App />);

// Масив подій
// const events = [
//     { title: "Одіссея", category: "movie", datetime:"2026-06-28" },
//     { title: "Кузьма Скрябін", category: "concert", datetime:"2026-06-28" },
//     { title: "Смішна сімка", category: "standup", datetime:"2026-06-28" },
//     { title: "Промінь", category: "show", datetime:"2026-06-28" }
// ]

// Вибираємо список карт
// const listContainer = document.querySelector('#events-list');

// Функція рендеру
// function renderEvents(events) {
//     // Очищаємо внутрощі списку та створюємо лічильник
//     listContainer.innerHTML = '';
//     let eventsCount = 0;

//     // Масив з короткими назвами місяців для відображення
//     const monthNames = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];

//     // Циклом проходимся по подіям 
//     events.forEach(event => {
//         // Стоврюємо HTML-теги
//         const card = document.createElement('article');

//         // Пишемо потрібний текст
//         let categoryText = "Інше";
//         if (event.category === "movie") categoryText = "Кіно";
//         else if (event.category === "concert") categoryText = "Концерт";
//         else if (event.category === "standup") categoryText = "Стендап";
//         else if (event.category === "show") categoryText = "Шоу";

//         // Додаємо класи картці
//         card.classList.add('card');
//         card.dataset.category = event.category; 
//         if (event.category === "movie") {
//             card.classList.add('movie');
//         } else if (event.category === "concert") {
//             card.classList.add('concert');
//         } else if (event.category === "standup") {
//             card.classList.add('standup');
//         } else if (event.category === "show") {
//             card.classList.add('show');
//         } else {
//             card.classList.add('other');
//         }

//         let displayDay = "??";
//         let displayMonth = "???";

//         // Якщо дата існує, розбираємо її
//         if (event.datetime) {
//             // Перетворюємо рядок формату "YYYY-MM-DD" на об'єкт Date
//             const dateObj = new Date(event.datetime); 

//             displayDay = dateObj.getDate();
//             displayMonth = monthNames[dateObj.getMonth()];
//         }

//         // Підставляємо нові змінні у відповідні теги span
//         card.innerHTML = `
//             <img src="<!-- assets/img/The Odyssey.webp -->" alt="${event.title}">
//             <h3>${event.title}</h3>
//             <div class="badges">
//                 <time class="date" datetime="${event.datetime}">
//                     <span class="month">${displayMonth}</span>
//                     <span class="day">${displayDay}</span>
//                 </time>
//                 <p class="badge">${categoryText}</p>
//             </div>
//         `;

//         // Додаємо катру в список карт і збільшуємо лічильник
//         listContainer.append(card);
//         eventsCount++;
//     });

//     // Пишемо потрібне число в тег лічильника
//     const pContainer = document.querySelector('#events-count');
//     pContainer.textContent = 'Кількість подій: ' + eventsCount;
// }

// Викликаємо функцію рендеру
// renderEvents(events);

// Вибираємо форму
// const form = document.querySelector('#event-form');

// Вибираємо поле форми
// const titleInput = form.elements['title'];

// Подія валідації
// titleInput.addEventListener('input', () => {
//     if (titleInput.value.trim().length < 3) {
//         titleInput.setCustomValidity('Мінімум 3 символи');
//     } else {
//         titleInput.setCustomValidity('');
//     }
// });

// Подія відправлення форми
// form.addEventListener('submit', (event) => {
//     // Без перезавантажень
//     event.preventDefault();

//     // Дістаємо дані з форми
//     const formData = new FormData(form);
//     const title = formData.get('title').trim();
//     const category = formData.get('category');
//     const date = formData.get('date');

//     // Створюємо нову подію
//     const newEvent = {
//         title: title, 
//         category: category, 
//         date: date
//     };

//     // Додаємо подію в масив
//     events.push(newEvent);
//     renderEvents(events);
//     form.reset();
// });

// Контейнер із кнопками-фільтрами
// const filterContainer = document.querySelector('#filter-buttons');

// Змінна для відстеження поточного активного фільтра 
// let currentFilter = null;

// Подія фільтру
// filterContainer.addEventListener('click', (event) => {
//     // Валідація від натискання на дочірній елемент
//     const button = event.target.closest('button');
//     if (!button) return;

//     // Змінна для зберігання категорії
//     const clickedCategory = button.dataset.category;

//     // Якщо натиснули на ту саму кнопку, що вже активна — скидаємо фільтр
//     if (currentFilter === clickedCategory) {
//         currentFilter = null;
//         button.classList.remove('active');
//         renderEvents(events);
//     } else {
//         // Змінюємо поточний фільтр
//         currentFilter = clickedCategory;

//         // Оновлюємо клас активності 
//         const allButtons = filterContainer.querySelectorAll('button');
//         allButtons.forEach(btn => btn.classList.remove('active'));
//         button.classList.add('active');

//         // Фільтруємо масив і рендеримо тільки збіги
//         const filtered = events.filter(item => item.category === clickedCategory);
//         renderEvents(filtered);
//     }
// });

// Функція для завантаження даних з API-запиту
// async function loadData() {
//     try{
//         // Знак завантаження
//         listContainer.innerHTML = '<p class="loading">Завантаження подій...</p>';

//         // API-запит
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error('Дані про події не знайдено'); // Помилка
//         const data = await response.json(); // Завантажуємо дані 
//         console.log(data); // Логуємо дані
        
//         events.length = 0; // Стираємо фіктивні дані з минулих практикумів
        
//         // Парсинг даних
//         data.forEach(event => {
//             // Створюємо подію
//             const newEvent = {
//                 title: event.localName,
//                 datetime: event.date,
//                 category: 'other'
//             };
//             // Додаємо подію
//             events.push(newEvent); 
//         });

//         // Заново рендеримо дані
//         renderEvents(events);
//     } catch (error) {
//         // Логуємо помилку
//         console.error('Технічна помилка:', error);
        
//         // Редагуємо повідомлення про помилку
//         let userMessage = 'Не вдалося завантажити події. Перевірте з`єднання з інтернетом.';
//         if (error.message === 'Дані про події не знайдено') {
//             userMessage = 'Дані про події не знайдено.';
//         }
        
//         // Додаємо на сторінку повідомлення про помилку та кнопку перезавантаження
//         listContainer.innerHTML = `
//         <p class="error-message">${userMessage}</p>
//         <button id="error-button">Оновити</button>
//         `;

//         // Обробка кнопки перезавантаження
//         const reloadButton = document.querySelector('#error-button');
//         reloadButton.addEventListener('click', (event) => {
//             loadData();
//         });
        
//         // Оновлюємо лічильник 
//         const pContainer = document.querySelector('#events-count');
//         pContainer.textContent = 'Кількість подій: 0';
//     } finally {
//         // Видаляємо знак завантаження 
//         const loadingElement = listContainer.querySelector('.loading');
//         if (loadingElement) {
//             loadingElement.remove();
//         }
//     }
// };

// Викликаємо функцію для завантаження даних (замінено компонентом)
// loadData();
