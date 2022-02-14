<template>
  <!-- 内容视图 -->
  <div class="content-view">
    <!-- TablePlugin -->
    <TablePlugin>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-key="record => record.id"
        :pagination="pagination"
        :scroll="{ x: true }"
      >
      </a-table>
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
    key: 'id'
  },
  {
    title: '姓名(测试长名字！测试长名字！测试长名字！测试长名字！测试长名字！)',
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
      }
    }
  }
}
</script>

<style scoped>
.content-view {
  padding: 50px;
}
</style>