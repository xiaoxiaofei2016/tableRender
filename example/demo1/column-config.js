// 选择框
export const checkbox = {
  type: 'checkbox',
  width: 80
}

// 姓名
export const name = {
  field: 'name',
  title: '姓名',
  resizable: true
}

// 时间
export const time = {
  field: 'time',
  title: '时间',
  formatter: ({ cellValue }) => dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

// 价格
export const price = {
  field: 'price',
  title: '价格',
  scopedSlots (h) {
    return {
      default ({ row }) {
        return h('i', {
          class: 'el-icon-edit',
          style: {
            cursor: 'pointer'
          }
        }, row.price)
      },
      edit ({ row }) {
        return h('el-input-number', {
          props: {
            precision: 2,
            min: 0,
            value: row.price
          },
          on: {
            input: val => {
              row.price = val
            }
          }
        })
      }
    }
  }
}

// 操作
export const oprate = (handle) => ({
  title: '操作',
  field: 'oprate',
  width: 140,
  scopedSlots (h) {
    return {
      default ({ row }) {
        return [h('el-link', {
          props: {
            type: 'primary',
            underline: false
          },
          on: {
            click: () => {
              handle.gotoDetail(row)
            }
          }
        }, '详情')]
      }
    }
  }
})

export const tableColumn = (handle) => ([
  checkbox,
  name,
  time,
  price,
  oprate(handle)
])
