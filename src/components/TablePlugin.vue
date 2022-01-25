<template>
  <!-- 插件视图 -->
  <div class="plugin-view" ref="plugin-view">
    <!-- 列表视图 -->
    <slot></slot>
    <!-- 浮层视图 -->
    <slot></slot>
    <!-- 滚动条视图 -->
    <div @scroll="scrollEvent" class="plugin-scroll-bar" ref="plugin-scroll-bar">
      <!-- 滚动条内部撑开元素 -->
      <div class="scroll-bar" ref="scroll-bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 悬浮层移动动画时间
    durationHeader: {
      type: Number,
      default: () => 0
    },
    // 悬浮层移动动画时间
    durationFooter: {
      type: Number,
      default: () => 0
    },
    // 显示底部滚动条
    isShowScrollBar: {
      type: Boolean,
      default: () => true
    },
    // 滚动监听对象（如果是弹层，替换成滚动监听对象）
    scrollListener: {
      default: () => window
    },
    // 滚动对比父元素（如果是窗口高度，则不需要替换该对象，一般情况不需要动这个对象）
    scrollView: {
      default: () => document.documentElement
    },
    // 底部分页器栏高度
    footerHeight: {
      type: Number,
      default: () => 64
    }
  },
  data () {
    return {
      // 插件视图
      pluginView: undefined,
      // 当前 Table
      table: undefined,
      // 当前 Table 的头部悬浮层
      tableFixed: undefined,
      // 当前 Table 头部 Thead 元素
      tableThead: undefined,
      // 当前 Table 头部 Thead 元素高度
      tableTheadHeight: 0,
      // 当前 Table 的 Body 元素
      tableBody: undefined,
      // 当前 Table 的头部悬浮层 Body 元素
      tableBodyFixed: undefined,
      // 当前 Table 自定义滚动条主视图
      tableSrollBarView: undefined,
      // 当前 Table 自定义滚动条子视图
      tableSrollBar: undefined,
      // 鼠标进入了自定义滚动条范围
      isSrollBarHover: false,
      // 当前 Table 左右是否有悬浮列
      isFixedColumn: false,
      // 是否有底部分页器栏
      isExistFooter: false
    }
  },
  watch: {
    // 自定义滚动条可视状态
    isShowScrollBar: {
      handler () { this.reloadScrollBar() }
    },
    // 设置动画时间
    durationHeader: {
      handler () { this.reloadFixedAnimation() }
    },
    // 设置动画时间
    durationFooter: {
      handler () { this.reloadFixedAnimation() }
    },
    // 底部分页器栏高度
    footerHeight: {
      handler () { this.scrollChange() }
    },
    // 滚动监听对象
    scrollListener: {
      handler () { this.reload() }
    },
    // 滚动对比父元素
    scrollView: {
      handler () { this.reload() }
    }
  },
  mounted () {
    // 初始化插件
    this.initPlugin()
  },
  beforeDestroy () {
    // 移除所有监听
    this.removeEventListener()
  },
  methods: {
    // 初始化插件
    initPlugin () {
      // 当前插件视图
      this.pluginView = this.$refs['plugin-view']
      // 当前自定义滚动条
      this.tableSrollBarView = this.$refs['plugin-scroll-bar']
      this.tableSrollBar = this.$refs['scroll-bar']
      // 当前插件内所有 Table 元素
      const tables = this.pluginView.getElementsByClassName('ant-table-wrapper')
      // 当前 Table
      this.table = tables[0]
      // 当前 Table 悬浮层
      this.tableFixed = tables[1]
      // 当前 Table 头部 Thead 元素高度，用于悬浮
      this.tableThead = this.table.getElementsByClassName('ant-table-thead')[0]
      // 当前 Table 是否有左右悬浮列
      this.isFixedColumn = this.table.getElementsByClassName('ant-table-content')[0].children.length > 1
      // 有悬浮层
      if (this.isFixedColumn) {
        // 当前 Table 的 Body 元素，用于监听 Table 滚动
        var tableScroll = this.table.getElementsByClassName('ant-table-scroll')[0]
        this.tableBody = tableScroll.getElementsByClassName('ant-table-body')[0]
        // 当前 Table 的头部悬浮层 Body 元素，用于监听悬浮层 Table 滚动
        tableScroll = this.tableFixed.getElementsByClassName('ant-table-scroll')[0]
        this.tableBodyFixed = tableScroll.getElementsByClassName('ant-table-body')[0]
      } else {
        // 当前 Table 的 Body 元素
        this.tableBody = this.table.getElementsByClassName('ant-table-body')[0]
        // 当前 Table 的头部悬浮层 Body 元素
        this.tableBodyFixed = this.tableFixed.getElementsByClassName('ant-table-body')[0]
      }
      // 是否启用了分页器
      this.isExistFooter = this.table.getElementsByClassName('ant-table-pagination').length > 0
      // Table 头部进行悬浮
      this.tableFixed.style.position = 'absolute'
      this.tableFixed.style.width = '100%'
      this.tableFixed.style.overflow = 'hidden'
      // 刷新悬浮层内部大小
      this.reloadFixedSize()
      // 刷新动画
      this.reloadFixedAnimation()
      // 刷新滚动条的可视状态
      this.reloadScrollBar()
      // 添加监听事件
      this.addEventListener()
      // 初始化手动滚动一次
      this.scrollChange()
    },
    // 刷新组件布局
    reload () {
      // 重新初始化组件布局获取
      this.initPlugin()
    },
    // 添加监听事件
    addEventListener () {
      // 先进行移除监听
      this.removeEventListener()
      // 添加 Table 滚动监听 以便同步滚动进度
      this.tableBody.addEventListener('scroll', this.unifiedScrollLeft)
      // 添加 Table 的头部悬浮层滚动监听，以便同步滚动进度
      this.tableBodyFixed.addEventListener('scroll', this.unifiedScrollLeft)
      // 添加自定义滚动条滚动监听，以便同步滚动进度
      this.tableSrollBarView.addEventListener('scroll', this.unifiedScrollLeft)
      // 监听滚动
      if (this.scrollListener) { this.scrollListener.addEventListener('scroll', this.scrollChange) }
      // 监听窗口缩放（ window.onresize = () => { this.scrollChange() } ）
      window.addEventListener('resize', this.scrollChange)
    },
    // 移除监听事件
    removeEventListener () {
      // 移除 Table 滚动监听
      this.tableBody.removeEventListener('scroll', this.unifiedScrollLeft)
      // 移除 Table 的头部悬浮层滚动监听
      this.tableBodyFixed.removeEventListener('scroll', this.unifiedScrollLeft)
      // 移除自定义滚动条滚动监听
      this.tableSrollBarView.removeEventListener('scroll', this.unifiedScrollLeft)
      // 移除监听滚动
      if (this.scrollListener) { this.scrollListener.removeEventListener('scroll', this.scrollChange) }
      // 移除监听窗口缩放
      window.removeEventListener('resize', this.scrollChange)
    },
    // 统一滚动坐标
    unifiedScrollLeft (e) {
      this.tableSrollBarView.scrollLeft = e.target.scrollLeft
      this.tableBody.scrollLeft = e.target.scrollLeft
      this.tableBodyFixed.scrollLeft = e.target.scrollLeft
    },
    // 自定义滚动条滚动中
    scrollEvent (e) {
      // 是否进入了自定义滚动条范围
      if (this.isSrollBarHover) {
        // 同步至当前 Table 的 Body 元素
        this.tableBody.scrollLeft = e.target.scrollLeft
        // 同步至当前 Table 的头部悬浮层元素
        this.tableBodySuspension.scrollLeft = e.target.scrollLeft
      }
    },
    // 刷新滚动条的可视状态
    reloadScrollBar () {
      // 是否已经加载到页面
      if (this.tableSrollBarView) {
        // 判断显示与隐藏
        this.tableSrollBarView.style.opacity = Number(this.isShowScrollBar)
      }
    },
    // 刷新悬浮层动画
    reloadFixedAnimation () {
      // 设置动画
      this.tableFixed.style.transition = `all ${this.durationHeader}s`
      this.tableSrollBarView.style.transition = `all ${this.durationFooter}s`
    },
    // 刷新悬浮层内容大小
    reloadFixedSize () {
      // 获得头部高度
      this.tableTheadHeight = this.tableThead.clientHeight
      // 头部悬浮层高度统一
      this.tableFixed.style.height = `${this.tableTheadHeight}px`
      // 将当前自定义滚动条宽度与当前 Table 的 Body 元素保持一致
      this.tableSrollBar.style.width = `${this.tableBody.scrollWidth}px`
    },
    // 滚动变化处理
    scrollChange () {
      // 是否有滚动对比元素
      if (!this.scrollView) { return }
      // 刷新悬浮层内部大小
      this.reloadFixedSize()
      // 获得当前 Table 插件在窗口上的具体位置
      const pluginViewRect = this.pluginView.getBoundingClientRect()
      // 滚动控件进度条上面以滚动过的高度
      const topY = this.scrollView.scrollTop
      // 滚动控件进度条上面以滚动过的高度 + 滚动控件高度 = 当前滚动控件窗口的最底部Y值位置
      const lastY = topY + this.scrollView.clientHeight
      // 当前距离窗口顶部的高度 + 滚动控件进度条上面以滚动过的高度 = 当前控件距离顶部的滚动距离
      const offsetTop = pluginViewRect.y + topY
      // 分页器栏高度
      const footerHeight = this.isExistFooter ? this.footerHeight : 0
      // 插件视图高度
      const pluginViewHeight = this.pluginView.clientHeight
      // 最大Y值
      const maxY = offsetTop + pluginViewHeight - footerHeight
      // 更新悬浮层头部位置
      this.tableFixed.style.top = `${Math.max(Math.min(-pluginViewRect.y, (maxY - offsetTop - this.tableTheadHeight)), 0)}px`
      // 自定义滚动条高度
      const srollBarHeight = this.tableSrollBarView.offsetHeight
      // 更新悬浮层尾部位置
      const srollBarMaxY = footerHeight + (maxY - lastY)
      const srollBarMinY = footerHeight + (maxY - offsetTop - this.tableTheadHeight - srollBarHeight)
      this.tableSrollBarView.style.bottom = `${Math.max(Math.min(srollBarMaxY, srollBarMinY), footerHeight)}px`
      // 悬浮层尾部位置显示状态
      if (this.isShowScrollBar) { this.tableSrollBarView.style.opacity = Number(srollBarMaxY > footerHeight) }
      // 当前 Table 的 Body 是否支持横向滚动
      // const isTableBodyScroll = this.tableBody.clientWidth < this.tableBody.scrollWidth
    }
  }
}
</script>

<style scoped>
.plugin-view {
  position: relative;
}
.plugin-scroll-bar {
  position: absolute;
  overflow-x: auto;
  width: 100%;
  height: 18px;
  z-index: 1;
}
.scroll-bar {
  width: 100%;
  height: 100%;
}
</style>