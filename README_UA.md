# Cross Assignment 6

## Опис

CoffeeToGo — це мобільний застосунок кав'ярні, розроблений за допомогою React Native.

Для навігації застосунок використовує Stack Navigator, Bottom Tab Navigator та Drawer Navigator. Дані про товари завантажуються з REST API за допомогою Fetch API та динамічно відображаються в застосунку.

У цій версії проєкту основна увага приділена керуванню глобальним станом за допомогою Context API та Redux Toolkit.

Context API використовується для керування даними профілю користувача між різними екранами. Redux Toolkit використовується для керування кошиком і списком улюблених товарів.

Проєкт також містить інтеграцію з REST API, фільтрацію та пошук товарів, керування кошиком, улюбленими товарами, перегляд деталей товару та оформлення замовлення.

## Керування глобальним станом

У застосунку використовуються два підходи для керування глобальним станом:

- Context API — дані профілю користувача
- Redux Toolkit — кошик і улюблені товари

### Context API

Дані профілю користувача керуються за допомогою `UserContext`.

Контекст зберігає:

- Ім'я користувача
- Email користувача

`UserProvider` обгортає застосунок і надає іншим компонентам стан користувача та функцію `updateUser`.

На екрані Profile користувач може змінити інформацію профілю. Оновлене ім'я також відображається на Home screen.

Це демонструє використання Context API для спільного доступу до глобального стану та його оновлення між різними компонентами.

### Redux Toolkit

Redux Toolkit використовується для керування кошиком та улюбленими товарами.

Redux store містить:

- `cart`
- `favorites`

У застосунку використовуються:

- `configureStore`
- `createSlice`
- `Provider`
- `useSelector`
- `useDispatch`

### Стан кошика

Кошик керується через `cartSlice`.

Доступні такі операції:

- Додавання товару
- Видалення товару
- Зміна кількості товару
- Зміна вибраного розміру
- Оновлення ціни при зміні розміру
- Розрахунок проміжної суми, податку та загальної суми

Стан кошика використовується спільно на екранах Coffee Details, Cart та Checkout.

### Улюблені товари

Улюблені товари керуються через `favoritesSlice`.

Користувач може:

- Додавати товар до улюблених
- Видаляти товар з улюблених
- Бачити активний стан улюбленого товару за допомогою заповненої іконки сердечка
- Переглядати всі улюблені товари на окремому екрані Favorites

Стан Favorites синхронізується між кількома екранами:

- Home
- Menu
- Category Products
- Popular Products
- Coffee Details
- Favorites

Екран Favorites можна відкрити через Drawer menu або через Profile screen.

## Структура навігації

У застосунку використовуються:

- Stack Navigator
- Bottom Tab Navigator
- Drawer Navigator

Структура навігації:

```text
Welcome
↓
Drawer Navigator
├── Home
│   └── Bottom Tab Navigator
│       ├── Home Stack
│       │   ├── Home
│       │   ├── Popular Products
│       │   ├── Category Products
│       │   └── Coffee Details
│       ├── Menu Stack
│       │   ├── Menu
│       │   ├── Category Products
│       │   └── Coffee Details
│       ├── Cart Stack
│       │   ├── Cart
│       │   └── Checkout
│       └── Profile
├── Favorites
├── Settings
├── About Us
└── Contact Us
```

## Функціональність

- Welcome screen
- Home screen
- Профіль користувача
- Редагування імені та email користувача
- Глобальний стан користувача за допомогою Context API
- Меню кави
- Детальна інформація про каву
- Інтеграція REST API
- Завантаження товарів з MockAPI
- GET-запити за допомогою Fetch API
- Відображення товарів через FlatList
- Індикатор завантаження під час отримання даних
- Обробка помилок API
- Популярні товари
- Фільтрація товарів за категоріями
- Пошук на сторінках категорій та популярних товарів
- Категорії Hot, Cold та Iced
- Перехід від категорії до відфільтрованого списку товарів
- Перехід зі списку товарів до Coffee Details
- Завантаження зображень товарів через API
- Вибір розміру напою
- Різні ціни для Small, Medium та Large
- Вибір кількості товару
- Глобальний стан кошика через Redux Toolkit
- Додавання товарів у кошик
- Видалення товарів із кошика
- Зміна кількості товару в кошику
- Зміна розміру товару в кошику
- Розрахунок subtotal, tax і total
- Керування Favorites через Redux Toolkit
- Додавання та видалення улюблених товарів
- Синхронізація Favorites між різними екранами
- Окремий Favorites screen
- Checkout screen
- Bottom Tab navigation
- Drawer navigation
- Stack navigation
- Кастомні navigation headers
- Іконки навігації
- Навігація назад
- Drawer swipe gesture
- Передавання ID та даних товару між екранами

## Інтеграція API

Дані про товари завантажуються з REST API, створеного за допомогою MockAPI.

URL API зберігається у змінній середовища та не додається безпосередньо до репозиторію.

Логіка API-запитів винесена в окремий файл:

```text
src/api/api.js
```

Товари завантажуються за допомогою GET-запиту через Fetch API:

```js
import { API_URL } from '@env';

// GET request to load all coffee products from MockAPI
export const fetchProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return data;
};
```

Отримані дані зберігаються в локальному стані компонентів за допомогою `useState`.

`useEffect` використовується для завантаження товарів під час відкриття відповідних екранів.

## Структура Context API

Контекст користувача знаходиться у:

```text
src/context/UserContext.jsx
```

`UserContext` надає глобальні дані користувача та функцію для їх оновлення.

Контекст використовується щонайменше на двох екранах:

- Profile
- Home

Завдяки цьому інформація, змінена на Profile screen, одразу доступна на Home screen.

## Структура Redux

