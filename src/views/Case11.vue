<template>
  <!-- 抽屉 -->
  <a-drawer
    title="侧滑效果测试"
    :class="drawerClass"
    :width="700"
    :visible="visible"
    @close="onClose"
  >
    <!-- 内容 -->
    <div class="content-view">
      <!-- 撑开 -->
      <div style="height: 300px;"> 往下滚 ↓ </div>
      <!-- TablePlugin -->
      <TablePlugin
        :scrollListener="scrollListener"
      >
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :row-key="record => record.id"
          :pagination="pagination"
          :scroll="{ x: 1500 }"
        ></a-table>
      </TablePlugin>
      <!-- 撑开 -->
      <div style="height: 300px;"></div>
    </div>
  </a-drawer>
</template>

<script>
// 导入
import TablePlugin from '../components/TablePlugin'
// 列数据
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  }
]
// 模拟数据
const dataSource = []
for (let index = 0; index < 100; index++) {
  dataSource.push({ id: index, name: `User${index}`, age: index + 10 }) 
}
export default {
  components: {
    TablePlugin
  },
  data () {
    return {
      columns,
      dataSource,
      pagination: {
        current: 1,
        pageSize: 20,
        total: dataSource.length
      },
      visible: false,
      // 滚动监听对象
      scrollListener: undefined,
      // 唯一 Class
      drawerClass: `plugin-${this.getUniqueID()}`
    }
  },
  methods: {
    // 显示
    showDrawer () {
      this.visible = true
      // 延迟获取
      this.$nextTick(() => {
        // 获得当前 Drawer
        const drawer = document.getElementsByClassName(this.drawerClass)[0]
        // 获得当前滚动元素，并传入插件进行监听
        this.scrollListener = drawer.getElementsByClassName('ant-drawer-wrapper-body')[0]
      })
    },
    // 关闭
    onClose () {
      this.visible = false
    },
    // 获取唯一标识符
    getUniqueID () {
      // 当前时间转成 36 进制字符串
      var time = Date.now().toString(36)
      // 当前随机数转成 36 进制字符串
      var random = Math.random().toString(36)
      // 去除随机数的 0. 字符串
      random = random.substring(2, random.length)
      // 返回唯一ID
      return random + time
    }
  }
}
</script>

<style scoped>
.content-view {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>