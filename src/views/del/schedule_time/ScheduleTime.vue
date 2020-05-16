<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>排班时间</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addScheduleTimeDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加排班时间</el-button>
      </div>
      <el-table :data="ScheduleTimeList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="排班编码id" prop="scheduleId"></el-table-column>
        <el-table-column label="序号" prop="attSeqence"></el-table-column>
        <el-table-column label="上班时间" prop="signInTime"></el-table-column>
        <el-table-column label="下班时间" prop="signOutTime"></el-table-column>
        <el-table-column label="开始打卡时间" prop="stratTime"></el-table-column>
        <el-table-column label="结束打卡时间" prop="endTime"></el-table-column>
        <el-table-column label="弹性上班时间" prop="stratTimeElastic"></el-table-column>
        <el-table-column label="弹性下班时间" prop="endTimeElastic"></el-table-column>
        <el-table-column label="上班是否需要刷卡" prop="needSignIn"></el-table-column>
        <el-table-column label="下班是否需要刷卡" prop="needSignOut"></el-table-column>
        <el-table-column label="是否跨天" prop="across"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="ScheduleTimeStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editScheduleTimeDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delScheduleTimeById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加排班时间" :visible.sync="addScheduleTimeDV" width="750px" :before-close="handleClose" @close="addScheduleTimeDVClose">
      <el-form inline :model="addScheduleTimeForm" :rules="addScheduleTimeFormRules" ref="addScheduleTimeFormRef" label-width="120px" size="small">
        <el-form-item label="排班编码id" prop="scheduleId">
          <el-input v-model="addScheduleTimeForm.scheduleId"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="attSeqence">
          <el-input v-model="addScheduleTimeForm.attSeqence"></el-input>
        </el-form-item>
        <el-form-item label="上班时间" prop="signInTime">
          <el-input v-model="addScheduleTimeForm.signInTime"></el-input>
        </el-form-item>
        <el-form-item label="下班时间" prop="signOutTime">
          <el-input v-model="addScheduleTimeForm.signOutTime"></el-input>
        </el-form-item>
        <el-form-item label="开始打卡时间" prop="stratTime">
          <el-input v-model="addScheduleTimeForm.stratTime"></el-input>
        </el-form-item>
        <el-form-item label="结束打卡时间" prop="endTime">
          <el-input v-model="addScheduleTimeForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="弹性上班时间" prop="stratTimeElastic">
          <el-input v-model="addScheduleTimeForm.stratTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="弹性下班时间" prop="endTimeElastic">
          <el-input v-model="addScheduleTimeForm.endTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="上班是否需要刷卡" prop="needSignIn">
          <el-input v-model="addScheduleTimeForm.needSignIn"></el-input>
        </el-form-item>
        <el-form-item label="下班是否需要刷卡" prop="needSignOut">
          <el-input v-model="addScheduleTimeForm.needSignOut"></el-input>
        </el-form-item>
        <el-form-item label="是否跨天" prop="across">
          <el-input v-model="addScheduleTimeForm.across"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addScheduleTimeDV = false">取 消</el-button>
        <el-button type="primary" @click="addScheduleTime">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑排班时间" :visible.sync="editScheduleTimeDV" width="750px" @close="editScheduleTimeDVClose">
      <el-form inline :model="editScheduleTimeForm" :rules="editScheduleTimeFormRules" ref="editScheduleTimeFormRef" label-width="120px" size="small">
        <el-form-item label="排班编码id" prop="scheduleId">
          <el-input v-model="editScheduleTimeForm.scheduleId"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="attSeqence">
          <el-input v-model="editScheduleTimeForm.attSeqence"></el-input>
        </el-form-item>
        <el-form-item label="上班时间" prop="signInTime">
          <el-input v-model="editScheduleTimeForm.signInTime"></el-input>
        </el-form-item>
        <el-form-item label="下班时间" prop="signOutTime">
          <el-input v-model="editScheduleTimeForm.signOutTime"></el-input>
        </el-form-item>
        <el-form-item label="开始打卡时间" prop="stratTime">
          <el-input v-model="editScheduleTimeForm.stratTime"></el-input>
        </el-form-item>
        <el-form-item label="结束打卡时间" prop="endTime">
          <el-input v-model="editScheduleTimeForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="弹性上班时间" prop="stratTimeElastic">
          <el-input v-model="editScheduleTimeForm.stratTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="弹性下班时间" prop="endTimeElastic">
          <el-input v-model="editScheduleTimeForm.endTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="上班是否需要刷卡" prop="needSignIn">
          <el-input v-model="editScheduleTimeForm.needSignIn"></el-input>
        </el-form-item>
        <el-form-item label="下班是否需要刷卡" prop="needSignOut">
          <el-input v-model="editScheduleTimeForm.needSignOut"></el-input>
        </el-form-item>
        <el-form-item label="是否跨天" prop="across">
          <el-input v-model="editScheduleTimeForm.across"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editScheduleTimeDV = false">取 消</el-button>
        <el-button type="primary" @click="editScheduleTime">确 定</el-button>
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
      ScheduleTimeList: null,
      addScheduleTimeDV: false,
      addScheduleTimeForm: {
        scheduleId: '',
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '',
        needSignOut: '',
        across: ''
      },
      addScheduleTimeFormRules: {
        scheduleId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attSeqence: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        signInTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        signOutTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTimeElastic: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeElastic: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        needSignIn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        needSignOut: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        across: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editScheduleTimeDV: false,
      editScheduleTimeForm: {
        scheduleId: '',
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '',
        needSignOut: '',
        across: ''
      },
      editScheduleTimeFormRules: {
        scheduleId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attSeqence: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        signInTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        signOutTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTimeElastic: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeElastic: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        needSignIn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        needSignOut: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        across: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getScheduleTimeList()
  },
  methods: {
    async getScheduleTimeList() {
      const { data: res } = await this.$http.post('/api/scheduleTime/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.ScheduleTimeList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getScheduleTimeList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getScheduleTimeList()
    },
    async ScheduleTimeStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/scheduleTime/upstatebykey', domaimInfo)
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
        message: '更新排班时间状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getScheduleTimeList()
    },
    addScheduleTimeDVClose() {
      this.$refs.addScheduleTimeFormRef.resetFields()
    },
    async addScheduleTimeBtn() {
      const { data: res } = await this.$http.post('/api/scheduleTime/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addScheduleTimeForm = res.data
      this.addScheduleTimeForm.projectId = this.projectId
      this.addScheduleTimeDV = true
    },
    addScheduleTime() {
      this.$refs.addScheduleTimeFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/scheduleTime/add', this.addScheduleTimeForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addScheduleTimeDV = false
        this.getScheduleTimeList()
      })
    },
    editScheduleTimeDVClose() {
      this.$refs.editScheduleTimeFormRef.resetFields()
    },
    handleClose() {

    },
    async editScheduleTimeDVShow(id) {
      this.editScheduleTimeDV = true
      this.editScheduleTimeForm.id = id
      const { data: res } = await this.$http.post('/api/scheduleTime/getbykey', this.editScheduleTimeForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editScheduleTimeForm = res.data
    },
    editScheduleTime() {
      this.$refs.editScheduleTimeFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/scheduleTime/upbykey', this.editScheduleTimeForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editScheduleTimeDV = false
        this.getScheduleTimeList()
        this.$message.success(res.message)
      })
    },
    delScheduleTimeById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/scheduleTime/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getScheduleTimeList()
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
