import { computed, reactive, ref, watch } from 'vue'

import { Dom } from './vueKanbanTypes.ts'

export default function () {
  const kanbanRef = ref()
  const dropOffset = ref(false)
  const dom = reactive<Dom>({
    kanban: kanbanRef.value,
    columnUnderCursor: null,
    columnFrom: null,
    columnTo: null,
    itemUnderCursor: null,
    itemDragPrev: null,
    itemDrag: null,
    itemDragNext: null,
    itemOld: null,
    itemDragClone: null,
    itemGhost: null,
    separator: null,
  })
  const localPosition = reactive({
    top: 0,
    left: 0,
  })

  function setColumnFrom(elem: any) {
    const column = elem.closest('.vue-kanban-column')
    dom.columnFrom = {
      index: Number(column.dataset.columnIndex),
      elem: column,
    }
    return dom.columnFrom
  }

  function setColumnUnderCursor(elem: any) {
    if (elem) {
      const column = elem.closest('.vue-kanban-column')
      if (column) {
        dom.columnUnderCursor = {
          index: Number(column.dataset.columnIndex),
          elem: column,
        }
        return dom.columnUnderCursor
      }
    }
    return null
  }

  function setItemDrag(elem: any) {
    const rect = elem.getBoundingClientRect()
    elem.classList.add('drag')
    dom.itemDrag = {
      index: Number(elem.dataset.itemIndex),
      prev: elem.previousElementSibling,
      next: elem.nextElementSibling,
      rect,
      elem,
    }
    return dom.itemDrag
  }

  function setItemDragClone(elem: any) {
    const clone = elem.cloneNode(true)
    const rect = elem.getBoundingClientRect()
    clone.classList.add('dragging')
    clone.style.width = rect.width + 'px'
    clone.style.height = rect.height + 'px'
    clone.style.margin = 0
    clone.style.zIndex = '999999'
    clone.style.position = 'fixed'
    clone.style.top = '0px'
    clone.style.left = '0px'
    clone.style.transform = `matrix(1, 0, 0, 1, 999999, 99999)`
    clone.style.boxSizing = 'border-box'
    clone.classList.add('ghost')
    dom.itemDragClone = {
      index: Number(clone.dataset.itemIndex),
      rect,
      elem: clone,
    }
    return dom.itemDragClone
  }

  function createSeparator() {
    dom.separator = document.createElement('div')
    dom.separator.classList.add('kanban-separator')
    dom.separator.style.display = 'block'
    dom.separator.style.left = '99999px'
    dom.separator.style.transform = 'scale(0)'
    return dom.separator
  }

  function animateSeparator(top: number, left: number, width: number) {
    if (dom.separator) {
      dom.separator.style.top = top - 2 + 'px'
      dom.separator.style.left = left + 'px'
      dom.separator.style.width = width + 'px'
      dom.separator.animate(
        [{ transform: 'scale(0)' }, { transform: 'scale(0.8)' }],
        {
          duration: 300,
          fill: 'forwards',
          easing: 'ease-in-out',
        },
      )
    }
  }

  function setItemUnderCursor(event: any) {
    const elem: any = document.elementsFromPoint(
      event.clientX,
      event.clientY,
    )[0]
    if (elem.classList.contains('vue-kanban-item')) {
      const rect = elem.getBoundingClientRect()
      dom.itemUnderCursor = {
        index: Number(elem.dataset.itemIndex),
        prev: elem.previousElementSibling,
        next: elem.nextElementSibling,
        rect,
        elem,
      }
      return dom.itemUnderCursor
    }
    dom.itemUnderCursor = null
    return null
  }

  function setDragImage(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setDragImage(document.createElement('div'), 0, 0)
    }
  }

  function appendItemDragCloneInKanban() {
    if (kanbanRef.value && dom.itemDragClone) {
      kanbanRef.value.appendChild(dom.itemDragClone.elem)
    }
  }

  function appendSeparatorInKanban() {
    if (kanbanRef.value && dom.separator) {
      kanbanRef.value.appendChild(dom.separator)
    }
  }

  function calcPositionSeparator() {
    const { itemUnderCursor, separator, columnUnderCursor, columnFrom } = dom

    if (itemUnderCursor && separator && isDrop.value) {
      const { top, bottom, width, left } = itemUnderCursor.rect
      const targetTop = dropOffset.value ? top : bottom
      if (localPosition.top !== targetTop || localPosition.left !== left) {
        animateSeparator(targetTop, left, width)
        localPosition.top = targetTop
        localPosition.left = left
      }
    } else if (columnUnderCursor && !dom.itemUnderCursor?.elem) {
      const list = columnUnderCursor.elem.querySelector('.vue-kanban-list')
      if (
        list?.lastElementChild &&
        columnUnderCursor.elem !== columnFrom?.elem
      ) {
        const rect = list.lastElementChild.getBoundingClientRect()
        if (
          localPosition.top !== rect.bottom ||
          localPosition.left !== rect.left
        ) {
          animateSeparator(rect.bottom, rect.left, rect.width)
          localPosition.top = rect.bottom
          localPosition.left = rect.left
        }
      } else {
        animateSeparator(99999, 99999, 0)
      }
    }
  }

  watch(
    [
      () => dom.itemUnderCursor?.index,
      () => dropOffset.value,
      () => dom.columnUnderCursor?.index,
    ],
    value => {
      if (value[0] !== undefined || value[2] !== undefined) {
        calcPositionSeparator()
      }
    },
  )

  const isDrop = computed(() => {
    if (dom.itemDrag?.elem === dom.itemUnderCursor?.elem) {
      return false
    }
    if (dom.itemDrag?.next === dom.itemUnderCursor?.elem && dropOffset.value) {
      return false
    }
    if (dom.itemDrag?.prev === dom.itemUnderCursor?.elem && !dropOffset.value) {
      return false
    }
    return true
  })
  return {
    dom,
    kanbanRef,
    dropOffset,
    isDrop,
    localPosition,
    setItemDrag,
    setColumnFrom,
    setItemDragClone,
    setItemUnderCursor,
    setColumnUnderCursor,
    setDragImage,
    appendItemDragCloneInKanban,
    createSeparator,
    appendSeparatorInKanban,
  }
}
