<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员排班变化信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addUserScheduleChangeDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加成员排班变化信息</el-button>
      </div>
      <el-table :data="UserScheduleChangeList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="排班编码" prop="scheduleCode"></el-table-column>
        <el-table-column label="序号" prop="attSeqence"></el-table-column>
        <el-table-column label="上班卡开始打卡时间" prop="stratTimeS"></el-table-column>
        <el-table-column label="该班次上班时间" prop="stratTime"></el-table-column>
        <el-table-column label="上班迟到时间" prop="startTimeLate"></el-table-column>
        <el-table-column label="上班旷工时间" prop="startTimeWild"></el-table-column>
        <el-table-column label="上班卡结束打卡时间" prop="stratTimeE"></el-table-column>
        <el-table-column label="下班开始打卡时间" prop="endTimeS"></el-table-column>
        <el-table-column label="下班旷工时间" prop="endTimeWild"></el-table-column>
        <el-table-column label="下班早退时间" prop="endTimeLeav"></el-table-column>
        <el-table-column label="该班次下班时间" prop="endTime"></el-table-column>
        <el-table-column label="下班结束打卡时间" prop="endTimeE"></el-table-column>
        <el-table-column label="弹性上班时间" prop="stratTimeElastic"></el-table-column>
        <el-table-column label="弹性下班时间" prop="endTimeElastic"></el-table-column>
        <el-table-column label="上班是否需要刷卡" prop="isNeedS"></el-table-column>
        <el-table-column label="下班是否需要刷卡" prop="isNeedE"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="UserScheduleChangeStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserScheduleChangeDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserScheduleChangeById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加成员排班变化信息" :visible.sync="addUserScheduleChangeDV" width="750px" :before-close="handleClose" @close="addUserScheduleChangeDVClose">
      <el-form inline :model="addUserScheduleChangeForm" :rules="addUserScheduleChangeFormRules" ref="addUserScheduleChangeFormRef" label-width="120px" size="small">
        <el-form-item label="排班编码" prop="scheduleCode">
          <el-input v-model="addUserScheduleChangeForm.scheduleCode"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="attSeqence">
          <el-input v-model="addUserScheduleChangeForm.attSeqence"></el-input>
        </el-form-item>
        <el-form-item label="上班卡开始打卡时间" prop="stratTimeS">
          <el-input v-model="addUserScheduleChangeForm.stratTimeS"></el-input>
        </el-form-item>
        <el-form-item label="该班次上班时间" prop="stratTime">
          <el-input v-model="addUserScheduleChangeForm.stratTime"></el-input>
        </el-form-item>
        <el-form-item label="上班迟到时间" prop="startTimeLate">
          <el-input v-model="addUserScheduleChangeForm.startTimeLate"></el-input>
        </el-form-item>
        <el-form-item label="上班旷工时间" prop="startTimeWild">
          <el-input v-model="addUserScheduleChangeForm.startTimeWild"></el-input>
        </el-form-item>
        <el-form-item label="上班卡结束打卡时间" prop="stratTimeE">
          <el-input v-model="addUserScheduleChangeForm.stratTimeE"></el-input>
        </el-form-item>
        <el-form-item label="下班开始打卡时间" prop="endTimeS">
          <el-input v-model="addUserScheduleChangeForm.endTimeS"></el-input>
        </el-form-item>
        <el-form-item label="下班旷工时间" prop="endTimeWild">
          <el-input v-model="addUserScheduleChangeForm.endTimeWild"></el-input>
        </el-form-item>
        <el-form-item label="下班早退时间" prop="endTimeLeav">
          <el-input v-model="addUserScheduleChangeForm.endTimeLeav"></el-input>
        </el-form-item>
        <el-form-item label="该班次下班时间" prop="endTime">
          <el-input v-model="addUserScheduleChangeForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="下班结束打卡时间" prop="endTimeE">
          <el-input v-model="addUserScheduleChangeForm.endTimeE"></el-input>
        </el-form-item>
        <el-form-item label="弹性上班时间" prop="stratTimeElastic">
          <el-input v-model="addUserScheduleChangeForm.stratTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="弹性下班时间" prop="endTimeElastic">
          <el-input v-model="addUserScheduleChangeForm.endTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="上班是否需要刷卡" prop="isNeedS">
          <el-input v-model="addUserScheduleChangeForm.isNeedS"></el-input>
        </el-form-item>
        <el-form-item label="下班是否需要刷卡" prop="isNeedE">
          <el-input v-model="addUserScheduleChangeForm.isNeedE"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserScheduleChangeDV = false">取 消</el-button>
        <el-button type="primary" @click="addUserScheduleChange">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑成员排班变化信息" :visible.sync="editUserScheduleChangeDV" width="750px" @close="editUserScheduleChangeDVClose">
      <el-form inline :model="editUserScheduleChangeForm" :rules="editUserScheduleChangeFormRules" ref="editUserScheduleChangeFormRef" label-width="120px" size="small">
        <el-form-item label="排班编码" prop="scheduleCode">
          <el-input v-model="editUserScheduleChangeForm.scheduleCode"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="attSeqence">
          <el-input v-model="editUserScheduleChangeForm.attSeqence"></el-input>
        </el-form-item>
        <el-form-item label="上班卡开始打卡时间" prop="stratTimeS">
          <el-input v-model="editUserScheduleChangeForm.stratTimeS"></el-input>
        </el-form-item>
        <el-form-item label="该班次上班时间" prop="stratTime">
          <el-input v-model="editUserScheduleChangeForm.stratTime"></el-input>
        </el-form-item>
        <el-form-item label="上班迟到时间" prop="startTimeLate">
          <el-input v-model="editUserScheduleChangeForm.startTimeLate"></el-input>
        </el-form-item>
        <el-form-item label="上班旷工时间" prop="startTimeWild">
          <el-input v-model="editUserScheduleChangeForm.startTimeWild"></el-input>
        </el-form-item>
        <el-form-item label="上班卡结束打卡时间" prop="stratTimeE">
          <el-input v-model="editUserScheduleChangeForm.stratTimeE"></el-input>
        </el-form-item>
        <el-form-item label="下班开始打卡时间" prop="endTimeS">
          <el-input v-model="editUserScheduleChangeForm.endTimeS"></el-input>
        </el-form-item>
        <el-form-item label="下班旷工时间" prop="endTimeWild">
          <el-input v-model="editUserScheduleChangeForm.endTimeWild"></el-input>
        </el-form-item>
        <el-form-item label="下班早退时间" prop="endTimeLeav">
          <el-input v-model="editUserScheduleChangeForm.endTimeLeav"></el-input>
        </el-form-item>
        <el-form-item label="该班次下班时间" prop="endTime">
          <el-input v-model="editUserScheduleChangeForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="下班结束打卡时间" prop="endTimeE">
          <el-input v-model="editUserScheduleChangeForm.endTimeE"></el-input>
        </el-form-item>
        <el-form-item label="弹性上班时间" prop="stratTimeElastic">
          <el-input v-model="editUserScheduleChangeForm.stratTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="弹性下班时间" prop="endTimeElastic">
          <el-input v-model="editUserScheduleChangeForm.endTimeElastic"></el-input>
        </el-form-item>
        <el-form-item label="上班是否需要刷卡" prop="isNeedS">
          <el-input v-model="editUserScheduleChangeForm.isNeedS"></el-input>
        </el-form-item>
        <el-form-item label="下班是否需要刷卡" prop="isNeedE">
          <el-input v-model="editUserScheduleChangeForm.isNeedE"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserScheduleChangeDV = false">取 消</el-button>
        <el-button type="primary" @click="editUserScheduleChange">确 定</el-button>
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
      UserScheduleChangeList: null,
      addUserScheduleChangeDV: false,
      addUserScheduleChangeForm: {
        scheduleCode: '',
        attSeqence: '',
        stratTimeS: '',
        stratTime: '',
        startTimeLate: '',
        startTimeWild: '',
        stratTimeE: '',
        endTimeS: '',
        endTimeWild: '',
        endTimeLeav: '',
        endTime: '',
        endTimeE: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        isNeedS: '',
        isNeedE: ''
      },
      addUserScheduleChangeFormRules: {
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attSeqence: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTimeS: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        startTimeLate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        startTimeWild: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTimeE: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeS: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeWild: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeLeav: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeE: [
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
        isNeedS: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isNeedE: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editUserScheduleChangeDV: false,
      editUserScheduleChangeForm: {
        scheduleCode: '',
        attSeqence: '',
        stratTimeS: '',
        stratTime: '',
        startTimeLate: '',
        startTimeWild: '',
        stratTimeE: '',
        endTimeS: '',
        endTimeWild: '',
        endTimeLeav: '',
        endTime: '',
        endTimeE: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        isNeedS: '',
        isNeedE: ''
      },
      editUserScheduleChangeFormRules: {
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attSeqence: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTimeS: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        startTimeLate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        startTimeWild: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        stratTimeE: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeS: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeWild: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeLeav: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        endTimeE: [
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
        isNeedS: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isNeedE: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserScheduleChangeList()
  },
  methods: {
    async getUserScheduleChangeList() {
      const { data: res } = await this.$http.post('/api/userScheduleChange/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.UserScheduleChangeList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getUserScheduleChangeList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getUserScheduleChangeList()
    },
    async UserScheduleChangeStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/userScheduleChange/upstatebykey', domaimInfo)
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
        message: '更新成员排班变化信息状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getUserScheduleChangeList()
    },
    addUserScheduleChangeDVClose() {
      this.$refs.addUserScheduleChangeFormRef.resetFields()
    },
    async addUserScheduleChangeBtn() {
      const { data: res } = await this.$http.post('/api/userScheduleChange/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addUserScheduleChangeForm = res.data
      this.addUserScheduleChangeForm.projectId = this.projectId
      this.addUserScheduleChangeDV = true
    },
    addUserScheduleChange() {
      this.$refs.addUserScheduleChangeFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userScheduleChange/add', this.addUserScheduleChangeForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addUserScheduleChangeDV = false
        this.getUserScheduleChangeList()
      })
    },
    editUserScheduleChangeDVClose() {
      this.$refs.editUserScheduleChangeFormRef.resetFields()
    },
    handleClose() {

    },
    async editUserScheduleChangeDVShow(id) {
      this.editUserScheduleChangeDV = true
      this.editUserScheduleChangeForm.id = id
      const { data: res } = await this.$http.post('/api/userScheduleChange/getbykey', this.editUserScheduleChangeForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editUserScheduleChangeForm = res.data
    },
    editUserScheduleChange() {
      this.$refs.editUserScheduleChangeFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userScheduleChange/upbykey', this.editUserScheduleChangeForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editUserScheduleChangeDV = false
        this.getUserScheduleChangeList()
        this.$message.success(res.message)
      })
    },
    delUserScheduleChangeById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/userScheduleChange/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserScheduleChangeList()
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
