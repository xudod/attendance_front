<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>单键值信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addBaseSingleMdataDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加单键值信息管理</el-button>
      </div>
      <el-table :data="BaseSingleMdataList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="编码" prop="code"></el-table-column>
        <el-table-column label="编码值" prop="value"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="BaseSingleMdataStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBaseSingleMdataDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delBaseSingleMdataById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加单键值信息管理" :visible.sync="addBaseSingleMdataDV" width="750px" :before-close="handleClose" @close="addBaseSingleMdataDVClose">
      <el-form inline :model="addBaseSingleMdataForm" :rules="addBaseSingleMdataFormRules" ref="addBaseSingleMdataFormRef" label-width="120px" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addBaseSingleMdataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="addBaseSingleMdataForm.code"></el-input>
        </el-form-item>
        <el-form-item label="编码值" prop="value">
          <el-input v-model="addBaseSingleMdataForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBaseSingleMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="addBaseSingleMdata">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑单键值信息管理" :visible.sync="editBaseSingleMdataDV" width="750px" @close="editBaseSingleMdataDVClose">
      <el-form inline :model="editBaseSingleMdataForm" :rules="editBaseSingleMdataFormRules" ref="editBaseSingleMdataFormRef" label-width="120px" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editBaseSingleMdataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="editBaseSingleMdataForm.code"></el-input>
        </el-form-item>
        <el-form-item label="编码值" prop="value">
          <el-input v-model="editBaseSingleMdataForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBaseSingleMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="editBaseSingleMdata">确 定</el-button>
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
      BaseSingleMdataList: null,
      addBaseSingleMdataDV: false,
      addBaseSingleMdataForm: {
        name: '',
        code: '',
        value: ''
      },
      addBaseSingleMdataFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        value: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editBaseSingleMdataDV: false,
      editBaseSingleMdataForm: {
        name: '',
        code: '',
        value: ''
      },
      editBaseSingleMdataFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        value: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getBaseSingleMdataList()
  },
  methods: {
    async getBaseSingleMdataList() {
      const { data: res } = await this.$http.post('/api/baseSingleMdata/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.BaseSingleMdataList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getBaseSingleMdataList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getBaseSingleMdataList()
    },
    async BaseSingleMdataStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/baseSingleMdata/upstatebykey', domaimInfo)
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
        message: '更新单键值信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getBaseSingleMdataList()
    },
    addBaseSingleMdataDVClose() {
      this.$refs.addBaseSingleMdataFormRef.resetFields()
    },
    async addBaseSingleMdataBtn() {
      const { data: res } = await this.$http.post('/api/baseSingleMdata/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addBaseSingleMdataForm = res.data
      this.addBaseSingleMdataForm.projectId = this.projectId
      this.addBaseSingleMdataDV = true
    },
    addBaseSingleMdata() {
      this.$refs.addBaseSingleMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/baseSingleMdata/add', this.addBaseSingleMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addBaseSingleMdataDV = false
        this.getBaseSingleMdataList()
      })
    },
    editBaseSingleMdataDVClose() {
      this.$refs.editBaseSingleMdataFormRef.resetFields()
    },
    handleClose() {

    },
    async editBaseSingleMdataDVShow(id) {
      this.editBaseSingleMdataDV = true
      this.editBaseSingleMdataForm.id = id
      const { data: res } = await this.$http.post('/api/baseSingleMdata/getbykey', this.editBaseSingleMdataForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editBaseSingleMdataForm = res.data
    },
    editBaseSingleMdata() {
      this.$refs.editBaseSingleMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/baseSingleMdata/upbykey', this.editBaseSingleMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editBaseSingleMdataDV = false
        this.getBaseSingleMdataList()
        this.$message.success(res.message)
      })
    },
    delBaseSingleMdataById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/baseSingleMdata/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getBaseSingleMdataList()
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
