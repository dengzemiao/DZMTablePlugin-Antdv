<template>
  <!-- 内容视图 -->
  <div class="content-view">
    <!-- 自定义滚动元素 -->
    <div class="scroll-view" ref="scroll-view">
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
    </div>
  </div>
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
      // 滚动监听对象
      scrollListener: undefined
    }
  },
  mounted () {
    // 获取滚动元素
    const scrollView = this.$refs['scroll-view']
    // 设置滚动监听对象
    this.scrollListener = scrollView
  }
}
</script>

<style scoped>
.content-view {
  margin: 50px;
}
.scroll-view {
  height: 600px;
  overflow-y: auto;
}
</style>