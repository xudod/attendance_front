<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>排班编码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addScheduleCodeBtn" style="margin-right: 20px; margin-bottom: 15px;">添加排班编码</el-button>
      </div>
      <el-table :data="scheduleCodeList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="排班编码" prop="scheduleCode"></el-table-column>
        <el-table-column label="中文名称" prop="scheduleName">
          <template slot-scope='scope'>
            <a href="javascript:;" @click="viewBtn(scope.row)">{{scope.row.scheduleName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="时长" prop="workTimeMin"></el-table-column>
        <el-table-column label="出勤天数" prop="attendTimeToDay"></el-table-column>
        <el-table-column label="提前开始" prop="scheduleFrontDay"></el-table-column>
        <el-table-column label="打卡段" prop="punchTimes"></el-table-column>
        <!-- <el-table-column label="人性管理" prop="permitMin"></el-table-column> -->
        <el-table-column label="迟到早退分钟" prop="lateMin" title="超过迟到早退分钟数按旷工计"></el-table-column>
        <!-- <el-table-column label="旷工分钟数" prop="wildMin"></el-table-column> -->
        <!-- <el-table-column label="休息次数" prop="restType"></el-table-column>
        <el-table-column label="休息规则" prop="workTime"></el-table-column>
        <el-table-column label="休息时长" prop="restTime"></el-table-column> -->
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="scheduleCodeStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editScheduleCodeBtn(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delScheduleCodeById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-drawer :title="scheduleCodeDVtitle" :visible.sync="scheduleCodeDV" size="60%" :before-close="handleClose" @close="scheduleCodeDVClose">
      <el-form inline :model="scheduleCodeForm" :rules="scheduleCodeFormRules" ref="scheduleCodeFormRef" label-width="120px" size="small">
        <el-form-item label="排班编码" prop="scheduleCode">
          <el-input v-model="scheduleCodeForm.scheduleCode" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.scheduleCode : false"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="scheduleName">
          <el-input v-model="scheduleCodeForm.scheduleName" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.scheduleName : false"></el-input>
        </el-form-item>
        <el-form-item label="提前打卡" title="是否在设定班次日期的前一天开始打卡" prop="scheduleFrontDay">
          <el-switch v-model="scheduleCodeForm.scheduleFrontDay" active-value="1" inactive-value="0"></el-switch>
          <span style="margin: 0 0 0 10px;">(是否在设定班次日期的前一天开始打卡)</span>
          <!-- <el-input v-model="scheduleCodeForm.scheduleFrontDay" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.scheduleFrontDay : false"></el-input> -->
        </el-form-item>
        <el-divider content-position="left">班次时间及相关设定</el-divider>
        <div style="margin:0 0 15px 20px;">
          <el-radio-group v-model="scheduleCodeForm.punchTimes" @change="punchTimesChange">
            <el-radio-button label="2">一天2次打卡</el-radio-button>
            <el-radio-button label="4">一天4次打卡</el-radio-button>
            <el-radio-button label="6">一天6次打卡</el-radio-button>
            <el-radio-button label="8">一天8次打卡</el-radio-button>
          </el-radio-group>
        </div>
        <div class="scheduleTimeForm" v-if="punchTimes === '2' || punchTimes === '4' || punchTimes === '6' || punchTimes === '8'">
          <el-form style="margin:0px !important;" inline :model="scheduleTimeForm1" :rules="scheduleTimeFormRules1" ref="scheduleTimeFormRef1" label-width="150px" size="small">
            <el-form-item label="上下班时间设定" required>
              <el-form-item prop="signInTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm1.signInTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="signOutTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm1.signOutTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="可打卡时间范围" required>
              <el-form-item prop="stratTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm1.stratTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="endTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm1.endTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="上班可不刷卡" prop="needSignIn">
              <el-switch v-model="scheduleTimeForm1.needSignIn" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="下班可不刷卡" prop="needSignOut">
              <el-switch v-model="scheduleTimeForm1.needSignOut" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="tabs_divider" v-if="punchTimes === '4' || punchTimes === '6' || punchTimes === '8'"></el-divider>
        <div class="scheduleTimeForm" v-if="punchTimes === '4' || punchTimes === '6' || punchTimes === '8'">
          <el-form style="margin:0px !important;" inline :model="scheduleTimeForm2" :rules="scheduleTimeFormRules2" ref="scheduleTimeFormRef2" label-width="150px" size="small">
            <el-form-item label="上下班时间设定" required>
              <el-form-item prop="signInTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm2.signInTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="signOutTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm2.signOutTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="可打卡时间范围" required>
              <el-form-item prop="stratTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm2.stratTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="endTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm2.endTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="上班可不刷卡" prop="needSignIn">
              <el-switch v-model="scheduleTimeForm2.needSignIn" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="下班可不刷卡" prop="needSignOut">
              <el-switch v-model="scheduleTimeForm2.needSignOut" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="tabs_divider" v-if="punchTimes === '6' || punchTimes === '8'"></el-divider>
        <div class="scheduleTimeForm" v-if="punchTimes === '6' || punchTimes === '8'">
          <el-form style="margin:0px !important;" inline :model="scheduleTimeForm3" :rules="scheduleTimeFormRules3" ref="scheduleTimeFormRef3" label-width="150px" size="small">
            <el-form-item label="上下班时间设定" required>
              <el-form-item prop="signInTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm3.signInTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="signOutTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm3.signOutTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="可打卡时间范围" required>
              <el-form-item prop="stratTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm3.stratTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="endTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm3.endTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="上班可不刷卡" prop="needSignIn">
              <el-switch v-model="scheduleTimeForm3.needSignIn" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="下班可不刷卡" prop="needSignOut">
              <el-switch v-model="scheduleTimeForm3.needSignOut" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <el-divider class="tabs_divider" v-if="punchTimes === '8'"></el-divider>
        <div class="scheduleTimeForm" v-if="punchTimes === '8'">
          <el-form style="margin:0px !important;" inline :model="scheduleTimeForm4" :rules="scheduleTimeFormRules4" ref="scheduleTimeFormRef4" label-width="150px" size="small">
            <el-form-item label="上下班时间设定" required>
              <el-form-item prop="signInTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm4.signInTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="signOutTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm4.signOutTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="可打卡时间范围" required>
              <el-form-item prop="stratTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm4.stratTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
              <span style="margin-right:10px;">~</span>
              <el-form-item prop="endTime">
                <el-time-picker placeholder="选择时间" format="HH:mm" value-format="HH:mm" v-model="scheduleTimeForm4.endTime" style="width: 150px;"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="上班可不刷卡" prop="needSignIn">
              <el-switch v-model="scheduleTimeForm4.needSignIn" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="下班可不刷卡" prop="needSignOut">
              <el-switch v-model="scheduleTimeForm4.needSignOut" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <!-- <el-divider content-position="center">休息设定</el-divider>
        <el-form-item label="休息次数" prop="restType">
          <el-input v-model="scheduleCodeForm.restType" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.restType : false"></el-input>
        </el-form-item>
        <el-form-item label="休息规则" prop="workTime">
          <el-input v-model="scheduleCodeForm.workTime" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.workTime : false"></el-input>
        </el-form-item>
        <el-form-item label="休息时长" prop="restTime">
          <el-input v-model="scheduleCodeForm.restTime" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.restTime : false"></el-input>
        </el-form-item> -->
        <el-divider content-position="left">异常判定参数设定</el-divider>
        <el-form-item label="旷工设定" prop="lateMin" title="超过该分钟数按旷工计，不设定则无旷工情况">
          <el-input v-model="scheduleCodeForm.lateMin" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.lateMin : false"></el-input>
          <span style="margin: 0 0 0 10px;">(超过该分钟数按旷工计，不设定则无旷工情况)</span>
        </el-form-item>
        <!-- <el-form-item label="旷工分钟数" prop="wildMin">
          <el-input v-model="scheduleCodeForm.wildMin" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.wildMin : false"></el-input>
        </el-form-item> -->
        <!-- <el-divider content-position="center">上班时间及折算工作日统计</el-divider> -->
        <el-divider content-position="left">汇总</el-divider>
        <el-form-item label="班次总时长:" prop="workTimeMin">
          <span style="width: 120px; margin: 0 30px 0 0;">{{scheduleCodeForm.workTimeMin}}</span>
          <!-- <el-input v-model="scheduleCodeForm.workTimeMin" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.workTimeMin : false"></el-input> -->
        </el-form-item>
        <el-form-item label="折算出勤天数" prop="attendTimeToDay">
          <span style="width: 120px; margin: 0 30px 0 0;">{{scheduleCodeForm.attendTimeToDay}}</span>
          <!-- <el-input v-model="scheduleCodeForm.attendTimeToDay" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.attendTimeToDay : false"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="人性管理" prop="permitMin">
          <el-input v-model="scheduleCodeForm.permitMin" :readonly="readonly" :disabled="scheduleCodeDVstatus === 'edit' ? disabledDV.permitMin : false"></el-input>
        </el-form-item> -->
      </el-form>
      <div style="float:right; margin-right:100px">
        <el-button @click="scheduleCodeDV = false">取 消</el-button>
        <el-button type="primary" @click="editScheduleCodeBtn(scheduleCodeForm.id)" v-show="edViewBtnStatus">编 辑</el-button>
        <el-button type="primary" @click="addScheduleCode" v-show="edAddBtnStatus">保 存</el-button>
        <el-button type="primary" @click="editScheduleCode" v-show="edEditBtnStatus">更 新</el-button>
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
      scheduleCodeList: null,
      scheduleCodeDVtitle: '',
      scheduleCodeDV: false,
      scheduleCodeDVstatus: '',
      readonly: true,
      disabledDV: {
        scheduleCode: false,
        scheduleName: false,
        workTimeMin: false,
        attendTimeToDay: false,
        scheduleFrontDay: false,
        punchTimes: false,
        // permitMin: false,
        lateMin: false
        // wildMin: false,
        // restType: false,
        // workTime: false,
        // restTime: false
      },
      scheduleCodeForm: {
        scheduleCode: '',
        scheduleName: '',
        scheduleFrontDay: '0',
        workTimeMin: '',
        attendTimeToDay: '',
        punchTimes: '',
        // permitMin: '',
        lateMin: ''
        // wildMin: '',
        // restType: '',
        // workTime: '',
        // restTime: ''
      },
      scheduleCodeFormRules: {
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 2, message: '长度不能超过 2 个字符', trigger: 'blur' }
        ],
        scheduleName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
        // workTimeMin: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // attendTimeToDay: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // scheduleFrontDay: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // punchTimes: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // permitMin: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // lateMin: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
        // wildMin: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
        // restType: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // workTime: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // restTime: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
      },
      edViewBtnStatus: false,
      edAddBtnStatus: false,
      edEditBtnStatus: false,
      scheduleTimeForm1: {
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '0',
        needSignOut: '0',
        across: ''
      },
      scheduleTimeForm2: {
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '0',
        needSignOut: '0',
        across: ''
      },
      scheduleTimeForm3: {
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '0',
        needSignOut: '0',
        across: ''
      },
      scheduleTimeForm4: {
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '0',
        needSignOut: '0',
        across: ''
      },
      scheduleTimeForm: {
        attSeqence: '',
        signInTime: '',
        signOutTime: '',
        stratTime: '',
        endTime: '',
        stratTimeElastic: '',
        endTimeElastic: '',
        needSignIn: '0',
        needSignOut: '0',
        across: ''
      },
      scheduleTimeFormRules1: {
        signInTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        signOutTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ]
        // stratTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // endTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignIn: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignOut: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
      },
      scheduleTimeFormRules2: {
        signInTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        signOutTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ]
        // stratTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // endTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignIn: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignOut: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
      },
      scheduleTimeFormRules3: {
        signInTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        signOutTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ]
        // stratTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // endTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignIn: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignOut: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
      },
      scheduleTimeFormRules4: {
        signInTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        signOutTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        stratTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' }
        ]
        // stratTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // endTimeElastic: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignIn: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ],
        // needSignOut: [
        //   { required: true, message: '该属性不能为空', trigger: 'blur' },
        //   { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        // ]
      },
      punchTimes: '2'
    }
  },
  created() {
    this.getScheduleCodeList()
    this.scheduleCodeForm.punchTimes = '2'
  },
  methods: {
    punchTimesChange() {
      this.punchTimes = this.scheduleCodeForm.punchTimes
    },
    async getScheduleCodeList() {
      const { data: res } = await this.$http.post('/api/scheduleCode/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.scheduleCodeList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getScheduleCodeList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getScheduleCodeList()
    },
    async scheduleCodeStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/scheduleCode/upstatebykey', domaimInfo)
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
        message: '更新排班编码状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getScheduleCodeList()
    },
    scheduleCodeDVClose() {
      this.$refs.scheduleCodeFormRef.resetFields()
      // 用refs清不了，只能用重新赋值的办法处理，不过效果也挺好的
      this.scheduleTimeForm1 = this.scheduleTimeForm
      this.scheduleTimeForm2 = this.scheduleTimeForm
      this.scheduleTimeForm3 = this.scheduleTimeForm
      this.scheduleTimeForm4 = this.scheduleTimeForm
      this.punchTimes = '2'
      this.scheduleCodeForm.punchTimes = '2'
    },
    // async addScheduleCodeBtn() {
    //   const { data: res } = await this.$http.post('/api/scheduleCode/getbykey', { id: this.projectId })
    //   if (res.code !== 200) {
    //     this.$message.error(res.message)
    //   }
    //   res.data.id = undefined
    //   this.addScheduleCodeForm = res.data
    //   this.addScheduleCodeForm.projectId = this.projectId
    //   this.addScheduleCodeDV = true
    // },
    viewBtn(obj) {
      this.edViewBtnStatus = true
      this.edAddBtnStatus = false
      this.edEditBtnStatus = false
      this.readonly = true
      this.scheduleCodeDVtitle = '查看排班'
      this.scheduleCodeDVstatus = 'view'
      this.getScheduleCodeByKey(obj.id)
    },
    addScheduleCodeBtn() {
      this.edViewBtnStatus = false
      this.edAddBtnStatus = true
      this.edEditBtnStatus = false
      this.readonly = false
      this.scheduleCodeDVtitle = '新建排班'
      this.scheduleCodeDV = true
      this.scheduleCodeDVstatus = 'add'
    },
    editScheduleCodeBtn(id) {
      this.edViewBtnStatus = false
      this.edAddBtnStatus = false
      this.edEditBtnStatus = true
      this.readonly = false
      this.scheduleCodeDVtitle = '编辑排班'
      this.scheduleCodeDVstatus = 'edit'
      this.getScheduleCodeByKey(id)
    },
    addScheduleCode() {
      this.$refs.scheduleCodeFormRef.validate(async valid => {
        if (!valid) return false
        debugger
        const scheduleObj = this.scheduleCodeForm
        const punchT = scheduleObj.punchTimes
        if (punchT === '2') {
          this.scheduleTimeForm1.attSeqence = '1'
          scheduleObj.scheduleTimeList = [this.scheduleTimeForm1]
        }
        if (punchT === '4') {
          this.scheduleTimeForm1.attSeqence = '1'
          this.scheduleTimeForm2.attSeqence = '2'
          scheduleObj.scheduleTimeList = [this.scheduleTimeForm1, this.scheduleTimeForm2]
        }
        if (punchT === '6') {
          this.scheduleTimeForm1.attSeqence = '1'
          this.scheduleTimeForm2.attSeqence = '2'
          this.scheduleTimeForm3.attSeqence = '3'
          scheduleObj.scheduleTimeList = [this.scheduleTimeForm1, this.scheduleTimeForm2, this.scheduleTimeForm3]
        }
        if (punchT === '8') {
          this.scheduleTimeForm1.attSeqence = '1'
          this.scheduleTimeForm2.attSeqence = '2'
          this.scheduleTimeForm3.attSeqence = '3'
          this.scheduleTimeForm4.attSeqence = '4'
          scheduleObj.scheduleTimeList = [this.scheduleTimeForm1, this.scheduleTimeForm2, this.scheduleTimeForm3, this.scheduleTimeForm4]
        }
        const { data: res } = await this.$http.post('/api/scheduleCode/add', scheduleObj)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.scheduleCodeDV = false
        this.getScheduleCodeList()
      })
    },
    handleClose() {

    },
    async getScheduleCodeByKey(id) {
      this.scheduleCodeDV = true
      this.scheduleCodeForm.id = id
      const { data: res } = await this.$http.post('/api/scheduleCode/getbykey', this.scheduleCodeForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.scheduleCodeForm = res.data
      this.punchTimes = this.scheduleCodeForm.punchTimes
      const punchT = this.punchTimes
      debugger
      if (punchT === '2') {
        this.scheduleTimeForm1 = res.data.scheduleTimeList[0]
      }
      if (punchT === '4') {
        this.scheduleTimeForm1 = res.data.scheduleTimeList[0]
        this.scheduleTimeForm2 = res.data.scheduleTimeList[1]
      }
      if (punchT === '6') {
        this.scheduleTimeForm1 = res.data.scheduleTimeList[0]
        this.scheduleTimeForm2 = res.data.scheduleTimeList[1]
        this.scheduleTimeForm3 = res.data.scheduleTimeList[2]
      }
      if (punchT === '8') {
        this.scheduleTimeForm1 = res.data.scheduleTimeList[0]
        this.scheduleTimeForm2 = res.data.scheduleTimeList[1]
        this.scheduleTimeForm3 = res.data.scheduleTimeList[2]
        this.scheduleTimeForm4 = res.data.scheduleTimeList[3]
      }
    },
    editScheduleCode() {
      this.$refs.scheduleCodeFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/scheduleCode/upbykey', this.scheduleCodeForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.scheduleCodeDV = false
        this.getScheduleCodeList()
        this.$message.success(res.message)
      })
    },
    delScheduleCodeById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/scheduleCode/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getScheduleCodeList()
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
.el-input {
  width: 120px;
}
.scheduleTimeForm .el-form-item {
  margin-bottom: 10px !important;
}
.tabs_divider {
  margin: 0 30px 10px 30px !important;
}
</style>
