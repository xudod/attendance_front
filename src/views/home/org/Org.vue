<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div style="margin-bottom: 15px;">
        <span style="margin-right: 10px">当前组织维度</span>
        <el-select v-model="selectedOrgDimension" @change="orgDimensionChange" placeholder="请选择">
          <el-option v-for="item in orgDimensionList" :key="item.id" :label="item.name" :value="item.code">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          </el-option>
        </el-select>
        <el-button type="primary" @click="addOrgDV = true" style="float:right;">新建根组织（未）</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-tree @node-click="treeClick" :data="orgTree" :node-key="orgTree.id" :props="props" :load="loadNode" lazy :expand-on-click-node="expandOnClickNode" empty-text="暂无数据">
            <div class="custom-tree-node" slot-scope="{ node, data }" style="width: 100%">
              <div class="fl" style="float:left;" :title="node.label" v-html="cutout(node.label)"></div>
              <div class="fr" @click="addOrgDVShow(node, data, 0)" style="text-align:center;width:15px;margin-right: 10px;background-color: #ddd; float:right;">-</div>
              <div class="fr" @click="addOrgDVShow(node, data, 0)" style="text-align:center;width:15px;margin-right: 10px;background-color: #ddd; float:right;">^</div>
              <div class="fr" @click="addOrgDVShow(node, data, 0)" style="text-align:center;width:15px;margin-right: 10px;background-color: #ddd; float:right;">+</div>
                <!-- <el-button type="primary" plain size="mini" @click="() => addDialogShow(node, data, 1)">
                  更新
                </el-button>
                <el-button disabled type="danger" size="mini" @click="() => remove(node, data)">
                  删除
                </el-button> -->
            </div>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <el-table :data="OrgList" stripe border size="mini">
            <el-table-column label="序号" type="index"></el-table-column>
            <!-- <el-table-column label="主数据编码" prop="mdmCode"></el-table-column> -->
            <!-- <el-table-column label="单位代码" prop="rankCode"></el-table-column> -->
            <el-table-column label="单位名称" prop="name"></el-table-column>
            <el-table-column label="电话号码" prop="telephone" width="80px"></el-table-column>
            <!-- <el-table-column label="统一社会信用代码" prop="creditCode"></el-table-column> -->
            <!-- <el-table-column label="所属行业" prop="industry"></el-table-column> -->
            <!-- <el-table-column label="机构级别" prop="level"></el-table-column> -->
            <!-- <el-table-column label="单位负责人编码" prop="chargeCode"></el-table-column> -->
            <!-- <el-table-column label="注册资本" prop="registeredCapital"></el-table-column> -->
            <!-- <el-table-column label="法人代表" prop="legalRepresentative"></el-table-column> -->
            <el-table-column label="单位类型" prop="type" width="80px">
              <template slot-scope='scope'>
                <span :key="item.id" v-for="item in unitType">
                  <span v-if="scope.row.type === item.code">{{item.name}}</span>
                </span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="有效日期起" prop="effectiveDateStart"></el-table-column> -->
            <!-- <el-table-column label="有效日期止" prop="effectiveDateEnd"></el-table-column> -->
            <!-- <el-table-column label="组织机构ID" prop="fromSysHrId"></el-table-column>
        <el-table-column label="主数据系统id" prop="fromSysMdmId"></el-table-column> -->
            <!-- <el-table-column label="单位类型标识" prop="typeMark"></el-table-column> -->
            <el-table-column label="单位负责人" prop="chargeName"></el-table-column>
            <!-- <el-table-column label="上级单位id" prop="superiorId"></el-table-column> -->
            <!-- <el-table-column label="上级单位代码" prop="superiorRankCode"></el-table-column> -->
            <!-- <el-table-column label="上级单位编码" prop="superiorCode"></el-table-column> -->
            <!-- <el-table-column label="上级单位名称" prop="superiorName"></el-table-column> -->
            <!-- <el-table-column label="所属产业编码" prop="produceCode"></el-table-column> -->
            <!-- <el-table-column label="所属产业名称" prop="produceName"></el-table-column> -->
            <!-- <el-table-column label="所属区域" prop="area" width="80px"></el-table-column> -->
            <el-table-column label="状态" width="80px">
              <template slot-scope='scope'>
                <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="OrgStateChange(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope='scope'>
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrgDVShow(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delOrgById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <el-drawer title="新建组织" size="60%" :visible.sync="addOrgDV" direction="btt" @close="addOrgDVClose">
      <el-form inline :model="addOrgForm" :rules="addOrgFormRules" ref="addOrgFormRef" label-width="150px" size="small">
        <!-- <el-form-item label="主数据编码" prop="mdmCode">
          <el-input v-model="addOrgForm.mdmCode"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="单位代码" prop="rankCode">
          <el-input v-model="addOrgForm.rankCode"></el-input>
        </el-form-item> -->
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="addOrgForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单位电话号码" prop="telephone">
          <el-input v-model="addOrgForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model="addOrgForm.creditCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属行业" prop="industry">
          <el-input v-model="addOrgForm.industry"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="机构级别" prop="level">
          <el-input v-model="addOrgForm.level"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="单位负责人编码" prop="chargeCode">
          <el-input v-model="addOrgForm.chargeCode"></el-input>
        </el-form-item> -->
        <el-form-item label="注册资本" prop="registeredCapital">
          <el-input v-model="addOrgForm.registeredCapital"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" prop="legalRepresentative">
          <el-input v-model="addOrgForm.legalRepresentative"></el-input>
        </el-form-item>
        <el-form-item label="单位类型" prop="type">
          <el-select v-model="addOrgForm.type" placeholder="请选择单位类型" width="200px">
            <el-option :label="item.name" :value="item.code" v-for="item in unitType" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="有效日期起" prop="effectiveDateStart">
          <el-input v-model="addOrgForm.effectiveDateStart"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="有效日期止" prop="effectiveDateEnd">
          <el-input v-model="addOrgForm.effectiveDateEnd"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="组织机构ID" prop="fromSysHrId">
          <el-input v-model="addOrgForm.fromSysHrId"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="主数据系统id" prop="fromSysMdmId">
          <el-input v-model="addOrgForm.fromSysMdmId"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="单位类型标识" prop="typeMark">
          <el-input v-model="addOrgForm.typeMark"></el-input>
        </el-form-item> -->
        <el-form-item label="单位负责人" prop="chargeName">
          <el-input v-model="addOrgForm.chargeName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级单位id" prop="superiorId">
          <el-input v-model="addOrgForm.superiorId"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="上级单位代码" prop="superiorRankCode">
          <el-input v-model="addOrgForm.superiorRankCode"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="上级单位编码" prop="superiorCode">
          <el-input v-model="addOrgForm.superiorCode"></el-input>
        </el-form-item> -->
        <el-form-item label="上级单位名称" prop="superiorName">
          <el-input v-model="addOrgForm.superiorName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属产业编码" prop="produceCode">
          <el-input v-model="addOrgForm.produceCode"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="所属产业名称" prop="produceName">
          <el-input v-model="addOrgForm.produceName"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="所属区域" prop="area">
          <el-input v-model="addOrgForm.area"></el-input>
        </el-form-item> -->
      </el-form>
      <div style="float:right; margin-right:100px">
        <el-button @click="addOrgDV = false">取 消</el-button>
        <el-button type="primary" @click="addOrg">确 定</el-button>
      </div>
    </el-drawer>
    <el-drawer title="编辑组织" size="60%" :visible.sync="editOrgDV" direction="btt" @close="editOrgDVClose">
      <!-- <el-dialog title="编辑组织信息管理" :visible.sync="editOrgDV" width="750px" @close="editOrgDVClose"> -->
      <el-form inline :model="editOrgForm" :rules="editOrgFormRules" ref="editOrgFormRef" label-width="120px" size="small">
        <!-- <el-form-item label="主数据编码" prop="mdmCode">
          <el-input v-model="editOrgForm.mdmCode"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="单位代码" prop="rankCode">
          <el-input v-model="editOrgForm.rankCode"></el-input>
        </el-form-item> -->
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="editOrgForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单位电话号码" prop="telephone">
          <el-input v-model="editOrgForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model="editOrgForm.creditCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属行业" prop="industry">
          <el-input v-model="editOrgForm.industry"></el-input>
        </el-form-item>
        <el-form-item label="机构级别" prop="level">
          <el-input v-model="editOrgForm.level"></el-input>
        </el-form-item>
        <el-form-item label="单位负责人编码" prop="chargeCode">
          <el-input v-model="editOrgForm.chargeCode"></el-input>
        </el-form-item> -->
        <el-form-item label="注册资本" prop="registeredCapital">
          <el-input v-model="editOrgForm.registeredCapital"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" prop="legalRepresentative">
          <el-input v-model="editOrgForm.legalRepresentative"></el-input>
        </el-form-item>
        <el-form-item label="单位类型" prop="type">
          <el-select v-model="editOrgForm.type" placeholder="请选择单位类型">
            <el-option :label="item.name" :value="item.code" v-for="item in unitType" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="有效日期起" prop="effectiveDateStart">
          <el-input v-model="editOrgForm.effectiveDateStart"></el-input>
        </el-form-item>
        <el-form-item label="有效日期止" prop="effectiveDateEnd">
          <el-input v-model="editOrgForm.effectiveDateEnd"></el-input>
        </el-form-item>
        <el-form-item label="组织机构ID" prop="fromSysHrId">
          <el-input v-model="editOrgForm.fromSysHrId"></el-input>
        </el-form-item>
        <el-form-item label="主数据系统id" prop="fromSysMdmId">
          <el-input v-model="editOrgForm.fromSysMdmId"></el-input>
        </el-form-item>
        <el-form-item label="单位类型标识" prop="typeMark">
          <el-input v-model="editOrgForm.typeMark"></el-input>
        </el-form-item> -->
        <el-form-item label="单位负责人" prop="chargeName">
          <el-input v-model="editOrgForm.chargeName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级单位id" prop="superiorId">
          <el-input v-model="editOrgForm.superiorId"></el-input>
        </el-form-item>
        <el-form-item label="上级单位代码" prop="superiorRankCode">
          <el-input v-model="editOrgForm.superiorRankCode"></el-input>
        </el-form-item>
        <el-form-item label="上级单位编码" prop="superiorCode">
          <el-input v-model="editOrgForm.superiorCode"></el-input>
        </el-form-item> -->
        <el-form-item label="上级单位名称" prop="superiorName">
          <el-input v-model="editOrgForm.superiorName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属产业编码" prop="produceCode">
          <el-input v-model="editOrgForm.produceCode"></el-input>
        </el-form-item>
        <el-form-item label="所属产业名称" prop="produceName">
          <el-input v-model="editOrgForm.produceName"></el-input>
        </el-form-item>
        <el-form-item label="所属区域" prop="area">
          <el-input v-model="editOrgForm.area"></el-input>
        </el-form-item> -->
      </el-form>
      <div style="float:right; margin-right:100px">
        <el-button @click="editOrgDV = false">取 消</el-button>
        <el-button type="primary" @click="editOrg">确 定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orgDimensionList: [],
      selectedOrgDimension: '',
      // 表和树查询条件多的时候，用这个条件转换成jsonstr，后台分页接收后处理。如果是直接接收对象，则不用处理
      queryObj: {},
      queryInfo: {
        query: '',
        // 当前的页数
        current: 1,
        // 当前每页显示多少条数据
        size: 10
      },
      total: 0,
      props: {
        label: 'name',
        children: 'orgList'
      },
      orgTree: [],
      OrgList: null,
      addOrgDV: false,
      addOrgForm: {
        mdmCode: '',
        rankCode: '',
        name: '',
        telephone: '',
        creditCode: '',
        industry: '',
        level: '',
        chargeCode: '',
        registeredCapital: '',
        legalRepresentative: '',
        type: '',
        effectiveDateStart: '',
        effectiveDateEnd: '',
        fromSysHrId: '',
        fromSysMdmId: '',
        typeMark: '',
        chargeName: '',
        superiorId: '',
        superiorRankCode: '',
        superiorCode: '',
        superiorName: '',
        produceCode: '',
        produceName: '',
        area: ''
      },
      addOrgFormRules: {
        mdmCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        rankCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        telephone: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        creditCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        industry: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        level: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        chargeCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        registeredCapital: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        legalRepresentative: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        type: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        effectiveDateStart: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        effectiveDateEnd: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        fromSysHrId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        fromSysMdmId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        typeMark: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        chargeName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorRankCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        produceCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        produceName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        area: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editOrgDV: false,
      editOrgForm: {
        mdmCode: '',
        rankCode: '',
        name: '',
        telephone: '',
        creditCode: '',
        industry: '',
        level: '',
        chargeCode: '',
        registeredCapital: '',
        legalRepresentative: '',
        type: '',
        effectiveDateStart: '',
        effectiveDateEnd: '',
        fromSysHrId: '',
        fromSysMdmId: '',
        typeMark: '',
        chargeName: '',
        superiorId: '',
        superiorRankCode: '',
        superiorCode: '',
        superiorName: '',
        produceCode: '',
        produceName: '',
        area: ''
      },
      editOrgFormRules: {
        mdmCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        rankCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        name: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        telephone: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        creditCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        industry: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        level: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        chargeCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        registeredCapital: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        legalRepresentative: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        type: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        effectiveDateStart: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        effectiveDateEnd: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        fromSysHrId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        fromSysMdmId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        typeMark: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        chargeName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorId: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorRankCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        superiorName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        produceCode: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        produceName: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        area: [
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      pid: null, // 基础类型得父级id
      flag: null, // 操作标志位
      node: {}, // tree 节点对象
      nodedata: {},
      unitType: [],
      expandOnClickNode: false
    }
  },
  created() {
    this.getOrgDimensionFromMdataGroup()
    this.getUnitType()
  },
  methods: {
    cutout(val) {
      const a = (val + '').length
      if (a > 13) {
        val = val.substring(0, 13) + '...'
      }
      return val
    },
    addOrgDVShow(node, data, flag) {
      this.node = node //
      this.nodedata = data
      if (flag === 0) {
        this.addOrgDV = true
        this.pid = data.Id

        this.flag = 0
      }
      if (flag === 1) {
        this.addOrgDV = true
        this.pid = data.Id
        this.addForm.name = data.Name
        this.flag = 1
      }
    },
    async getUnitType() {
      const { data: res } = await this.$http.post('/api/baseManyMdata/getmanymdata', { mdataGroupCode: 'UNIT_TYPE' })
      if (res.code !== 200) return this.$message.error(res.message)
      this.unitType = res.data
    },
    async orgDimensionChange(value) {
      this.queryObj = {}
      this.queryObj.orgDimension = value
      this.orgTree = []
      this.OrgList = []
      this.getOrgTree()
      this.getOrgList()
    },
    async getOrgDimensionFromMdataGroup() {
      const { data: res } = await this.$http.post('/api/baseManyMdata/getmanymdata', { mdataGroupCode: 'ORG_DIMENSION' })
      if (res.code !== 200) return this.$message.error(res.message)
      this.orgDimensionList = res.data
      this.selectedOrgDimension = res.data[0].code
      this.queryObj.orgDimension = res.data[0].code
    },
    treeClick(obj, node, resolve) {
      this.queryObj.superiorCode = obj.mdmCode
      this.getOrgList()
    },
    async loadNode(node, resolve) {
      const mdmCode = node.data.mdmCode
      this.queryObj.superiorCode = mdmCode
      const { data: res } = await this.$http.post('/api/org/gettree', this.queryObj)
      if (res.code !== 200) return this.$message.error(res.message)
      resolve(res.data)
      this.getOrgList()
      node.loaded = false
    },
    async getOrgList() {
      this.queryInfo.query = JSON.stringify(this.queryObj)
      const { data: res } = await this.$http.post('/api/org/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.OrgList = res.data.records
      this.total = res.data.total
    },
    async getOrgTree() {
      const { data: res } = await this.$http.post('/api/org/gettree', this.queryObj)
      if (res.code !== 200) return this.$message.error(res.message)
      this.orgTree = res.data
      // console.log(this.node_had)
      // console.log(this.resolve_had)
      // if (JSON.stringify(this.resolve_had) === {}) {
      //   this.orgTree = res.data
      // } else {
      //   this.resolve_had(res.data)
      // }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getOrgList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getOrgList()
    },
    async OrgStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/org/upstatebykey', domaimInfo)
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
        message: '更新组织信息管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getOrgList()
    },
    addOrgDVClose() {
      this.$refs.addOrgFormRef.resetFields()
    },
    // async addOrgBtn() {
    //   const { data: res } = await this.$http.post('/api/org/getbykey', { id: this.projectId })
    //   if (res.code !== 200) {
    //     this.$message.error(res.message)
    //   }
    //   res.data.id = undefined
    //   this.addOrgForm = res.data
    //   this.addOrgForm.projectId = this.projectId
    //   this.addOrgDV = true
    // },
    addOrg() {
      this.$refs.addOrgFormRef.validate(async valid => {
        if (!valid) return false
        this.addOrgForm.orgDimension = this.selectedOrgDimension
        this.addOrgForm.superiorCode = this.queryObj.superiorCode
        this.addOrgForm.id = ''
        const { data: res } = await this.$http.post('/api/org/add', this.addOrgForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        debugger
        this.addOrgForm.id = res.data
        if (!this.nodedata.orgList) {
          this.$set(this.nodedata, 'orgList', [])
        }
        this.nodedata.orgList.push(this.addOrgForm)
        // this.addOrgDV = false
        this.getOrgList()
      })
    },
    editOrgDVClose() {
      this.$refs.editOrgFormRef.resetFields()
    },
    handleClose() {

    },
    async editOrgDVShow(id) {
      this.editOrgDV = true
      this.editOrgForm.id = id
      const { data: res } = await this.$http.post('/api/org/getbykey', this.editOrgForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editOrgForm = res.data
    },
    editOrg() {
      this.$refs.editOrgFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/org/upbykey', this.editOrgForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editOrgDV = false
        this.getOrgList()
        this.$message.success(res.message)
      })
    },
    delOrgById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/org/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getOrgList()
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
.el-select {
  width: 200px;
}
</style>
