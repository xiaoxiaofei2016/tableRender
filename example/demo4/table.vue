<template>
  <div class="page-main">
    <div class="box" style="height: 200px;background:rgb(245, 245, 245)">测试表格自适应box顶部占位</div>
    <!-- fillView为true表示开启表格自适应 -->
    <table-render
      ref="tableRender"
      fillView
      :fillViewCofig="{flowView: '.page-main'}"
      :table-props="tableProps"
      :table-events="tableEvents"
      :column-config="tableColumn"
    >
      <!-- 默认插槽 -->
      <template #oprate="{ row }">
        <el-link :underline="false" type="primary" @click="gotoDetail(row)">详情</el-link>
      </template>
      <!-- header插槽 -->
      <template #oprate-header="{ column }">
        <span>{{ column.title }}</span>
      </template>
    </table-render>
    <div class="box" style="height: 100px;background:rgb(245, 245, 245)">测试表格自适应box底部占位</div>
  </div>
</template>

<script>
import tableRender from '../../src/tableRender.vue'
import { tableColumn } from './column-config'
import { getTableData } from '../../src/utils'

export default {
  components: { tableRender },
  computed: {
    tableProps () {
      return {
        'edit-config': { trigger: 'click', mode: 'cell' },
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
      return tableColumn
    }
  },
  mounted () {
    this.tableHandler('reloadData', getTableData())
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
