<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织所属父级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addOrgSuperiorRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加组织所属父级管理</el-button>
      </div>
      <el-table :data="OrgSuperiorRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="组织机构id" prop="orgIdOth"></el-table-column>
        <el-table-column label="上级id" prop="superiorId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="OrgSuperiorRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrgSuperiorRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delOrgSuperiorRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加组织所属父级管理" :visible.sync="addOrgSuperiorRelationDV" width="750px" :before-close="handleClose" @close="addOrgSuperiorRelationDVClose">
      <el-form inline :model="addOrgSuperiorRelationForm" :rules="addOrgSuperiorRelationFormRules" ref="addOrgSuperiorRelationFormRef" label-width="120px" size="small">
        <el-form-item label="组织机构id" prop="orgIdOth">
          <el-input v-model="addOrgSuperiorRelationForm.orgIdOth"></el-input>
        </el-form-item>
        <el-form-item label="上级id" prop="superiorId">
          <el-input v-model="addOrgSuperiorRelationForm.superiorId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrgSuperiorRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addOrgSuperiorRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑组织所属父级管理" :visible.sync="editOrgSuperiorRelationDV" width="750px" @close="editOrgSuperiorRelationDVClose">
      <el-form inline :model="editOrgSuperiorRelationForm" :rules="editOrgSuperiorRelationFormRules" ref="editOrgSuperiorRelationFormRef" label-width="120px" size="small">
        <el-form-item label="组织机构id" prop="orgIdOth">
          <el-input v-model="editOrgSuperiorRelationForm.orgIdOth"></el-input>
        </el-form-item>
        <el-form-item label="上级id" prop="superiorId">
          <el-input v-model="editOrgSuperiorRelationForm.superiorId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrgSuperiorRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editOrgSuperiorRelation">确 定</el-button>
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
      OrgSuperiorRelationList: null,
      addOrgSuperiorRelationDV: false,
      addOrgSuperiorRelationForm: {
        orgIdOth: '',
        superiorId: ''
      },
      addOrgSuperiorRelationFormRules: {
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editOrgSuperiorRelationDV: false,
      editOrgSuperiorRelationForm: {
        orgIdOth: '',
        superiorId: ''
      },
      editOrgSuperiorRelationFormRules: {
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getOrgSuperiorRelationList()
  },
  methods: {
    async getOrgSuperiorRelationList() {
      const { data: res } = await this.$http.post('/api/orgSuperiorRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.OrgSuperiorRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getOrgSuperiorRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getOrgSuperiorRelationList()
    },
    async OrgSuperiorRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/orgSuperiorRelation/upstatebykey', domaimInfo)
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
        message: '更新组织所属父级管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getOrgSuperiorRelationList()
    },
    addOrgSuperiorRelationDVClose() {
      this.$refs.addOrgSuperiorRelationFormRef.resetFields()
    },
    async addOrgSuperiorRelationBtn() {
      const { data: res } = await this.$http.post('/api/orgSuperiorRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addOrgSuperiorRelationForm = res.data
      this.addOrgSuperiorRelationForm.projectId = this.projectId
      this.addOrgSuperiorRelationDV = true
    },
    addOrgSuperiorRelation() {
      this.$refs.addOrgSuperiorRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/orgSuperiorRelation/add', this.addOrgSuperiorRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addOrgSuperiorRelationDV = false
        this.getOrgSuperiorRelationList()
      })
    },
    editOrgSuperiorRelationDVClose() {
      this.$refs.editOrgSuperiorRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editOrgSuperiorRelationDVShow(id) {
      this.editOrgSuperiorRelationDV = true
      this.editOrgSuperiorRelationForm.id = id
      const { data: res } = await this.$http.post('/api/orgSuperiorRelation/getbykey', this.editOrgSuperiorRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editOrgSuperiorRelationForm = res.data
    },
    editOrgSuperiorRelation() {
      this.$refs.editOrgSuperiorRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/orgSuperiorRelation/upbykey', this.editOrgSuperiorRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editOrgSuperiorRelationDV = false
        this.getOrgSuperiorRelationList()
        this.$message.success(res.message)
      })
    },
    delOrgSuperiorRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/orgSuperiorRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getOrgSuperiorRelationList()
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
