<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假数据</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addEmpLeaveDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加请假数据</el-button>
      </div>
      <el-table :data="EmpLeaveList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="请假名称" prop="leaveName"></el-table-column>
        <el-table-column label="流水号" prop="bpmSerialNum"></el-table-column>
        <el-table-column label="员工code" prop="empMdmCode"></el-table-column>
        <el-table-column label="请假日期" prop="leaveDate"></el-table-column>
        <el-table-column label="请假状态" prop="leaveStatus"></el-table-column>
        <el-table-column label="开始时间" prop="leaveStartTime"></el-table-column>
        <el-table-column label="结束时间" prop="leaveEndTime"></el-table-column>
        <el-table-column label="请假内容" prop="leaveContent"></el-table-column>
        <el-table-column label="是否显示" prop="isShow"></el-table-column>
        <el-table-column label="是否归档" prop="isArchive"></el-table-column>
        <el-table-column label="是否取消" prop="isCancel"></el-table-column>
        <el-table-column label="流水id" prop="instanceId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="EmpLeaveStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editEmpLeaveDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delEmpLeaveById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加请假数据" :visible.sync="addEmpLeaveDV" width="750px" :before-close="handleClose" @close="addEmpLeaveDVClose">
      <el-form inline :model="addEmpLeaveForm" :rules="addEmpLeaveFormRules" ref="addEmpLeaveFormRef" label-width="120px" size="small">
        <el-form-item label="请假名称" prop="leaveName">
          <el-input v-model="addEmpLeaveForm.leaveName"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="bpmSerialNum">
          <el-input v-model="addEmpLeaveForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="addEmpLeaveForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="请假日期" prop="leaveDate">
          <el-input v-model="addEmpLeaveForm.leaveDate"></el-input>
        </el-form-item>
        <el-form-item label="请假状态" prop="leaveStatus">
          <el-input v-model="addEmpLeaveForm.leaveStatus"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="leaveStartTime">
          <el-input v-model="addEmpLeaveForm.leaveStartTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="leaveEndTime">
          <el-input v-model="addEmpLeaveForm.leaveEndTime"></el-input>
        </el-form-item>
        <el-form-item label="请假内容" prop="leaveContent">
          <el-input v-model="addEmpLeaveForm.leaveContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="addEmpLeaveForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="addEmpLeaveForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="addEmpLeaveForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="addEmpLeaveForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmpLeaveDV = false">取 消</el-button>
        <el-button type="primary" @click="addEmpLeave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑请假数据" :visible.sync="editEmpLeaveDV" width="750px" @close="editEmpLeaveDVClose">
      <el-form inline :model="editEmpLeaveForm" :rules="editEmpLeaveFormRules" ref="editEmpLeaveFormRef" label-width="120px" size="small">
        <el-form-item label="请假名称" prop="leaveName">
          <el-input v-model="editEmpLeaveForm.leaveName"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="bpmSerialNum">
          <el-input v-model="editEmpLeaveForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="editEmpLeaveForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="请假日期" prop="leaveDate">
          <el-input v-model="editEmpLeaveForm.leaveDate"></el-input>
        </el-form-item>
        <el-form-item label="请假状态" prop="leaveStatus">
          <el-input v-model="editEmpLeaveForm.leaveStatus"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="leaveStartTime">
          <el-input v-model="editEmpLeaveForm.leaveStartTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="leaveEndTime">
          <el-input v-model="editEmpLeaveForm.leaveEndTime"></el-input>
        </el-form-item>
        <el-form-item label="请假内容" prop="leaveContent">
          <el-input v-model="editEmpLeaveForm.leaveContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="editEmpLeaveForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="editEmpLeaveForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="editEmpLeaveForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="editEmpLeaveForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editEmpLeaveDV = false">取 消</el-button>
        <el-button type="primary" @click="editEmpLeave">确 定</el-button>
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
      EmpLeaveList: null,
      addEmpLeaveDV: false,
      addEmpLeaveForm: {
        leaveName: '',
        bpmSerialNum: '',
        empMdmCode: '',
        leaveDate: '',
        leaveStatus: '',
        leaveStartTime: '',
        leaveEndTime: '',
        leaveContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      addEmpLeaveFormRules: {
        leaveName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bpmSerialNum: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStartTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEndTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveContent: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isShow: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isArchive: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isCancel: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        instanceId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editEmpLeaveDV: false,
      editEmpLeaveForm: {
        leaveName: '',
        bpmSerialNum: '',
        empMdmCode: '',
        leaveDate: '',
        leaveStatus: '',
        leaveStartTime: '',
        leaveEndTime: '',
        leaveContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      editEmpLeaveFormRules: {
        leaveName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bpmSerialNum: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStartTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEndTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveContent: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isShow: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isArchive: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isCancel: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        instanceId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmpLeaveList()
  },
  methods: {
    async getEmpLeaveList() {
      const { data: res } = await this.$http.post('/api/empLeave/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.EmpLeaveList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getEmpLeaveList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getEmpLeaveList()
    },
    async EmpLeaveStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/empLeave/upstatebykey', domaimInfo)
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
        message: '更新请假数据状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getEmpLeaveList()
    },
    addEmpLeaveDVClose() {
      this.$refs.addEmpLeaveFormRef.resetFields()
    },
    async addEmpLeaveBtn() {
      const { data: res } = await this.$http.post('/api/empLeave/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addEmpLeaveForm = res.data
      this.addEmpLeaveForm.projectId = this.projectId
      this.addEmpLeaveDV = true
    },
    addEmpLeave() {
      this.$refs.addEmpLeaveFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empLeave/add', this.addEmpLeaveForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addEmpLeaveDV = false
        this.getEmpLeaveList()
      })
    },
    editEmpLeaveDVClose() {
      this.$refs.editEmpLeaveFormRef.resetFields()
    },
    handleClose() {

    },
    async editEmpLeaveDVShow(id) {
      this.editEmpLeaveDV = true
      this.editEmpLeaveForm.id = id
      const { data: res } = await this.$http.post('/api/empLeave/getbykey', this.editEmpLeaveForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editEmpLeaveForm = res.data
    },
    editEmpLeave() {
      this.$refs.editEmpLeaveFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empLeave/upbykey', this.editEmpLeaveForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editEmpLeaveDV = false
        this.getEmpLeaveList()
        this.$message.success(res.message)
      })
    },
    delEmpLeaveById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/empLeave/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getEmpLeaveList()
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
