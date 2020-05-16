<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤系统专有信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addUserAttAppInfoDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤系统专有信息管理</el-button>
      </div>
      <el-table :data="UserAttAppInfoList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="人员主数据码" prop="empMdmCode"></el-table-column>
        <el-table-column label="排班code" prop="scheduleCode"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="UserAttAppInfoStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserAttAppInfoDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserAttAppInfoById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤系统专有信息管理" :visible.sync="addUserAttAppInfoDV" width="750px" :before-close="handleClose" @close="addUserAttAppInfoDVClose">
      <el-form inline :model="addUserAttAppInfoForm" :rules="addUserAttAppInfoFormRules" ref="addUserAttAppInfoFormRef" label-width="120px" size="small">
        <el-form-item label="人员主数据码" prop="empMdmCode">
          <el-input v-model="addUserAttAppInfoForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班code" prop="scheduleCode">
          <el-input v-model="addUserAttAppInfoForm.scheduleCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserAttAppInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="addUserAttAppInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤系统专有信息管理" :visible.sync="editUserAttAppInfoDV" width="750px" @close="editUserAttAppInfoDVClose">
      <el-form inline :model="editUserAttAppInfoForm" :rules="editUserAttAppInfoFormRules" ref="editUserAttAppInfoFormRef" label-width="120px" size="small">
        <el-form-item label="人员主数据码" prop="empMdmCode">
          <el-input v-model="editUserAttAppInfoForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班code" prop="scheduleCode">
          <el-input v-model="editUserAttAppInfoForm.scheduleCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserAttAppInfoDV = false">取 消</el-button>
        <el-button type="primary" @click="editUserAttAppInfo">确 定</el-button>
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
      UserAttAppInfoList: null,
      addUserAttAppInfoDV: false,
      addUserAttAppInfoForm: {
        empMdmCode: '',
        scheduleCode: ''
      },
      addUserAttAppInfoFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editUserAttAppInfoDV: false,
      editUserAttAppInfoForm: {
        empMdmCode: '',
        scheduleCode: ''
      },
      editUserAttAppInfoFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserAttAppInfoList()
  },
  methods: {
    async getUserAttAppInfoList() {
      const { data: res } = await this.$http.post('/api/userAttAppInfo/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.UserAttAppInfoList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getUserAttAppInfoList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getUserAttAppInfoList()
    },
    async UserAttAppInfoStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/userAttAppInfo/upstatebykey', domaimInfo)
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
        message: '更新考勤系统专有信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getUserAttAppInfoList()
    },
    addUserAttAppInfoDVClose() {
      this.$refs.addUserAttAppInfoFormRef.resetFields()
    },
    async addUserAttAppInfoBtn() {
      const { data: res } = await this.$http.post('/api/userAttAppInfo/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addUserAttAppInfoForm = res.data
      this.addUserAttAppInfoForm.projectId = this.projectId
      this.addUserAttAppInfoDV = true
    },
    addUserAttAppInfo() {
      this.$refs.addUserAttAppInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userAttAppInfo/add', this.addUserAttAppInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addUserAttAppInfoDV = false
        this.getUserAttAppInfoList()
      })
    },
    editUserAttAppInfoDVClose() {
      this.$refs.editUserAttAppInfoFormRef.resetFields()
    },
    handleClose() {

    },
    async editUserAttAppInfoDVShow(id) {
      this.editUserAttAppInfoDV = true
      this.editUserAttAppInfoForm.id = id
      const { data: res } = await this.$http.post('/api/userAttAppInfo/getbykey', this.editUserAttAppInfoForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editUserAttAppInfoForm = res.data
    },
    editUserAttAppInfo() {
      this.$refs.editUserAttAppInfoFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userAttAppInfo/upbykey', this.editUserAttAppInfoForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editUserAttAppInfoDV = false
        this.getUserAttAppInfoList()
        this.$message.success(res.message)
      })
    },
    delUserAttAppInfoById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/userAttAppInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserAttAppInfoList()
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
