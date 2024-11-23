<script setup lang="ts">
  import VueKanban from './components/VueKanban.vue'

  function onUpdate(data: any) {
    console.log('onUpdate', data)
  }
</script>

<template>
  <VueKanban @update="onUpdate">
    <template #item="{ item }">
      <div class="app-card">
        <div class="app-card-header">
          <h4>{{ item.title }}</h4>
          <div class="app-card-task">{{ item.task }}</div>
        </div>
        <div class="app-card-bottom">
          <PrioritySvg :priority="item.priority" />
          <div class="app-card-footer">
            <div class="app-card-branch">
              {{ item.branch }}
            </div>
            <img
              class="app-card-avatar"
              :src="item.avatar as string"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </template>
  </VueKanban>
</template>

<style lang="scss">
  @import './components/index';
  .app-card {
    pointer-events: none;
    background-color: $bg2;
    border-radius: 15px;
    box-shadow: $shadow;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(112, 196, 245, 0.048);
    overflow: hidden;
    transition: 0.3s ease-out;

    .app-card-header {
      background-color: $bg1;
      padding: 15px;
      h4 {
        margin: 0 0 5px 0;
        color: rgb(112, 196, 245);
      }
      .app-card-task {
        font-size: 12px;
        color: #f1f1f1;
      }
    }
    .app-card-bottom {
      padding: 15px;
      background: rgb(2, 0, 36);
      background: linear-gradient(45deg, #1d1723 0%, #121119 35%, #1d1723 100%);
    }
    .app-card-priority {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .app-card-footer {
      display: grid;
      grid-template-columns: 1fr min-content;
      align-items: center;
      .app-card-branch {
        color: darkorange;
        font-size: 12px;
      }
      .app-card-avatar {
        width: 20px;
        box-shadow: 3px 3px 3px #000;
        border: 2px solid #ccc;
        border-radius: 50%;
      }
    }
  }
</style>
