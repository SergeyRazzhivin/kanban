export interface VueKanbanEmits {
  (e: 'update', value: TransferData): void
  (e: 'dragStart', event: Event): void
  (e: 'dragOver', event: Event): void
  (e: 'dragEnd', event: Event): void
}

export interface VueKanbanProps {
  columns: KanbanColumn[]
}

export interface KanbanColumn {
  status: string
  items: KanbanItem[]
}

export interface KanbanItem {
  id: string | number
  [key: string]: unknown
}

export interface TransferData {
  sourceColumnIndex: number | undefined
  targetColumnIndex: number | undefined
  sourceItemIndex: number | undefined
  targetItemIndex: number | undefined
  dataSet: VueKanbanProps | undefined
}

export interface Dom {
  kanban: HTMLElement | null
  columnUnderCursor: ColumnUnderCursor | null
  columnFrom: ColumnFrom | null
  columnTo: ColumnTo | null
  itemUnderCursor: ItemUnderCursor | null
  itemDragPrev: HTMLElement | null
  itemDrag: ItemDrag | null
  itemDragNext: HTMLElement | null
  itemOld: HTMLElement | null
  itemDragClone: ItemDragClone | null
  itemGhost: ItemDragClone | null
  separator: HTMLElement | null
}

export interface ItemDrag {
  index: number
  prev: HTMLElement
  next: HTMLElement
  rect: DOMRect
  elem: HTMLElement
}

export interface ItemDragClone {
  index: number
  rect: DOMRect
  elem: HTMLElement
}
export type ItemUnderCursor = ItemDrag

export interface ColumnFrom {
  index: number
  elem: HTMLElement
}

export interface ColumnTo {
  index: number
  elem: HTMLElement
}

export type ColumnUnderCursor = ColumnFrom
