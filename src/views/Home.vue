<template>
  <div class="content-view">
    <div class="case-list">
      <a-button @click="jumlCase('case1')">案例一：Table 左右有固定悬浮列效果（包含排序，勾选）</a-button>
      <a-button @click="jumlCase('case2')">案例二：Table 无固定悬浮列效果（带动画）</a-button>
      <a-button @click="jumlCase('case3')">案例三：Table 在多层级视图中效果</a-button>
      <a-button @click="jumlCase('case4')">案例四：Table 同一个页面存在多个效果</a-button>
      <a-button @click="jumlCase('case5')">案例五：Table 自定义滚动监听</a-button>
      <a-button @click="touchCase11">案例六：Table 在侧滑弹窗中效果</a-button>
      <!-- 小提示 -->
      <div style="margin-top: 20px; line-height: 28px;">
        测试结果建议：
        <br>
        1、左右两侧没有悬浮固定列的，上下滚动会有卡顿。
        <br>
        2、有固定列的，滚动比较流畅。
        <br>
        3、无滚动范围，自定义滚动条不会出现。
        <br>
        4、支持头部、尾部（进度条）悬浮动画设置。
        <br>
        5、如果悬浮的自定义滚动条无法拖拽，是因为滚动条高度低了，
        <div style="margin-left: 20px;">
          增高 TablePlugin 底部的 .plugin-scroll-bar 高度即可。
        </div>
        6、排序、勾选等操作，都需要公共处理数据源，
        <div style="margin-left: 20px;">
          只有数据源发生变化才会正确刷新列表，
          <br>
          其实也就是排序走服务器或本地公共的对数据源进行排序，
          <br>
          数据源必须进行变化，可以参考 <a @click="jumlCase('case1')">案例一</a>。
        </div>
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
</style>