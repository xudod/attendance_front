<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>人员考勤机关系管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addMachineUserRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加人员考勤机关系管理</el-button>
      </div>
      <el-table :data="MachineUserRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="考勤机id" prop="machineId"></el-table-column>
        <el-table-column label="人员主数据码" prop="empMdmCode"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="MachineUserRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMachineUserRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delMachineUserRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加人员考勤机关系管理" :visible.sync="addMachineUserRelationDV" width="750px" :before-close="handleClose" @close="addMachineUserRelationDVClose">
      <el-form inline :model="addMachineUserRelationForm" :rules="addMachineUserRelationFormRules" ref="addMachineUserRelationFormRef" label-width="120px" size="small">
        <el-form-item label="考勤机id" prop="machineId">
          <el-input v-model="addMachineUserRelationForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="人员主数据码" prop="empMdmCode">
          <el-input v-model="addMachineUserRelationForm.empMdmCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMachineUserRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addMachineUserRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑人员考勤机关系管理" :visible.sync="editMachineUserRelationDV" width="750px" @close="editMachineUserRelationDVClose">
      <el-form inline :model="editMachineUserRelationForm" :rules="editMachineUserRelationFormRules" ref="editMachineUserRelationFormRef" label-width="120px" size="small">
        <el-form-item label="考勤机id" prop="machineId">
          <el-input v-model="editMachineUserRelationForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="人员主数据码" prop="empMdmCode">
          <el-input v-model="editMachineUserRelationForm.empMdmCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMachineUserRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editMachineUserRelation">确 定</el-button>
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
      MachineUserRelationList: null,
      addMachineUserRelationDV: false,
      addMachineUserRelationForm: {
        machineId: '',
        empMdmCode: ''
      },
      addMachineUserRelationFormRules: {
        machineId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editMachineUserRelationDV: false,
      editMachineUserRelationForm: {
        machineId: '',
        empMdmCode: ''
      },
      editMachineUserRelationFormRules: {
        machineId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMachineUserRelationList()
  },
  methods: {
    async getMachineUserRelationList() {
      const { data: res } = await this.$http.post('/api/machineUserRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.MachineUserRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getMachineUserRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getMachineUserRelationList()
    },
    async MachineUserRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/machineUserRelation/upstatebykey', domaimInfo)
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
        message: '更新人员考勤机关系管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getMachineUserRelationList()
    },
    addMachineUserRelationDVClose() {
      this.$refs.addMachineUserRelationFormRef.resetFields()
    },
    async addMachineUserRelationBtn() {
      const { data: res } = await this.$http.post('/api/machineUserRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addMachineUserRelationForm = res.data
      this.addMachineUserRelationForm.projectId = this.projectId
      this.addMachineUserRelationDV = true
    },
    addMachineUserRelation() {
      this.$refs.addMachineUserRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserRelation/add', this.addMachineUserRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addMachineUserRelationDV = false
        this.getMachineUserRelationList()
      })
    },
    editMachineUserRelationDVClose() {
      this.$refs.editMachineUserRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editMachineUserRelationDVShow(id) {
      this.editMachineUserRelationDV = true
      this.editMachineUserRelationForm.id = id
      const { data: res } = await this.$http.post('/api/machineUserRelation/getbykey', this.editMachineUserRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editMachineUserRelationForm = res.data
    },
    editMachineUserRelation() {
      this.$refs.editMachineUserRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserRelation/upbykey', this.editMachineUserRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editMachineUserRelationDV = false
        this.getMachineUserRelationList()
        this.$message.success(res.message)
      })
    },
    delMachineUserRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/machineUserRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getMachineUserRelationList()
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
