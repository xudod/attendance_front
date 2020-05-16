<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织行业信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addIndeustryDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加组织行业信息管理</el-button>
      </div>
      <el-table :data="IndeustryList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="行业名称" prop="name"></el-table-column>
        <el-table-column label="行业code" prop="code"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="IndeustryStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editIndeustryDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delIndeustryById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加组织行业信息管理" :visible.sync="addIndeustryDV" width="750px" :before-close="handleClose" @close="addIndeustryDVClose">
      <el-form inline :model="addIndeustryForm" :rules="addIndeustryFormRules" ref="addIndeustryFormRef" label-width="120px" size="small">
        <el-form-item label="行业名称" prop="name">
          <el-input v-model="addIndeustryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="行业code" prop="code">
          <el-input v-model="addIndeustryForm.code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addIndeustryDV = false">取 消</el-button>
        <el-button type="primary" @click="addIndeustry">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑组织行业信息管理" :visible.sync="editIndeustryDV" width="750px" @close="editIndeustryDVClose">
      <el-form inline :model="editIndeustryForm" :rules="editIndeustryFormRules" ref="editIndeustryFormRef" label-width="120px" size="small">
        <el-form-item label="行业名称" prop="name">
          <el-input v-model="editIndeustryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="行业code" prop="code">
          <el-input v-model="editIndeustryForm.code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editIndeustryDV = false">取 消</el-button>
        <el-button type="primary" @click="editIndeustry">确 定</el-button>
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
      IndeustryList: null,
      addIndeustryDV: false,
      addIndeustryForm: {
        name: '',
        code: ''
      },
      addIndeustryFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editIndeustryDV: false,
      editIndeustryForm: {
        name: '',
        code: ''
      },
      editIndeustryFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getIndeustryList()
  },
  methods: {
    async getIndeustryList() {
      const { data: res } = await this.$http.post('/api/indeustry/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.IndeustryList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getIndeustryList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getIndeustryList()
    },
    async IndeustryStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/indeustry/upstatebykey', domaimInfo)
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
        message: '更新组织行业信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getIndeustryList()
    },
    addIndeustryDVClose() {
      this.$refs.addIndeustryFormRef.resetFields()
    },
    async addIndeustryBtn() {
      const { data: res } = await this.$http.post('/api/indeustry/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addIndeustryForm = res.data
      this.addIndeustryForm.projectId = this.projectId
      this.addIndeustryDV = true
    },
    addIndeustry() {
      this.$refs.addIndeustryFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/indeustry/add', this.addIndeustryForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addIndeustryDV = false
        this.getIndeustryList()
      })
    },
    editIndeustryDVClose() {
      this.$refs.editIndeustryFormRef.resetFields()
    },
    handleClose() {

    },
    async editIndeustryDVShow(id) {
      this.editIndeustryDV = true
      this.editIndeustryForm.id = id
      const { data: res } = await this.$http.post('/api/indeustry/getbykey', this.editIndeustryForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editIndeustryForm = res.data
    },
    editIndeustry() {
      this.$refs.editIndeustryFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/indeustry/upbykey', this.editIndeustryForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editIndeustryDV = false
        this.getIndeustryList()
        this.$message.success(res.message)
      })
    },
    delIndeustryById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/indeustry/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getIndeustryList()
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
