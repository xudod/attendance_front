<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限功能资源管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div style="margin-bottom: 15px;">
        <span style="margin-right: 10px">当前系统</span>
        <el-select v-model="selectedSys" @change="sysChange" placeholder="请选择">
          <el-option v-for="item in sysList" :key="item.id" :label="item.name" :value="item.code">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          </el-option>
        </el-select>
      </div>
      <el-table :data="FunResourceList" stripe border size="mini" empty-text="暂无数据" row-key="code" :tree-props="{children: 'funResourceTreeVoList'}">
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column label="中文名称" prop="showNameCn" width="280px"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="英文名称" prop="showNameEn"></el-table-column>
        <el-table-column label="功能编码" prop="code"></el-table-column>
        <el-table-column label="功能类型" prop="type"></el-table-column>
        <el-table-column label="路由地址" prop="url"></el-table-column>
        <!-- <el-table-column label="所属系统" prop="belongSys"></el-table-column> -->
        <el-table-column label="父级" prop="pid"></el-table-column>
        <el-table-column label="图标编号" prop="imgNum"></el-table-column>
        <!-- <el-table-column label="系统id" prop="pertainSys"></el-table-column> -->
        <el-table-column label="功能级别" prop="level"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="FunResourceStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addFunResourceBtn(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFunResourceDVShow(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delFunResourceById(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog v-el-drag-dialog title="添加权限功能资源管理" :visible.sync="addFunResourceDV" width="750px" :before-close="handleClose" @close="addFunResourceDVClose">
      <el-form inline :model="addFunResourceForm" :rules="addFunResourceFormRules" ref="addFunResourceFormRef" label-width="120px" size="small">
        <el-form-item label="新建级别">
          <el-radio v-model="radio" label="1" @change="funLevelChange">新建为同级</el-radio>
          <el-radio v-model="radio" label="2" @change="funLevelChange">新建为子级</el-radio>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="addFunResourceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="showNameCn">
          <el-input v-model="addFunResourceForm.showNameCn"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="showNameEn">
          <el-input v-model="addFunResourceForm.showNameEn"></el-input>
        </el-form-item>
        <el-form-item label="功能编码" prop="code">
          <el-input v-model="addFunResourceForm.code"></el-input>
        </el-form-item>
        <el-form-item label="功能类型" prop="type">
          <el-select v-model="addFunResourceForm.type" placeholder="请选择功能类型">
            <el-option :label="item.name" :value="item.code" v-for="item in funType" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路由地址" prop="url">
          <el-input v-model="addFunResourceForm.url"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属系统" prop="belongSys">
          <el-input v-model="addFunResourceForm.belongSys"></el-input>
        </el-form-item> -->
        <el-form-item label="父级" prop="pid">
          <el-input v-model="addFunResourceForm.pid" readonly></el-input>
        </el-form-item>
        <el-form-item label="图标编号" prop="imgNum">
          <el-input v-model="addFunResourceForm.imgNum"></el-input>
        </el-form-item>
        <!-- <el-form-item label="系统id" prop="pertainSys">
          <el-input v-model="addFunResourceForm.pertainSys"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="功能级别" prop="level">
          <el-input v-model="addFunResourceForm.level"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFunResourceDV = false">取 消</el-button>
        <el-button type="primary" @click="addFunResource">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-el-drag-dialog title="编辑权限功能资源管理" :visible.sync="editFunResourceDV" width="750px" @close="editFunResourceDVClose">
      <el-form inline :model="editFunResourceForm" :rules="editFunResourceFormRules" ref="editFunResourceFormRef" label-width="120px" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editFunResourceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="showNameCn">
          <el-input v-model="editFunResourceForm.showNameCn"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="showNameEn">
          <el-input v-model="editFunResourceForm.showNameEn"></el-input>
        </el-form-item>
        <el-form-item label="功能编码" prop="code">
          <el-input v-model="editFunResourceForm.code"></el-input>
        </el-form-item>
        <el-form-item label="功能类型" prop="type">
          <el-select v-model="editFunResourceForm.type" placeholder="请选择功能类型">
            <el-option :label="item.name" :value="item.code" v-for="item in funType" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="路由地址" prop="url">
          <el-input v-model="editFunResourceForm.url"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属系统" prop="belongSys">
          <el-input v-model="editFunResourceForm.belongSys"></el-input>
        </el-form-item> -->
        <el-form-item label="父级" prop="pid">
          <el-input v-model="editFunResourceForm.pid"></el-input>
        </el-form-item>
        <el-form-item label="图标编号" prop="imgNum">
          <el-input v-model="editFunResourceForm.imgNum"></el-input>
        </el-form-item>
        <!-- <el-form-item label="系统id" prop="pertainSys">
          <el-input v-model="editFunResourceForm.pertainSys"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="功能级别" prop="level">
          <el-input v-model="editFunResourceForm.level"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editFunResourceDV = false">取 消</el-button>
        <el-button type="primary" @click="editFunResource">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  directives: { elDragDialog },
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
      FunResourceList: [],
      addFunResourceDV: false,
      addFunResourceForm: {
        name: '',
        showNameCn: '',
        showNameEn: '',
        code: '',
        type: '',
        url: '',
        belongSys: '',
        pid: '',
        imgNum: '',
        pertainSys: '',
        level: ''
      },
      addFunResourceFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        showNameCn: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        showNameEn: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        type: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        url: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        belongSys: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        pid: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        imgNum: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        pertainSys: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        level: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editFunResourceDV: false,
      editFunResourceForm: {
        name: '',
        showNameCn: '',
        showNameEn: '',
        code: '',
        type: '',
        url: '',
        belongSys: '',
        pid: '',
        imgNum: '',
        pertainSys: '',
        level: ''
      },
      editFunResourceFormRules: {
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        showNameCn: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        showNameEn: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        code: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        type: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        url: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        belongSys: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        pid: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        imgNum: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        pertainSys: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        level: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      sysList: [],
      selectedSys: '',
      funResourceTree: {},
      props: {
        label: 'showNameCn',
        children: 'funResourceTreeVoList'
      },
      radio: '',
      funPid: '',
      funCode: '',
      funType: []
    }
  },
  created() {
    // this.getFunResourceList()
    this.getSysList()
    this.getFunType()
  },
  methods: {
    async getFunType() {
      const { data: res } = await this.$http.post('/api/baseManyMdata/getmanymdata', { mdataGroupCode: 'FUN_RES_TYPE' })
      if (res.code !== 200) return this.$message.error(res.message)
      this.funType = res.data
    },
    funLevelChange(val) {
      if (val === '1') {
        this.addFunResourceForm.pid = this.funPid
        this.editFunResourceForm.pid = this.funPid
      }
      if (val === '2') {
        this.addFunResourceForm.pid = this.funCode
        this.editFunResourceForm.pid = this.funPid
      }
    },
    sysChange(value) {
      this.selectedSys = value
      this.getFunResourceList()
    },
    async getSysList() {
      const { data: res } = await this.$http.post('/api/appSysinfoMdata/getall', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.sysList = res.data
      this.selectedSys = res.data[0].code
      this.sysChange(this.selectedSys)
    },
    async getFunResourceList() {
      const { data: res } = await this.$http.post('/api/funResource/getalltree', { sysCode: this.selectedSys })
      if (res.code !== 200) return this.$message.error(res.message)
      this.FunResourceList = res.data
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getFunResourceList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getFunResourceList()
    },
    async FunResourceStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/funResource/upstatebykey', domaimInfo)
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
        message: '更新权限功能资源管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getFunResourceList()
    },
    addFunResourceDVClose() {
      this.$refs.addFunResourceFormRef.resetFields()
    },
    addFunResourceBtn(rowObj) {
      this.funCode = rowObj.code
      this.funPid = rowObj.pid
      this.addFunResourceForm.belongSys = this.selectedSys
      this.addFunResourceDV = true
    },
    addFunResource() {
      this.$refs.addFunResourceFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/funResource/add', this.addFunResourceForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addFunResourceDV = false
        this.getFunResourceList()
      })
    },
    editFunResourceDVClose() {
      this.$refs.editFunResourceFormRef.resetFields()
    },
    handleClose() {

    },
    async editFunResourceDVShow(rowObj) {
      debugger
      this.editFunResourceDV = true
      this.editFunResourceForm.id = rowObj.id
      const { data: res } = await this.$http.post('/api/funResource/getbykey', this.editFunResourceForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editFunResourceForm = res.data
    },
    editFunResource() {
      this.$refs.editFunResourceFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/funResource/upbykey', this.editFunResourceForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editFunResourceDV = false
        this.getFunResourceList()
        this.$message.success(res.message)
      })
    },
    delFunResourceById(rowObj) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/funResource/delbykey', { id: rowObj.id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getFunResourceList()
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
