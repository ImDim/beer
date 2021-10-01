import instance from './instance.js';

class BeerApi {
  api = instance;

  // Получаем список всего пиваса 
  // params: page - номер страницы; limit - кол-во записей на странице
  getAll(params) {
    return this.api.get("/", {
      params
    });
  }
}

export default new BeerApi();