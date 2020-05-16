<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤机内指纹信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addMachineUserInfoDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤机内指纹信息</el-button>
      </div>
      <el-table :data="MachineUserInfoList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="权限级别" prop="priviLege"></el-table-column>
        <el-table-column label="主数据编码" prop="empMdmCode"></el-table-column>
        <el-table-column label="考勤机编码" prop="machineCode"></el-table-column>
        <el-table-column label="是否考勤" prop="noNeedAtt"></el-table-column>
        <el-table-column label="手机打卡" prop="phoneAbleAtt"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="MachineUserInfoStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMachineUserInfoDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delMachineUserInfoById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤机内指纹信息" :visible.sync="addMachineUserInfoDV" width="750px" :before-close="handleClose" @close="addMachineUserInfoDVClose">
      <el-form inline :model="addMachineUserInfoForm" :rules="addMachineUserInfoFormRules" ref="addMachineUserInfoFormRef" label-width="120px" size="small">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addMachineUserInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addMachineUserInfoForm.password"></el-input>
        </el-form-item>
        <el-form-item label="权限级别" prop="priviLege">
          <el-input v-model="addMachineUserInfoForm.priviLege"></el-input>
        </el-form-item>
        <el-form-item label="主数据编码" prop="empMdmCode">
          <el-input v-model="addMachineUserInfoForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="考勤机编码" prop="machineCode">
          <el-input v-model="addMachineUserInfoForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="是否考勤" prop="noNeedAtt">
          <el-input v-model="addMachineUserInfoForm.noNeedAtt"></el-input>
        </el-form-item>
        <el-form-item label="手机打卡" prop="phoneAbleAtt">
          <el-input v-model="addMachineUserInfoForm.phoneAbleAtt"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMachineUserInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="addMachineUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤机内指纹信息" :visible.sync="editMachineUserInfoDV" width="750px" @close="editMachineUserInfoDVClose">
      <el-form inline :model="editMachineUserInfoForm" :rules="editMachineUserInfoFormRules" ref="editMachineUserInfoFormRef" label-width="120px" size="small">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editMachineUserInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editMachineUserInfoForm.password"></el-input>
        </el-form-item>
        <el-form-item label="权限级别" prop="priviLege">
          <el-input v-model="editMachineUserInfoForm.priviLege"></el-input>
        </el-form-item>
        <el-form-item label="主数据编码" prop="empMdmCode">
          <el-input v-model="editMachineUserInfoForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="考勤机编码" prop="machineCode">
          <el-input v-model="editMachineUserInfoForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="是否考勤" prop="noNeedAtt">
          <el-input v-model="editMachineUserInfoForm.noNeedAtt"></el-input>
        </el-form-item>
        <el-form-item label="手机打卡" prop="phoneAbleAtt">
          <el-input v-model="editMachineUserInfoForm.phoneAbleAtt"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMachineUserInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="editMachineUserInfo">确 定</el-button>
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
      MachineUserInfoList: null,
      addMachineUserInfoDV: false,
      addMachineUserInfoForm: {
        name: '',
        password: '',
        priviLege: '',
        empMdmCode: '',
        machineCode: '',
        noNeedAtt: '',
        phoneAbleAtt: ''
      },
      addMachineUserInfoFormRules: {
        name: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        priviLege: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        machineCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        noNeedAtt: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        phoneAbleAtt: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editMachineUserInfoDV: false,
      editMachineUserInfoForm: {
        name: '',
        password: '',
        priviLege: '',
        empMdmCode: '',
        machineCode: '',
        noNeedAtt: '',
        phoneAbleAtt: ''
      },
      editMachineUserInfoFormRules: {
        name: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        priviLege: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        machineCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        noNeedAtt: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        phoneAbleAtt: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMachineUserInfoList()
  },
  methods: {
    async getMachineUserInfoList() {
      const { data: res } = await this.$http.post('/api/machineUserInfo/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.MachineUserInfoList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getMachineUserInfoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getMachineUserInfoList()
    },
    async MachineUserInfoStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/machineUserInfo/upstatebykey', domaimInfo)
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
        message: '更新考勤机内指纹信息状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getMachineUserInfoList()
    },
    addMachineUserInfoDVClose() {
      this.$refs.addMachineUserInfoFormRef.resetFields()
    },
    async addMachineUserInfoBtn() {
      const { data: res } = await this.$http.post('/api/machineUserInfo/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addMachineUserInfoForm = res.data
      this.addMachineUserInfoForm.projectId = this.projectId
      this.addMachineUserInfoDV = true
    },
    addMachineUserInfo() {
      this.$refs.addMachineUserInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserInfo/add', this.addMachineUserInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addMachineUserInfoDV = false
        this.getMachineUserInfoList()
      })
    },
    editMachineUserInfoDVClose() {
      this.$refs.editMachineUserInfoFormRef.resetFields()
    },
    handleClose() {

    },
    async editMachineUserInfoDVShow(id) {
      this.editMachineUserInfoDV = true
      this.editMachineUserInfoForm.id = id
      const { data: res } = await this.$http.post('/api/machineUserInfo/getbykey', this.editMachineUserInfoForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editMachineUserInfoForm = res.data
    },
    editMachineUserInfo() {
      this.$refs.editMachineUserInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineUserInfo/upbykey', this.editMachineUserInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editMachineUserInfoDV = false
        this.getMachineUserInfoList()
        this.$message.success(res.message)
      })
    },
    delMachineUserInfoById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/machineUserInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getMachineUserInfoList()
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
