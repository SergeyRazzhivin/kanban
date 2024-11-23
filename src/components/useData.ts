import { LoremIpsum } from 'lorem-ipsum'
import { reactive } from 'vue'

import { avatars } from '../assets/avatars.ts'

import { KanbanColumn } from './vueKanbanTypes.ts'

function getRandom(min: number, max: number) {
  // Ensure min and max are integers
  min = Math.ceil(min)
  max = Math.floor(max)

  // Generate random integer within the range [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export default function () {
  const lorem = new LoremIpsum()
  function generateMockData(col: number, row: number): KanbanColumn[] {
    const result = reactive<any>([])
    let itemId = 1
    let columnId = 1
    for (let i = 0; i < col; i++) {
      const items = []
      for (let i = 0; i < row; i++) {
        items.push({
          id: itemId,
          avatar: avatars[getRandom(0, 7)],
          priority: 'High',
          branch: `TT-${itemId}-task-${itemId}`,
          title: `Task-${itemId}`,
          task: lorem.generateSentences(Math.floor(Math.random()) + 1),
        })
        itemId++
      }
      result.push({
        status: `Column-${columnId}`,
        items,
      })
      columnId++
    }
    return result
  }
  return {
    generateMockData,
  }
}
