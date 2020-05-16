<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工排班</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addEmpScheduleRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加员工排班</el-button>
      </div>
      <el-table :data="EmpScheduleRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="员工编号" prop="empMdmCode"></el-table-column>
        <el-table-column label="排班编号" prop="scheduleCode"></el-table-column>
        <el-table-column label="排班日期" prop="scheduleDate"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="EmpScheduleRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editEmpScheduleRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delEmpScheduleRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加员工排班" :visible.sync="addEmpScheduleRelationDV" width="750px" :before-close="handleClose" @close="addEmpScheduleRelationDVClose">
      <el-form inline :model="addEmpScheduleRelationForm" :rules="addEmpScheduleRelationFormRules" ref="addEmpScheduleRelationFormRef" label-width="120px" size="small">
        <el-form-item label="员工编号" prop="empMdmCode">
          <el-input v-model="addEmpScheduleRelationForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班编号" prop="scheduleCode">
          <el-input v-model="addEmpScheduleRelationForm.scheduleCode"></el-input>
        </el-form-item>
        <el-form-item label="排班日期" prop="scheduleDate">
          <el-input v-model="addEmpScheduleRelationForm.scheduleDate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmpScheduleRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addEmpScheduleRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑员工排班" :visible.sync="editEmpScheduleRelationDV" width="750px" @close="editEmpScheduleRelationDVClose">
      <el-form inline :model="editEmpScheduleRelationForm" :rules="editEmpScheduleRelationFormRules" ref="editEmpScheduleRelationFormRef" label-width="120px" size="small">
        <el-form-item label="员工编号" prop="empMdmCode">
          <el-input v-model="editEmpScheduleRelationForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班编号" prop="scheduleCode">
          <el-input v-model="editEmpScheduleRelationForm.scheduleCode"></el-input>
        </el-form-item>
        <el-form-item label="排班日期" prop="scheduleDate">
          <el-input v-model="editEmpScheduleRelationForm.scheduleDate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editEmpScheduleRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editEmpScheduleRelation">确 定</el-button>
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
      EmpScheduleRelationList: null,
      addEmpScheduleRelationDV: false,
      addEmpScheduleRelationForm: {
        empMdmCode: '',
        scheduleCode: '',
        scheduleDate: ''
      },
      addEmpScheduleRelationFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editEmpScheduleRelationDV: false,
      editEmpScheduleRelationForm: {
        empMdmCode: '',
        scheduleCode: '',
        scheduleDate: ''
      },
      editEmpScheduleRelationFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmpScheduleRelationList()
  },
  methods: {
    async getEmpScheduleRelationList() {
      const { data: res } = await this.$http.post('/api/empScheduleRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.EmpScheduleRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getEmpScheduleRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getEmpScheduleRelationList()
    },
    async EmpScheduleRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/empScheduleRelation/upstatebykey', domaimInfo)
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
        message: '更新员工排班状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getEmpScheduleRelationList()
    },
    addEmpScheduleRelationDVClose() {
      this.$refs.addEmpScheduleRelationFormRef.resetFields()
    },
    async addEmpScheduleRelationBtn() {
      const { data: res } = await this.$http.post('/api/empScheduleRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addEmpScheduleRelationForm = res.data
      this.addEmpScheduleRelationForm.projectId = this.projectId
      this.addEmpScheduleRelationDV = true
    },
    addEmpScheduleRelation() {
      this.$refs.addEmpScheduleRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empScheduleRelation/add', this.addEmpScheduleRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addEmpScheduleRelationDV = false
        this.getEmpScheduleRelationList()
      })
    },
    editEmpScheduleRelationDVClose() {
      this.$refs.editEmpScheduleRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editEmpScheduleRelationDVShow(id) {
      this.editEmpScheduleRelationDV = true
      this.editEmpScheduleRelationForm.id = id
      const { data: res } = await this.$http.post('/api/empScheduleRelation/getbykey', this.editEmpScheduleRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editEmpScheduleRelationForm = res.data
    },
    editEmpScheduleRelation() {
      this.$refs.editEmpScheduleRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empScheduleRelation/upbykey', this.editEmpScheduleRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editEmpScheduleRelationDV = false
        this.getEmpScheduleRelationList()
        this.$message.success(res.message)
      })
    },
    delEmpScheduleRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/empScheduleRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getEmpScheduleRelationList()
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
