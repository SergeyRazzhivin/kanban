<script lang="ts" setup>
  import useData from './useData.ts'
  import useNewKanban from './useNewKanban.ts'
  import { VueKanbanEmits } from './vueKanbanTypes.ts'

  const emits = defineEmits<VueKanbanEmits>()

  const { generateMockData } = useData()

  const data = generateMockData(5, 3)
  const { onDragover, onDragstart, onDragEnd, onDrop, kanbanRef } =
    useNewKanban(data, emits)
</script>

<template>
  <div
    ref="kanbanRef"
    class="vue-kanban"
    :style="{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }"
    @dragover.prevent="onDragover"
    @dragenter.prevent
  >
    <div
      v-for="(column, ic, key) in data"
      :key="key"
      class="vue-kanban-column"
      :data-column-index="ic"
      @drop="onDrop"
    >
      <h2>{{ column.status }}</h2>
      <div class="vue-kanban-list">
        <TransitionGroup name="fade">
          <div
            v-for="(item, ii) in column.items"
            :key="item.id"
            class="vue-kanban-item"
            :data-item-index="ii"
            :draggable="true"
            @dragstart="onDragstart"
            @dragend="onDragEnd"
          >
            <slot
              name="item"
              :item="item"
            />
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import 'index';
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
  .kanban-separator {
    height: 3px;
    background-color: #70c4f5;
    border-radius: 20px;
    transition: transform 0.5s ease;
    pointer-events: none;
    transform: scaleX(0.5);
    position: fixed;
    width: 100px;
  }
  body {
    background: rgb(2, 0, 36);
    background: linear-gradient(-45deg, $bg1 0%, rgb(1, 11, 20) 35%, $bg1 100%);
    color: white;
    min-height: 100vh;
    margin: 0;
  }
  .vue-kanban {
    font-family: 'Roboto Slab', serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    font-size: 14px;
    display: grid;
    padding: 1rem;
    cursor: pointer !important;

    .vue-kanban-column {
      position: relative;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      h2 {
        color: darkorange;
        text-align: center;
        margin-bottom: 0.5rem;
      }
    }
    .vue-kanban-item {
      overflow: hidden;
      padding: 0.5rem;
      &.drag {
        .app-card {
          border: 1px dashed rgba(204, 204, 204, 0.65);
          filter: grayscale(100%);
        }
      }
    }
  }
  .vue-kanban-item {
    cursor: move !important;
    &.dragging {
      opacity: 0.8;
      user-select: none;
      pointer-events: none;
    }
    &.ghost {
      .app-card {
        border: 1px dashed rgba(204, 204, 204, 0.65);
        filter: grayscale(0%) !important;
      }
    }
  }
  .cursorPosition {
    height: 100px;
  }
</style>

<style>
  .vue-kanban-column {
    position: relative;
    padding: 0;
    list-style-type: none;
  }

  .fade-move,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    z-index: -1;
    transform: scale(0.1);
  }

  .fade-leave-active {
    position: absolute;
  }
</style>
