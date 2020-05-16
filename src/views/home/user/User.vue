<template>
  <div ref="contentRef" style="height: 100%">
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addUserBtn" style="margin-right: 20px; margin-bottom: 15px;">添加成员</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <p style="margin: 10px;">组织数据</p>
          <div :style="orgTreeStyleObj">
            <el-scrollbar ref="scrollbar" :style="orgTreeStyleObj">
              <el-tree ref="tree" @node-click="treeClick" :data="orgTree" node-key="mdmCode" :props="props" empty-text="暂无数据" :default-expanded-keys="defaultExpandedKeys" accordion>
                <div class="custom-tree-node" slot-scope="{ node }" style="width: 100%">
                  <div :title="node.label" v-html="cutout(node.label)"></div>
                </div>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <p style="margin: 10px;">角色数据(数据量不大，直接显示到表格里)</p>
          <el-menu @select="selectRole" active-text-color="#3CA7FF" unique-opened :default-active="activeRole">
            <el-menu-item :index="item.id" v-for="item in roleList" :key="item.id">
              <span>{{item.name}}-{{item.code}}</span>
            </el-menu-item>
          </el-menu>
        </el-col> -->
        <el-col :span="18">
          <el-table :data="UserList" stripe border size="mini" :max-height="tableStyleObj" empty-text="暂无数据">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="name">
              <template slot-scope='scope'>
                <a href="javascript:;" @click="viewBtn(scope.row)">{{scope.row.name}}</a>
              </template>
            </el-table-column>
            <el-table-column label="移动电话" prop="phone"></el-table-column>
            <el-table-column label="状态" width="80px">
              <template slot-scope='scope'>
                <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="UserStateChange(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope='scope'>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserBtn(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <el-drawer :title="userDVtitle" size="60%" :visible.sync="userDV" direction="btt" @close="userDVClose">
      <el-form inline :model="userForm" ref="userFormRef" label-width="120px" size="small">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.name : false"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="departmentName">
          <el-input v-model="userForm.departmentName" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.departmentName : false"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="userForm.postName" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.postName : false"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="userForm.gender" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.gender : false"></el-input>
        </el-form-item>
        <el-form-item label="出生日期的值" prop="burnDay">
          <el-input v-model="userForm.burnDay" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.burnDay : false"></el-input>
        </el-form-item>
        <el-form-item label="籍贯的值" prop="birthPlace">
          <el-input v-model="userForm.birthPlace" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.birthPlace : false"></el-input>
        </el-form-item>
        <el-form-item label="民族的值" prop="nation">
          <el-input v-model="userForm.nation" :readonly="readonly" :disabled="userDVstatus === 'edit' ? disabledDV.nation : false"></el-input>
        </el-form-item>
      </el-form>
      <div style="float:right; margin-right:100px">
        <el-button @click="userDV = false">取 消</el-button>
        <el-button type="primary" @click="editUserBtn(userForm.id)" v-show="edViewBtnStatus">编 辑</el-button>
        <el-button type="primary" @click="addUser" v-show="edAddBtnStatus">保 存</el-button>
        <el-button type="primary" @click="editUser" v-show="edEditBtnStatus">更 新</el-button>
      </div>
    </el-drawer>
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
      UserList: null,
      userDVtitle: '',
      userDV: false,
      userDVstatus: '',
      readonly: true,
      disabledDV: {
        name: false,
        departmentName: false,
        postName: false,
        gender: false,
        burnDay: false,
        birthPlace: true,
        nation: false
      },
      userForm: {
        name: '',
        departmentName: '',
        postName: '',
        gender: '',
        burnDay: '',
        birthPlace: '',
        nation: ''
      },
      userFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        departmentName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        postName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        gender: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        burnDay: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        birthPlace: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        nation: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      edViewBtnStatus: false,
      edAddBtnStatus: false,
      edEditBtnStatus: false,
      props: {
        label: 'name',
        children: 'orgList'
      },
      orgTree: [],
      roleList: [],
      activeRole: '',
      orgTreeStyleObj: {
        height: ''
      },
      tableStyleObj: 'auto',
      defaultExpandedKeys: []
      // defaultExpandedKey: '100001'
    }
  },
  created() {
    // this.getUserList()
    // this.getOrgTree()
    // this.getRoleList()
    this.initwebpage()
  },
  mounted() {
    const that = this
    that.setHeight()
    window.onresize = () => {
      return (() => {
        that.setHeight()
      })()
    }
  },
  methods: {
    async initwebpage() {
      const { data: res } = await this.$http.post('/api/user/initwebpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.roleList = res.data.userPage
      this.orgTree = res.data.orgTreeVoList
      this.UserList = res.data.userPage.records
      this.total = res.data.userPage.total
    },
    cutout(val) {
      const a = (val + '').length
      if (a > 18) {
        val = val.substring(0, 18) + '...'
      }
      return val
    },
    // @node-expand="currentChange"
    // currentChange() {
    //   alert('111')
    // },
    setHeight() {
      const height = this.$refs.contentRef.offsetHeight
      console.log(height)
      this.orgTreeStyleObj.height = height - 200 + 'px'
      this.tableStyleObj = height - 200 + 'px'
    },
    selectRole() {

    },
    async getRoleList() {
      const { data: res } = await this.$http.post('/api/role/getall', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.roleList = res.data
    },
    treeClick(obj, node, resolve) {
      this.queryInfo.query = obj.mdmCode
      // this.$refs.tree.setCurrentKey(obj.mdmCode)
      // this.defaultExpandedKeys = [obj.mdmCode]
      this.getUserList()
    },
    async getOrgTree() {
      const { data: res } = await this.$http.post('/api/org/getalltree', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.orgTree = res.data
    },
    async getUserList() {
      const { data: res } = await this.$http.post('/api/user/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.UserList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getUserList()
    },
    async UserStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/user/upstatebykey', domaimInfo)
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
        message: '更新成员管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getUserList()
    },
    userDVClose() {
      // 根据后边情况看要不要合一
      if (this.userDVstatus === 'add') {
        this.$refs.userFormRef.resetFields()
      }
      if (this.userDVstatus === 'edit') {
        this.$refs.userFormRef.resetFields()
      }
      if (this.userDVstatus === 'view') {
        this.$refs.userFormRef.resetFields()
      }
    },
    viewBtn(obj) {
      this.edViewBtnStatus = true
      this.edAddBtnStatus = false
      this.edEditBtnStatus = false
      this.readonly = true
      this.userDVstatus = 'view'
      this.getUserByKey(obj.id)
    },
    addUserBtn() {
      this.edViewBtnStatus = false
      this.edAddBtnStatus = true
      this.edEditBtnStatus = false
      this.readonly = false
      this.userDVtitle = '新建成员'
      this.userDV = true
      this.userDVstatus = 'add'
    },
    editUserBtn(id) {
      this.edViewBtnStatus = false
      this.edAddBtnStatus = false
      this.edEditBtnStatus = true
      this.readonly = false
      this.userDVstatus = 'edit'
      this.getUserByKey(id)
    },
    async getUserByKey(id) {
      this.userForm.id = id
      this.userDV = true
      const { data: res } = await this.$http.post('/api/user/getbykey', this.userForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.userForm = res.data
    },
    addUser() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/user/add', this.userForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.userDV = false
        this.getUserList()
      })
    },
    handleClose() {

    },
    editUser() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/user/upbykey', this.userForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editUserDV = false
        this.getUserList()
        this.$message.success(res.message)
      })
    },
    delUserById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/user/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getUserList()
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
/deep/.is-current > .el-tree-node__content > .el-tree-node__label {
  color: aqua;
  background-color: black;
}
// /deep/.is-expanded > .el-tree-node__content > .el-tree-node__label {
//   color: aqua;
//   background-color: black;
// }
</style>
