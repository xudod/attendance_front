<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>多键值分组管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addBaseGroupMdataDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加多键值分组管理</el-button>
      </div>
      <el-table :data="BaseGroupMdataList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="多键值码表数据组名称" prop="groupName"></el-table-column>
        <el-table-column label="多键值码表数据组编码" prop="groupCode"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="BaseGroupMdataStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBaseGroupMdataDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delBaseGroupMdataById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加多键值分组管理" :visible.sync="addBaseGroupMdataDV" width="750px" :before-close="handleClose" @close="addBaseGroupMdataDVClose">
      <el-form inline :model="addBaseGroupMdataForm" :rules="addBaseGroupMdataFormRules" ref="addBaseGroupMdataFormRef" label-width="120px" size="small">
        <el-form-item label="多键值码表数据组名称" prop="groupName">
          <el-input v-model="addBaseGroupMdataForm.groupName"></el-input>
        </el-form-item>
        <el-form-item label="多键值码表数据组编码" prop="groupCode">
          <el-input v-model="addBaseGroupMdataForm.groupCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBaseGroupMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="addBaseGroupMdata">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑多键值分组管理" :visible.sync="editBaseGroupMdataDV" width="750px" @close="editBaseGroupMdataDVClose">
      <el-form inline :model="editBaseGroupMdataForm" :rules="editBaseGroupMdataFormRules" ref="editBaseGroupMdataFormRef" label-width="120px" size="small">
        <el-form-item label="多键值码表数据组名称" prop="groupName">
          <el-input v-model="editBaseGroupMdataForm.groupName"></el-input>
        </el-form-item>
        <el-form-item label="多键值码表数据组编码" prop="groupCode">
          <el-input v-model="editBaseGroupMdataForm.groupCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBaseGroupMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="editBaseGroupMdata">确 定</el-button>
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
      BaseGroupMdataList: null,
      addBaseGroupMdataDV: false,
      addBaseGroupMdataForm: {
        groupName: '',
        groupCode: ''
      },
      addBaseGroupMdataFormRules: {
        groupName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        groupCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editBaseGroupMdataDV: false,
      editBaseGroupMdataForm: {
        groupName: '',
        groupCode: ''
      },
      editBaseGroupMdataFormRules: {
        groupName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        groupCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getBaseGroupMdataList()
  },
  methods: {
    async getBaseGroupMdataList() {
      const { data: res } = await this.$http.post('/api/baseGroupMdata/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.BaseGroupMdataList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getBaseGroupMdataList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getBaseGroupMdataList()
    },
    async BaseGroupMdataStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/baseGroupMdata/upstatebykey', domaimInfo)
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
        message: '更新多键值分组管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getBaseGroupMdataList()
    },
    addBaseGroupMdataDVClose() {
      this.$refs.addBaseGroupMdataFormRef.resetFields()
    },
    async addBaseGroupMdataBtn() {
      const { data: res } = await this.$http.post('/api/baseGroupMdata/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addBaseGroupMdataForm = res.data
      this.addBaseGroupMdataForm.projectId = this.projectId
      this.addBaseGroupMdataDV = true
    },
    addBaseGroupMdata() {
      this.$refs.addBaseGroupMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/baseGroupMdata/add', this.addBaseGroupMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addBaseGroupMdataDV = false
        this.getBaseGroupMdataList()
      })
    },
    editBaseGroupMdataDVClose() {
      this.$refs.editBaseGroupMdataFormRef.resetFields()
    },
    handleClose() {

    },
    async editBaseGroupMdataDVShow(id) {
      this.editBaseGroupMdataDV = true
      this.editBaseGroupMdataForm.id = id
      const { data: res } = await this.$http.post('/api/baseGroupMdata/getbykey', this.editBaseGroupMdataForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editBaseGroupMdataForm = res.data
    },
    editBaseGroupMdata() {
      this.$refs.editBaseGroupMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/baseGroupMdata/upbykey', this.editBaseGroupMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editBaseGroupMdataDV = false
        this.getBaseGroupMdataList()
        this.$message.success(res.message)
      })
    },
    delBaseGroupMdataById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/baseGroupMdata/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getBaseGroupMdataList()
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
