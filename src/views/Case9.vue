<template>
  <!-- 内容视图 -->
  <div class="content-view">
    <!-- TablePlugin -->
    <TablePlugin :fixedRowCount="2" @scroll="scrollChange">
      <!-- 需要有一层 div 进行包裹，保证插件内部第一层子元素同级只有一个，不能存在兄弟节点 -->
      <div>
        <!-- 工具栏什么的，但是由于 table 如果存在固定列的话，会由于 z-index 问题导致悬浮层会被遮住一部分，所以需要调整一下 table 的悬浮层 z-index 值 -->
        <div class="tool-bar">工具栏</div>
        <!-- 这里添加背景颜色，是因为指定悬浮行数之后，行的背景是透明的，不加背景颜色会出现穿透看到悬浮下面的行数据 -->
        <a-table
          class="table-z-index"
          style="background-color: #fff;"
          :columns="columns"
          :data-source="dataSource"
          :row-key="record => record.id"
          :pagination="pagination"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :scroll="{ x: 1500 }"
          @change="onChange"
        ></a-table>
      </div>
    </TablePlugin>
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
    key: 'age',
    // 支持这种开启排序之后，外部公共进行修改数据源的方式，其实也就是排序走服务器最合适，或者本地手动排序一遍，调整数据源。
    sorter: true
    // 不支持这种内部的排序方式，因为无法使数据源发生变化，所有需要改变数据源的操作都需要公共处理，
    // 这样数据源变化了，列表展示层才会刷新，否则生效的则会是悬浮的头部层，下面的列表会因为数据源没有变化而不刷新生效
    // sorter: (a, b) => a.age > b.age
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
        pageSize: 50,
        total: dataSource.length
      },
      // 勾选框这种方式就是修改数据源，所以不需要做任何处理，排序操作跟这个原理一致
      selectedRowKeys: []
    }
  },
  methods: {
    // Table回调
    onChange (pagination, filters, sorter) {
      // 简陋的本地排序处理
      if (sorter.columnKey === 'age') {
        if (sorter.order !== 'ascend') {
          this.dataSource = this.dataSource.reverse()
        }
      }
    },
    // 勾选测试
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 触发了滚动
    scrollChange (isVer) {
      console.log(`正在 ${isVer ? '竖向' : '横向'} 滚动`)
    }
  }
}
</script>

<style scoped>
.content-view {
  margin: 50px;
}
.tool-bar {
  background-color: red;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
/* 强行修改一下 Table 内部固定列的 z-index 值 */
.table-z-index >>> .ant-table-fixed-left {
  z-index: 0;
}
</style>