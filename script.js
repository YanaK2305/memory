const cards = document.querySelectorAll(".card");
let cardOne;
let cardTwo;
let matchedCard = 0;
let disable = false;
// блокирока поля
// заводим глобальные переменные
randomCards();
// вызов функции рандомной расстановки карточек

function flipCard(event) {
  const card = event.target;
  // заводим переменную, на которой произошло событие
  if (card !== cardOne && !disable) {
    card.classList.add("flip");
    //  при событии и клике на карточку не равно первой карточке, то присваеваем класс flip, кроточки переворачивается
    if (!cardOne) {
      cardOne = card;
    } else {
      cardTwo = card;
      disable = true;
      let cardOneImg = cardOne.querySelector("img").src;
      let cardTwoImg = cardTwo.querySelector("img").src;
      matchCards(cardOneImg, cardTwoImg);
      // вызываем по клику две карточки с картинками
    }
  }
}
function matchCards(img1, img2) {
  if (img1 == img2) {
    matchedCard++;
    // если первая картинка равна второй, то показваем следующую карточку
    if (matchedCard == 8) {
      setTimeout(() => {
        alert("Вы победили!");
        // если сравнены все восемь карточек и они окрыты то Вы пбедили
        if (confirm("Начать игру заново?")) {
          randomCards();
          // вызываем окошко с вопросом начать ли игру заново и рандомную раздачу карточек
        }
      }, 800);
    }
    cardOne.onclick = null;
    cardTwo.onclick = null;
    // карточки по клику обнуляются
    cardOne = null;
    cardTwo = null;
    disable = false;
    // отключаем проверку двух пар первыъ карточек, поле разюлокируем, чтобы повторно не кликнуть на уже открытые карточки
  } else {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
    // в противоположном случае, когда карточки не совпали  добавляем класс, по которому две карточки трясуться
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = null;
      cardTwo = null;
      disable = false;
    }, 1200);
  }
}

function randomCards() {
  cardOne = null;
  cardTwo = null;
  matchedCard = 0;
  disable = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  // заводим массив из 8 карточек
  arr.sort(() => {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
    // сортировка рандомна карточек
  });
  cards.forEach((item, index) => {
    let cardImg = item.querySelector("img");
    cardImg.src = `./img/img-${arr[index]}.png`;
    item.classList.remove("flip");
    item.onclick = flipCard;
  });
  // цикл при котором выбираются картинки рандомно и присаиваются рандомной нумерации карточек, убирается класс flip
}
// функция отвечает за рандомную расстановку карточек
