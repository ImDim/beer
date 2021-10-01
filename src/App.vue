<template>
  <div class="beer-logo">{ BEER }</div>
  <transition-group class="beer-list" name="beer-list" tag="div">
    <beer-item
      v-for="item in allBeer"
      :key="item.id"
      :item="item"
      @editItem="showModal"
    />
  </transition-group>
  <button v-if="showLoadMoreBtn" class="beer-list__load-more" @click="nextPage">
    {{ loadMoreText }}
  </button>

  <edit-beer-modal
    v-if="isEditModal"
    :item="editItem"
    @closeModal="closeModal"
  />
</template>

<script>
import BeerItem from "./components/BeerItem.vue";
import EditBeerModal from "./components/EditBeerModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    BeerItem,
    EditBeerModal,
  },

  data() {
    return {
      page: 1,
      limit: 25,
      showLoadMoreBtn: false,
      loadMoreText: "Show next",
      isEditModal: false,
      editItem: {},
    };
  },

  computed: {
    ...mapGetters(["allBeer"]),
  },

  methods: {
    ...mapActions(["getBeer"]),

    nextPage() {
      this.page = ++this.page;
    },

    // Тут можно было бы реализовать через шину событий
    // Но пока и так сойдет
    showModal(item) {
      this.isEditModal = true;
      this.editItem = item;
    },

    closeModal() {
      this.isEditModal = false;
    },
  },

  watch: {
    async page(page) {
      let data;
      this.loadMoreText = "...loading";

      try {
        data = await this.getBeer({
          page,
          limit: this.limit,
        });
      } catch (error) {
        // Тут бы норм обработку ошибки
        // Но пока и так сойдет
        console.info(error);
        return;
      }

      this.loadMoreText = "Show next";

      if (!data.length) {
        this.showLoadMoreBtn = false;
      }
    },
  },

  async mounted() {
    await this.getBeer({
      page: this.page,
      limit: this.limit,
    });

    this.showLoadMoreBtn = true;
  },
};
</script>

<style lang="scss">
#app {
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji",
    "Segoe UI Symbol";
  -webkit-font-smoothing: auto;
  font-size: 16px;
  line-height: 1.5;
}

.beer-logo {
  width: 320px;
  margin: 0 auto;
  text-align: center;
  font-size: 64px;
  font-weight: bold;
  color: #afafaf;
  margin: 80px auto;
}

.beer-list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 150px;

  // Animation
  &-enter-active,
  &-leave-active {
    transition: all 0.3s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  &__load-more {
    display: block;
    background: #246dc7;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    border: none;
    padding: 15px 25px;
    margin: 25px auto;
    transition: 0.2s all ease-in-out;

    &:hover {
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
