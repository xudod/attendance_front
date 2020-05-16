<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织所属产业管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addOrgProduceRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加组织所属产业管理</el-button>
      </div>
      <el-table :data="OrgProduceRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="组织机构id" prop="orgIdOth"></el-table-column>
        <el-table-column label="产业id" prop="produceId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="OrgProduceRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrgProduceRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delOrgProduceRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加组织所属产业管理" :visible.sync="addOrgProduceRelationDV" width="750px" :before-close="handleClose" @close="addOrgProduceRelationDVClose">
      <el-form inline :model="addOrgProduceRelationForm" :rules="addOrgProduceRelationFormRules" ref="addOrgProduceRelationFormRef" label-width="120px" size="small">
        <el-form-item label="组织机构id" prop="orgIdOth">
          <el-input v-model="addOrgProduceRelationForm.orgIdOth"></el-input>
        </el-form-item>
        <el-form-item label="产业id" prop="produceId">
          <el-input v-model="addOrgProduceRelationForm.produceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrgProduceRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addOrgProduceRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑组织所属产业管理" :visible.sync="editOrgProduceRelationDV" width="750px" @close="editOrgProduceRelationDVClose">
      <el-form inline :model="editOrgProduceRelationForm" :rules="editOrgProduceRelationFormRules" ref="editOrgProduceRelationFormRef" label-width="120px" size="small">
        <el-form-item label="组织机构id" prop="orgIdOth">
          <el-input v-model="editOrgProduceRelationForm.orgIdOth"></el-input>
        </el-form-item>
        <el-form-item label="产业id" prop="produceId">
          <el-input v-model="editOrgProduceRelationForm.produceId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrgProduceRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editOrgProduceRelation">确 定</el-button>
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
      OrgProduceRelationList: null,
      addOrgProduceRelationDV: false,
      addOrgProduceRelationForm: {
        orgIdOth: '',
        produceId: ''
      },
      addOrgProduceRelationFormRules: {
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        produceId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editOrgProduceRelationDV: false,
      editOrgProduceRelationForm: {
        orgIdOth: '',
        produceId: ''
      },
      editOrgProduceRelationFormRules: {
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        produceId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOrgProduceRelationList()
  },
  methods: {
    async getOrgProduceRelationList() {
      const { data: res } = await this.$http.post('/api/orgProduceRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.OrgProduceRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getOrgProduceRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getOrgProduceRelationList()
    },
    async OrgProduceRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/orgProduceRelation/upstatebykey', domaimInfo)
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
        message: '更新组织所属产业管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getOrgProduceRelationList()
    },
    addOrgProduceRelationDVClose() {
      this.$refs.addOrgProduceRelationFormRef.resetFields()
    },
    async addOrgProduceRelationBtn() {
      const { data: res } = await this.$http.post('/api/orgProduceRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addOrgProduceRelationForm = res.data
      this.addOrgProduceRelationForm.projectId = this.projectId
      this.addOrgProduceRelationDV = true
    },
    addOrgProduceRelation() {
      this.$refs.addOrgProduceRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/orgProduceRelation/add', this.addOrgProduceRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addOrgProduceRelationDV = false
        this.getOrgProduceRelationList()
      })
    },
    editOrgProduceRelationDVClose() {
      this.$refs.editOrgProduceRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editOrgProduceRelationDVShow(id) {
      this.editOrgProduceRelationDV = true
      this.editOrgProduceRelationForm.id = id
      const { data: res } = await this.$http.post('/api/orgProduceRelation/getbykey', this.editOrgProduceRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editOrgProduceRelationForm = res.data
    },
    editOrgProduceRelation() {
      this.$refs.editOrgProduceRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/orgProduceRelation/upbykey', this.editOrgProduceRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editOrgProduceRelationDV = false
        this.getOrgProduceRelationList()
        this.$message.success(res.message)
      })
    },
    delOrgProduceRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/orgProduceRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getOrgProduceRelationList()
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
