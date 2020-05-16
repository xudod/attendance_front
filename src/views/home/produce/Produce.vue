<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产业信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addProduceDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加产业信息管理</el-button>
      </div>
      <el-table :data="ProduceList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="行业名称" prop="name"></el-table-column>
        <el-table-column label="行业code" prop="code"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="ProduceStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editProduceDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delProduceById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加产业信息管理" :visible.sync="addProduceDV" width="750px" :before-close="handleClose" @close="addProduceDVClose">
      <el-form inline :model="addProduceForm" :rules="addProduceFormRules" ref="addProduceFormRef" label-width="120px" size="small">
        <el-form-item label="行业名称" prop="name">
          <el-input v-model="addProduceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="行业code" prop="code">
          <el-input v-model="addProduceForm.code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addProduceDV = false">取 消</el-button>
        <el-button type="primary" @click="addProduce">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑产业信息管理" :visible.sync="editProduceDV" width="750px" @close="editProduceDVClose">
      <el-form inline :model="editProduceForm" :rules="editProduceFormRules" ref="editProduceFormRef" label-width="120px" size="small">
        <el-form-item label="行业名称" prop="name">
          <el-input v-model="editProduceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="行业code" prop="code">
          <el-input v-model="editProduceForm.code"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editProduceDV = false">取 消</el-button>
        <el-button type="primary" @click="editProduce">确 定</el-button>
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
      ProduceList: null,
      addProduceDV: false,
      addProduceForm: {
        name: '',
        code: ''
      },
      addProduceFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editProduceDV: false,
      editProduceForm: {
        name: '',
        code: ''
      },
      editProduceFormRules: {
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
    this.getProduceList()
  },
  methods: {
    async getProduceList() {
      const { data: res } = await this.$http.post('/api/produce/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.ProduceList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getProduceList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getProduceList()
    },
    async ProduceStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/produce/upstatebykey', domaimInfo)
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
        message: '更新产业信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getProduceList()
    },
    addProduceDVClose() {
      this.$refs.addProduceFormRef.resetFields()
    },
    async addProduceBtn() {
      const { data: res } = await this.$http.post('/api/produce/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addProduceForm = res.data
      this.addProduceForm.projectId = this.projectId
      this.addProduceDV = true
    },
    addProduce() {
      this.$refs.addProduceFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/produce/add', this.addProduceForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addProduceDV = false
        this.getProduceList()
      })
    },
    editProduceDVClose() {
      this.$refs.editProduceFormRef.resetFields()
    },
    handleClose() {

    },
    async editProduceDVShow(id) {
      this.editProduceDV = true
      this.editProduceForm.id = id
      const { data: res } = await this.$http.post('/api/produce/getbykey', this.editProduceForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editProduceForm = res.data
    },
    editProduce() {
      this.$refs.editProduceFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/produce/upbykey', this.editProduceForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editProduceDV = false
        this.getProduceList()
        this.$message.success(res.message)
      })
    },
    delProduceById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/produce/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getProduceList()
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
