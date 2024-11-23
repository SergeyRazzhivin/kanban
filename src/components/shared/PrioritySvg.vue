<script lang="ts" setup>
  interface PrioritySvgProps {
    priority: string
  }
  defineProps<PrioritySvgProps>()
</script>

<template>
  <div class="app-card-priority">
    <div
      v-if="priority === 'Low'"
      class="priority-block"
    >
      <div>{{ priority }}</div>
      <svg
        class="low"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"
        />
      </svg>
    </div>
    <div
      v-if="priority === 'Medium'"
      class="priority-block"
    >
      <div>{{ priority }}</div>
      <svg
        class="medium"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5.59 7.41L7 6l6 6l-6 6l-1.41-1.41L10.17 12zm6 0L13 6l6 6l-6 6l-1.41-1.41L16.17 12z"
        />
      </svg>
    </div>
    <div
      v-if="priority === 'High'"
      class="priority-block"
    >
      <div>{{ priority }}</div>
      <svg
        class="high"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M14.58 16.59L19.17 12l-4.59-4.59L16 6l6 6l-6 6zm-6 0L13.17 12L8.58 7.41L10 6l6 6l-6 6zm-6 0L7.17 12L2.58 7.41L4 6l6 6l-6 6z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
  .app-card-priority {
    .priority-block {
      display: flex;
      align-items: center;
      gap: 5px;
      svg {
        width: 20px;
        height: 20px;
        &.low {
          color: #fff;
        }
        &.medium {
          color: darkorange;
        }
        &.high {
          color: rgb(230, 35, 35);
        }
      }
    }
  }
</style>
