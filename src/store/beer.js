import BEER_API from "@/services/beer.js";

export default {
  state: {
    beer: [],
  },
  getters: {
    allBeer(state) {
      // Длина описания
      let descrLength = 100;

      return state.beer.map((item) => {
        return {
          ...item,
          description:
            item.description.length > descrLength
              ? item.description.substr(0, descrLength) + "..."
              : item.description,
        };
      });
    },

    getEditBeer: state => id => {
      return state.beer.find(item => item.id === id);
    }
  },
  mutations: {
    setPostsData(state, data) {
      state.beer = [
        ...state.beer,
        ...data
      ]
    },
    deleteBeer(state, id) {
      const findItem = state.beer.find(item => item.id === id);
      const index = state.beer.indexOf(findItem);
      state.beer.splice(index, 1);
    },
    updateBeer(state, data) {
      let editItem = state.beer.find(item => item.id === data.id);
      editItem = data;
      return editItem;
    }
  },
  actions: {
    // Get All Beer
    async getBeer({
      commit
    }, params) {
      let response;
      try {
        response = await BEER_API.getAll(params);
      } catch (error) {
        console.info(error)
        return;
      }

      commit('setPostsData', response.data);

      return response.data;
    }
  },
}