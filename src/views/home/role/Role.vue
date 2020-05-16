<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addRoleDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加角色管理</el-button>
      </div>
      <el-table :data="RoleList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="角色编码" prop="code"></el-table-column>
        <el-table-column label="角色类型" prop="type"></el-table-column>
        <el-table-column label="所属系统" prop="belongSys"></el-table-column>
        <el-table-column label="角色等级" prop="level"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="RoleStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRoleDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRoleById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加角色管理" :visible.sync="addRoleDV" width="750px" :before-close="handleClose" @close="addRoleDVClose">
      <el-form inline :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleFormRef" label-width="120px" size="small">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="addRoleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="type">
          <el-input v-model="addRoleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="所属系统" prop="belongSys">
          <el-input v-model="addRoleForm.belongSys"></el-input>
        </el-form-item>
        <el-form-item label="角色等级" prop="level">
          <el-input v-model="addRoleForm.level"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDV = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑角色管理" :visible.sync="editRoleDV" width="750px" @close="editRoleDVClose">
      <el-form inline :model="editRoleForm" :rules="editRoleFormRules" ref="editRoleFormRef" label-width="120px" size="small">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="editRoleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="type">
          <el-input v-model="editRoleForm.type"></el-input>
        </el-form-item>
        <el-form-item label="所属系统" prop="belongSys">
          <el-input v-model="editRoleForm.belongSys"></el-input>
        </el-form-item>
        <el-form-item label="角色等级" prop="level">
          <el-input v-model="editRoleForm.level"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDV = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
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
      RoleList: null,
      addRoleDV: false,
      addRoleForm: {
        name: '',
        code: '',
        type: '',
        belongSys: '',
        level: ''
      },
      addRoleFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        type: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        belongSys: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        level: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editRoleDV: false,
      editRoleForm: {
        name: '',
        code: '',
        type: '',
        belongSys: '',
        level: ''
      },
      editRoleFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        type: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        belongSys: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        level: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.post('/api/role/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.RoleList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getRoleList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getRoleList()
    },
    async RoleStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/role/upstatebykey', domaimInfo)
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
        message: '更新角色管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getRoleList()
    },
    addRoleDVClose() {
      this.$refs.addRoleFormRef.resetFields()
    },
    async addRoleBtn() {
      const { data: res } = await this.$http.post('/api/role/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addRoleForm = res.data
      this.addRoleForm.projectId = this.projectId
      this.addRoleDV = true
    },
    addRole() {
      this.$refs.addRoleFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/role/add', this.addRoleForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addRoleDV = false
        this.getRoleList()
      })
    },
    editRoleDVClose() {
      this.$refs.editRoleFormRef.resetFields()
    },
    handleClose() {

    },
    async editRoleDVShow(id) {
      this.editRoleDV = true
      this.editRoleForm.id = id
      const { data: res } = await this.$http.post('/api/role/getbykey', this.editRoleForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editRoleForm = res.data
    },
    editRole() {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/role/upbykey', this.editRoleForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editRoleDV = false
        this.getRoleList()
        this.$message.success(res.message)
      })
    },
    delRoleById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/role/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getRoleList()
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
