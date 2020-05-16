<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员所属组织管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addUserOrgRelationDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加成员所属组织管理</el-button>
      </div>
      <el-table :data="UserOrgRelationList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="人员" prop="userIdOth"></el-table-column>
        <el-table-column label="组织" prop="orgIdOth"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="UserOrgRelationStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserOrgRelationDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserOrgRelationById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加成员所属组织管理" :visible.sync="addUserOrgRelationDV" width="750px" :before-close="handleClose" @close="addUserOrgRelationDVClose">
      <el-form inline :model="addUserOrgRelationForm" :rules="addUserOrgRelationFormRules" ref="addUserOrgRelationFormRef" label-width="120px" size="small">
        <el-form-item label="人员" prop="userIdOth">
          <el-input v-model="addUserOrgRelationForm.userIdOth"></el-input>
        </el-form-item>
        <el-form-item label="组织" prop="orgIdOth">
          <el-input v-model="addUserOrgRelationForm.orgIdOth"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserOrgRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="addUserOrgRelation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑成员所属组织管理" :visible.sync="editUserOrgRelationDV" width="750px" @close="editUserOrgRelationDVClose">
      <el-form inline :model="editUserOrgRelationForm" :rules="editUserOrgRelationFormRules" ref="editUserOrgRelationFormRef" label-width="120px" size="small">
        <el-form-item label="人员" prop="userIdOth">
          <el-input v-model="editUserOrgRelationForm.userIdOth"></el-input>
        </el-form-item>
        <el-form-item label="组织" prop="orgIdOth">
          <el-input v-model="editUserOrgRelationForm.orgIdOth"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserOrgRelationDV = false">取 消</el-button>
        <el-button type="primary" @click="editUserOrgRelation">确 定</el-button>
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
      UserOrgRelationList: null,
      addUserOrgRelationDV: false,
      addUserOrgRelationForm: {
        userIdOth: '',
        orgIdOth: ''
      },
      addUserOrgRelationFormRules: {
        userIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editUserOrgRelationDV: false,
      editUserOrgRelationForm: {
        userIdOth: '',
        orgIdOth: ''
      },
      editUserOrgRelationFormRules: {
        userIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        orgIdOth: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserOrgRelationList()
  },
  methods: {
    async getUserOrgRelationList() {
      const { data: res } = await this.$http.post('/api/userOrgRelation/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.UserOrgRelationList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getUserOrgRelationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getUserOrgRelationList()
    },
    async UserOrgRelationStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/userOrgRelation/upstatebykey', domaimInfo)
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
        message: '更新成员所属组织管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getUserOrgRelationList()
    },
    addUserOrgRelationDVClose() {
      this.$refs.addUserOrgRelationFormRef.resetFields()
    },
    async addUserOrgRelationBtn() {
      const { data: res } = await this.$http.post('/api/userOrgRelation/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addUserOrgRelationForm = res.data
      this.addUserOrgRelationForm.projectId = this.projectId
      this.addUserOrgRelationDV = true
    },
    addUserOrgRelation() {
      this.$refs.addUserOrgRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userOrgRelation/add', this.addUserOrgRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addUserOrgRelationDV = false
        this.getUserOrgRelationList()
      })
    },
    editUserOrgRelationDVClose() {
      this.$refs.editUserOrgRelationFormRef.resetFields()
    },
    handleClose() {

    },
    async editUserOrgRelationDVShow(id) {
      this.editUserOrgRelationDV = true
      this.editUserOrgRelationForm.id = id
      const { data: res } = await this.$http.post('/api/userOrgRelation/getbykey', this.editUserOrgRelationForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editUserOrgRelationForm = res.data
    },
    editUserOrgRelation() {
      this.$refs.editUserOrgRelationFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/userOrgRelation/upbykey', this.editUserOrgRelationForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editUserOrgRelationDV = false
        this.getUserOrgRelationList()
        this.$message.success(res.message)
      })
    },
    delUserOrgRelationById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/userOrgRelation/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserOrgRelationList()
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
