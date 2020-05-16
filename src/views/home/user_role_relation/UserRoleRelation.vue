<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addUserRoleRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加成员角色管理</el-button>
      </div>
      <el-table :data="UserRoleRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="人员" prop="userIdOth"></el-table-column>
        <el-table-column label="角色" prop="roleId"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="UserRoleRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserRoleRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserRoleRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加成员角色管理" :visible.sync="addUserRoleRelationDV" width="750px" :before-close="handleClose" @close="addUserRoleRelationDVClose">
      <el-form inline :model="addUserRoleRelationForm" :rules="addUserRoleRelationFormRules" ref="addUserRoleRelationFormRef" label-width="120px" size="small">
        <el-form-item label="人员" prop="userIdOth">
          <el-input v-model="addUserRoleRelationForm.userIdOth"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-input v-model="addUserRoleRelationForm.roleId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserRoleRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addUserRoleRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑成员角色管理" :visible.sync="editUserRoleRelationDV" width="750px" @close="editUserRoleRelationDVClose">
      <el-form inline :model="editUserRoleRelationForm" :rules="editUserRoleRelationFormRules" ref="editUserRoleRelationFormRef" label-width="120px" size="small">
        <el-form-item label="人员" prop="userIdOth">
          <el-input v-model="editUserRoleRelationForm.userIdOth"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-input v-model="editUserRoleRelationForm.roleId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserRoleRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editUserRoleRelation">确 定</el-button>
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
      UserRoleRelationList: null,
      addUserRoleRelationDV: false,
      addUserRoleRelationForm: {
        userIdOth: '',
        roleId: ''
      },
      addUserRoleRelationFormRules: {
        userIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        roleId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editUserRoleRelationDV: false,
      editUserRoleRelationForm: {
        userIdOth: '',
        roleId: ''
      },
      editUserRoleRelationFormRules: {
        userIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        roleId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserRoleRelationList()
  },
  methods: {
    async getUserRoleRelationList() {
      const { data: res } = await this.$http.post('/api/userRoleRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.UserRoleRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getUserRoleRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getUserRoleRelationList()
    },
    async UserRoleRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/userRoleRelation/upstatebykey', domaimInfo)
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
        message: '更新成员角色管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getUserRoleRelationList()
    },
    addUserRoleRelationDVClose() {
      this.$refs.addUserRoleRelationFormRef.resetFields()
    },
    async addUserRoleRelationBtn() {
      const { data: res } = await this.$http.post('/api/userRoleRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addUserRoleRelationForm = res.data
      this.addUserRoleRelationForm.projectId = this.projectId
      this.addUserRoleRelationDV = true
    },
    addUserRoleRelation() {
      this.$refs.addUserRoleRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userRoleRelation/add', this.addUserRoleRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addUserRoleRelationDV = false
        this.getUserRoleRelationList()
      })
    },
    editUserRoleRelationDVClose() {
      this.$refs.editUserRoleRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editUserRoleRelationDVShow(id) {
      this.editUserRoleRelationDV = true
      this.editUserRoleRelationForm.id = id
      const { data: res } = await this.$http.post('/api/userRoleRelation/getbykey', this.editUserRoleRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editUserRoleRelationForm = res.data
    },
    editUserRoleRelation() {
      this.$refs.editUserRoleRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userRoleRelation/upbykey', this.editUserRoleRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editUserRoleRelationDV = false
        this.getUserRoleRelationList()
        this.$message.success(res.message)
      })
    },
    delUserRoleRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/userRoleRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserRoleRelationList()
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
