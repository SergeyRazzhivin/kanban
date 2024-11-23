import { reactive } from 'vue'

export default function () {
  const ghostPosition = reactive({
    cursorX: 0,
    cursorY: 0,
    offsetX: 0,
    offsetY: 0,
    positionX: 0,
    positionY: 0,
  })

  function calcPosition(event: DragEvent) {
    const cursorY = event.clientY
    const cursorX = event.clientX
    const offsetX = ghostPosition.offsetX
    const offsetY = ghostPosition.offsetY

    ghostPosition.cursorY = cursorY
    ghostPosition.positionX = cursorX - offsetX
    ghostPosition.positionY = cursorY - offsetY
  }

  function setOffset(offsetX: number, offsetY: number) {
    ghostPosition.offsetX = offsetX
    ghostPosition.offsetY = offsetY
  }
  return {
    ghostPosition,
    calcPosition,
    setOffset,
  }
}
