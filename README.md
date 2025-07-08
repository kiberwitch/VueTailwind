### 🚀 Представляю вам мой проект: Интернет-магазин кроссовок на Vue 3

#### Обзор проекта
Друзья, коллеги и все ценители современной веб-разработки! Сегодня я с гордостью представляю вам результат нескольких недель кропотливой работы — полноценный интернет-магазин кроссовок, созданный с использованием самых актуальных технологий фронтенд-разработки. Этот проект стал для меня не просто учебным упражнением, а настоящим вызовом, позволившим глубоко погрузиться в экосистему Vue 3 и продемонстрировать лучшие практики создания интерактивных веб-приложений.

💡 Вдохновение и цели проекта
Идея этого проекта родилась из желания создать не просто "ещё один интернет-магазин", а тщательно продуманное пользовательское пространство, где каждая деталь работает на удобство покупателя. Я поставил перед собой несколько ключевых задач:

Реализовать "живое" взаимодействие — чтобы добавление товаров в корзину и избранное сопровождалось приятными анимациями

Добиться безупречной производительности — даже при большом количестве товаров

Создать адаптивный интерфейс — одинаково удобный на любом устройстве

Организовать код по современным стандартам — с чётким разделением ответственности

Реализовать полноценную бизнес-логику — корзину, избранное, сортировку и поиск
---

### 🛠 Технологический стек
1. **Vue 3** (Composition API с `<script setup>` синтаксисом)
2. **Vue Router** - для навигации между страницами
3. **Pinia/Vuex** - глобальное состояние (в данном случае используется кастомная реализация с Composition API)
4. **Tailwind CSS** - стилизация компонентов
5. **Flowbite** - UI компоненты (карусель/слайдер)
6. **Axios** - HTTP-клиент для работы с API
7. **AutoAnimate** - плавные анимации интерфейса
8. **LocalStorage** - сохранение состояния между сессиями
9. **Vite** - сборка проекта

---

### 📁 Структура проекта
```
src/
├── components/
│   ├── Card.vue        # Компонент карточки товара
│   ├── Cardlist.vue    # Список товаров
│   ├── Header.vue      # Шапка сайта (навигация + корзина)
│   └── Slider.vue      # Карусель на главной странице
│
├── composables/
│   └── useCart.js      # Логика работы с корзиной и избранным
│
├── pages/
│   ├── Home.vue        # Главная страница
│   └── Favorites.vue   # Страница избранного
│
├── router/
│   └── index.js        # Конфигурация маршрутизации
│
├── App.vue             # Корневой компонент
└── main.js             # Точка входа
```

---

### 🌟 Ключевые особенности

#### 1. Глобальное состояние (useCart.js)
```javascript
const cartItems = ref([]);
const favoriteItems = ref([]);

// Загрузка из LocalStorage
try {
  const savedCart = localStorage.getItem("cart");
  cartItems.value = savedCart ? JSON.parse(savedCart) : [];
  
  const savedFavorites = localStorage.getItem("favorites");
  favoriteItems.value = savedFavorites ? JSON.parse(savedFavorites) : [];
} catch {
  cartItems.value = [];
  favoriteItems.value = [];
}

// Основные методы:
const addToCart = (item) => { /* ... */ };
const removeFromCart = (id) => { /* ... */ };
const updateQuantity = (id, newQuantity) => { /* ... */ };
const toggleFavorite = (item) => { /* ... */ };
const isInCart = (id) => { /* ... */ };
const isFavorite = (id) => { /* ... */ };

// Computed свойства:
const totalPrice = computed(() => { /* ... */ });
const totalItems = computed(() => { /* ... */ });
```

#### 2. Адаптивный Header с корзиной
- **Мобильное меню** (открывается снизу на мобильных устройствах)
- **Drawer корзины** (открывается с правой стороны)
- Индикаторы количества товаров в корзине и избранном
- Анимации с помощью AutoAnimate

```vue
<button @click="openCart">
  <img src="/public/img/ico/cart.svg" alt="Cart">
  <span v-if="totalItems > 0">{{ totalItems }}</span>
</button>
```

#### 3. Система корзины
- Добавление/удаление товаров
- Изменение количества
- Расчет итоговой суммы
- Оформление заказа (имитация)
- Сохранение в LocalStorage

```vue
<button 
  @click="isInCart(item.id) ? removeFromCart(item.id) : addToCart(item)"
>
  <img :src="isInCart(item.id) ? 'basket-filled.svg' : 'basket-empty.svg'" 
</button>
```

#### 4. Работа с API
Загрузка товаров с Mock API (mokky.dev):
```javascript
onMounted(async () => {
  try {
    const response = await axios.get("https://8b5e3ba06486309b.mokky.dev/items");
    items.value = response.data;
  } catch {
    error.value = "Не удалось загрузить данные.";
  }
});
```

