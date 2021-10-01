<template>
  <article class="beer-item">
    <div class="beer-item__image">
      <div class="beer-item__btn-group">
        <div
          @click="deleteBeer(item.id)"
          class="beer-item__btn beer-item__btn--delete"
        >
          Delete
        </div>

        <div
          @click="editBeer(item)"
          class="beer-item__btn beer-item__btn--edit"
        >
          Edit
        </div>
      </div>
      <img :src="item.image_url" width="40" :alt="item.name" />
    </div>

    <div class="beer-item__name">
      {{ item.name }}

      <div class="tips-icon-wrapper">
        <div class="tips-icon"></div>
        <div class="beer-item__tips">
          {{ item.brewers_tips }}
        </div>
      </div>
    </div>

    <div class="beer-item__desc">
      {{ item.description }}
    </div>
  </article>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "BeerItem",
  props: {
    item: {
      type: Object,
      defualt() {
        return {};
      },
    },
  },
  methods: {
    ...mapMutations(["deleteBeer"]),

    editBeer(item) {
      this.$emit("edit-item", item);
    },
  },
};
</script>

<style scoped lang="scss">
.beer-item {
  width: calc(25% - 30px);
  min-width: 210px;
  margin: 15px;

  &:hover {
    .tips-icon {
      transform: scale(1) !important;
    }

    .beer-item__btn-group {
      opacity: 1;
    }
  }

  &__name {
    position: relative;
    font-size: 22px;
    padding-right: 25px;
  }

  &__desc {
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
    margin-top: 15px;
  }

  $tips-delay: 0.2s;

  // Тут бы стоило заюзать фреймворк вродде vuetify
  // Но пока и так сойдет
  &__tips {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    margin-top: 7px;
    position: absolute;
    margin: 5px 15px;
    background: #cd452f;
    width: 200px;
    padding: 15px {
      right: 45px;
    }
    right: -32px;
    top: -25px;
    border-radius: 3px;
    z-index: 2;

    transition: all 0.2s ease-in-out $tips-delay;
    opacity: 0;
    transform: translateY(25px);
  }

  .tips-icon-wrapper {
    position: absolute;
    right: 0;
    top: 9px;
    width: 18px;
    height: 18px;
    overflow: hidden;
    border-radius: 50%;

    .tips-icon {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #bb3c32;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      cursor: pointer;
      color: #bb3c32;
      z-index: 3;
      position: relative;

      transition: all 0.2s ease-in-out $tips-delay;
      transform: scale(0);

      &::before {
        content: "?";
        font-size: 12px;
        font-weight: bold;
      }
    }

    &:hover {
      overflow: visible;

      .tips-icon {
        border-color: #fff;
        color: #fff;
      }
      .beer-item__tips {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &__image {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }

  &__btn-group {
    position: absolute;
    left: 0;
    opacity: 0;

    transition: all 0.2s ease-in-out $tips-delay;
  }

  &__btn {
    padding: 2px 14px;
    font-size: 12px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
    margin: 7px;
    display: inline-block;

    &--delete {
      background: #c52a2a;
    }

    &--edit {
      background: #2a6dc5;
    }
  }
}
</style>
