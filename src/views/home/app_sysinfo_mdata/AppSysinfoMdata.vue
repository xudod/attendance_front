<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addAppSysinfoMdataDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加系统信息管理</el-button>
      </div>
      <el-table :data="AppSysinfoMdataList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="系统名称" prop="name"></el-table-column>
        <el-table-column label="简称" prop="shortName"></el-table-column>
        <el-table-column label="编码" prop="code"></el-table-column>
        <el-table-column label="上线时间" prop="onlineTime"></el-table-column>
        <el-table-column label="可配属性" prop="configStatus"></el-table-column>
        <el-table-column label="登录地址" prop="loginUrl"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="AppSysinfoMdataStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAppSysinfoMdataDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delAppSysinfoMdataById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加系统信息管理" :visible.sync="addAppSysinfoMdataDV" width="750px" :before-close="handleClose" @close="addAppSysinfoMdataDVClose">
      <el-form inline :model="addAppSysinfoMdataForm" :rules="addAppSysinfoMdataFormRules" ref="addAppSysinfoMdataFormRef" label-width="120px" size="small">
        <el-form-item label="系统名称" prop="name">
          <el-input v-model="addAppSysinfoMdataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortName">
          <el-input v-model="addAppSysinfoMdataForm.shortName"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="addAppSysinfoMdataForm.code"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" prop="onlineTime">
          <el-input v-model="addAppSysinfoMdataForm.onlineTime"></el-input>
        </el-form-item>
        <el-form-item label="可配属性" prop="configStatus">
          <el-input v-model="addAppSysinfoMdataForm.configStatus"></el-input>
        </el-form-item>
        <el-form-item label="登录地址" prop="loginUrl">
          <el-input v-model="addAppSysinfoMdataForm.loginUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAppSysinfoMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="addAppSysinfoMdata">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑系统信息管理" :visible.sync="editAppSysinfoMdataDV" width="750px" @close="editAppSysinfoMdataDVClose">
      <el-form inline :model="editAppSysinfoMdataForm" :rules="editAppSysinfoMdataFormRules" ref="editAppSysinfoMdataFormRef" label-width="120px" size="small">
        <el-form-item label="系统名称" prop="name">
          <el-input v-model="editAppSysinfoMdataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortName">
          <el-input v-model="editAppSysinfoMdataForm.shortName"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="editAppSysinfoMdataForm.code"></el-input>
        </el-form-item>
        <el-form-item label="上线时间" prop="onlineTime">
          <el-input v-model="editAppSysinfoMdataForm.onlineTime"></el-input>
        </el-form-item>
        <el-form-item label="可配属性" prop="configStatus">
          <el-input v-model="editAppSysinfoMdataForm.configStatus"></el-input>
        </el-form-item>
        <el-form-item label="登录地址" prop="loginUrl">
          <el-input v-model="editAppSysinfoMdataForm.loginUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAppSysinfoMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="editAppSysinfoMdata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        current: 1,
        // 当前每页显示多少条数据
        size: 10
      },
      total: 0,
      AppSysinfoMdataList: null,
      addAppSysinfoMdataDV: false,
      addAppSysinfoMdataForm: {
        name: '',
        shortName: '',
        code: '',
        onlineTime: '',
        configStatus: '',
        loginUrl: ''
      },
      addAppSysinfoMdataFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        shortName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        onlineTime: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        configStatus: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        loginUrl: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editAppSysinfoMdataDV: false,
      editAppSysinfoMdataForm: {
        name: '',
        shortName: '',
        code: '',
        onlineTime: '',
        configStatus: '',
        loginUrl: ''
      },
      editAppSysinfoMdataFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        shortName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        onlineTime: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        configStatus: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        loginUrl: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAppSysinfoMdataList()
  },
  methods: {
    async getAppSysinfoMdataList() {
      const { data: res } = await this.$http.post('/api/appSysinfoMdata/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.AppSysinfoMdataList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getAppSysinfoMdataList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getAppSysinfoMdataList()
    },
    async AppSysinfoMdataStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/appSysinfoMdata/upstatebykey', domaimInfo)
      if (res.code !== 200) {
        if (domaimInfo.useStatus === '1') {
          domaimInfo.useStatus = '0'
        } else {
          domaimInfo.useStatus = '1'
        }
        return this.$message.error(res.message)
      }
      this.$message({
        showClose: true,
        message: '更新系统信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getAppSysinfoMdataList()
    },
    addAppSysinfoMdataDVClose() {
      this.$refs.addAppSysinfoMdataFormRef.resetFields()
    },
    async addAppSysinfoMdataBtn() {
      const { data: res } = await this.$http.post('/api/appSysinfoMdata/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addAppSysinfoMdataForm = res.data
      this.addAppSysinfoMdataForm.projectId = this.projectId
      this.addAppSysinfoMdataDV = true
    },
    addAppSysinfoMdata() {
      this.$refs.addAppSysinfoMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/appSysinfoMdata/add', this.addAppSysinfoMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addAppSysinfoMdataDV = false
        this.getAppSysinfoMdataList()
      })
    },
    editAppSysinfoMdataDVClose() {
      this.$refs.editAppSysinfoMdataFormRef.resetFields()
    },
    handleClose() {

    },
    async editAppSysinfoMdataDVShow(id) {
      this.editAppSysinfoMdataDV = true
      this.editAppSysinfoMdataForm.id = id
      const { data: res } = await this.$http.post('/api/appSysinfoMdata/getbykey', this.editAppSysinfoMdataForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editAppSysinfoMdataForm = res.data
    },
    editAppSysinfoMdata() {
      this.$refs.editAppSysinfoMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/appSysinfoMdata/upbykey', this.editAppSysinfoMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editAppSysinfoMdataDV = false
        this.getAppSysinfoMdataList()
        this.$message.success(res.message)
      })
    },
    delAppSysinfoMdataById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/appSysinfoMdata/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getAppSysinfoMdataList()
        this.$message.success(res.message)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
}
.el-form {
  margin: 0 35px !important;
}
</style>
