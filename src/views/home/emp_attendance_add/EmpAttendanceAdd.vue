<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤补充数据</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addEmpAttendanceAddDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤补充数据</el-button>
      </div>
      <el-table :data="EmpAttendanceAddList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="补充名称" prop="aaddName"></el-table-column>
        <el-table-column label="流水号" prop="bpmSerialNum"></el-table-column>
        <el-table-column label="员工code" prop="empMdmCode"></el-table-column>
        <el-table-column label="补充日期" prop="aaddDate"></el-table-column>
        <el-table-column label="补充状态" prop="aaddStatus"></el-table-column>
        <el-table-column label="补充内容" prop="aaddContent"></el-table-column>
        <el-table-column label="是否显示" prop="isShow"></el-table-column>
        <el-table-column label="是否归档" prop="isArchive"></el-table-column>
        <el-table-column label="是否取消" prop="isCancel"></el-table-column>
        <el-table-column label="流水id" prop="instanceId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="EmpAttendanceAddStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editEmpAttendanceAddDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delEmpAttendanceAddById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤补充数据" :visible.sync="addEmpAttendanceAddDV" width="750px" :before-close="handleClose" @close="addEmpAttendanceAddDVClose">
      <el-form inline :model="addEmpAttendanceAddForm" :rules="addEmpAttendanceAddFormRules" ref="addEmpAttendanceAddFormRef" label-width="120px" size="small">
        <el-form-item label="补充名称" prop="aaddName">
          <el-input v-model="addEmpAttendanceAddForm.aaddName"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="bpmSerialNum">
          <el-input v-model="addEmpAttendanceAddForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="addEmpAttendanceAddForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="补充日期" prop="aaddDate">
          <el-input v-model="addEmpAttendanceAddForm.aaddDate"></el-input>
        </el-form-item>
        <el-form-item label="补充状态" prop="aaddStatus">
          <el-input v-model="addEmpAttendanceAddForm.aaddStatus"></el-input>
        </el-form-item>
        <el-form-item label="补充内容" prop="aaddContent">
          <el-input v-model="addEmpAttendanceAddForm.aaddContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="addEmpAttendanceAddForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="addEmpAttendanceAddForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="addEmpAttendanceAddForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="addEmpAttendanceAddForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmpAttendanceAddDV = false">取 消</el-button>
        <el-button type="primary" @click="addEmpAttendanceAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤补充数据" :visible.sync="editEmpAttendanceAddDV" width="750px" @close="editEmpAttendanceAddDVClose">
      <el-form inline :model="editEmpAttendanceAddForm" :rules="editEmpAttendanceAddFormRules" ref="editEmpAttendanceAddFormRef" label-width="120px" size="small">
        <el-form-item label="补充名称" prop="aaddName">
          <el-input v-model="editEmpAttendanceAddForm.aaddName"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="bpmSerialNum">
          <el-input v-model="editEmpAttendanceAddForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="editEmpAttendanceAddForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="补充日期" prop="aaddDate">
          <el-input v-model="editEmpAttendanceAddForm.aaddDate"></el-input>
        </el-form-item>
        <el-form-item label="补充状态" prop="aaddStatus">
          <el-input v-model="editEmpAttendanceAddForm.aaddStatus"></el-input>
        </el-form-item>
        <el-form-item label="补充内容" prop="aaddContent">
          <el-input v-model="editEmpAttendanceAddForm.aaddContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="editEmpAttendanceAddForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="editEmpAttendanceAddForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="editEmpAttendanceAddForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="editEmpAttendanceAddForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editEmpAttendanceAddDV = false">取 消</el-button>
        <el-button type="primary" @click="editEmpAttendanceAdd">确 定</el-button>
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
      EmpAttendanceAddList: null,
      addEmpAttendanceAddDV: false,
      addEmpAttendanceAddForm: {
        aaddName: '',
        bpmSerialNum: '',
        empMdmCode: '',
        aaddDate: '',
        aaddStatus: '',
        aaddContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      addEmpAttendanceAddFormRules: {
        aaddName: [
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
        aaddDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaddStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaddContent: [
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
      editEmpAttendanceAddDV: false,
      editEmpAttendanceAddForm: {
        aaddName: '',
        bpmSerialNum: '',
        empMdmCode: '',
        aaddDate: '',
        aaddStatus: '',
        aaddContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      editEmpAttendanceAddFormRules: {
        aaddName: [
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
        aaddDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaddStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaddContent: [
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
    this.getEmpAttendanceAddList()
  },
  methods: {
    async getEmpAttendanceAddList() {
      const { data: res } = await this.$http.post('/api/empAttendanceAdd/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.EmpAttendanceAddList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getEmpAttendanceAddList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getEmpAttendanceAddList()
    },
    async EmpAttendanceAddStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/empAttendanceAdd/upstatebykey', domaimInfo)
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
        message: '更新考勤补充数据状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getEmpAttendanceAddList()
    },
    addEmpAttendanceAddDVClose() {
      this.$refs.addEmpAttendanceAddFormRef.resetFields()
    },
    async addEmpAttendanceAddBtn() {
      const { data: res } = await this.$http.post('/api/empAttendanceAdd/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addEmpAttendanceAddForm = res.data
      this.addEmpAttendanceAddForm.projectId = this.projectId
      this.addEmpAttendanceAddDV = true
    },
    addEmpAttendanceAdd() {
      this.$refs.addEmpAttendanceAddFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empAttendanceAdd/add', this.addEmpAttendanceAddForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addEmpAttendanceAddDV = false
        this.getEmpAttendanceAddList()
      })
    },
    editEmpAttendanceAddDVClose() {
      this.$refs.editEmpAttendanceAddFormRef.resetFields()
    },
    handleClose() {

    },
    async editEmpAttendanceAddDVShow(id) {
      this.editEmpAttendanceAddDV = true
      this.editEmpAttendanceAddForm.id = id
      const { data: res } = await this.$http.post('/api/empAttendanceAdd/getbykey', this.editEmpAttendanceAddForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editEmpAttendanceAddForm = res.data
    },
    editEmpAttendanceAdd() {
      this.$refs.editEmpAttendanceAddFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empAttendanceAdd/upbykey', this.editEmpAttendanceAddForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editEmpAttendanceAddDV = false
        this.getEmpAttendanceAddList()
        this.$message.success(res.message)
      })
    },
    delEmpAttendanceAddById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/empAttendanceAdd/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getEmpAttendanceAddList()
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
