export const tableCompoentMapping = {
  'ux-grid': {
    table: 'ux-grid',
    tableColumn: 'ux-table-column',
    prop: 'field',
    label: 'title'
  },
  'u-table': {
    table: 'u-table',
    tableColumn: 'u-table-column',
    prop: 'prop',
    label: 'label'
  },
  'el-table': {
    table: 'el-table',
    tableColumn: 'el-table-column',
    prop: 'prop',
    label: 'label'
  }
}

// ScopedSlot
export const TABLE_SCOPED_SLOT = {
  DEFAULT: 'default',
  HEADER: 'header',
  EDIT: 'edit',
  FOOTER: 'footer',
  CONTENT: 'content',
  FILTER: 'filter'
}

// ScopedSlot别名
export const TABLE_SCOPED_SLOT_ALIAS = {
  [TABLE_SCOPED_SLOT.DEFAULT]: '',
  [TABLE_SCOPED_SLOT.HEADER]: 'header-',
  [TABLE_SCOPED_SLOT.EDIT]: 'edit-',
  [TABLE_SCOPED_SLOT.FOOTER]: 'footer-',
  [TABLE_SCOPED_SLOT.CONTENT]: 'content-',
  [TABLE_SCOPED_SLOT.FILTER]: 'filter-'
}

// 各表格 table-column 的 ScopedSlot 
export const tableScopedSlot = [
  TABLE_SCOPED_SLOT.DEFAULT,
  TABLE_SCOPED_SLOT.HEADER,
  TABLE_SCOPED_SLOT.EDIT,
  TABLE_SCOPED_SLOT.FOOTER,
  TABLE_SCOPED_SLOT.CONTENT,
  TABLE_SCOPED_SLOT.FILTER
]
