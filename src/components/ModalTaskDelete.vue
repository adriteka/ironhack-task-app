<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image">
                <font-awesome-icon
                  icon="fa-solid fa-trash-can"
                  class="has-text-danger fa-icon-middle"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-5">Delete Task</p>
              <p class="content has-text-grey">
                You are about to delete "<span class="has-text-black-bis">{{
                  taskTitle
                }}</span
                >".
              </p>
              <p class="content has-text-grey">
                Are you sure? This action cannot be undone.
              </p>
              <div class="modal-card-foot has-background-white">
                <button class="button is-danger" @click="emits('close', true)">
                  Confirm
                </button>
                <button class="button" @click="emits('close', false)">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  taskTitle: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["close"]);
</script>

<style scoped>
.modal-card-foot {
  padding-right: 0;
  padding-bottom: 0;
  justify-content: flex-end;
}

.fa-icon-middle {
  height: 40px;
}
</style>
