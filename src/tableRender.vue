<script>
import InitTableHeight from './fillView.js'
import { tableCompoentMapping, TABLE_SCOPED_SLOT_ALIAS, tableScopedSlot } from './config.js'
import { isFunction, isObject, isEmpty } from './utils'

export default {
  name: 'table-render',
  props: {
    tableType: {
      type: String,
      default: 'ux-grid',
      validator: type => {
        const success = typeof tableCompoentMapping[type] !== 'undefined'
        !success &&
          console.warn(`[table-render] tableType 必须为 ${Object.keys(tableCompoentMapping).join('、')} 中的一个`)

        return success
      }
    },
    tableEvents: {
      type: Object,
      default: () => ({})
    },
    tableProps: {
      type: Object,
      default: () => ({})
    },
    columnConfig: {
      type: Array,
      default: () => []
    },
    // 是否自适应撑满页面 设置后自定将表格 tableProps 的 maxHeigh 设置为自适应最大高度， 并且 tableProps 如果传递了 height 将不再生效
    fillView: {
      type: Boolean,
      default: false
    },
    // 自适应配置
    fillViewCofig: {
      type: Object,
      default () {
        return {
          minHeight: 300, // 设置自适应后的最小高度
          flowView: undefined, // 默认: 本组件父级
          flowViewHeiht: undefined, // 优先级大于 flowView
          flexView: undefined, // 默认: 根组件
          flexViewHeight: undefined // 优先级大于 flexView
        }
      }
    }
  },
  data () {
    return {
      isRender: true,
      renderHeight: null
    }
  },
  computed: {
    tableComponent () {
      return tableCompoentMapping[this.tableType] ?? {}
    },
    prop () {
      return this.tableComponent?.prop
    },
    label () {
      return this.tableComponent?.label
    },
    getTable () {
      return this.$refs?.table
    },
    computedTableProps () {
      if (!this.fillView || !this.renderHeight) {
        return this.tableProps
      }

      const tableProps = {
        ...this.tableProps
      }
      tableProps.height = this.renderHeight
      tableProps.maxHeight = this.renderHeight

      return tableProps
    }
  },
  mounted () {
    this.initCalcTableHeight()
    window.addEventListener('resize', this.initCalcTableHeight)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.initCalcTableHeight)
    })
    // 用于页面缓存时更新表格高度
    this.$on('hook:activated', () => {
      this.initCalcTableHeight()
    })
  },
  methods: {
    getTableProps () {
      const tableProps = {
        ...this.tableProps
      }

      return tableProps
    },

    tableHandler (hanldeName, ...args) {
      const table = this.$refs?.table
      if (!hanldeName) return table
      // 优先触发本组件方法
      if (this[hanldeName]) {
        return this[hanldeName]()
      }
      // 触发 ux-grid 的 methods
      return table?.[hanldeName]?.(...args)
    },
    // 重新渲染
    reRender () {
      this.isRender = false
      this.$nextTick(() => {
        this.isRender = true
      })
    },

    // 重新计算表格高度
    initCalcTableHeight: _.debounce(function () {
      this.fillView && new InitTableHeight(this)
    }, 200),

    /**
     * @author: 狄恩
     * @description: 获取页面作用域插槽v-slot内容
     * @param {Object} col 配置的列信息
     * @return {Object | null}
     */
    getScopedSlotsByTemplate (col) {
      const scopedSlotsObj = {}
      for (let i = 0; i < tableScopedSlot.length; i++) {
        const key = tableScopedSlot[i]
        const customSlotName = `${TABLE_SCOPED_SLOT_ALIAS[key]}${col[this.prop]}`
        const customScope = this.$scopedSlots?.[customSlotName]
        customScope && (scopedSlotsObj[key] = scope => customScope(scope))
      }
      return isEmpty(scopedSlotsObj) ? null : scopedSlotsObj
    },
    /**
     * @author: 狄恩
     * @description: 获取由配置文件自定义传入scopedSlots内容
     * @param {Object | Function} scopedSlots
     * @param {Function} h createElement
     * @return {Object | null}
     */
    getScopedSlotsByConfig (scopedSlots, h) {
      let scopedSlotsObj = {}
      if (isFunction(scopedSlots)) scopedSlotsObj = scopedSlots(h)
      if (isObject(scopedSlots)) {
        for (let i = 0; i < tableScopedSlot.length; i++) {
          const key = tableScopedSlot[i]
          const customScope = _.get(scopedSlots, key)
          customScope && (scopedSlotsObj[key] = scope => scopedSlots[key](scope, h))
        }
      }
      if (scopedSlots && !isFunction(scopedSlots) && !isObject(scopedSlots)) {
        console.warn('[scopedSlots] 只支持Function和普通Object')
      }
      return isEmpty(scopedSlotsObj) ? null : scopedSlotsObj
    }
  },
  render (h) {
    const columns = this.columnConfig.map((col, index) => {
      const { scopedSlots, useSlot, ...props } = col

      const options = {
        props: {
          ...props,
          key: props[this.prop] || index
        },
        scopedSlots: useSlot
          ? this.getScopedSlotsByTemplate(props)
          : this.getScopedSlotsByConfig(scopedSlots, h)
      }
      return this.$createElement(this.tableComponent.tableColumn, options)
    })

    const table = this.$createElement(
      this.tableComponent.table,
      {
        ref: 'table',
        props: this.computedTableProps,
        on: {
          ...this.tableEvents
        }
      },
      columns
    )

    return this.isRender ? table : null
  }
}
</script>
