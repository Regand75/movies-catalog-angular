# Основные темы по JavaScript

---

## I. Процесс распространения событий в JS (Event Propagation)

Event Propagation описывает, как событие, произошедшее на элементе, передаётся через дерево DOM. Есть три фазы:

1. **Фаза перехвата (capturing)**  
   Событие движется сверху вниз: `window → document → html → body → ... → элемент`.

2. **Целевая фаза (target)**  
   Событие доходит до элемента, где срабатывают обработчики, привязанные напрямую.

3. **Фаза всплытия (bubbling)**  
   После элемента событие поднимается обратно вверх по дереву.

### Делегирование событий

Чтобы не вешать обработчик на каждую кнопку, можно навесить его на контейнер:

```html
<table id="users">
  <tr>
    <td>Андрей</td>
    <td><button data-action="edit">Редактировать</button></td>
    <td><button data-action="delete">Удалить</button></td>
  </tr>
  <tr>
    <td>Антон</td>
    <td><button data-action="edit">Редактировать</button></td>
    <td><button data-action="delete">Удалить</button></td>
  </tr>
</table>
```

```js
document.getElementById('users').addEventListener('click', (event) => {
  if (event.target.dataset.action === 'edit') {
    console.log('Редактировать: ', event.target.closest('tr').firstElementChild.textContent);
  }
  if (event.target.dataset.action === 'delete') {
    console.log('Удалить: ', event.target.closest('tr').firstElementChild.textContent);
  }
});
```

### Остановка и отмена

- `event.stopPropagation()` — остановка всплытия (например, при модальном окне).  
- `event.preventDefault()` — отмена стандартного поведения (например, отправка формы):

```js
form.addEventListener('submit', (event) => {
  if (!isValid) {
    event.preventDefault();
  }
});
```

---

## II. Promise

**Promise** — объект, представляющий результат асинхронной операции (успешный или с ошибкой).

Создание:

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.3;
    if (success) {
      resolve('Успех! Данные получены');
    } else {
      reject('Ошибка!');
    }
  }, 1000);
});
```

Обработка:

```js
promise
  .then(result => console.log('Результат: ', result))
  .catch(error => console.log('Ошибка: ', error))
  .finally(() => console.log('Завершение'));
```

### Состояния Promise:

- `pending` — ожидание  
- `fulfilled` — успешно выполнен  
- `rejected` — выполнен с ошибкой  

### Async/Await

Синтаксический сахар над `Promise`:

```js
async function getData() {
  try {
    const data = await fetch('/api/data');
    const json = await data.json();
    console.log(json);
  } catch (error) {
    console.log('Ошибка: ', error);
  }
}
```

### Event Loop

Механизм, позволяющий JS обрабатывать асинхронный код, несмотря на однопоточность.

---

## III. ООП в JavaScript

ООП — подход, где программа рассматривается как набор объектов с **свойствами** и **поведением**.

### Основные принципы

1. **Инкапсуляция**

```js
class User {
  #password; // приватное свойство

  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }

  checkPassword(password) {
    return this.#password === password;
  }
}

const user = new User("Andrey", "12345");
console.log(user.name); // Andrey
console.log(user.checkPassword("12345")); // true
console.log(user.#password); // Ошибка
```

2. **Наследование**

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} издает звук.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} лает.`);
  }
}

const dog = new Dog("Шарик");
dog.speak(); // Шарик лает.
```

3. **Полиморфизм**

```js
const animals = [new Dog("Шарик"), new Animal("Зверь")];

animals.forEach(a => a.speak());
// Шарик лает.
// Зверь издает звук.
```

### Реализация ООП в JS

- **Прототипное наследование**

```js
const person = {
  greet() {
    return 'Привет!';
  }
};
const user = Object.create(person);
console.log(user.greet()); // Привет!
```

- **Классы (синтаксический сахар)**

```js
class Product {
  #price;

  constructor(name, price) {
    this.name = name;
    this.#price = price;
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (value < 0) {
      throw new Error("Цена не может быть отрицательной");
    }
    this.#price = value;
  }
}

const phone = new Product('iPhone', 1000);
console.log(phone.price); // 1000
phone.price = 1200;
console.log(phone.price); // 1200
```

---

## IV. Обработка URL в браузере

1. Браузер проверяет, что ввёл пользователь — **URL или поисковый запрос**.  
2. Если протокол не указан — добавляется `http://` или выполняется поиск.  
3. Парсится URL: схема, домен, порт, путь, query-параметры.  
4. Проверка кеша, политика безопасности, DNS-разрешение.  
5. Устанавливаются соединения (TCP, TLS).  
6. Формируется HTTP-запрос (метод, путь, заголовки).  
7. Проверка CORS при необходимости.  
8. Сервер обрабатывает запрос и возвращает ответ.  
9. Браузер парсит HTML → строит **DOM**, подгружает **CSS, JS, изображения**, выполняет отрисовку.

### Оптимизации

- CDN  
- HTTP Cache, Service Worker  
- Сжатие (gzip, Brotli)  
- HTTP/2, HTTP/3  
- prefetch, preconnect, preload  
- async/defer для скриптов  

### Возможные проблемы

- **Безопасность**: MITM-атаки без HTTPS, подделка DNS, XSS, CSRF, смешанный контент, утечка cookie.  
- **Междоменное взаимодействие**: ограничения политики одного источника (Same-Origin Policy), ошибки CORS, блокировка запросов или утечки данных при некорректных заголовках.
