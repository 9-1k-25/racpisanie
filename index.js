const scheduleData = {
    'пн': [
        { time: '11:30 - 13:00', name: 'Дене тәрбиесі', teacher: 'Садуакасов' },
        { time: '13:15 - 14:45', name: 'Химия', teacher: 'Салим', room: '402' },
        { time: '15:00 - 16:30', name: 'Дүниежүзі тарихы', teacher: 'Абдрахманова' }
    ],
    'вт': [
        { time: '11:30 - 13:00', name: 'Информатика', teacher: 'Несипбаева' },
        { time: '13:15 - 14:45', name: 'География', teacher: 'Калибаров' },
        { time: '15:00 - 16:30', name: 'Орыс тілі мен әдебиеті', teacher: 'Омарова' }
    ],
    'ср': [
        { time: '11:30 - 13:00', name: 'Қазақ тілі', teacher: 'Алимбекова' },
        { time: '13:15 - 14:45', name: 'Графика және жобалау', teacher: 'Елеусізбай' },
        { time: '15:00 - 16:30', name: 'Физика', teacher: 'Жылқайдаров' }
    ],
    'чт': [
        { time: '11:30 - 13:00', name: 'Қазақ әдебиеті', teacher: 'Алимбекова' },
        { time: '13:15 - 14:45', name: 'Қазақстан тарихы', teacher: 'Абдрахманова' },
        { time: '15:00 - 16:30', name: 'АҚД (НВП)', teacher: 'Жаксыбаев', room: 'В/К' }
    ],
    'пт': [
        { time: '11:30 - 13:00', name: 'Графика және жобалау', teacher: 'Елеусізбай' },
        { time: '13:15 - 14:45', name: 'Шет тілі', teacher: 'Касымова', room: '210' },
        { time: '15:00 - 16:30', name: 'Дүниежүзі тарихы', teacher: 'Абдрахманова' }
    ],
    'сб': [
        { time: '11:30 - 13:00', name: 'Математика / Дене тәрб', teacher: 'Бауыржанқызы / Садуакасов' },
        { time: '10:00 - 11:20', name: 'Биология', teacher: 'Буламбаева' },
        { time: '15:00 - 16:30', name: 'Математика', teacher: 'Бауыржанқызы' }
    ]
};

const dayNames = {
    'пн': 'Понедельник', 'вт': 'Вторник', 'ср': 'Среда', 
    'чт': 'Четверг', 'пт': 'Пятница', 'сб': 'Суббота', 'вс': 'Воскресенье'
};

function showDay(day) {
    // 1. Подсветка активной кнопки (чтобы визуально менялось)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        // Проверяем, совпадает ли текст кнопки с выбранным днем
        if (btn.innerText.toLowerCase() === day) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const container = document.getElementById('schedule-container');
    container.innerHTML = `<h2 class="day-title">${dayNames[day]}</h2>`; 

    if (!scheduleData[day] || scheduleData[day].length === 0) {
        container.innerHTML += '<div class="empty-state">🎉 Выходной! Занятий нет.</div>';
        return;
    }

    // 2. Отрисовка карточек
    scheduleData[day].forEach(lesson => {
        // Проверяем наличие кабинета, чтобы не было 'undefined'
        const roomInfo = lesson.room ? `<div class="lesson-info">🚪 Кабинет: <b>${lesson.room}</b></div>` : '<div class="lesson-info">🚪 Кабинет: — </div>';
        
        const card = `
            <div class="lesson-card">
                <div class="lesson-time">🕒 ${lesson.time}</div>
                <div class="lesson-name">${lesson.name}</div>
                ${roomInfo}
                <div class="lesson-info">👨‍🏫 ${lesson.teacher}</div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
    });
}

function init() {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const currentDayIndex = new Date().getDay();
    const today = days[currentDayIndex];

    const dayToOpen = (today === 'вс') ? 'пн' : today;
    showDay(dayToOpen);
    
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('ru-RU', { 
        weekday: 'long', month: 'long', day: 'numeric' 
    });
}