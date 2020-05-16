<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>wifi信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addWifiInfoDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加wifi信息管理</el-button>
      </div>
      <el-table :data="WifiInfoList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="设备编码" prop="machineCode"></el-table-column>
        <el-table-column label="设备型号" prop="model"></el-table-column>
        <el-table-column label="安装地址" prop="address"></el-table-column>
        <el-table-column label="mac地址" prop="mac"></el-table-column>
        <el-table-column label="ip地址" prop="ip"></el-table-column>
        <el-table-column label="端口号" prop="port"></el-table-column>
        <el-table-column label="使用公司" prop="company"></el-table-column>
        <el-table-column label="使用部门" prop="department"></el-table-column>
        <el-table-column label="负责人" prop="mperson"></el-table-column>
        <el-table-column label="负责人电话" prop="mpersonTel"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="WifiInfoStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editWifiInfoDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delWifiInfoById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加wifi信息管理" :visible.sync="addWifiInfoDV" width="750px" :before-close="handleClose" @close="addWifiInfoDVClose">
      <el-form inline :model="addWifiInfoForm" :rules="addWifiInfoFormRules" ref="addWifiInfoFormRef" label-width="120px" size="small">
        <el-form-item label="设备编码" prop="machineCode">
          <el-input v-model="addWifiInfoForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="addWifiInfoForm.model"></el-input>
        </el-form-item>
        <el-form-item label="安装地址" prop="address">
          <el-input v-model="addWifiInfoForm.address"></el-input>
        </el-form-item>
        <el-form-item label="mac地址" prop="mac">
          <el-input v-model="addWifiInfoForm.mac"></el-input>
        </el-form-item>
        <el-form-item label="ip地址" prop="ip">
          <el-input v-model="addWifiInfoForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="addWifiInfoForm.port"></el-input>
        </el-form-item>
        <el-form-item label="使用公司" prop="company">
          <el-input v-model="addWifiInfoForm.company"></el-input>
        </el-form-item>
        <el-form-item label="使用部门" prop="department">
          <el-input v-model="addWifiInfoForm.department"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="mperson">
          <el-input v-model="addWifiInfoForm.mperson"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="mpersonTel">
          <el-input v-model="addWifiInfoForm.mpersonTel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWifiInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="addWifiInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑wifi信息管理" :visible.sync="editWifiInfoDV" width="750px" @close="editWifiInfoDVClose">
      <el-form inline :model="editWifiInfoForm" :rules="editWifiInfoFormRules" ref="editWifiInfoFormRef" label-width="120px" size="small">
        <el-form-item label="设备编码" prop="machineCode">
          <el-input v-model="editWifiInfoForm.machineCode"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="model">
          <el-input v-model="editWifiInfoForm.model"></el-input>
        </el-form-item>
        <el-form-item label="安装地址" prop="address">
          <el-input v-model="editWifiInfoForm.address"></el-input>
        </el-form-item>
        <el-form-item label="mac地址" prop="mac">
          <el-input v-model="editWifiInfoForm.mac"></el-input>
        </el-form-item>
        <el-form-item label="ip地址" prop="ip">
          <el-input v-model="editWifiInfoForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input v-model="editWifiInfoForm.port"></el-input>
        </el-form-item>
        <el-form-item label="使用公司" prop="company">
          <el-input v-model="editWifiInfoForm.company"></el-input>
        </el-form-item>
        <el-form-item label="使用部门" prop="department">
          <el-input v-model="editWifiInfoForm.department"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="mperson">
          <el-input v-model="editWifiInfoForm.mperson"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="mpersonTel">
          <el-input v-model="editWifiInfoForm.mpersonTel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editWifiInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="editWifiInfo">确 定</el-button>
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
      WifiInfoList: null,
      addWifiInfoDV: false,
      addWifiInfoForm: {
        machineCode: '',
        model: '',
        address: '',
        mac: '',
        ip: '',
        port: '',
        company: '',
        department: '',
        mperson: '',
        mpersonTel: ''
      },
      addWifiInfoFormRules: {
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
        mac: [
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
        ]
      },
      editWifiInfoDV: false,
      editWifiInfoForm: {
        machineCode: '',
        model: '',
        address: '',
        mac: '',
        ip: '',
        port: '',
        company: '',
        department: '',
        mperson: '',
        mpersonTel: ''
      },
      editWifiInfoFormRules: {
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
        mac: [
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
        ]
      }
    }
  },
  created() {
    this.getWifiInfoList()
  },
  methods: {
    async getWifiInfoList() {
      const { data: res } = await this.$http.post('/api/wifiInfo/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.WifiInfoList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getWifiInfoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getWifiInfoList()
    },
    async WifiInfoStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/wifiInfo/upstatebykey', domaimInfo)
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
        message: '更新wifi信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getWifiInfoList()
    },
    addWifiInfoDVClose() {
      this.$refs.addWifiInfoFormRef.resetFields()
    },
    async addWifiInfoBtn() {
      const { data: res } = await this.$http.post('/api/wifiInfo/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addWifiInfoForm = res.data
      this.addWifiInfoForm.projectId = this.projectId
      this.addWifiInfoDV = true
    },
    addWifiInfo() {
      this.$refs.addWifiInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/wifiInfo/add', this.addWifiInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addWifiInfoDV = false
        this.getWifiInfoList()
      })
    },
    editWifiInfoDVClose() {
      this.$refs.editWifiInfoFormRef.resetFields()
    },
    handleClose() {

    },
    async editWifiInfoDVShow(id) {
      this.editWifiInfoDV = true
      this.editWifiInfoForm.id = id
      const { data: res } = await this.$http.post('/api/wifiInfo/getbykey', this.editWifiInfoForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editWifiInfoForm = res.data
    },
    editWifiInfo() {
      this.$refs.editWifiInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/wifiInfo/upbykey', this.editWifiInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editWifiInfoDV = false
        this.getWifiInfoList()
        this.$message.success(res.message)
      })
    },
    delWifiInfoById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/wifiInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getWifiInfoList()
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
