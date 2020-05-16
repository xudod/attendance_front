<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员指纹信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addMachineUserTemDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加成员指纹信息</el-button>
      </div>
      <el-table :data="MachineUserTemList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="成员编码" prop="empMdmCode"></el-table-column>
        <el-table-column label="设备编码" prop="machineCode"></el-table-column>
        <el-table-column label="指纹编码" prop="fingerIndex"></el-table-column>
        <el-table-column label="指纹信息" prop="tmpData"></el-table-column>
        <el-table-column label="指纹长度" prop="tmpLength"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="MachineUserTemStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMachineUserTemDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delMachineUserTemById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加成员指纹信息" :visible.sync="addMachineUserTemDV" width="750px" :before-close="handleClose" @close="addMachineUserTemDVClose">
      <el-form inline :model="addMachineUserTemForm" :rules="addMachineUserTemFormRules" ref="addMachineUserTemFormRef" label-width="120px" size="small">
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="addMachineUserTemForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="设备编码" prop="machineCode">
          <el-input v-model="addMachineUserTemForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="指纹编码" prop="fingerIndex">
          <el-input v-model="addMachineUserTemForm.fingerIndex"></el-input>
        </el-form-item>
        <el-form-item label="指纹信息" prop="tmpData">
          <el-input v-model="addMachineUserTemForm.tmpData"></el-input>
        </el-form-item>
        <el-form-item label="指纹长度" prop="tmpLength">
          <el-input v-model="addMachineUserTemForm.tmpLength"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addMachineUserTemForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMachineUserTemDV = false">取 消</el-button>
        <el-button type="primary" @click="addMachineUserTem">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑成员指纹信息" :visible.sync="editMachineUserTemDV" width="750px" @close="editMachineUserTemDVClose">
      <el-form inline :model="editMachineUserTemForm" :rules="editMachineUserTemFormRules" ref="editMachineUserTemFormRef" label-width="120px" size="small">
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="editMachineUserTemForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="设备编码" prop="machineCode">
          <el-input v-model="editMachineUserTemForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="指纹编码" prop="fingerIndex">
          <el-input v-model="editMachineUserTemForm.fingerIndex"></el-input>
        </el-form-item>
        <el-form-item label="指纹信息" prop="tmpData">
          <el-input v-model="editMachineUserTemForm.tmpData"></el-input>
        </el-form-item>
        <el-form-item label="指纹长度" prop="tmpLength">
          <el-input v-model="editMachineUserTemForm.tmpLength"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editMachineUserTemForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMachineUserTemDV = false">取 消</el-button>
        <el-button type="primary" @click="editMachineUserTem">确 定</el-button>
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
      MachineUserTemList: null,
      addMachineUserTemDV: false,
      addMachineUserTemForm: {
        empMdmCode: '',
        machineCode: '',
        fingerIndex: '',
        tmpData: '',
        tmpLength: '',
        name: ''
      },
      addMachineUserTemFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        machineCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        fingerIndex: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tmpData: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tmpLength: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editMachineUserTemDV: false,
      editMachineUserTemForm: {
        empMdmCode: '',
        machineCode: '',
        fingerIndex: '',
        tmpData: '',
        tmpLength: '',
        name: ''
      },
      editMachineUserTemFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        machineCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        fingerIndex: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tmpData: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tmpLength: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMachineUserTemList()
  },
  methods: {
    async getMachineUserTemList() {
      const { data: res } = await this.$http.post('/api/machineUserTem/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.MachineUserTemList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getMachineUserTemList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getMachineUserTemList()
    },
    async MachineUserTemStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/machineUserTem/upstatebykey', domaimInfo)
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
        message: '更新成员指纹信息状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getMachineUserTemList()
    },
    addMachineUserTemDVClose() {
      this.$refs.addMachineUserTemFormRef.resetFields()
    },
    async addMachineUserTemBtn() {
      const { data: res } = await this.$http.post('/api/machineUserTem/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addMachineUserTemForm = res.data
      this.addMachineUserTemForm.projectId = this.projectId
      this.addMachineUserTemDV = true
    },
    addMachineUserTem() {
      this.$refs.addMachineUserTemFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserTem/add', this.addMachineUserTemForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addMachineUserTemDV = false
        this.getMachineUserTemList()
      })
    },
    editMachineUserTemDVClose() {
      this.$refs.editMachineUserTemFormRef.resetFields()
    },
    handleClose() {

    },
    async editMachineUserTemDVShow(id) {
      this.editMachineUserTemDV = true
      this.editMachineUserTemForm.id = id
      const { data: res } = await this.$http.post('/api/machineUserTem/getbykey', this.editMachineUserTemForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editMachineUserTemForm = res.data
    },
    editMachineUserTem() {
      this.$refs.editMachineUserTemFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserTem/upbykey', this.editMachineUserTemForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editMachineUserTemDV = false
        this.getMachineUserTemList()
        this.$message.success(res.message)
      })
    },
    delMachineUserTemById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/machineUserTem/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getMachineUserTemList()
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
