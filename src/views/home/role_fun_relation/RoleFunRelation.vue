<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addRoleFunRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加角色权限管理</el-button>
      </div>
      <el-table :data="RoleFunRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限功能资源id" prop="funResourceId"></el-table-column>
        <el-table-column label="角色id" prop="roleId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="RoleFunRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRoleFunRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRoleFunRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加角色权限管理" :visible.sync="addRoleFunRelationDV" width="750px" :before-close="handleClose" @close="addRoleFunRelationDVClose">
      <el-form inline :model="addRoleFunRelationForm" :rules="addRoleFunRelationFormRules" ref="addRoleFunRelationFormRef" label-width="120px" size="small">
        <el-form-item label="权限功能资源id" prop="funResourceId">
          <el-input v-model="addRoleFunRelationForm.funResourceId"></el-input>
        </el-form-item>
        <el-form-item label="角色id" prop="roleId">
          <el-input v-model="addRoleFunRelationForm.roleId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleFunRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addRoleFunRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑角色权限管理" :visible.sync="editRoleFunRelationDV" width="750px" @close="editRoleFunRelationDVClose">
      <el-form inline :model="editRoleFunRelationForm" :rules="editRoleFunRelationFormRules" ref="editRoleFunRelationFormRef" label-width="120px" size="small">
        <el-form-item label="权限功能资源id" prop="funResourceId">
          <el-input v-model="editRoleFunRelationForm.funResourceId"></el-input>
        </el-form-item>
        <el-form-item label="角色id" prop="roleId">
          <el-input v-model="editRoleFunRelationForm.roleId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleFunRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editRoleFunRelation">确 定</el-button>
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
      RoleFunRelationList: null,
      addRoleFunRelationDV: false,
      addRoleFunRelationForm: {
        funResourceId: '',
        roleId: ''
      },
      addRoleFunRelationFormRules: {
        funResourceId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        roleId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editRoleFunRelationDV: false,
      editRoleFunRelationForm: {
        funResourceId: '',
        roleId: ''
      },
      editRoleFunRelationFormRules: {
        funResourceId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        roleId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleFunRelationList()
  },
  methods: {
    async getRoleFunRelationList() {
      const { data: res } = await this.$http.post('/api/roleFunRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.RoleFunRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getRoleFunRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getRoleFunRelationList()
    },
    async RoleFunRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/roleFunRelation/upstatebykey', domaimInfo)
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
        message: '更新角色权限管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getRoleFunRelationList()
    },
    addRoleFunRelationDVClose() {
      this.$refs.addRoleFunRelationFormRef.resetFields()
    },
    async addRoleFunRelationBtn() {
      const { data: res } = await this.$http.post('/api/roleFunRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addRoleFunRelationForm = res.data
      this.addRoleFunRelationForm.projectId = this.projectId
      this.addRoleFunRelationDV = true
    },
    addRoleFunRelation() {
      this.$refs.addRoleFunRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/roleFunRelation/add', this.addRoleFunRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addRoleFunRelationDV = false
        this.getRoleFunRelationList()
      })
    },
    editRoleFunRelationDVClose() {
      this.$refs.editRoleFunRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editRoleFunRelationDVShow(id) {
      this.editRoleFunRelationDV = true
      this.editRoleFunRelationForm.id = id
      const { data: res } = await this.$http.post('/api/roleFunRelation/getbykey', this.editRoleFunRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editRoleFunRelationForm = res.data
    },
    editRoleFunRelation() {
      this.$refs.editRoleFunRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/roleFunRelation/upbykey', this.editRoleFunRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editRoleFunRelationDV = false
        this.getRoleFunRelationList()
        this.$message.success(res.message)
      })
    },
    delRoleFunRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/roleFunRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getRoleFunRelationList()
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
