I. Процесс распространения событий в JS (Event Propagation) описывает, как событие, которое произошло на каком либо элементе, передается через дерево DOM.
Есть три фазы распространения события:
1. фаза перехвата - событие начинает свое движение сверху вниз (window - document - html - body ... - нужный нам элемент)
2. целевая фаза - событие доходит до нашего элемента. Здесь срабатывают обработчики, привязанные напрямую к элементу.
3. фаза всплытия - после элемента, событие поднимается обратно вверх по дереву.

    На практике применяется для делегирования событий:
    Пример: чтобы не вешать обработчик событий на каждую кнопку "Редактировать" и "Удалить", можно повесить обработчик на всю таблицу
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

      document.getElementById('users').addEventListener('click', (event) => {
        if (event.target.dataset.action === 'edit') {
          console.log('Редактировать: ', event.target.closest('tr').firstElementChild.textContent);
        }
        if (event.target.dataset.action === 'delete') {
          console.log('Удалить: ', event.target.closest('tr').firstElementChild.textContent);
        }
      });

    Остановка распространения события, как в случае с модальным окном, используется event.stopPropagation();
    
    Отмена стандартного поведения, например при работе с формами чтобы запретить отправку формы

    form.addEventListener('submit', (event) => {
      if (!isValid) {
        event.preventDefault();
      }
    });

II. Promise (обещание) - это объект, представляющий результат асинхронной операции (успешный или неудачный).
Promise создается с помощью конструктора

    const promise = new Promise((resolve, reject) => {
      // асинхронная операция
      setTimeout(() => {
        const success = Math.randow() > 0.3;
        if (success) {
          resolve('Успех! Данные получены');
        } else {
          reject('Ошибка!');
        }
      },1000);
    });

    Основные методы для обработки:

    promise
      .then(result => console.log('Результат: ', result))
      .catch(error => console.log('Ошбика: ', error))
      .finaly(() => console.log('Завершение'));

    Состояния Promise:
      pending(ожидание);
      fulfilled(успшено выполнен);
      rejected(выполнен с ошибкой).

    Async/Await - синтаксический сахар над Promise

      asycn function getData() {
        try {
          const data = await fetch('/api/data');
          const json = await data.json();
          console.log(json);
        } catch (error) {
          console.log('Ошибка: ', error);
        }
      }

    Event Loop - это механизм, который позволяет JS обрабатывать асинхронные операции, несмотря на однопоточность.

III. ООП - это подход к разработке и написанию кода, при котором программа рассматривается как набор взаимодействующих друг с другом объектов.
    Каждый из таких объектов имеет свои характеристики, свойства, поведения.
    
    Основные принципы ООП:
      Инкапсуляция - размещение поведения и свойств объекта внутри него таким образом, чтобы это поведение или свойства были скрыты от внешнего мира.

        class User {
          #password; // приватное свойство (инкапсуляция)

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
        console.log(user.#password); //Ошибка — приватное свойство

      Наследование используется для того, чтобы выделить для некоторых подобных классов что-то общее и разместить это в родительский класс
      
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

      Полиморфизм - свойство ООП, которое позволяет использовать что-то общее для решения разных задач

      const animals = [
        new Dog("Шарик"),
        new Animal("Зверь")
      ];

      animals.forEach(a => a.speak());
      // Шарик лает.
      // Зверь издает звук.

    Реализация ООП в JS:
      прототипное наслодование - каждый объект может наследовать свойства и методы другого объекта;

      const person = {
        greet() {
          return 'Привет!';
        }
      };
      const user = Object.create(person);
      console.log(user.greet()); // Привет!

      синтаксис классов - более удобная оболочка над прототипами;
      поддержка getters/setters для контроля доступа к свойствам

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

IV. При обработке URL, браузер сначала пытается понять что ввел пользователь - это полноценный URL или поисковый запрос.
    Если нет протокола, часто добавляется http:// или делается поисковый запрос в зависимости от настроек.
    URL парсится: выделяется схема, домен, порт, путь, query параметры.
    Потом проверяются кеш, политика безопасности, DNS-разрешения, устанавливаются соединения TCP и TLS.
    Формируется HTTP-запрос (метод, путь, заголовки и т.д). Для некоторых запросов может сначала выполнить CORS.
    Потом сервер обрабатывает запрос и возвращает ответ.
    Затем браузер начинает парсить HTML - строит DOM, считывает стили, скрипт, подгружает изображения, шрифты, видео и происходит отрисовка страницы.
    
    Оптимизация: CDN, кэширование (HTTP Cache, Service Worker), сжатие (gzip/Brotli), HTTP/2, HTTP/3, prefetch/preconnect/preload, async/defer для скриптов

    Основные проблемы — безопасность (MITM-атаки без HTTPS, подделка DNS, XSS, CSRF, смешанный контент, утечка cookie) и междоменное взаимодействие (ограничения политики одного источника, ошибки настройки CORS, блокировка запросов или утечки данных при некорректных заголовках).
    



    
