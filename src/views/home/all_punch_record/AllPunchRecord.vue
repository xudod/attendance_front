<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>打卡数据查看</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addAllPunchRecordDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加打卡数据查看</el-button>
      </div>
      <el-table :data="AllPunchRecordList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="打卡时间" prop="punchTime"></el-table-column>
        <el-table-column label="主数据编码" prop="empMdmCode"></el-table-column>
        <el-table-column label="设备" prop="machineCode"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="AllPunchRecordStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAllPunchRecordDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delAllPunchRecordById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加打卡数据查看" :visible.sync="addAllPunchRecordDV" width="750px" :before-close="handleClose" @close="addAllPunchRecordDVClose">
      <el-form inline :model="addAllPunchRecordForm" :rules="addAllPunchRecordFormRules" ref="addAllPunchRecordFormRef" label-width="120px" size="small">
        <el-form-item label="打卡时间" prop="punchTime">
          <el-input v-model="addAllPunchRecordForm.punchTime"></el-input>
        </el-form-item>
        <el-form-item label="主数据编码" prop="empMdmCode">
          <el-input v-model="addAllPunchRecordForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="machineCode">
          <el-input v-model="addAllPunchRecordForm.machineCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAllPunchRecordDV = false">取 消</el-button>
        <el-button type="primary" @click="addAllPunchRecord">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑打卡数据查看" :visible.sync="editAllPunchRecordDV" width="750px" @close="editAllPunchRecordDVClose">
      <el-form inline :model="editAllPunchRecordForm" :rules="editAllPunchRecordFormRules" ref="editAllPunchRecordFormRef" label-width="120px" size="small">
        <el-form-item label="打卡时间" prop="punchTime">
          <el-input v-model="editAllPunchRecordForm.punchTime"></el-input>
        </el-form-item>
        <el-form-item label="主数据编码" prop="empMdmCode">
          <el-input v-model="editAllPunchRecordForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="设备" prop="machineCode">
          <el-input v-model="editAllPunchRecordForm.machineCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAllPunchRecordDV = false">取 消</el-button>
        <el-button type="primary" @click="editAllPunchRecord">确 定</el-button>
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
      AllPunchRecordList: null,
      addAllPunchRecordDV: false,
      addAllPunchRecordForm: {
        punchTime: '',
        empMdmCode: '',
        machineCode: ''
      },
      addAllPunchRecordFormRules: {
        punchTime: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        machineCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editAllPunchRecordDV: false,
      editAllPunchRecordForm: {
        punchTime: '',
        empMdmCode: '',
        machineCode: ''
      },
      editAllPunchRecordFormRules: {
        punchTime: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        machineCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllPunchRecordList()
  },
  methods: {
    async getAllPunchRecordList() {
      const { data: res } = await this.$http.post('/api/allPunchRecord/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.AllPunchRecordList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getAllPunchRecordList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getAllPunchRecordList()
    },
    async AllPunchRecordStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/allPunchRecord/upstatebykey', domaimInfo)
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
        message: '更新打卡数据查看状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getAllPunchRecordList()
    },
    addAllPunchRecordDVClose() {
      this.$refs.addAllPunchRecordFormRef.resetFields()
    },
    async addAllPunchRecordBtn() {
      const { data: res } = await this.$http.post('/api/allPunchRecord/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addAllPunchRecordForm = res.data
      this.addAllPunchRecordForm.projectId = this.projectId
      this.addAllPunchRecordDV = true
    },
    addAllPunchRecord() {
      this.$refs.addAllPunchRecordFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/allPunchRecord/add', this.addAllPunchRecordForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addAllPunchRecordDV = false
        this.getAllPunchRecordList()
      })
    },
    editAllPunchRecordDVClose() {
      this.$refs.editAllPunchRecordFormRef.resetFields()
    },
    handleClose() {

    },
    async editAllPunchRecordDVShow(id) {
      this.editAllPunchRecordDV = true
      this.editAllPunchRecordForm.id = id
      const { data: res } = await this.$http.post('/api/allPunchRecord/getbykey', this.editAllPunchRecordForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editAllPunchRecordForm = res.data
    },
    editAllPunchRecord() {
      this.$refs.editAllPunchRecordFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/allPunchRecord/upbykey', this.editAllPunchRecordForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editAllPunchRecordDV = false
        this.getAllPunchRecordList()
        this.$message.success(res.message)
      })
    },
    delAllPunchRecordById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/allPunchRecord/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getAllPunchRecordList()
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
