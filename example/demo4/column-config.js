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
  scopedSlots: {
    default: ({ row }, h) => {
      return <i class="el-icon-edit" style={{cursor: 'pointer'}}>{row.price}</i>
    },
    edit: ({ row }, h) => {
      return [<el-input-number
        precision={2}
        min={0}
        value={row.price}
        onInput={(e) => {
          scope.row.price = e.trim()
        }}>
      </el-input-number>]
    }
  }
}

// 操作
export const oprate = {
  title: '操作',
  field: 'oprate',
  width: 140,
  useSlot: true
}

export const tableColumn = [
  checkbox,
  name,
  time,
  price,
  oprate
]
