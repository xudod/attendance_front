<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>多键值信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addBaseManyMdataBtn" style="margin-right: 20px; margin-bottom: 15px;">添加多键值信息管理</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="4">
            <el-menu @select="selectMdataGroup" active-text-color="#3CA7FF" unique-opened :default-active="active">
              <el-menu-item :index="item.groupCode" v-for="item in BaseManyMdataGroupList" :key="item.groupCode">
                <span>{{item.groupName}}-{{item.groupCode}}</span>
              </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20">
          <el-table :data="BaseManyMdataList" stripe border size="mini">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <!-- <el-table-column label="所在组id" prop="groupId"></el-table-column> -->
            <el-table-column label="编码" prop="code"></el-table-column>
            <el-table-column label="编码值" prop="value"></el-table-column>
            <el-table-column label="状态" width="80px">
              <template slot-scope='scope'>
                <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="BaseManyMdataStateChange(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope='scope'>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBaseManyMdataDVShow(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delBaseManyMdataById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="添加多键值信息管理" :visible.sync="addBaseManyMdataDV" width="750px" :before-close="handleClose" @close="addBaseManyMdataDVClose">
      <el-form inline :model="addBaseManyMdataForm" :rules="addBaseManyMdataFormRules" ref="addBaseManyMdataFormRef" label-width="120px" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addBaseManyMdataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所在组code" prop="groupCode">
          <el-input v-model="addBaseManyMdataForm.groupCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="addBaseManyMdataForm.code"></el-input>
        </el-form-item>
        <el-form-item label="编码值" prop="value">
          <el-input v-model="addBaseManyMdataForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBaseManyMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="addBaseManyMdata">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑多键值信息管理" :visible.sync="editBaseManyMdataDV" width="750px" @close="editBaseManyMdataDVClose">
      <el-form inline :model="editBaseManyMdataForm" :rules="editBaseManyMdataFormRules" ref="editBaseManyMdataFormRef" label-width="120px" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editBaseManyMdataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所在组code" prop="groupCode">
          <el-input v-model="editBaseManyMdataForm.groupCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="editBaseManyMdataForm.code"></el-input>
        </el-form-item>
        <el-form-item label="编码值" prop="value">
          <el-input v-model="editBaseManyMdataForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBaseManyMdataDV = false">取 消</el-button>
        <el-button type="primary" @click="editBaseManyMdata">确 定</el-button>
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
      active: '',
      BaseManyMdataList: null,
      BaseManyMdataGroupList: null,
      addBaseManyMdataDV: false,
      mdataGroupStyle: {
        height: ''
      },
      addBaseManyMdataForm: {
        name: '',
        groupCode: '',
        code: '',
        value: ''
      },
      addBaseManyMdataFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        // groupId: [
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        value: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editBaseManyMdataDV: false,
      editBaseManyMdataForm: {
        name: '',
        groupCode: '',
        code: '',
        value: ''
      },
      editBaseManyMdataFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        // groupId: [
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        value: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      selectedMdataGroupName: ''
    }
  },
  created() {
    // this.getBaseManyMdataList()
    this.getBaseManyMdataGroupList()
  },
  methods: {
    selectMdataGroup(groupCode) {
      this.queryInfo.query = groupCode
      this.addBaseManyMdataForm.groupCode = groupCode
      this.getBaseManyMdataList()
    },
    async getBaseManyMdataGroupList() {
      const { data: res } = await this.$http.post('/api/baseGroupMdata/getall', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.BaseManyMdataGroupList = res.data
      this.active = res.data[0].groupCode
      this.queryInfo.query = res.data[0].groupCode
      this.addBaseManyMdataForm.groupCode = res.data[0].groupCode
      this.getBaseManyMdataList()
    },
    async getBaseManyMdataList() {
      const { data: res } = await this.$http.post('/api/baseManyMdata/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.BaseManyMdataList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getBaseManyMdataList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getBaseManyMdataList()
    },
    async BaseManyMdataStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/baseManyMdata/upstatebykey', domaimInfo)
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
        message: '更新多键值信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getBaseManyMdataList()
    },
    addBaseManyMdataDVClose() {
      this.$refs.addBaseManyMdataFormRef.resetFields()
    },
    addBaseManyMdataBtn() {
      const groupCode = this.addBaseManyMdataForm.groupCode
      if (groupCode === '' || groupCode === null || groupCode === undefined) {
        this.$message.error('请选择一个多键值信息组，作为新建数据的父级')
      }
      this.addBaseManyMdataDV = true
    },
    addBaseManyMdata() {
      this.$refs.addBaseManyMdataFormRef.validate(async valid => {
        if (!valid) return false
        const addObj = this.addBaseManyMdataForm
        addObj.groupCode = this.queryInfo.query
        const { data: res } = await this.$http.post('/api/baseManyMdata/add', addObj)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addBaseManyMdataDV = false
        this.getBaseManyMdataList()
      })
    },
    editBaseManyMdataDVClose() {
      this.$refs.editBaseManyMdataFormRef.resetFields()
    },
    handleClose() {

    },
    async editBaseManyMdataDVShow(id) {
      this.editBaseManyMdataDV = true
      this.editBaseManyMdataForm.id = id
      const { data: res } = await this.$http.post('/api/baseManyMdata/getbykey', this.editBaseManyMdataForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editBaseManyMdataForm = res.data
    },
    editBaseManyMdata() {
      this.$refs.editBaseManyMdataFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/baseManyMdata/upbykey', this.editBaseManyMdataForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editBaseManyMdataDV = false
        this.getBaseManyMdataList()
        this.$message.success(res.message)
      })
    },
    delBaseManyMdataById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/baseManyMdata/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getBaseManyMdataList()
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
.el-menu-item {
  height: 30px;
  line-height: 30px;
}
</style>
