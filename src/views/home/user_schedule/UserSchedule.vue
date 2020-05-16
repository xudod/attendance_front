<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>排班管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div style="margin-bottom: 15px;">
        <span style="margin-right: 10px">排班范围选择</span>
        <el-date-picker v-model="datearea" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <span style="margin: 0 10px">本班组可用班次</span>
        <el-button title="选择多个排班框格，可以点击此处批量排班或修改！" type="success" plain @click="setUserSchedule" style="margin-right: 10px; width:50px; padding: 10px" v-for="scheduleCode in scheduleCodeList" :key="scheduleCode.id">{{ scheduleCode.scheduleCode }}</el-button>
        <el-button type="primary" @click="addUserScheduleDV = true">添加可用班次</el-button>
        <el-button type="primary" @click="addUserScheduleDV = true" style="float:right;">保存排班</el-button>
      </div>
      <el-table :data="UserScheduleList" stripe border size="mini" width="100%">
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="code" prop="empMdmCode"></el-table-column>
        <el-table-column v-for="(item,index) in items" :label="item.substr(-2, 2)" :prop="item" :key="index" :width="tableWidth">
          <template slot-scope='scope'>
            <!-- <div @click="scheduleClick(scope.row[item])" style="text-align:center">{{ scope.row.hasOwnProperty(item) ? scope.row[item].scheduleCode : '' }}</div> @click="scheduleClick(scope.row[item])" -->
            <el-popover placement="bottom" width="220" trigger="manual" title="请选择排班" v-model="visible">
              <el-row v-for="scheduleCode in scheduleCodeList" :key="scheduleCode.id" style="width:0 auto;">
                <el-button style="width: 200px; margin: 5px 0;" type="success" plain @click="setTableUserSchedule(scope.row[item],scheduleCode)">{{ scheduleCode.scheduleCode }}</el-button>
              </el-row>
              <!-- <el-button slot="reference">click 激活</el-button> -->
              <div slot="reference" @click="visible = !visible" style="text-align:center">{{ scope.row.hasOwnProperty(item) ? scope.row[item].scheduleCode : '' }}</div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> -->
      <!-- </el-pagination> -->
    </el-card>
    <el-dialog title="添加成员排班信息" :visible.sync="addUserScheduleDV" width="750px" :before-close="handleClose" @close="addUserScheduleDVClose">
      <el-form inline :model="addUserScheduleForm" :rules="addUserScheduleFormRules" ref="addUserScheduleFormRef" label-width="120px" size="small">
        <el-form-item label="人员主数据码" prop="empMdmCode">
          <el-input v-model="addUserScheduleForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班id" prop="scheduleId">
          <el-input v-model="addUserScheduleForm.scheduleId"></el-input>
        </el-form-item>
        <el-form-item label="变化排班id" prop="scheduleChangeId">
          <el-input v-model="addUserScheduleForm.scheduleChangeId"></el-input>
        </el-form-item>
        <el-form-item label="所属日期" prop="scheduleDate">
          <el-input v-model="addUserScheduleForm.scheduleDate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserScheduleDV = false">取 消</el-button>
        <el-button type="primary" @click="addUserSchedule">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑成员排班信息" :visible.sync="editUserScheduleDV" width="750px" @close="editUserScheduleDVClose">
      <el-form inline :model="editUserScheduleForm" :rules="editUserScheduleFormRules" ref="editUserScheduleFormRef" label-width="120px" size="small">
        <el-form-item label="人员主数据码" prop="empMdmCode">
          <el-input v-model="editUserScheduleForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班id" prop="scheduleId">
          <el-input v-model="editUserScheduleForm.scheduleId"></el-input>
        </el-form-item>
        <el-form-item label="变化排班id" prop="scheduleChangeId">
          <el-input v-model="editUserScheduleForm.scheduleChangeId"></el-input>
        </el-form-item>
        <el-form-item label="所属日期" prop="scheduleDate">
          <el-input v-model="editUserScheduleForm.scheduleDate"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserScheduleDV = false">取 消</el-button>
        <el-button type="primary" @click="editUserSchedule">确 定</el-button>
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
      // UserScheduleList: null,
      addUserScheduleDV: false,
      addUserScheduleForm: {
        empMdmCode: '',
        scheduleId: '',
        scheduleChangeId: '',
        scheduleDate: ''
      },
      addUserScheduleFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleChangeId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editUserScheduleDV: false,
      editUserScheduleForm: {
        empMdmCode: '',
        scheduleId: '',
        scheduleChangeId: '',
        scheduleDate: ''
      },
      editUserScheduleFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleChangeId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      datearea: [new Date(), new Date()],
      items: [],
      UserScheduleList: [],
      tableWidth: '45px',
      scheduleCodeList: [],
      visible: false
    }
  },
  created() {
    this.datearea[0] = new Date(this.dateToStr(new Date(), 1))
    this.datearea[1] = new Date(this.dateToStr(new Date(), this.getMonthDay()))
    this.getUserScheduleList()
    this.getScheduleList()
  },
  methods: {
    setTableUserSchedule(row, scheduleCode) {
      // alert(JSON.stringify(row) + '**' + JSON.stringify(scheduleCode))
      row.scheduleCode = scheduleCode.scheduleCode
      this.visible = !this.visible
    },
    setUserSchedule() {
      alert('未选择任何排班框格！')
    },
    scheduleClick(row) {
      row.scheduleCode = 'B'
      alert(JSON.stringify(row))
    },
    dateToStr(date, dayParam) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = (dayParam === undefined ? date.getDate() : dayParam)
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    getMonthDay() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const days = new Date(year, month, 0).getDate()
      return days
    },
    async getUserScheduleList() {
      const { data: res } = await this.$http.post('/api/empAttendanceStatus/getuserschedule', { startDate: this.dateToStr(this.datearea[0]), endDate: this.dateToStr(this.datearea[1]) })
      if (res.code !== 200) return this.$message.error(res.message)
      this.UserScheduleList = res.data.arrayList
      this.items = res.data.dateList
      this.tableWidth = 1395 / res.data.dateList.length + 'px'
    },
    async getScheduleList() {
      const { data: res } = await this.$http.post('/api/scheduleCode/getall', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.scheduleCodeList = res.data
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getUserScheduleList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getUserScheduleList()
    },
    async UserScheduleStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/userSchedule/upstatebykey', domaimInfo)
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
        message: '更新成员排班信息状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getUserScheduleList()
    },
    addUserScheduleDVClose() {
      this.$refs.addUserScheduleFormRef.resetFields()
    },
    async addUserScheduleBtn() {
      const { data: res } = await this.$http.post('/api/userSchedule/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addUserScheduleForm = res.data
      this.addUserScheduleForm.projectId = this.projectId
      this.addUserScheduleDV = true
    },
    addUserSchedule() {
      this.$refs.addUserScheduleFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userSchedule/add', this.addUserScheduleForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addUserScheduleDV = false
        this.getUserScheduleList()
      })
    },
    editUserScheduleDVClose() {
      this.$refs.editUserScheduleFormRef.resetFields()
    },
    handleClose() {

    },
    async editUserScheduleDVShow(id) {
      this.editUserScheduleDV = true
      this.editUserScheduleForm.id = id
      const { data: res } = await this.$http.post('/api/userSchedule/getbykey', this.editUserScheduleForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editUserScheduleForm = res.data
    },
    editUserSchedule() {
      this.$refs.editUserScheduleFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userSchedule/upbykey', this.editUserScheduleForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editUserScheduleDV = false
        this.getUserScheduleList()
        this.$message.success(res.message)
      })
    },
    delUserScheduleById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/userSchedule/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserScheduleList()
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