Файли Redux розділені таким чином:

```text
src/redux/
├── store.js
├── cartSlice.js
└── favoritesSlice.js
```

Redux store налаштований за допомогою `configureStore`.

Застосунок обгорнутий у Redux `Provider`, завдяки чому екрани та компоненти можуть отримувати доступ до глобального Redux state.

`useSelector` використовується для отримання даних зі state, а `useDispatch` — для відправлення Redux actions.

## Список товарів

Товари, отримані через API, відображаються за допомогою React Native `FlatList`.

Для списків використовуються:

- `data` для товарів з API
- `renderItem` для відображення карток
- `keyExtractor` для унікальних ключів
- `HorizontalProductCard` як багаторазовий компонент
- `VerticalProductCard` для відображення товарів на Home screen

Динамічні дані та стан Favorites передаються до компонентів карток через props.

Кожен товар можна вибрати для переходу на Coffee Details screen.

## Завантаження та обробка помилок

Під час завантаження даних застосунок показує `ActivityIndicator`.

Якщо API-запит завершується помилкою, застосунок показує:

```text
Failed to load products
```

Це запобігає аварійному завершенню роботи застосунку, якщо API або мережа недоступні.

## Передавання даних

При виборі товару його ID та дані передаються на Coffee Details screen:

```js
navigation.navigate(SCREENS.COFFEE_DETAILS, {
  productId: item.id,
  product: item,
});
```

Дані товару отримуються на Coffee Details screen через route parameters:

```js
const { product } = route.params || {};
```

Якщо дані товару відсутні, застосунок показує:

```text
Product not found
```

замість аварійного завершення роботи.

## Технології

- React Native
- JavaScript
- React Navigation
- Native Stack Navigator
- Bottom Tab Navigator
- Drawer Navigator
- Context API
- Redux Toolkit
- React Redux
- Fetch API
- MockAPI
- React Native Vector Icons
- React Native Safe Area Context
- react-native-dotenv

## Тестування

Застосунок протестовано на Android emulator.

Було перевірено:

- Роботу глобального стану через Context API
- Оновлення даних профілю
- Передавання даних користувача між Profile та Home
- Інтеграцію Redux store
- Додавання товарів у кошик
- Видалення товарів із кошика
- Зміну кількості товарів
- Зміну розміру товарів
- Розрахунки кошика
- Додавання товарів до Favorites
- Видалення товарів із Favorites
- Синхронізацію Favorites між екранами
- Навігацію до Favorites
- Завантаження товарів через REST API
- Loading state
- Обробку помилок API
- Відображення товарів через FlatList
- Навігацію між екранами
- Bottom Tab navigation
- Drawer navigation
- Drawer swipe gesture
- Stack navigation
- Back navigation
- Передавання ID та даних товару
- Фільтрацію за категоріями
- Popular Products
- Пошук товарів
- Завантаження зображень через API
- Вибір розміру кави
- Зміну ціни залежно від розміру
- Checkout flow

Проєкт також перевірено за допомогою ESLint — помилок та попереджень немає.

`SafeAreaView` використовується для коректного відображення контенту відносно системних елементів інтерфейсу.

## Скріншоти

### Welcome Screen

![Welcome Screen](./src/assets/screenshots/welcome.png)

### Home Screen — Context API

На Home screen відображається ім'я користувача, отримане з `UserContext`.

![Home Screen](./src/assets/screenshots/home.png)

### Menu Screen

![Menu Screen](./src/assets/screenshots/menu.png)

### Coffee Categories

![Coffee Categories](./src/assets/screenshots/categories.png)

### Coffee Categories Search

![Coffee Categories Search](./src/assets/screenshots/categories-search.png)

### Coffee Details

![Coffee Details](./src/assets/screenshots/coffee_details.png)

### Cart — Redux

Cart screen демонструє глобальний стан кошика, керований за допомогою Redux Toolkit.

![Cart](./src/assets/screenshots/cart.png)

### Checkout

![Checkout](./src/assets/screenshots/checkout.png)

### Drawer

![Drawer](./src/assets/screenshots/drawer.png)

### Favorites — Redux

Favorites screen демонструє глобальний стан улюблених товарів, керований за допомогою Redux Toolkit.

![Favorites](./src/assets/screenshots/favorites.png)

### Profile — Context API

На Profile screen користувач може змінювати глобальні дані профілю за допомогою Context API.

![Profile](./src/assets/screenshots/profile.png)

## Демо-відео

Коротке відео демонструє навігацію застосунку, роботу Context API, Redux cart, Favorites та іншу основну функціональність:

[Переглянути демо-відео](./src/assets/video/app-demo-6.mp4)

## Змінні середовища

Створіть файл `.env` у кореневій папці проєкту:

```env
API_URL=YOUR_MOCKAPI_PRODUCTS_URL
```

Файл `.env` виключений із Git за допомогою `.gitignore`.

## Запуск проєкту

Встановіть залежності:

```bash
npm install
```

Створіть `.env` у кореневій папці:

```env
API_URL=YOUR_MOCKAPI_PRODUCTS_URL
```

Запустіть Metro:

```bash
npx react-native start
```

Запустіть Android-застосунок:

```bash
npx react-native run-android
```

## Якість коду

Проєкт має модульну структуру.

- Логіка Context API винесена в `UserContext.jsx`.
- Redux-логіка розділена між `cartSlice.js` та `favoritesSlice.js`.
- Конфігурація Redux store знаходиться в окремому `store.js`.
- Багаторазові UI-компоненти отримують динамічні дані через props.
- Спільні значення, наприклад кольори, зберігаються в constants.
- Складна або неочевидна логіка пояснюється коментарями.
- ESLint завершує перевірку без помилок та попереджень.