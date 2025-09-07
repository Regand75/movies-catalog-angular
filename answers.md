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

III. 

    
