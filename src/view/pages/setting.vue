<template>
  <div class="contain-log">
    <el-card>
      <div class="my-table">
        <el-table :data="tableData" background-color="#FAFAFA" class="">
          <el-table-column label="Date" prop="date" width="180"/>
          <el-table-column label="Name" prop="name" width="180"/>
          <el-table-column label="Address" prop="address"/>
          <el-table-column align="right">
            <template #default="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
              v-model:current-page="currentPage4"
              v-model:page-size="pageSize4"
              :background="background"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :total="60"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>


      <div class="my-table">
        <el-table :data="tableData" background-color="#FAFAFA" class="">
          <el-table-column label="Date" prop="date" width="180"/>
          <el-table-column label="Name" prop="name" width="180"/>
          <el-table-column label="Address" prop="address"/>
          <el-table-column align="right">
            <template #default="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-pagination
              v-model:current-page="currentPage4"
              v-model:page-size="pageSize4"
              :background="background"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :total="60"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="my-table">
        <el-table :data="tableData" background-color="#FAFAFA" class="">
          <el-table-column label="Date" prop="date" width="180"/>
          <el-table-column label="Name" prop="name" width="180"/>
          <el-table-column label="Address" prop="address"/>
          <el-table-column align="right">
            <template #default="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-pagination
              v-model:current-page="currentPage4"
              v-model:page-size="pageSize4"
              :background="background"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :total="60"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="my-table">
        <el-table :data="tableData" background-color="#FAFAFA" class="">
          <el-table-column label="Date" prop="date" width="180"/>
          <el-table-column label="Name" prop="name" width="180"/>
          <el-table-column label="Address" prop="address"/>
          <el-table-column align="right">
            <template #default="scope">
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="">
          <el-pagination
              v-model:current-page="currentPage4"
              v-model:page-size="pageSize4"
              :background="background"
              :page-sizes="[5, 10, 15, 20]"
              :small="small"
              :total="60"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "App",
  computed() {
  },
  props: {
    // tableData: [],
    default() {
      return {};
    },
  },
  data() {
    return {
      currentPage4: 4,
      pageSize4: 100,
      small: false,
      background: ref(true),
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom1',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom2',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom3',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom4',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    };
  },
  methods: {
    handleDelete(event) {
      console.log(this.tableData[event].name)
      console.log(this.tableData[event].date)
    },
    handleCurrentChange(event) {
      console.log(event)
    },
    handleSizeChange(event) {
      console.log(event)
    }
  },
  mounted() {
  },
};
</script>

<style>
.contain-log {
  height: 100%;
  background: rgb(39, 42, 55);
  max-height: 95vh;
  overflow: auto;
  overflow-x: scroll;
  overflow-y: scroll;
}
</style>
