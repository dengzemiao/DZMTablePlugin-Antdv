<template>
  <div class="content-view">
    <div class="case-list">
      <a-button @click="jumlCase('case1')">案例一：Table 左右有固定悬浮列效果（包含排序，勾选）</a-button>
      <a-button @click="jumlCase('case2')">案例二：Table 无固定悬浮列效果（带动画）</a-button>
      <a-button @click="jumlCase('case3')">案例三：Table 在多层级视图中效果</a-button>
      <a-button @click="jumlCase('case4')">案例四：Table 同一个页面存在多个效果</a-button>
      <a-button @click="jumlCase('case5')">案例五：Table 自定义滚动监听</a-button>
      <a-button @click="jumlCase('case6')">案例六：Table Plugin 包裹被多层 div 包裹的 Table</a-button>
      <a-button @click="touchCase11">案例七：Table 在侧滑弹窗中效果</a-button>
      <!-- 小提示 -->
      <div class="hint-view">
        <span class="hint-title">测试结果建议（一般情况下不需要用到，遇到时可以进行参考）：</span>
        <br>
        <div class="hint-space"></div>
        1、重点注意：如果是网络数据，加载数据完成后，刷新插件布局（二选一）：
        <div class="hint-content">
          方式一：将当前数据源数量传递到插件内部 <a>:dataCount="dataSource.length"</a>
          <br>
          方式二：<a>this.$nextTick(() => {  this.$refs['TablePlugin'].reload() })</a>
          <br>
          保证悬浮位置的准确性，有数据就出来悬浮层，没有数据则会隐藏悬浮层。
        </div>
        <div class="hint-space"></div>
        2、有左右滚动范围，列宽度可以进行滚动的时候，悬浮层会比较流畅，
        <div class="hint-content">
          无左右滚动范围时，上线滚动悬浮层在有的情况会出现闪动的情况。
          <br>
          在无需左右滚动范围时，可以通过给 Table 设置 <a>:scroll="{ x: true }"</a> 强行带滚动，并隐藏滚动条
          <br>
          这种出来方式是为了在一个不需要左右滚动的 Table 身上带上滚动元素，
          <br>
          由于宽度不够，它不会进行滚动，这样悬浮层也达到了流畅的目的
        </div>
        <div class="hint-space"></div>
        3、无左右滚动范围，自定义滚动条不会出现。
        <br>
        <div class="hint-space"></div>
        4、支持头部、尾部（进度条）悬浮动画设置。
        <br>
        <div class="hint-space"></div>
        5、如果悬浮的自定义滚动条无法拖拽，是因为滚动条高度低了，
        <div class="hint-content">
          增高 TablePlugin 底部的 <a>.plugin-scroll-bar</a> 高度即可。
        </div>
        <div class="hint-space"></div>
        6、排序、勾选等操作，都需要公共处理数据源，
        <div class="hint-content">
          只有数据源发生变化才会正确刷新列表，
          <br>
          其实也就是排序走服务器或本地公共的对数据源进行排序，
          <br>
          数据源必须进行变化，可以参考 <a @click="jumlCase('case1')">案例一</a>。
        </div>
        <div class="hint-space"></div>
        7、如果滚动条样式需要调整，可以参考 <a href="https://blog.csdn.net/zz00008888/article/details/114702186" target="_blank">修改滚动条样式</a>。
      </div>
    </div>
    <!-- 案例五 -->
    <Case11 ref="case11"></Case11>
  </div>
</template>

<script>
import Case11 from './Case11.vue'
export default {
  components: {
    Case11
  },
  methods: {
    // 跳转案例
    jumlCase(path) {
      this.$router.push(path)
    },
    // 打开案例侧滑栏
    touchCase11 () {
      this.$refs['case11'].showDrawer()
    }
  }
}
</script>

<style scoped>
.content-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.case-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.case-list .ant-btn {
  text-align: left;
  width: 100%;
  margin-top: 20px;
}
.hint-view {
  margin-top: 20px;
  line-height: 28px;
}
.hint-title {
  font-weight: 500;
}
.hint-space {
  margin-top: 4px;
}
.hint-content {
  margin-left: 20px;
}
</style>