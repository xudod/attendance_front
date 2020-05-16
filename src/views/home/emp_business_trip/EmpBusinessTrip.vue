<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出差数据</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addEmpBusinessTripDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加出差数据</el-button>
      </div>
      <el-table :data="EmpBusinessTripList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="出差名称" prop="btName"></el-table-column>
        <el-table-column label="流水号" prop="bpmSerialNum"></el-table-column>
        <el-table-column label="员工code" prop="empMdmCode"></el-table-column>
        <el-table-column label="出差日期" prop="btDate"></el-table-column>
        <el-table-column label="出差状态" prop="btStatus"></el-table-column>
        <el-table-column label="开始时间" prop="btStartTime"></el-table-column>
        <el-table-column label="结束时间" prop="btEndTime"></el-table-column>
        <el-table-column label="出差内容" prop="btContent"></el-table-column>
        <el-table-column label="是否显示" prop="isShow"></el-table-column>
        <el-table-column label="是否归档" prop="isArchive"></el-table-column>
        <el-table-column label="是否取消" prop="isCancel"></el-table-column>
        <el-table-column label="流水id" prop="instanceId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="EmpBusinessTripStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editEmpBusinessTripDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delEmpBusinessTripById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加出差数据" :visible.sync="addEmpBusinessTripDV" width="750px" :before-close="handleClose" @close="addEmpBusinessTripDVClose">
      <el-form inline :model="addEmpBusinessTripForm" :rules="addEmpBusinessTripFormRules" ref="addEmpBusinessTripFormRef" label-width="120px" size="small">
        <el-form-item label="出差名称" prop="btName">
          <el-input v-model="addEmpBusinessTripForm.btName"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="bpmSerialNum">
          <el-input v-model="addEmpBusinessTripForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="addEmpBusinessTripForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="出差日期" prop="btDate">
          <el-input v-model="addEmpBusinessTripForm.btDate"></el-input>
        </el-form-item>
        <el-form-item label="出差状态" prop="btStatus">
          <el-input v-model="addEmpBusinessTripForm.btStatus"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="btStartTime">
          <el-input v-model="addEmpBusinessTripForm.btStartTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="btEndTime">
          <el-input v-model="addEmpBusinessTripForm.btEndTime"></el-input>
        </el-form-item>
        <el-form-item label="出差内容" prop="btContent">
          <el-input v-model="addEmpBusinessTripForm.btContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="addEmpBusinessTripForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="addEmpBusinessTripForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="addEmpBusinessTripForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="addEmpBusinessTripForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmpBusinessTripDV = false">取 消</el-button>
        <el-button type="primary" @click="addEmpBusinessTrip">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑出差数据" :visible.sync="editEmpBusinessTripDV" width="750px" @close="editEmpBusinessTripDVClose">
      <el-form inline :model="editEmpBusinessTripForm" :rules="editEmpBusinessTripFormRules" ref="editEmpBusinessTripFormRef" label-width="120px" size="small">
        <el-form-item label="出差名称" prop="btName">
          <el-input v-model="editEmpBusinessTripForm.btName"></el-input>
        </el-form-item>
        <el-form-item label="流水号" prop="bpmSerialNum">
          <el-input v-model="editEmpBusinessTripForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="editEmpBusinessTripForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="出差日期" prop="btDate">
          <el-input v-model="editEmpBusinessTripForm.btDate"></el-input>
        </el-form-item>
        <el-form-item label="出差状态" prop="btStatus">
          <el-input v-model="editEmpBusinessTripForm.btStatus"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="btStartTime">
          <el-input v-model="editEmpBusinessTripForm.btStartTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="btEndTime">
          <el-input v-model="editEmpBusinessTripForm.btEndTime"></el-input>
        </el-form-item>
        <el-form-item label="出差内容" prop="btContent">
          <el-input v-model="editEmpBusinessTripForm.btContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="editEmpBusinessTripForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="editEmpBusinessTripForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="editEmpBusinessTripForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="editEmpBusinessTripForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editEmpBusinessTripDV = false">取 消</el-button>
        <el-button type="primary" @click="editEmpBusinessTrip">确 定</el-button>
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
      EmpBusinessTripList: null,
      addEmpBusinessTripDV: false,
      addEmpBusinessTripForm: {
        btName: '',
        bpmSerialNum: '',
        empMdmCode: '',
        btDate: '',
        btStatus: '',
        btStartTime: '',
        btEndTime: '',
        btContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      addEmpBusinessTripFormRules: {
        btName: [
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
        btDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btStartTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btEndTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btContent: [
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
      editEmpBusinessTripDV: false,
      editEmpBusinessTripForm: {
        btName: '',
        bpmSerialNum: '',
        empMdmCode: '',
        btDate: '',
        btStatus: '',
        btStartTime: '',
        btEndTime: '',
        btContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      editEmpBusinessTripFormRules: {
        btName: [
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
        btDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btStartTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btEndTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btContent: [
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
    this.getEmpBusinessTripList()
  },
  methods: {
    async getEmpBusinessTripList() {
      const { data: res } = await this.$http.post('/api/empBusinessTrip/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.EmpBusinessTripList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getEmpBusinessTripList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getEmpBusinessTripList()
    },
    async EmpBusinessTripStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/empBusinessTrip/upstatebykey', domaimInfo)
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
        message: '更新出差数据状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getEmpBusinessTripList()
    },
    addEmpBusinessTripDVClose() {
      this.$refs.addEmpBusinessTripFormRef.resetFields()
    },
    async addEmpBusinessTripBtn() {
      const { data: res } = await this.$http.post('/api/empBusinessTrip/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addEmpBusinessTripForm = res.data
      this.addEmpBusinessTripForm.projectId = this.projectId
      this.addEmpBusinessTripDV = true
    },
    addEmpBusinessTrip() {
      this.$refs.addEmpBusinessTripFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empBusinessTrip/add', this.addEmpBusinessTripForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addEmpBusinessTripDV = false
        this.getEmpBusinessTripList()
      })
    },
    editEmpBusinessTripDVClose() {
      this.$refs.editEmpBusinessTripFormRef.resetFields()
    },
    handleClose() {

    },
    async editEmpBusinessTripDVShow(id) {
      this.editEmpBusinessTripDV = true
      this.editEmpBusinessTripForm.id = id
      const { data: res } = await this.$http.post('/api/empBusinessTrip/getbykey', this.editEmpBusinessTripForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editEmpBusinessTripForm = res.data
    },
    editEmpBusinessTrip() {
      this.$refs.editEmpBusinessTripFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empBusinessTrip/upbykey', this.editEmpBusinessTripForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editEmpBusinessTripDV = false
        this.getEmpBusinessTripList()
        this.$message.success(res.message)
      })
    },
    delEmpBusinessTripById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/empBusinessTrip/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getEmpBusinessTripList()
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
