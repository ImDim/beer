<template>
  <div class="edit-modal-overlay">
    <div class="edit-modal">
      <input class="edit-modal__field" type="text" v-model="editedItem.name" />
      <textarea
        class="edit-modal__field"
        name="description"
        id=""
        cols="30"
        rows="10"
        v-model="editedItem.description"
      >
      </textarea>

      <button @click="saveChanges" class="edit-modal__button">Save</button>
      <button
        @click="closeModal"
        class="edit-modal__button edit-modal__button--text"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "EditBeer",
  props: {
    item: {
      type: Object,
      defult() {
        return {};
      },
    },
  },

  data() {
    return {
      editedItem: {},
    };
  },

  computed: {
    ...mapGetters(["getEditBeer"]),
  },

  methods: {
    ...mapMutations(["editBeer", "updateBeer"]),

    closeModal() {
      this.$emit("close-modal");
    },

    saveChanges() {
      const item = {
        ...this.item,
        name: this.editedItem.name,
        description: this.editedItem.description,
      };

      this.updateBeer(item);
      this.closeModal();
    },
  },

  mounted() {
    this.editedItem = this.getEditBeer(this.item.id);
  },
};
</script>

<style lang="scss">
.edit-modal-overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgb(0 0 0 / 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;

  .edit-modal {
    width: 425px;
    padding: 40px;
    background: #fff;

    &__field {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 12px 25px;
      border: none;
      border-radius: 3px;
      margin-bottom: 15px;

      resize: vertical;
      margin: 0;
      margin-bottom: 15px;
      border: 1px solid #ccc;

      &:focus {
        outline: none;
      }
    }

    &__button {
      color: #fff;
      padding: 10px 25px;
      border-radius: 3px;
      margin-right: 15px;
      background: rgb(49, 103, 204);
      outline: none;
      border: none;
      cursor: pointer;
      margin-top: 15px;

      &--text {
        background: none;
        color: rgb(48, 48, 48);
      }
    }
  }
}
</style>
