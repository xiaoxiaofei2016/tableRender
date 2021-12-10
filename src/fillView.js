class InitTableHeight {
  componentInstance = null // 组件实例
  el = null // 元素

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
    
 /**
   * @description: 逐级监听父组件加载完成后计算并设置表格渲染高度
   * @param {*} instance 组件实例
   * @param {*} callback 所有父组件挂载完成后的回调函数
   */
  setHeightAfterParentMounted (instance = this.componentInstance, callback) {
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
    
  /**
   * @description: 获取表格高度
   * @return {Number} tableHeight
   */
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
    
  /**
   * @description: 设置表格高度
   */
  setTableHeight (height) {
    this.componentInstance.renderHeight = height
  }

  /**
   * @description: 获取元素高度
   * @param {HTMLElement} element 元素节点
   * @return {Number} height
   */
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
  /**
   * @description: 获取流的高度
   * @return {Number} flowHeiht
   */
  getFlowHeiht () {
    const { flowView = this.componentInstance.$parent.$el, flowViewHeiht } = this.componentInstance.fillViewCofig
    if (typeof flowViewHeiht === 'number') {
      return flowViewHeiht
    }

    return this.getElHeiht(flowView)
  }

  /**
   * @description: 获取容器的高度
   * @return {Number} flexHeiht
   */
  getFlexHeiht () {
    const { flexView = this.componentInstance.$root.$el, flexViewHeiht } = this.componentInstance.fillViewCofig
    if (typeof flexViewHeiht === 'number') {
      return flexViewHeiht
    }

    return this.getElHeiht(flexView)
  }
}

export default InitTableHeight