#### 5. Сортировка и поиск
```javascript
const filteredAndSortedItems = computed(() => {
  let result = [...items.value];
  
  // Поиск
  if (searchQuery.value) {
    result = result.filter(item => 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  // Сортировка
  switch (sortOption.value) {
    case "price_cheap": return result.sort((a, b) => a.price - b.price);
    case "price_expensive": return result.sort((a, b) => b.price - a.price);
    case "title": return result.sort((a, b) => 
        a.title.localeCompare(b.title, 'ru'));
    default: return result;
  }
});
```

#### 6. Карусель с Flowbite
```vue
<div id="indicators-carousel" class="relative w-full" data-carousel="static">
  <!-- Slides -->
  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
    <div v-for="(slide, index) in slides" :key="index"
         class="hidden duration-700 ease-in-out" 
         :data-carousel-item="index === 0 ? 'active' : ''">
      <img :src="slide" class="absolute block w-full">
    </div>
  </div>
  
  <!-- Кнопки навигации -->
  <button type="button" data-carousel-prev>...</button>
  <button type="button" data-carousel-next>...</button>
</div>
```

#### 7. Анимации с AutoAnimate
```vue
<template>
  <div v-auto-animate>
    <Card v-for="item in items" :key="item.id" :item="item"/>
  </div>
</template>

<script setup>
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
</script>
```

---

### 🚀 Запуск проекта
1. Установите зависимости:
```bash
npm install
```

2. Запустите сервер разработки:
```bash
npm run dev
```

3. Для production сборки:
```bash
npm run build
```

---

### 📱 Адаптивность
- Полностью адаптивный дизайн
- Мобильное меню с нижним выездом
- Grid-раскладка товаров:
  - 1 колонка на мобильных
  - 2 колонки на планшетах
  - 4 колонки на десктопе

```vue
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <!-- Карточки товаров -->
</div>
```

---

### 🔧 Конфигурация
**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A5D364',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

**router/index.js:**
```javascript
const routes = [
  { 
    path: '/', 
    component: Home 
  },
  { 
    path: '/favorites',  
    component: Favorites 
  },
];
```

---

### 🌈 Особенности реализации
1. **Оптимизация производительности:**
   - Композиблы вместо Vuex/Pinia
   - Computed свойства для сортировки/фильтрации
   - Ленивая загрузка компонентов

2. **UX-улучшения:**
   - Анимации добавления/удаления элементов
   - Интерактивная корзина
   - Визуальная обратная связь при действиях
   - Адаптивные изображения

3. **Архитектура:**
   - Компонентный подход
   - Разделение логики и представления
   - Переиспользуемые composables
   - Контейнерные/презентационные компоненты

---

### 🧪 Тестирование
Проект включает:
1. Валидацию пропсов в компонентах
2. Обработку ошибок API
3. Граничные случаи (пустая корзина, отсутствие избранного)
4. Локальное сохранение состояния

---

### 📝 Инструкция по расширению
1. Добавление новых страниц:
   - Создайте компонент в `/pages`
   - Добавьте маршрут в `/router/index.js`
   
2. Добавление нового функционала в корзину:
   - Редактируйте методы в `/composables/useCart.js`
   - Обновите компонент Header и корзины

3. Изменение стилей:
   - Используйте Tailwind CSS классы
   - Кастомизируйте тему в `tailwind.config.js`

---

### ⚙️ Зависимости (package.json)
```json
"dependencies": {
  "axios": "^1.6.0",
  "flowbite": "^1.8.0",
  "vue": "^3.3.0",
  "vue-router": "^4.2.0"
},
"devDependencies": {
  "@formkit/auto-animate": "^1.0.0",
  "tailwindcss": "^3.3.0"
}
```

---



### 💼 Практическая ценность
Этот проект демонстрирует:

- Глубокое понимание Vue 3 и его экосистемы
- Умение работать с состоянием приложения
- Навыки создания адаптивных интерфейсов
- Способность реализовывать сложную бизнес-логику
- Внимание к пользовательскому опыту

### 🤝 Приглашаю к сотрудничеству
Если вы:

- Ищете Vue-разработчика для своего проекта
- Хотите доработать или масштабировать подобное решение
- Ищете вдохновение для собственного интернет-магазина
— буду рад обсудить возможности сотрудничества! Этот проект — лишь верхушка айсберга моих возможностей во фронтенд-разработке.

### 🌟 Заключение
Создание этого интернет-магазина стало для меня ценным опытом, позволившим не только закрепить технические навыки, но и развить дизайн-мышление. Я горжусь результатом и с удовольствием продемонстрирую его работу вживую или подробнее расскажу о любом аспекте реализации.
Проект доступен для просмотра и тестирования — вы можете оценить плавность анимаций, удобство интерфейса и продуманность каждой детали. Добро пожаловать в мой Vue 3 Sneakers Store!
Проект демонстрирует современные подходы к разработке на Vue 3, включая Composition API, работу с состоянием, адаптивный дизайн и интеграцию с внешними библиотеками. Код организован по принципам чистой архитектуры и готов к дальнейшему расширению функционала.


