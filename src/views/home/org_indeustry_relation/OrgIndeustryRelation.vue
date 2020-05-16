<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织所属行业管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addOrgIndeustryRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加组织所属行业管理</el-button>
      </div>
      <el-table :data="OrgIndeustryRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="组织机构id" prop="orgIdOth"></el-table-column>
        <el-table-column label="所属行业id" prop="industryId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="OrgIndeustryRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrgIndeustryRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delOrgIndeustryRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加组织所属行业管理" :visible.sync="addOrgIndeustryRelationDV" width="750px" :before-close="handleClose" @close="addOrgIndeustryRelationDVClose">
      <el-form inline :model="addOrgIndeustryRelationForm" :rules="addOrgIndeustryRelationFormRules" ref="addOrgIndeustryRelationFormRef" label-width="120px" size="small">
        <el-form-item label="组织机构id" prop="orgIdOth">
          <el-input v-model="addOrgIndeustryRelationForm.orgIdOth"></el-input>
        </el-form-item>
        <el-form-item label="所属行业id" prop="industryId">
          <el-input v-model="addOrgIndeustryRelationForm.industryId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrgIndeustryRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addOrgIndeustryRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑组织所属行业管理" :visible.sync="editOrgIndeustryRelationDV" width="750px" @close="editOrgIndeustryRelationDVClose">
      <el-form inline :model="editOrgIndeustryRelationForm" :rules="editOrgIndeustryRelationFormRules" ref="editOrgIndeustryRelationFormRef" label-width="120px" size="small">
        <el-form-item label="组织机构id" prop="orgIdOth">
          <el-input v-model="editOrgIndeustryRelationForm.orgIdOth"></el-input>
        </el-form-item>
        <el-form-item label="所属行业id" prop="industryId">
          <el-input v-model="editOrgIndeustryRelationForm.industryId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrgIndeustryRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editOrgIndeustryRelation">确 定</el-button>
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
      OrgIndeustryRelationList: null,
      addOrgIndeustryRelationDV: false,
      addOrgIndeustryRelationForm: {
        orgIdOth: '',
        industryId: ''
      },
      addOrgIndeustryRelationFormRules: {
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        industryId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editOrgIndeustryRelationDV: false,
      editOrgIndeustryRelationForm: {
        orgIdOth: '',
        industryId: ''
      },
      editOrgIndeustryRelationFormRules: {
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        industryId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOrgIndeustryRelationList()
  },
  methods: {
    async getOrgIndeustryRelationList() {
      const { data: res } = await this.$http.post('/api/orgIndeustryRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.OrgIndeustryRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getOrgIndeustryRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getOrgIndeustryRelationList()
    },
    async OrgIndeustryRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/orgIndeustryRelation/upstatebykey', domaimInfo)
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
        message: '更新组织所属行业管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getOrgIndeustryRelationList()
    },
    addOrgIndeustryRelationDVClose() {
      this.$refs.addOrgIndeustryRelationFormRef.resetFields()
    },
    async addOrgIndeustryRelationBtn() {
      const { data: res } = await this.$http.post('/api/orgIndeustryRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addOrgIndeustryRelationForm = res.data
      this.addOrgIndeustryRelationForm.projectId = this.projectId
      this.addOrgIndeustryRelationDV = true
    },
    addOrgIndeustryRelation() {
      this.$refs.addOrgIndeustryRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/orgIndeustryRelation/add', this.addOrgIndeustryRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addOrgIndeustryRelationDV = false
        this.getOrgIndeustryRelationList()
      })
    },
    editOrgIndeustryRelationDVClose() {
      this.$refs.editOrgIndeustryRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editOrgIndeustryRelationDVShow(id) {
      this.editOrgIndeustryRelationDV = true
      this.editOrgIndeustryRelationForm.id = id
      const { data: res } = await this.$http.post('/api/orgIndeustryRelation/getbykey', this.editOrgIndeustryRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editOrgIndeustryRelationForm = res.data
    },
    editOrgIndeustryRelation() {
      this.$refs.editOrgIndeustryRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/orgIndeustryRelation/upbykey', this.editOrgIndeustryRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editOrgIndeustryRelationDV = false
        this.getOrgIndeustryRelationList()
        this.$message.success(res.message)
      })
    },
    delOrgIndeustryRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/orgIndeustryRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getOrgIndeustryRelationList()
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
