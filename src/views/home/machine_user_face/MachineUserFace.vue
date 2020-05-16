<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤机内人脸信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addMachineUserFaceDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤机内人脸信息</el-button>
      </div>
      <el-table :data="MachineUserFaceList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="设备编码" prop="machineCode"></el-table-column>
        <el-table-column label="指纹编号" prop="fingerIndex"></el-table-column>
        <el-table-column label="指纹信息" prop="tmpData"></el-table-column>
        <el-table-column label="指纹码长" prop="tmpLength"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="成员编码" prop="empMdmCode"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="MachineUserFaceStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMachineUserFaceDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delMachineUserFaceById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤机内人脸信息" :visible.sync="addMachineUserFaceDV" width="750px" :before-close="handleClose" @close="addMachineUserFaceDVClose">
      <el-form inline :model="addMachineUserFaceForm" :rules="addMachineUserFaceFormRules" ref="addMachineUserFaceFormRef" label-width="120px" size="small">
        <el-form-item label="设备编码" prop="machineCode">
          <el-input v-model="addMachineUserFaceForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="指纹编号" prop="fingerIndex">
          <el-input v-model="addMachineUserFaceForm.fingerIndex"></el-input>
        </el-form-item>
        <el-form-item label="指纹信息" prop="tmpData">
          <el-input v-model="addMachineUserFaceForm.tmpData"></el-input>
        </el-form-item>
        <el-form-item label="指纹码长" prop="tmpLength">
          <el-input v-model="addMachineUserFaceForm.tmpLength"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addMachineUserFaceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="addMachineUserFaceForm.empMdmCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMachineUserFaceDV = false">取 消</el-button>
        <el-button type="primary" @click="addMachineUserFace">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤机内人脸信息" :visible.sync="editMachineUserFaceDV" width="750px" @close="editMachineUserFaceDVClose">
      <el-form inline :model="editMachineUserFaceForm" :rules="editMachineUserFaceFormRules" ref="editMachineUserFaceFormRef" label-width="120px" size="small">
        <el-form-item label="设备编码" prop="machineCode">
          <el-input v-model="editMachineUserFaceForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="指纹编号" prop="fingerIndex">
          <el-input v-model="editMachineUserFaceForm.fingerIndex"></el-input>
        </el-form-item>
        <el-form-item label="指纹信息" prop="tmpData">
          <el-input v-model="editMachineUserFaceForm.tmpData"></el-input>
        </el-form-item>
        <el-form-item label="指纹码长" prop="tmpLength">
          <el-input v-model="editMachineUserFaceForm.tmpLength"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editMachineUserFaceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="editMachineUserFaceForm.empMdmCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMachineUserFaceDV = false">取 消</el-button>
        <el-button type="primary" @click="editMachineUserFace">确 定</el-button>
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
      MachineUserFaceList: null,
      addMachineUserFaceDV: false,
      addMachineUserFaceForm: {
        machineCode: '',
        fingerIndex: '',
        tmpData: '',
        tmpLength: '',
        name: '',
        empMdmCode: ''
      },
      addMachineUserFaceFormRules: {
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
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editMachineUserFaceDV: false,
      editMachineUserFaceForm: {
        machineCode: '',
        fingerIndex: '',
        tmpData: '',
        tmpLength: '',
        name: '',
        empMdmCode: ''
      },
      editMachineUserFaceFormRules: {
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
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMachineUserFaceList()
  },
  methods: {
    async getMachineUserFaceList() {
      const { data: res } = await this.$http.post('/api/machineUserFace/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.MachineUserFaceList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getMachineUserFaceList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getMachineUserFaceList()
    },
    async MachineUserFaceStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/machineUserFace/upstatebykey', domaimInfo)
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
        message: '更新考勤机内人脸信息状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getMachineUserFaceList()
    },
    addMachineUserFaceDVClose() {
      this.$refs.addMachineUserFaceFormRef.resetFields()
    },
    async addMachineUserFaceBtn() {
      const { data: res } = await this.$http.post('/api/machineUserFace/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addMachineUserFaceForm = res.data
      this.addMachineUserFaceForm.projectId = this.projectId
      this.addMachineUserFaceDV = true
    },
    addMachineUserFace() {
      this.$refs.addMachineUserFaceFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserFace/add', this.addMachineUserFaceForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addMachineUserFaceDV = false
        this.getMachineUserFaceList()
      })
    },
    editMachineUserFaceDVClose() {
      this.$refs.editMachineUserFaceFormRef.resetFields()
    },
    handleClose() {

    },
    async editMachineUserFaceDVShow(id) {
      this.editMachineUserFaceDV = true
      this.editMachineUserFaceForm.id = id
      const { data: res } = await this.$http.post('/api/machineUserFace/getbykey', this.editMachineUserFaceForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editMachineUserFaceForm = res.data
    },
    editMachineUserFace() {
      this.$refs.editMachineUserFaceFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserFace/upbykey', this.editMachineUserFaceForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editMachineUserFaceDV = false
        this.getMachineUserFaceList()
        this.$message.success(res.message)
      })
    },
    delMachineUserFaceById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/machineUserFace/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getMachineUserFaceList()
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
