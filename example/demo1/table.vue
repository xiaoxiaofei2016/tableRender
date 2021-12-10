<template>
  <div class="page-main">
    <table-render
      ref="tableRender"
      fillView
      :fillViewCofig="{flowView: '.page-main'}"
      :table-props="tableProps"
      :table-events="tableEvents"
      :column-config="tableColumn"
    ></table-render>
  </div>
</template>

<script>
import tableRender from '../../src/tableRender.vue'
import { tableColumn } from './column-config'

export default {
  components: { tableRender },
  computed: {
    tableProps () {
      return {
        maxHeight: '500',
        checkboxConfig: {
          highlight: true,
          checkMethod: this.checkMethod
        }
      }
    },
    tableEvents () {
      return {
        'selection-change': this.selectionChange
      }
    },
    tableColumn () {
      const handle = {
        gotoDetail: this.gotoDetail
      }
      return tableColumn(handle)
    }
  },
  methods: {
    tableHandler (method, ...args) {
      return this.$refs?.tableRender?.tableHandler(method, ...args)
    },
    /**
     * @description: 选择框是否禁用
     * @return {Boolean} true：不禁用； false：禁用
     */
    checkMethod () {
      return true
    },
    /**
     * @description: 选择框change事件
     * @param {Array} selection 选中的数据
     */
    selectionChange (selection) {
      console.log(selection)
    },
    /**
     * @description: 进入详情页
     * @param {*} row 单行数据
     */
    gotoDetail (row) {
      console.log(row)
    }
  }
}
</script>
