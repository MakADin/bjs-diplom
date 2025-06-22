"use strict";

const myLogout = new LogoutButton();

myLogout.action = () => ApiConnector.logout((response) => {
  console.log(response);
  if (response.success) {
    location.reload();
  } else {
    console.log(response.error);
  }
});

ApiConnector.current(
  (response) => {
    ProfileWidget.showProfile(response.data);
  }
)

const myRatesBoard = new RatesBoard();
function myGetStocks() {
  ApiConnector.getStocks((response) => {

    if (response.success) {
      myRatesBoard.clearTable();
      myRatesBoard.fillTable(response.data);
    }
  })
}
myGetStocks();
setInterval(() => myGetStocks(), 60000);

const myFavoritesWidget = new FavoritesWidget(); // обязательно его создавать? без него не работает метод setMessage()

const myMoney = new MoneyManager();

myMoney.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {

    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
    response.success ?
      myFavoritesWidget.setMessage(response.success, 'Баланс успешно пополнен') :
      myFavoritesWidget.setMessage(response.success, response.error);
  });
};

myMoney.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      myFavoritesWidget.setMessage(response.success, 'Конвертация валюты успешно выполнена');
    } else {
      myFavoritesWidget.setMessage(response.success, response.error);
    }
  })
}

myMoney.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      myFavoritesWidget.setMessage(response.success, 'Перевод успешно выполнен');
    } else {
      myFavoritesWidget.setMessage(response.success, response.error);
    }
  })
}

ApiConnector.getFavorites((response) => {

  if (response.success) {
    myFavoritesWidget.clearTable();
    myFavoritesWidget.fillTable(response.data);
    myMoney.updateUsersList(response.data);
  }
})

myFavoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {

    if (response.success) {
      myFavoritesWidget.clearTable();
      myFavoritesWidget.fillTable(response.data);
      myMoney.updateUsersList(response.data);
      myFavoritesWidget.setMessage(response.success, `Пользователь ${data.name} успешно внесен в избранное`)
    } else {
      myFavoritesWidget.setMessage(response.success, response.error);
    }
  })
}

myFavoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      myFavoritesWidget.clearTable();
      myFavoritesWidget.fillTable(response.data);
      myMoney.updateUsersList(response.data);
      myFavoritesWidget.setMessage(response.success, `Пользователь успешно удален из избранного`)
    } else {
      myFavoritesWidget.setMessage(response.success, response.error);
    }
  })
}