<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>流程内容记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addBpmContentRecordDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加流程内容记录</el-button>
      </div>
      <el-table :data="BpmContentRecordList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="bpm流水号" prop="bpmSerialNum"></el-table-column>
        <el-table-column label="员工code" prop="empMdmCode"></el-table-column>
        <el-table-column label="流程内容" prop="bpmContent"></el-table-column>
        <el-table-column label="是否显示" prop="isShow"></el-table-column>
        <el-table-column label="是否归档" prop="isArchive"></el-table-column>
        <el-table-column label="是否取消" prop="isCancel"></el-table-column>
        <el-table-column label="流水id" prop="instanceId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="BpmContentRecordStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBpmContentRecordDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delBpmContentRecordById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加流程内容记录" :visible.sync="addBpmContentRecordDV" width="750px" :before-close="handleClose" @close="addBpmContentRecordDVClose">
      <el-form inline :model="addBpmContentRecordForm" :rules="addBpmContentRecordFormRules" ref="addBpmContentRecordFormRef" label-width="120px" size="small">
        <el-form-item label="bpm流水号" prop="bpmSerialNum">
          <el-input v-model="addBpmContentRecordForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="addBpmContentRecordForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="流程内容" prop="bpmContent">
          <el-input v-model="addBpmContentRecordForm.bpmContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="addBpmContentRecordForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="addBpmContentRecordForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="addBpmContentRecordForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="addBpmContentRecordForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBpmContentRecordDV = false">取 消</el-button>
        <el-button type="primary" @click="addBpmContentRecord">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑流程内容记录" :visible.sync="editBpmContentRecordDV" width="750px" @close="editBpmContentRecordDVClose">
      <el-form inline :model="editBpmContentRecordForm" :rules="editBpmContentRecordFormRules" ref="editBpmContentRecordFormRef" label-width="120px" size="small">
        <el-form-item label="bpm流水号" prop="bpmSerialNum">
          <el-input v-model="editBpmContentRecordForm.bpmSerialNum"></el-input>
        </el-form-item>
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="editBpmContentRecordForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="流程内容" prop="bpmContent">
          <el-input v-model="editBpmContentRecordForm.bpmContent"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-input v-model="editBpmContentRecordForm.isShow"></el-input>
        </el-form-item>
        <el-form-item label="是否归档" prop="isArchive">
          <el-input v-model="editBpmContentRecordForm.isArchive"></el-input>
        </el-form-item>
        <el-form-item label="是否取消" prop="isCancel">
          <el-input v-model="editBpmContentRecordForm.isCancel"></el-input>
        </el-form-item>
        <el-form-item label="流水id" prop="instanceId">
          <el-input v-model="editBpmContentRecordForm.instanceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBpmContentRecordDV = false">取 消</el-button>
        <el-button type="primary" @click="editBpmContentRecord">确 定</el-button>
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
      BpmContentRecordList: null,
      addBpmContentRecordDV: false,
      addBpmContentRecordForm: {
        bpmSerialNum: '',
        empMdmCode: '',
        bpmContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      addBpmContentRecordFormRules: {
        bpmSerialNum: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bpmContent: [
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
      editBpmContentRecordDV: false,
      editBpmContentRecordForm: {
        bpmSerialNum: '',
        empMdmCode: '',
        bpmContent: '',
        isShow: '',
        isArchive: '',
        isCancel: '',
        instanceId: ''
      },
      editBpmContentRecordFormRules: {
        bpmSerialNum: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bpmContent: [
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
    this.getBpmContentRecordList()
  },
  methods: {
    async getBpmContentRecordList() {
      const { data: res } = await this.$http.post('/api/bpmContentRecord/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.BpmContentRecordList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getBpmContentRecordList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getBpmContentRecordList()
    },
    async BpmContentRecordStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/bpmContentRecord/upstatebykey', domaimInfo)
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
        message: '更新流程内容记录状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getBpmContentRecordList()
    },
    addBpmContentRecordDVClose() {
      this.$refs.addBpmContentRecordFormRef.resetFields()
    },
    async addBpmContentRecordBtn() {
      const { data: res } = await this.$http.post('/api/bpmContentRecord/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addBpmContentRecordForm = res.data
      this.addBpmContentRecordForm.projectId = this.projectId
      this.addBpmContentRecordDV = true
    },
    addBpmContentRecord() {
      this.$refs.addBpmContentRecordFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/bpmContentRecord/add', this.addBpmContentRecordForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addBpmContentRecordDV = false
        this.getBpmContentRecordList()
      })
    },
    editBpmContentRecordDVClose() {
      this.$refs.editBpmContentRecordFormRef.resetFields()
    },
    handleClose() {

    },
    async editBpmContentRecordDVShow(id) {
      this.editBpmContentRecordDV = true
      this.editBpmContentRecordForm.id = id
      const { data: res } = await this.$http.post('/api/bpmContentRecord/getbykey', this.editBpmContentRecordForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editBpmContentRecordForm = res.data
    },
    editBpmContentRecord() {
      this.$refs.editBpmContentRecordFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/bpmContentRecord/upbykey', this.editBpmContentRecordForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editBpmContentRecordDV = false
        this.getBpmContentRecordList()
        this.$message.success(res.message)
      })
    },
    delBpmContentRecordById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/bpmContentRecord/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getBpmContentRecordList()
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
