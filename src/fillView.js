class InitTableHeight {
  componentInstance = null
  el = null

  constructor (componentInstance) {
    this.componentInstance = componentInstance
    this.el = componentInstance.$refs.table.$el
    this.el.style.display = 'none'
    
    this.setHeightAfterParentMounted(this.componentInstance, () => {
      this.componentInstance.$nextTick(() => {
        this.el.style.display = 'block'
      })
    })
  }

  setHeightAfterParentMounted (instance = this.componentInstance, callback) {
    // 逐级监听父组件加载完成后计算并设置表格渲染高度
    if (typeof instance.$parent === 'undefined') {
      this.setTableHeight(this.getTableHeight())
      callback()
      return
    }

    if (instance.$parent._isMounted) {
      this.setHeightAfterParentMounted(instance.$parent, callback)
    } else {
      instance.$parent.$on('hook:mounted', () => {
        this.setHeightAfterParentMounted(instance.$parent, callback)
      })
    }
  }

  getTableHeight () {
    // 容器高度
    const flexHeight = this.getFlexHeiht()
    // 表格距离容器顶部高度
    const flowHeight = this.getFlowHeiht()
    // 表格高度
    let tableHeight = flexHeight - flowHeight
    const { minHeight } = this.componentInstance.fillViewCofig

    if (minHeight && tableHeight < minHeight) {
      tableHeight = minHeight
    }

    return tableHeight
  }

  setTableHeight (height) {
    this.componentInstance.renderHeight = height
  }


  getElHeiht (element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }

    const computedStyle = getComputedStyle(element, null)
    const marginTop = parseFloat(computedStyle?.marginTop) || 0
    const marginBottom = parseFloat(computedStyle?.marginBottom) || 0
    let height = parseFloat(computedStyle?.height)
    if (typeof height !== 'number') {
      height = element?.offsetHeight ?? 0
    }
    return height + marginTop + marginBottom
  }

  getFlowHeiht () {
    const { flowView = this.componentInstance.$parent.$el, flowViewHeiht } = this.componentInstance.fillViewCofig
    if (typeof flowViewHeiht === 'number') {
      return flowViewHeiht
    }

    return this.getElHeiht(flowView)
  }

  getFlexHeiht () {
    const { flexView = this.componentInstance.$root.$el, flexViewHeiht } = this.componentInstance.fillViewCofig
    if (typeof flexViewHeiht === 'number') {
      return flexViewHeiht
    }

    return this.getElHeiht(flexView)
  }
}

export default InitTableHeight
