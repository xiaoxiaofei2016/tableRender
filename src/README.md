# TableRender 表格渲染组件

本组件用意在使用渲染函数的形式渲染指定类型的表格，目前支持渲染以下组件：
[u-table](https://www.umyui.com/umycomponent/basicUsage)
[el-table](https://element.eleme.cn/#/zh-CN/component/table)
[ux-grid](https://www.umyui.com/umycomponent/columnsAndRows)

## Props：

* tableType **String**       指定表格类型 `el-table` `u-table` `ux-grid`   默认: `ux-grid`
* tableEvents **Object**     表格事件    默认: `{}`
 - 请看指定 tableType 的使用文档
* tableProps **Object**      表格组件props      默认: `{}`
 - 请看指定 tableType 的使用文档
* columnConfig **Array**     表格列的配置   默认: `[]`
 - scopedSlots 内容插槽, 需要被定义为一个函数， 该函数接收一个唯一参数 $createElement， 并且返回需要渲染的插槽内容
 - 其他请看指定 tableType 的使用文档
* fillView **Boolean**      是否需要撑满容器高度    默认: `false`
* fillViewCofig **Object**              用于撑满容器高度的计算
 - minHeight **Number**                        设置自适应后的最小高度   默认: `300`
 - flowView **String/HTMLElement**             组件父级中高度随子级决定的流式布局的容器   默认: `本组件父级`
 - flowViewHeiht **Undefined/Number**          指定流式容器的高度， 如果传入该值将忽略 flowView 直接使用该值进行计算    默认: `undefined`
 - flexView **String/HTMLElement**             组件父级中高度固定的容器（用于最大高度计算）     默认: `应用实例根组件`
 - flexViewHeight **Undefined/Number**         指定定高容器高度， 如果传入该值将忽略 flexView 直接使用该值进行计算    默认: `undefined`

## Methods

* tableHandler(hanldeName, ...args)
 - hanldeName **String** 方法名 具体请看指定 tableType 文档
 - args 指定 hanldeName 的参数
* reRender() 重新渲染表格

具体请看指定 tableType 的使用文档

## 使用示例

### 基础使用
