---
lang: ru-RU
title: Get started
description: Get started
---

# Get Started
### Instalation
```bash
npm i @rs_scope/vue-kanban
```
### Data
```ts
const columns = [
    {
        status: 'Column - 1',
        items: [{id: 1, ... }, {id: 2, ...}]
    },
    {
        status: 'Column - 2',
        items: [{id: 3,...}]
    },
]
```
### Template
```vue
<VueKanban
    :columns="columns"
    :options="options"
    @update="onUpdate"
/>
```
