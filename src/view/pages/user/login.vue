<template>
  <el-container style="height: 94vh;">
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
      </el-card>
    </div>

    <!--登录表格所在的卡片-->
    <el-card class="login-card">
      <!--最顶端的文字描述部分-->
      <div class="login-title">登录/注册</div>
      <!--账号密码输入框-->
      <div class="login-form">
        <div class="form-item">
          <span class="form-label">账号</span>
          <el-input v-model="loginForm.email" style="width: 300px;"></el-input>
        </div>

        <div class="form-item">
          <span class="form-label">密码</span>
          <el-input v-model="loginForm.password" style="width: 300px;"></el-input>
        </div>
        <!--登录/注册-->
        <el-button class="login-form-button" type="primary">登录/注册</el-button>
      </div>
    </el-card>

  </el-container>
</template>


<script>
import {ref, reactive} from "vue";

export default {
  name: "App",
  computed() {
  },
  props: {
    default() {
      return {};
    },
  },
  components: {
    gRecaptcha,
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
  data() {
    return {
      loginForm: reactive({
        email: '',
        password: '',
      }),


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
};
</script>

<style>
.login-form-button {
  display: block;
  margin: auto auto;
}

.login-card {
  width: 450px;
  height: 500px;
  margin: 50px 0 0 100px;
  display: flex;
  position: relative;
}

.login-title {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 35px;
}

.login-form {
  position: absolute;
  top: 90px;
  left: 40px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-label {
  display: inline-block;
  width: 50px;
}
</style>
