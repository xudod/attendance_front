<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>假期调班管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addHolidayAndSpellDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加假期调班管理</el-button>
      </div>
      <el-table :data="HolidayAndSpellList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="状态" prop="hStatus"></el-table-column>
        <el-table-column label="日期" prop="holiorspellDate"></el-table-column>
        <el-table-column label="中文名称" prop="daynameCn"></el-table-column>
        <el-table-column label="英文名称" prop="daynameEn"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="HolidayAndSpellStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editHolidayAndSpellDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delHolidayAndSpellById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加假期调班管理" :visible.sync="addHolidayAndSpellDV" width="750px" :before-close="handleClose" @close="addHolidayAndSpellDVClose">
      <el-form inline :model="addHolidayAndSpellForm" :rules="addHolidayAndSpellFormRules" ref="addHolidayAndSpellFormRef" label-width="120px" size="small">
        <el-form-item label="状态" prop="hStatus">
          <el-input v-model="addHolidayAndSpellForm.hStatus"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="holiorspellDate">
          <el-input v-model="addHolidayAndSpellForm.holiorspellDate"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="daynameCn">
          <el-input v-model="addHolidayAndSpellForm.daynameCn"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="daynameEn">
          <el-input v-model="addHolidayAndSpellForm.daynameEn"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHolidayAndSpellDV = false">取 消</el-button>
        <el-button type="primary" @click="addHolidayAndSpell">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑假期调班管理" :visible.sync="editHolidayAndSpellDV" width="750px" @close="editHolidayAndSpellDVClose">
      <el-form inline :model="editHolidayAndSpellForm" :rules="editHolidayAndSpellFormRules" ref="editHolidayAndSpellFormRef" label-width="120px" size="small">
        <el-form-item label="状态" prop="hStatus">
          <el-input v-model="editHolidayAndSpellForm.hStatus"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="holiorspellDate">
          <el-input v-model="editHolidayAndSpellForm.holiorspellDate"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="daynameCn">
          <el-input v-model="editHolidayAndSpellForm.daynameCn"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="daynameEn">
          <el-input v-model="editHolidayAndSpellForm.daynameEn"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editHolidayAndSpellDV = false">取 消</el-button>
        <el-button type="primary" @click="editHolidayAndSpell">确 定</el-button>
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
      HolidayAndSpellList: null,
      addHolidayAndSpellDV: false,
      addHolidayAndSpellForm: {
        hStatus: '',
        holiorspellDate: '',
        daynameCn: '',
        daynameEn: ''
      },
      addHolidayAndSpellFormRules: {
        hStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        holiorspellDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        daynameCn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        daynameEn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editHolidayAndSpellDV: false,
      editHolidayAndSpellForm: {
        hStatus: '',
        holiorspellDate: '',
        daynameCn: '',
        daynameEn: ''
      },
      editHolidayAndSpellFormRules: {
        hStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        holiorspellDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        daynameCn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        daynameEn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getHolidayAndSpellList()
  },
  methods: {
    async getHolidayAndSpellList() {
      const { data: res } = await this.$http.post('/api/holidayAndSpell/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.HolidayAndSpellList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getHolidayAndSpellList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getHolidayAndSpellList()
    },
    async HolidayAndSpellStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/holidayAndSpell/upstatebykey', domaimInfo)
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
        message: '更新假期调班管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getHolidayAndSpellList()
    },
    addHolidayAndSpellDVClose() {
      this.$refs.addHolidayAndSpellFormRef.resetFields()
    },
    async addHolidayAndSpellBtn() {
      const { data: res } = await this.$http.post('/api/holidayAndSpell/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addHolidayAndSpellForm = res.data
      this.addHolidayAndSpellForm.projectId = this.projectId
      this.addHolidayAndSpellDV = true
    },
    addHolidayAndSpell() {
      this.$refs.addHolidayAndSpellFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/holidayAndSpell/add', this.addHolidayAndSpellForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addHolidayAndSpellDV = false
        this.getHolidayAndSpellList()
      })
    },
    editHolidayAndSpellDVClose() {
      this.$refs.editHolidayAndSpellFormRef.resetFields()
    },
    handleClose() {

    },
    async editHolidayAndSpellDVShow(id) {
      this.editHolidayAndSpellDV = true
      this.editHolidayAndSpellForm.id = id
      const { data: res } = await this.$http.post('/api/holidayAndSpell/getbykey', this.editHolidayAndSpellForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editHolidayAndSpellForm = res.data
    },
    editHolidayAndSpell() {
      this.$refs.editHolidayAndSpellFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/holidayAndSpell/upbykey', this.editHolidayAndSpellForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editHolidayAndSpellDV = false
        this.getHolidayAndSpellList()
        this.$message.success(res.message)
      })
    },
    delHolidayAndSpellById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/holidayAndSpell/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getHolidayAndSpellList()
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
