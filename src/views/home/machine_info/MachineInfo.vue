<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addMachineInfoDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加设备信息管理</el-button>
      </div>
      <el-table :data="MachineInfoList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="考勤机编码" prop="machineCode"></el-table-column>
        <el-table-column label="考勤机型号" prop="model"></el-table-column>
        <el-table-column label="考勤机安装地址" prop="address"></el-table-column>
        <el-table-column label="ip" prop="ip"></el-table-column>
        <el-table-column label="端口号" prop="port"></el-table-column>
        <el-table-column label="所在公司" prop="company"></el-table-column>
        <el-table-column label="所在部门" prop="department"></el-table-column>
        <el-table-column label="负责人" prop="mperson"></el-table-column>
        <el-table-column label="负责人电话" prop="mpersonTel"></el-table-column>
        <el-table-column label="是否显示" prop="isShow"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="MachineInfoStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMachineInfoDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delMachineInfoById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加设备信息管理" :visible.sync="addMachineInfoDV" width="750px" :before-close="handleClose" @close="addMachineInfoDVClose">
      <el-form inline :model="addMachineInfoForm" :rules="addMachineInfoFormRules" ref="addMachineInfoFormRef" label-width="120px" size="small">
        <el-form-item label="考勤机编码" prop="machineCode">
          <el-input v-model="addMachineInfoForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="考勤机型号" prop="model">
          <el-input v-model="addMachineInfoForm.model"></el-input>
        </el-form-item>
        <el-form-item label="考勤机安装地址" prop="address">
          <el-input v-model="addMachineInfoForm.address"></el-input>
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input v-model="addMachineInfoForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="addMachineInfoForm.port"></el-input>
        </el-form-item>
        <el-form-item label="所在公司" prop="company">
          <el-input v-model="addMachineInfoForm.company"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="department">
          <el-input v-model="addMachineInfoForm.department"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="mperson">
          <el-input v-model="addMachineInfoForm.mperson"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="mpersonTel">
          <el-input v-model="addMachineInfoForm.mpersonTel"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="addMachineInfoForm.isShow"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMachineInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="addMachineInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑设备信息管理" :visible.sync="editMachineInfoDV" width="750px" @close="editMachineInfoDVClose">
      <el-form inline :model="editMachineInfoForm" :rules="editMachineInfoFormRules" ref="editMachineInfoFormRef" label-width="120px" size="small">
        <el-form-item label="考勤机编码" prop="machineCode">
          <el-input v-model="editMachineInfoForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="考勤机型号" prop="model">
          <el-input v-model="editMachineInfoForm.model"></el-input>
        </el-form-item>
        <el-form-item label="考勤机安装地址" prop="address">
          <el-input v-model="editMachineInfoForm.address"></el-input>
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input v-model="editMachineInfoForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="editMachineInfoForm.port"></el-input>
        </el-form-item>
        <el-form-item label="所在公司" prop="company">
          <el-input v-model="editMachineInfoForm.company"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="department">
          <el-input v-model="editMachineInfoForm.department"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="mperson">
          <el-input v-model="editMachineInfoForm.mperson"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="mpersonTel">
          <el-input v-model="editMachineInfoForm.mpersonTel"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="editMachineInfoForm.isShow"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMachineInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="editMachineInfo">确 定</el-button>
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
      MachineInfoList: null,
      addMachineInfoDV: false,
      addMachineInfoForm: {
        machineCode: '',
        model: '',
        address: '',
        ip: '',
        port: '',
        company: '',
        department: '',
        mperson: '',
        mpersonTel: '',
        isShow: ''
      },
      addMachineInfoFormRules: {
        machineCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        mperson: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        mpersonTel: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isShow: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editMachineInfoDV: false,
      editMachineInfoForm: {
        machineCode: '',
        model: '',
        address: '',
        ip: '',
        port: '',
        company: '',
        department: '',
        mperson: '',
        mpersonTel: '',
        isShow: ''
      },
      editMachineInfoFormRules: {
        machineCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        mperson: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        mpersonTel: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isShow: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMachineInfoList()
  },
  methods: {
    async getMachineInfoList() {
      const { data: res } = await this.$http.post('/api/machineInfo/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.MachineInfoList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getMachineInfoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getMachineInfoList()
    },
    async MachineInfoStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/machineInfo/upstatebykey', domaimInfo)
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
        message: '更新设备信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getMachineInfoList()
    },
    addMachineInfoDVClose() {
      this.$refs.addMachineInfoFormRef.resetFields()
    },
    async addMachineInfoBtn() {
      const { data: res } = await this.$http.post('/api/machineInfo/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addMachineInfoForm = res.data
      this.addMachineInfoForm.projectId = this.projectId
      this.addMachineInfoDV = true
    },
    addMachineInfo() {
      this.$refs.addMachineInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineInfo/add', this.addMachineInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addMachineInfoDV = false
        this.getMachineInfoList()
      })
    },
    editMachineInfoDVClose() {
      this.$refs.editMachineInfoFormRef.resetFields()
    },
    handleClose() {

    },
    async editMachineInfoDVShow(id) {
      this.editMachineInfoDV = true
      this.editMachineInfoForm.id = id
      const { data: res } = await this.$http.post('/api/machineInfo/getbykey', this.editMachineInfoForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editMachineInfoForm = res.data
    },
    editMachineInfo() {
      this.$refs.editMachineInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/machineInfo/upbykey', this.editMachineInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editMachineInfoDV = false
        this.getMachineInfoList()
        this.$message.success(res.message)
      })
    },
    delMachineInfoById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/machineInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getMachineInfoList()
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
