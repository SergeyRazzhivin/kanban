import { reactive } from 'vue'

import useCursor from './useCursor.ts'
import useDOM from './useDOM.ts'
import { TransferData, VueKanbanEmits } from './vueKanbanTypes.ts'

export default function (kanbanData: any, emits: VueKanbanEmits) {
  const { ghostPosition, setOffset } = useCursor()
  const {
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
  } = useDOM()
  const transferObj = reactive<TransferData>({
    sourceColumnIndex: undefined,
    targetColumnIndex: undefined,
    sourceItemIndex: undefined,
    targetItemIndex: undefined,
    dataSet: undefined,
  })

  function updateData(event: DragEvent, dropOffset: boolean, isDrop: boolean) {
    try {
      if (!isDrop || !event.target) return
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const columnTo = event.target.closest('.vue-kanban-column')
      transferObj.targetColumnIndex = Number(columnTo.dataset.columnIndex)
      if (dom.columnFrom?.elem) {
        transferObj.sourceColumnIndex = dom.columnFrom.index
        const columnFromItems = kanbanData[dom.columnFrom.index].items
        const columnToItems = kanbanData[transferObj.targetColumnIndex].items
        transferObj.targetItemIndex = dom.itemUnderCursor?.index
        const offset =
          transferObj.targetColumnIndex === dom.columnFrom.index ? -1 : 0
        transferObj.sourceItemIndex = dom.itemDrag?.index
        transferObj.dataSet = kanbanData
        if (isNaN(Number(transferObj.targetItemIndex))) {
          const item = columnFromItems.splice(dom.itemDrag?.index, 1)[0]
          columnToItems.push(item)
          emits('update', transferObj)
          return
        }
        const obj = columnFromItems.splice(dom.itemDrag?.index, 1)[0]
        if (transferObj.targetItemIndex !== undefined) {
          if (dropOffset) {
            columnToItems.splice(transferObj.targetItemIndex, 0, obj)
          } else {
            columnToItems.splice(
              transferObj.targetItemIndex + offset + 1,
              0,
              obj,
            )
          }
        }
      }
      emits('update', transferObj)
    } catch (er) {
      console.error(er)
    }
  }

  function onDragstart(event: DragEvent) {
    if (event.target) {
      const itemDrag = setItemDrag(event.target)
      const itemDragClone = setItemDragClone(itemDrag.elem)
      setColumnFrom(itemDrag.elem)
      setItemUnderCursor(event)
      setColumnUnderCursor(event.target)
      setOffset(event.offsetX, event.offsetY)
      if (itemDragClone.elem) {
        setDragImage(event)
        appendItemDragCloneInKanban()
        createSeparator()
        appendSeparatorInKanban()
      }
    }
    emits('dragStart', event)
  }

  function onDragover(event: DragEvent) {
    if (!dom.itemDragClone?.elem) return

    const cursorY = event.clientY
    const cursorX = event.clientX

    ghostPosition.cursorY = cursorY
    const positionX = cursorX - ghostPosition.offsetX
    const positionY = cursorY - ghostPosition.offsetY

    const itemUnderCursor = setItemUnderCursor(event)
    setColumnUnderCursor(event.target)

    if (itemUnderCursor?.elem) {
      const rect = itemUnderCursor.rect
      const cursorInElem = ghostPosition.cursorY - rect.top
      dropOffset.value = cursorInElem < rect.height / 2
    }
    dom.itemDragClone.elem.style.transform = `matrix(1, 0, 0, 1, ${positionX} , ${positionY})`
    emits('dragOver', event)
  }

  function onDrop(event: DragEvent) {
    updateData(event, dropOffset.value, isDrop.value)
  }

  function onDragEnd(event: DragEvent) {
    if (dom.itemDragClone?.elem) {
      dom.itemDragClone.elem.remove()
    }
    if (dom.itemDrag?.elem) {
      dom.itemDrag?.elem.classList.remove('drag')
    }
    if (dom.separator) {
      dom.separator.remove()
    }
    localPosition.top = 0
    localPosition.left = 0
    emits('dragEnd', event)
  }

  return {
    onDragstart,
    onDragover,
    onDragEnd,
    onDrop,
    ghostPosition,
    transferObj,
    isDrop,
    kanbanRef,
  }
}
