<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤状态</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addEmpAttendanceStatusDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤状态</el-button>
      </div>
      <el-table :data="EmpAttendanceStatusList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="员工code" prop="empMdmCode"></el-table-column>
        <el-table-column label="排班编码" prop="scheduleCode"></el-table-column>
        <el-table-column label="排班中文名称" prop="scheduleName"></el-table-column>
        <el-table-column label="班次工作时长" prop="workTimeMin"></el-table-column>
        <el-table-column label="班次所包含时间代表出勤天数" prop="attendTimeToDay"></el-table-column>
        <el-table-column label="跨天班" prop="scheduleFrontDay"></el-table-column>
        <el-table-column label="打卡段数" prop="punchTimes"></el-table-column>
        <el-table-column label="人性化管理" prop="permitMin"></el-table-column>
        <el-table-column label="迟到早退分钟数" prop="lateMin"></el-table-column>
        <el-table-column label="旷工分钟数" prop="wildMin"></el-table-column>
        <el-table-column label="休息类型" prop="restType"></el-table-column>
        <el-table-column label="工作时长多少分钟后休息" prop="workTime"></el-table-column>
        <el-table-column label="休息时长分钟数" prop="restTime"></el-table-column>
        <el-table-column label="总打卡状态" prop="attendStatus"></el-table-column>
        <el-table-column label="考勤日期" prop="attendDay"></el-table-column>
        <el-table-column label="假期的名称" prop="dayName"></el-table-column>
        <el-table-column label="详细打卡状态" prop="partAttendStatus"></el-table-column>
        <el-table-column label="所有打卡时间" prop="allAttendTime"></el-table-column>
        <el-table-column label="总打卡次数" prop="attNumTimes"></el-table-column>
        <el-table-column label="忘记打卡数" prop="forgateAttAddTimes"></el-table-column>
        <el-table-column label="a极限打卡时间" prop="aaLimitTime"></el-table-column>
        <el-table-column label="a点存在的打卡时间记录" prop="aaTime"></el-table-column>
        <el-table-column label="a点排班的正常打卡时间" prop="aaPreTime"></el-table-column>
        <el-table-column label="a变动时间" prop="aaChTime"></el-table-column>
        <el-table-column label="a打卡状态" prop="aaStatus"></el-table-column>
        <el-table-column label="a时间差" prop="aaMin"></el-table-column>
        <el-table-column label="a是否需要刷卡" prop="aaNeedSign"></el-table-column>
        <el-table-column label="b极限打卡时间" prop="bbLimitTime"></el-table-column>
        <el-table-column label="b点存在的打卡时间记录" prop="bbTime"></el-table-column>
        <el-table-column label="b点排班的正常打卡时间" prop="bbPreTime"></el-table-column>
        <el-table-column label="b变动时间" prop="bbChTime"></el-table-column>
        <el-table-column label="b打卡状态" prop="bbStatus"></el-table-column>
        <el-table-column label="b时间差" prop="bbMin"></el-table-column>
        <el-table-column label="b是否需要刷卡" prop="bbNeedSign"></el-table-column>
        <el-table-column label="c极限打卡时间" prop="ccLimitTime"></el-table-column>
        <el-table-column label="c点存在的打卡时间记录" prop="ccTime"></el-table-column>
        <el-table-column label="c点排班的正常打卡时间" prop="ccPreTime"></el-table-column>
        <el-table-column label="c变动时间" prop="ccChTime"></el-table-column>
        <el-table-column label="c打卡状态" prop="ccStatus"></el-table-column>
        <el-table-column label="c时间差" prop="ccMin"></el-table-column>
        <el-table-column label="c是否需要刷卡" prop="ccNeedSign"></el-table-column>
        <el-table-column label="d极限打卡时间" prop="ddLimitTime"></el-table-column>
        <el-table-column label="d点存在的打卡时间记录" prop="ddTime"></el-table-column>
        <el-table-column label="d点排班的正常打卡时间" prop="ddPreTime"></el-table-column>
        <el-table-column label="d变动时间" prop="ddChTime"></el-table-column>
        <el-table-column label="d打卡状态" prop="ddStatus"></el-table-column>
        <el-table-column label="d时间差" prop="ddMin"></el-table-column>
        <el-table-column label="d是否需要刷卡" prop="ddNeedSign"></el-table-column>
        <el-table-column label="e极限打卡时间" prop="eeLimitTime"></el-table-column>
        <el-table-column label="e点存在的打卡时间记录" prop="eeTime"></el-table-column>
        <el-table-column label="e点排班的正常打卡时间" prop="eePreTime"></el-table-column>
        <el-table-column label="e变动时间" prop="eeChTime"></el-table-column>
        <el-table-column label="e打卡状态" prop="eeStatus"></el-table-column>
        <el-table-column label="e时间差" prop="eeMin"></el-table-column>
        <el-table-column label="e是否需要刷卡" prop="eeNeedSign"></el-table-column>
        <el-table-column label="f极限打卡时间" prop="ffLimitTime"></el-table-column>
        <el-table-column label="f点存在的打卡时间记录" prop="ffTime"></el-table-column>
        <el-table-column label="f点排班的正常打卡时间" prop="ffPreTime"></el-table-column>
        <el-table-column label="f变动时间" prop="ffChTime"></el-table-column>
        <el-table-column label="f打卡状态" prop="ffStatus"></el-table-column>
        <el-table-column label="f时间差" prop="ffMin"></el-table-column>
        <el-table-column label="f是否需要刷卡" prop="ffNeedSign"></el-table-column>
        <el-table-column label="g极限打卡时间" prop="ggLimitTime"></el-table-column>
        <el-table-column label="g点存在的打卡时间记录" prop="ggTime"></el-table-column>
        <el-table-column label="g点排班的正常打卡时间" prop="ggPreTime"></el-table-column>
        <el-table-column label="g变动时间" prop="ggChTime"></el-table-column>
        <el-table-column label="g打卡状态" prop="ggStatus"></el-table-column>
        <el-table-column label="g时间差" prop="ggMin"></el-table-column>
        <el-table-column label="g是否需要刷卡" prop="ggNeedSign"></el-table-column>
        <el-table-column label="h极限打卡时间" prop="hhLimitTime"></el-table-column>
        <el-table-column label="h点存在的打卡时间记录" prop="hhTime"></el-table-column>
        <el-table-column label="h点排班的正常打卡时间" prop="hhPreTime"></el-table-column>
        <el-table-column label="h变动时间" prop="hhChTime"></el-table-column>
        <el-table-column label="h时间差" prop="hhStatus"></el-table-column>
        <el-table-column label="h时间差" prop="hhMin"></el-table-column>
        <el-table-column label="h是否需要刷卡" prop="hhNeedSign"></el-table-column>
        <el-table-column label="请假次数" prop="leaveTimes"></el-table-column>
        <el-table-column label="请假1类型" prop="leaveType1"></el-table-column>
        <el-table-column label="请假1，开始时间" prop="leaveStime1"></el-table-column>
        <el-table-column label="请假1，结束时间" prop="leaveEtime1"></el-table-column>
        <el-table-column label="请假1所占当天上班时长" prop="leaveLonDay1"></el-table-column>
        <el-table-column label="请假2类型" prop="leaveType2"></el-table-column>
        <el-table-column label="请假2，开始时间" prop="leaveStime2"></el-table-column>
        <el-table-column label="请假2，结束时间" prop="leaveEtime2"></el-table-column>
        <el-table-column label="请假2所占当天上班时长" prop="leaveLonDay2"></el-table-column>
        <el-table-column label="请假3类型" prop="leaveType3"></el-table-column>
        <el-table-column label="请假3，开始时间" prop="leaveStime3"></el-table-column>
        <el-table-column label="请假3，结束时间" prop="leaveEtime3"></el-table-column>
        <el-table-column label="请假3所占当天上班时长" prop="leaveLonDay3"></el-table-column>
        <el-table-column label="出差次数" prop="btripTimes"></el-table-column>
        <el-table-column label="出差1类型" prop="btripType1"></el-table-column>
        <el-table-column label="出差1，开始时间" prop="btripStime1"></el-table-column>
        <el-table-column label="出差1，结束时间" prop="btripEtime1"></el-table-column>
        <el-table-column label="出差1所占当天上班时长" prop="btripLonDay1"></el-table-column>
        <el-table-column label="出差2类型" prop="btripType2"></el-table-column>
        <el-table-column label="出差2，开始时间" prop="btripStime2"></el-table-column>
        <el-table-column label="出差2，结束时间" prop="btripEtime2"></el-table-column>
        <el-table-column label="出差2所占当天上班时长" prop="btripLonDay2"></el-table-column>
        <el-table-column label="出差3类型" prop="btripType3"></el-table-column>
        <el-table-column label="出差3，开始时间" prop="btripStime3"></el-table-column>
        <el-table-column label="出差3，结束时间" prop="btripEtime3"></el-table-column>
        <el-table-column label="出差3所占当天上班时长" prop="btripLonDay3"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="EmpAttendanceStatusStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editEmpAttendanceStatusDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delEmpAttendanceStatusById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤状态" :visible.sync="addEmpAttendanceStatusDV" width="750px" :before-close="handleClose" @close="addEmpAttendanceStatusDVClose">
      <el-form inline :model="addEmpAttendanceStatusForm" :rules="addEmpAttendanceStatusFormRules" ref="addEmpAttendanceStatusFormRef" label-width="120px" size="small">
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="addEmpAttendanceStatusForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班编码" prop="scheduleCode">
          <el-input v-model="addEmpAttendanceStatusForm.scheduleCode"></el-input>
        </el-form-item>
        <el-form-item label="排班中文名称" prop="scheduleName">
          <el-input v-model="addEmpAttendanceStatusForm.scheduleName"></el-input>
        </el-form-item>
        <el-form-item label="班次工作时长" prop="workTimeMin">
          <el-input v-model="addEmpAttendanceStatusForm.workTimeMin"></el-input>
        </el-form-item>
        <el-form-item label="班次所包含时间代表出勤天数" prop="attendTimeToDay">
          <el-input v-model="addEmpAttendanceStatusForm.attendTimeToDay"></el-input>
        </el-form-item>
        <el-form-item label="跨天班" prop="scheduleFrontDay">
          <el-input v-model="addEmpAttendanceStatusForm.scheduleFrontDay"></el-input>
        </el-form-item>
        <el-form-item label="打卡段数" prop="punchTimes">
          <el-input v-model="addEmpAttendanceStatusForm.punchTimes"></el-input>
        </el-form-item>
        <el-form-item label="人性化管理" prop="permitMin">
          <el-input v-model="addEmpAttendanceStatusForm.permitMin"></el-input>
        </el-form-item>
        <el-form-item label="迟到早退分钟数" prop="lateMin">
          <el-input v-model="addEmpAttendanceStatusForm.lateMin"></el-input>
        </el-form-item>
        <el-form-item label="旷工分钟数" prop="wildMin">
          <el-input v-model="addEmpAttendanceStatusForm.wildMin"></el-input>
        </el-form-item>
        <el-form-item label="休息类型" prop="restType">
          <el-input v-model="addEmpAttendanceStatusForm.restType"></el-input>
        </el-form-item>
        <el-form-item label="工作时长多少分钟后休息" prop="workTime">
          <el-input v-model="addEmpAttendanceStatusForm.workTime"></el-input>
        </el-form-item>
        <el-form-item label="休息时长分钟数" prop="restTime">
          <el-input v-model="addEmpAttendanceStatusForm.restTime"></el-input>
        </el-form-item>
        <el-form-item label="总打卡状态" prop="attendStatus">
          <el-input v-model="addEmpAttendanceStatusForm.attendStatus"></el-input>
        </el-form-item>
        <el-form-item label="考勤日期" prop="attendDay">
          <el-input v-model="addEmpAttendanceStatusForm.attendDay"></el-input>
        </el-form-item>
        <el-form-item label="假期的名称" prop="dayName">
          <el-input v-model="addEmpAttendanceStatusForm.dayName"></el-input>
        </el-form-item>
        <el-form-item label="详细打卡状态" prop="partAttendStatus">
          <el-input v-model="addEmpAttendanceStatusForm.partAttendStatus"></el-input>
        </el-form-item>
        <el-form-item label="所有打卡时间" prop="allAttendTime">
          <el-input v-model="addEmpAttendanceStatusForm.allAttendTime"></el-input>
        </el-form-item>
        <el-form-item label="总打卡次数" prop="attNumTimes">
          <el-input v-model="addEmpAttendanceStatusForm.attNumTimes"></el-input>
        </el-form-item>
        <el-form-item label="忘记打卡数" prop="forgateAttAddTimes">
          <el-input v-model="addEmpAttendanceStatusForm.forgateAttAddTimes"></el-input>
        </el-form-item>
        <el-form-item label="a极限打卡时间" prop="aaLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.aaLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="a点存在的打卡时间记录" prop="aaTime">
          <el-input v-model="addEmpAttendanceStatusForm.aaTime"></el-input>
        </el-form-item>
        <el-form-item label="a点排班的正常打卡时间" prop="aaPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.aaPreTime"></el-input>
        </el-form-item>
        <el-form-item label="a变动时间" prop="aaChTime">
          <el-input v-model="addEmpAttendanceStatusForm.aaChTime"></el-input>
        </el-form-item>
        <el-form-item label="a打卡状态" prop="aaStatus">
          <el-input v-model="addEmpAttendanceStatusForm.aaStatus"></el-input>
        </el-form-item>
        <el-form-item label="a时间差" prop="aaMin">
          <el-input v-model="addEmpAttendanceStatusForm.aaMin"></el-input>
        </el-form-item>
        <el-form-item label="a是否需要刷卡" prop="aaNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.aaNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="b极限打卡时间" prop="bbLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.bbLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="b点存在的打卡时间记录" prop="bbTime">
          <el-input v-model="addEmpAttendanceStatusForm.bbTime"></el-input>
        </el-form-item>
        <el-form-item label="b点排班的正常打卡时间" prop="bbPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.bbPreTime"></el-input>
        </el-form-item>
        <el-form-item label="b变动时间" prop="bbChTime">
          <el-input v-model="addEmpAttendanceStatusForm.bbChTime"></el-input>
        </el-form-item>
        <el-form-item label="b打卡状态" prop="bbStatus">
          <el-input v-model="addEmpAttendanceStatusForm.bbStatus"></el-input>
        </el-form-item>
        <el-form-item label="b时间差" prop="bbMin">
          <el-input v-model="addEmpAttendanceStatusForm.bbMin"></el-input>
        </el-form-item>
        <el-form-item label="b是否需要刷卡" prop="bbNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.bbNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="c极限打卡时间" prop="ccLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.ccLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="c点存在的打卡时间记录" prop="ccTime">
          <el-input v-model="addEmpAttendanceStatusForm.ccTime"></el-input>
        </el-form-item>
        <el-form-item label="c点排班的正常打卡时间" prop="ccPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.ccPreTime"></el-input>
        </el-form-item>
        <el-form-item label="c变动时间" prop="ccChTime">
          <el-input v-model="addEmpAttendanceStatusForm.ccChTime"></el-input>
        </el-form-item>
        <el-form-item label="c打卡状态" prop="ccStatus">
          <el-input v-model="addEmpAttendanceStatusForm.ccStatus"></el-input>
        </el-form-item>
        <el-form-item label="c时间差" prop="ccMin">
          <el-input v-model="addEmpAttendanceStatusForm.ccMin"></el-input>
        </el-form-item>
        <el-form-item label="c是否需要刷卡" prop="ccNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.ccNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="d极限打卡时间" prop="ddLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.ddLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="d点存在的打卡时间记录" prop="ddTime">
          <el-input v-model="addEmpAttendanceStatusForm.ddTime"></el-input>
        </el-form-item>
        <el-form-item label="d点排班的正常打卡时间" prop="ddPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.ddPreTime"></el-input>
        </el-form-item>
        <el-form-item label="d变动时间" prop="ddChTime">
          <el-input v-model="addEmpAttendanceStatusForm.ddChTime"></el-input>
        </el-form-item>
        <el-form-item label="d打卡状态" prop="ddStatus">
          <el-input v-model="addEmpAttendanceStatusForm.ddStatus"></el-input>
        </el-form-item>
        <el-form-item label="d时间差" prop="ddMin">
          <el-input v-model="addEmpAttendanceStatusForm.ddMin"></el-input>
        </el-form-item>
        <el-form-item label="d是否需要刷卡" prop="ddNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.ddNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="e极限打卡时间" prop="eeLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.eeLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="e点存在的打卡时间记录" prop="eeTime">
          <el-input v-model="addEmpAttendanceStatusForm.eeTime"></el-input>
        </el-form-item>
        <el-form-item label="e点排班的正常打卡时间" prop="eePreTime">
          <el-input v-model="addEmpAttendanceStatusForm.eePreTime"></el-input>
        </el-form-item>
        <el-form-item label="e变动时间" prop="eeChTime">
          <el-input v-model="addEmpAttendanceStatusForm.eeChTime"></el-input>
        </el-form-item>
        <el-form-item label="e打卡状态" prop="eeStatus">
          <el-input v-model="addEmpAttendanceStatusForm.eeStatus"></el-input>
        </el-form-item>
        <el-form-item label="e时间差" prop="eeMin">
          <el-input v-model="addEmpAttendanceStatusForm.eeMin"></el-input>
        </el-form-item>
        <el-form-item label="e是否需要刷卡" prop="eeNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.eeNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="f极限打卡时间" prop="ffLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.ffLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="f点存在的打卡时间记录" prop="ffTime">
          <el-input v-model="addEmpAttendanceStatusForm.ffTime"></el-input>
        </el-form-item>
        <el-form-item label="f点排班的正常打卡时间" prop="ffPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.ffPreTime"></el-input>
        </el-form-item>
        <el-form-item label="f变动时间" prop="ffChTime">
          <el-input v-model="addEmpAttendanceStatusForm.ffChTime"></el-input>
        </el-form-item>
        <el-form-item label="f打卡状态" prop="ffStatus">
          <el-input v-model="addEmpAttendanceStatusForm.ffStatus"></el-input>
        </el-form-item>
        <el-form-item label="f时间差" prop="ffMin">
          <el-input v-model="addEmpAttendanceStatusForm.ffMin"></el-input>
        </el-form-item>
        <el-form-item label="f是否需要刷卡" prop="ffNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.ffNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="g极限打卡时间" prop="ggLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.ggLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="g点存在的打卡时间记录" prop="ggTime">
          <el-input v-model="addEmpAttendanceStatusForm.ggTime"></el-input>
        </el-form-item>
        <el-form-item label="g点排班的正常打卡时间" prop="ggPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.ggPreTime"></el-input>
        </el-form-item>
        <el-form-item label="g变动时间" prop="ggChTime">
          <el-input v-model="addEmpAttendanceStatusForm.ggChTime"></el-input>
        </el-form-item>
        <el-form-item label="g打卡状态" prop="ggStatus">
          <el-input v-model="addEmpAttendanceStatusForm.ggStatus"></el-input>
        </el-form-item>
        <el-form-item label="g时间差" prop="ggMin">
          <el-input v-model="addEmpAttendanceStatusForm.ggMin"></el-input>
        </el-form-item>
        <el-form-item label="g是否需要刷卡" prop="ggNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.ggNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="h极限打卡时间" prop="hhLimitTime">
          <el-input v-model="addEmpAttendanceStatusForm.hhLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="h点存在的打卡时间记录" prop="hhTime">
          <el-input v-model="addEmpAttendanceStatusForm.hhTime"></el-input>
        </el-form-item>
        <el-form-item label="h点排班的正常打卡时间" prop="hhPreTime">
          <el-input v-model="addEmpAttendanceStatusForm.hhPreTime"></el-input>
        </el-form-item>
        <el-form-item label="h变动时间" prop="hhChTime">
          <el-input v-model="addEmpAttendanceStatusForm.hhChTime"></el-input>
        </el-form-item>
        <el-form-item label="h时间差" prop="hhStatus">
          <el-input v-model="addEmpAttendanceStatusForm.hhStatus"></el-input>
        </el-form-item>
        <el-form-item label="h时间差" prop="hhMin">
          <el-input v-model="addEmpAttendanceStatusForm.hhMin"></el-input>
        </el-form-item>
        <el-form-item label="h是否需要刷卡" prop="hhNeedSign">
          <el-input v-model="addEmpAttendanceStatusForm.hhNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="请假次数" prop="leaveTimes">
          <el-input v-model="addEmpAttendanceStatusForm.leaveTimes"></el-input>
        </el-form-item>
        <el-form-item label="请假1类型" prop="leaveType1">
          <el-input v-model="addEmpAttendanceStatusForm.leaveType1"></el-input>
        </el-form-item>
        <el-form-item label="请假1，开始时间" prop="leaveStime1">
          <el-input v-model="addEmpAttendanceStatusForm.leaveStime1"></el-input>
        </el-form-item>
        <el-form-item label="请假1，结束时间" prop="leaveEtime1">
          <el-input v-model="addEmpAttendanceStatusForm.leaveEtime1"></el-input>
        </el-form-item>
        <el-form-item label="请假1所占当天上班时长" prop="leaveLonDay1">
          <el-input v-model="addEmpAttendanceStatusForm.leaveLonDay1"></el-input>
        </el-form-item>
        <el-form-item label="请假2类型" prop="leaveType2">
          <el-input v-model="addEmpAttendanceStatusForm.leaveType2"></el-input>
        </el-form-item>
        <el-form-item label="请假2，开始时间" prop="leaveStime2">
          <el-input v-model="addEmpAttendanceStatusForm.leaveStime2"></el-input>
        </el-form-item>
        <el-form-item label="请假2，结束时间" prop="leaveEtime2">
          <el-input v-model="addEmpAttendanceStatusForm.leaveEtime2"></el-input>
        </el-form-item>
        <el-form-item label="请假2所占当天上班时长" prop="leaveLonDay2">
          <el-input v-model="addEmpAttendanceStatusForm.leaveLonDay2"></el-input>
        </el-form-item>
        <el-form-item label="请假3类型" prop="leaveType3">
          <el-input v-model="addEmpAttendanceStatusForm.leaveType3"></el-input>
        </el-form-item>
        <el-form-item label="请假3，开始时间" prop="leaveStime3">
          <el-input v-model="addEmpAttendanceStatusForm.leaveStime3"></el-input>
        </el-form-item>
        <el-form-item label="请假3，结束时间" prop="leaveEtime3">
          <el-input v-model="addEmpAttendanceStatusForm.leaveEtime3"></el-input>
        </el-form-item>
        <el-form-item label="请假3所占当天上班时长" prop="leaveLonDay3">
          <el-input v-model="addEmpAttendanceStatusForm.leaveLonDay3"></el-input>
        </el-form-item>
        <el-form-item label="出差次数" prop="btripTimes">
          <el-input v-model="addEmpAttendanceStatusForm.btripTimes"></el-input>
        </el-form-item>
        <el-form-item label="出差1类型" prop="btripType1">
          <el-input v-model="addEmpAttendanceStatusForm.btripType1"></el-input>
        </el-form-item>
        <el-form-item label="出差1，开始时间" prop="btripStime1">
          <el-input v-model="addEmpAttendanceStatusForm.btripStime1"></el-input>
        </el-form-item>
        <el-form-item label="出差1，结束时间" prop="btripEtime1">
          <el-input v-model="addEmpAttendanceStatusForm.btripEtime1"></el-input>
        </el-form-item>
        <el-form-item label="出差1所占当天上班时长" prop="btripLonDay1">
          <el-input v-model="addEmpAttendanceStatusForm.btripLonDay1"></el-input>
        </el-form-item>
        <el-form-item label="出差2类型" prop="btripType2">
          <el-input v-model="addEmpAttendanceStatusForm.btripType2"></el-input>
        </el-form-item>
        <el-form-item label="出差2，开始时间" prop="btripStime2">
          <el-input v-model="addEmpAttendanceStatusForm.btripStime2"></el-input>
        </el-form-item>
        <el-form-item label="出差2，结束时间" prop="btripEtime2">
          <el-input v-model="addEmpAttendanceStatusForm.btripEtime2"></el-input>
        </el-form-item>
        <el-form-item label="出差2所占当天上班时长" prop="btripLonDay2">
          <el-input v-model="addEmpAttendanceStatusForm.btripLonDay2"></el-input>
        </el-form-item>
        <el-form-item label="出差3类型" prop="btripType3">
          <el-input v-model="addEmpAttendanceStatusForm.btripType3"></el-input>
        </el-form-item>
        <el-form-item label="出差3，开始时间" prop="btripStime3">
          <el-input v-model="addEmpAttendanceStatusForm.btripStime3"></el-input>
        </el-form-item>
        <el-form-item label="出差3，结束时间" prop="btripEtime3">
          <el-input v-model="addEmpAttendanceStatusForm.btripEtime3"></el-input>
        </el-form-item>
        <el-form-item label="出差3所占当天上班时长" prop="btripLonDay3">
          <el-input v-model="addEmpAttendanceStatusForm.btripLonDay3"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmpAttendanceStatusDV = false">取 消</el-button>
        <el-button type="primary" @click="addEmpAttendanceStatus">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤状态" :visible.sync="editEmpAttendanceStatusDV" width="750px" @close="editEmpAttendanceStatusDVClose">
      <el-form inline :model="editEmpAttendanceStatusForm" :rules="editEmpAttendanceStatusFormRules" ref="editEmpAttendanceStatusFormRef" label-width="120px" size="small">
        <el-form-item label="员工code" prop="empMdmCode">
          <el-input v-model="editEmpAttendanceStatusForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="排班编码" prop="scheduleCode">
          <el-input v-model="editEmpAttendanceStatusForm.scheduleCode"></el-input>
        </el-form-item>
        <el-form-item label="排班中文名称" prop="scheduleName">
          <el-input v-model="editEmpAttendanceStatusForm.scheduleName"></el-input>
        </el-form-item>
        <el-form-item label="班次工作时长" prop="workTimeMin">
          <el-input v-model="editEmpAttendanceStatusForm.workTimeMin"></el-input>
        </el-form-item>
        <el-form-item label="班次所包含时间代表出勤天数" prop="attendTimeToDay">
          <el-input v-model="editEmpAttendanceStatusForm.attendTimeToDay"></el-input>
        </el-form-item>
        <el-form-item label="跨天班" prop="scheduleFrontDay">
          <el-input v-model="editEmpAttendanceStatusForm.scheduleFrontDay"></el-input>
        </el-form-item>
        <el-form-item label="打卡段数" prop="punchTimes">
          <el-input v-model="editEmpAttendanceStatusForm.punchTimes"></el-input>
        </el-form-item>
        <el-form-item label="人性化管理" prop="permitMin">
          <el-input v-model="editEmpAttendanceStatusForm.permitMin"></el-input>
        </el-form-item>
        <el-form-item label="迟到早退分钟数" prop="lateMin">
          <el-input v-model="editEmpAttendanceStatusForm.lateMin"></el-input>
        </el-form-item>
        <el-form-item label="旷工分钟数" prop="wildMin">
          <el-input v-model="editEmpAttendanceStatusForm.wildMin"></el-input>
        </el-form-item>
        <el-form-item label="休息类型" prop="restType">
          <el-input v-model="editEmpAttendanceStatusForm.restType"></el-input>
        </el-form-item>
        <el-form-item label="工作时长多少分钟后休息" prop="workTime">
          <el-input v-model="editEmpAttendanceStatusForm.workTime"></el-input>
        </el-form-item>
        <el-form-item label="休息时长分钟数" prop="restTime">
          <el-input v-model="editEmpAttendanceStatusForm.restTime"></el-input>
        </el-form-item>
        <el-form-item label="总打卡状态" prop="attendStatus">
          <el-input v-model="editEmpAttendanceStatusForm.attendStatus"></el-input>
        </el-form-item>
        <el-form-item label="考勤日期" prop="attendDay">
          <el-input v-model="editEmpAttendanceStatusForm.attendDay"></el-input>
        </el-form-item>
        <el-form-item label="假期的名称" prop="dayName">
          <el-input v-model="editEmpAttendanceStatusForm.dayName"></el-input>
        </el-form-item>
        <el-form-item label="详细打卡状态" prop="partAttendStatus">
          <el-input v-model="editEmpAttendanceStatusForm.partAttendStatus"></el-input>
        </el-form-item>
        <el-form-item label="所有打卡时间" prop="allAttendTime">
          <el-input v-model="editEmpAttendanceStatusForm.allAttendTime"></el-input>
        </el-form-item>
        <el-form-item label="总打卡次数" prop="attNumTimes">
          <el-input v-model="editEmpAttendanceStatusForm.attNumTimes"></el-input>
        </el-form-item>
        <el-form-item label="忘记打卡数" prop="forgateAttAddTimes">
          <el-input v-model="editEmpAttendanceStatusForm.forgateAttAddTimes"></el-input>
        </el-form-item>
        <el-form-item label="a极限打卡时间" prop="aaLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.aaLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="a点存在的打卡时间记录" prop="aaTime">
          <el-input v-model="editEmpAttendanceStatusForm.aaTime"></el-input>
        </el-form-item>
        <el-form-item label="a点排班的正常打卡时间" prop="aaPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.aaPreTime"></el-input>
        </el-form-item>
        <el-form-item label="a变动时间" prop="aaChTime">
          <el-input v-model="editEmpAttendanceStatusForm.aaChTime"></el-input>
        </el-form-item>
        <el-form-item label="a打卡状态" prop="aaStatus">
          <el-input v-model="editEmpAttendanceStatusForm.aaStatus"></el-input>
        </el-form-item>
        <el-form-item label="a时间差" prop="aaMin">
          <el-input v-model="editEmpAttendanceStatusForm.aaMin"></el-input>
        </el-form-item>
        <el-form-item label="a是否需要刷卡" prop="aaNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.aaNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="b极限打卡时间" prop="bbLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.bbLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="b点存在的打卡时间记录" prop="bbTime">
          <el-input v-model="editEmpAttendanceStatusForm.bbTime"></el-input>
        </el-form-item>
        <el-form-item label="b点排班的正常打卡时间" prop="bbPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.bbPreTime"></el-input>
        </el-form-item>
        <el-form-item label="b变动时间" prop="bbChTime">
          <el-input v-model="editEmpAttendanceStatusForm.bbChTime"></el-input>
        </el-form-item>
        <el-form-item label="b打卡状态" prop="bbStatus">
          <el-input v-model="editEmpAttendanceStatusForm.bbStatus"></el-input>
        </el-form-item>
        <el-form-item label="b时间差" prop="bbMin">
          <el-input v-model="editEmpAttendanceStatusForm.bbMin"></el-input>
        </el-form-item>
        <el-form-item label="b是否需要刷卡" prop="bbNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.bbNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="c极限打卡时间" prop="ccLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.ccLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="c点存在的打卡时间记录" prop="ccTime">
          <el-input v-model="editEmpAttendanceStatusForm.ccTime"></el-input>
        </el-form-item>
        <el-form-item label="c点排班的正常打卡时间" prop="ccPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.ccPreTime"></el-input>
        </el-form-item>
        <el-form-item label="c变动时间" prop="ccChTime">
          <el-input v-model="editEmpAttendanceStatusForm.ccChTime"></el-input>
        </el-form-item>
        <el-form-item label="c打卡状态" prop="ccStatus">
          <el-input v-model="editEmpAttendanceStatusForm.ccStatus"></el-input>
        </el-form-item>
        <el-form-item label="c时间差" prop="ccMin">
          <el-input v-model="editEmpAttendanceStatusForm.ccMin"></el-input>
        </el-form-item>
        <el-form-item label="c是否需要刷卡" prop="ccNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.ccNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="d极限打卡时间" prop="ddLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.ddLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="d点存在的打卡时间记录" prop="ddTime">
          <el-input v-model="editEmpAttendanceStatusForm.ddTime"></el-input>
        </el-form-item>
        <el-form-item label="d点排班的正常打卡时间" prop="ddPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.ddPreTime"></el-input>
        </el-form-item>
        <el-form-item label="d变动时间" prop="ddChTime">
          <el-input v-model="editEmpAttendanceStatusForm.ddChTime"></el-input>
        </el-form-item>
        <el-form-item label="d打卡状态" prop="ddStatus">
          <el-input v-model="editEmpAttendanceStatusForm.ddStatus"></el-input>
        </el-form-item>
        <el-form-item label="d时间差" prop="ddMin">
          <el-input v-model="editEmpAttendanceStatusForm.ddMin"></el-input>
        </el-form-item>
        <el-form-item label="d是否需要刷卡" prop="ddNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.ddNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="e极限打卡时间" prop="eeLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.eeLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="e点存在的打卡时间记录" prop="eeTime">
          <el-input v-model="editEmpAttendanceStatusForm.eeTime"></el-input>
        </el-form-item>
        <el-form-item label="e点排班的正常打卡时间" prop="eePreTime">
          <el-input v-model="editEmpAttendanceStatusForm.eePreTime"></el-input>
        </el-form-item>
        <el-form-item label="e变动时间" prop="eeChTime">
          <el-input v-model="editEmpAttendanceStatusForm.eeChTime"></el-input>
        </el-form-item>
        <el-form-item label="e打卡状态" prop="eeStatus">
          <el-input v-model="editEmpAttendanceStatusForm.eeStatus"></el-input>
        </el-form-item>
        <el-form-item label="e时间差" prop="eeMin">
          <el-input v-model="editEmpAttendanceStatusForm.eeMin"></el-input>
        </el-form-item>
        <el-form-item label="e是否需要刷卡" prop="eeNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.eeNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="f极限打卡时间" prop="ffLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.ffLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="f点存在的打卡时间记录" prop="ffTime">
          <el-input v-model="editEmpAttendanceStatusForm.ffTime"></el-input>
        </el-form-item>
        <el-form-item label="f点排班的正常打卡时间" prop="ffPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.ffPreTime"></el-input>
        </el-form-item>
        <el-form-item label="f变动时间" prop="ffChTime">
          <el-input v-model="editEmpAttendanceStatusForm.ffChTime"></el-input>
        </el-form-item>
        <el-form-item label="f打卡状态" prop="ffStatus">
          <el-input v-model="editEmpAttendanceStatusForm.ffStatus"></el-input>
        </el-form-item>
        <el-form-item label="f时间差" prop="ffMin">
          <el-input v-model="editEmpAttendanceStatusForm.ffMin"></el-input>
        </el-form-item>
        <el-form-item label="f是否需要刷卡" prop="ffNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.ffNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="g极限打卡时间" prop="ggLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.ggLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="g点存在的打卡时间记录" prop="ggTime">
          <el-input v-model="editEmpAttendanceStatusForm.ggTime"></el-input>
        </el-form-item>
        <el-form-item label="g点排班的正常打卡时间" prop="ggPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.ggPreTime"></el-input>
        </el-form-item>
        <el-form-item label="g变动时间" prop="ggChTime">
          <el-input v-model="editEmpAttendanceStatusForm.ggChTime"></el-input>
        </el-form-item>
        <el-form-item label="g打卡状态" prop="ggStatus">
          <el-input v-model="editEmpAttendanceStatusForm.ggStatus"></el-input>
        </el-form-item>
        <el-form-item label="g时间差" prop="ggMin">
          <el-input v-model="editEmpAttendanceStatusForm.ggMin"></el-input>
        </el-form-item>
        <el-form-item label="g是否需要刷卡" prop="ggNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.ggNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="h极限打卡时间" prop="hhLimitTime">
          <el-input v-model="editEmpAttendanceStatusForm.hhLimitTime"></el-input>
        </el-form-item>
        <el-form-item label="h点存在的打卡时间记录" prop="hhTime">
          <el-input v-model="editEmpAttendanceStatusForm.hhTime"></el-input>
        </el-form-item>
        <el-form-item label="h点排班的正常打卡时间" prop="hhPreTime">
          <el-input v-model="editEmpAttendanceStatusForm.hhPreTime"></el-input>
        </el-form-item>
        <el-form-item label="h变动时间" prop="hhChTime">
          <el-input v-model="editEmpAttendanceStatusForm.hhChTime"></el-input>
        </el-form-item>
        <el-form-item label="h时间差" prop="hhStatus">
          <el-input v-model="editEmpAttendanceStatusForm.hhStatus"></el-input>
        </el-form-item>
        <el-form-item label="h时间差" prop="hhMin">
          <el-input v-model="editEmpAttendanceStatusForm.hhMin"></el-input>
        </el-form-item>
        <el-form-item label="h是否需要刷卡" prop="hhNeedSign">
          <el-input v-model="editEmpAttendanceStatusForm.hhNeedSign"></el-input>
        </el-form-item>
        <el-form-item label="请假次数" prop="leaveTimes">
          <el-input v-model="editEmpAttendanceStatusForm.leaveTimes"></el-input>
        </el-form-item>
        <el-form-item label="请假1类型" prop="leaveType1">
          <el-input v-model="editEmpAttendanceStatusForm.leaveType1"></el-input>
        </el-form-item>
        <el-form-item label="请假1，开始时间" prop="leaveStime1">
          <el-input v-model="editEmpAttendanceStatusForm.leaveStime1"></el-input>
        </el-form-item>
        <el-form-item label="请假1，结束时间" prop="leaveEtime1">
          <el-input v-model="editEmpAttendanceStatusForm.leaveEtime1"></el-input>
        </el-form-item>
        <el-form-item label="请假1所占当天上班时长" prop="leaveLonDay1">
          <el-input v-model="editEmpAttendanceStatusForm.leaveLonDay1"></el-input>
        </el-form-item>
        <el-form-item label="请假2类型" prop="leaveType2">
          <el-input v-model="editEmpAttendanceStatusForm.leaveType2"></el-input>
        </el-form-item>
        <el-form-item label="请假2，开始时间" prop="leaveStime2">
          <el-input v-model="editEmpAttendanceStatusForm.leaveStime2"></el-input>
        </el-form-item>
        <el-form-item label="请假2，结束时间" prop="leaveEtime2">
          <el-input v-model="editEmpAttendanceStatusForm.leaveEtime2"></el-input>
        </el-form-item>
        <el-form-item label="请假2所占当天上班时长" prop="leaveLonDay2">
          <el-input v-model="editEmpAttendanceStatusForm.leaveLonDay2"></el-input>
        </el-form-item>
        <el-form-item label="请假3类型" prop="leaveType3">
          <el-input v-model="editEmpAttendanceStatusForm.leaveType3"></el-input>
        </el-form-item>
        <el-form-item label="请假3，开始时间" prop="leaveStime3">
          <el-input v-model="editEmpAttendanceStatusForm.leaveStime3"></el-input>
        </el-form-item>
        <el-form-item label="请假3，结束时间" prop="leaveEtime3">
          <el-input v-model="editEmpAttendanceStatusForm.leaveEtime3"></el-input>
        </el-form-item>
        <el-form-item label="请假3所占当天上班时长" prop="leaveLonDay3">
          <el-input v-model="editEmpAttendanceStatusForm.leaveLonDay3"></el-input>
        </el-form-item>
        <el-form-item label="出差次数" prop="btripTimes">
          <el-input v-model="editEmpAttendanceStatusForm.btripTimes"></el-input>
        </el-form-item>
        <el-form-item label="出差1类型" prop="btripType1">
          <el-input v-model="editEmpAttendanceStatusForm.btripType1"></el-input>
        </el-form-item>
        <el-form-item label="出差1，开始时间" prop="btripStime1">
          <el-input v-model="editEmpAttendanceStatusForm.btripStime1"></el-input>
        </el-form-item>
        <el-form-item label="出差1，结束时间" prop="btripEtime1">
          <el-input v-model="editEmpAttendanceStatusForm.btripEtime1"></el-input>
        </el-form-item>
        <el-form-item label="出差1所占当天上班时长" prop="btripLonDay1">
          <el-input v-model="editEmpAttendanceStatusForm.btripLonDay1"></el-input>
        </el-form-item>
        <el-form-item label="出差2类型" prop="btripType2">
          <el-input v-model="editEmpAttendanceStatusForm.btripType2"></el-input>
        </el-form-item>
        <el-form-item label="出差2，开始时间" prop="btripStime2">
          <el-input v-model="editEmpAttendanceStatusForm.btripStime2"></el-input>
        </el-form-item>
        <el-form-item label="出差2，结束时间" prop="btripEtime2">
          <el-input v-model="editEmpAttendanceStatusForm.btripEtime2"></el-input>
        </el-form-item>
        <el-form-item label="出差2所占当天上班时长" prop="btripLonDay2">
          <el-input v-model="editEmpAttendanceStatusForm.btripLonDay2"></el-input>
        </el-form-item>
        <el-form-item label="出差3类型" prop="btripType3">
          <el-input v-model="editEmpAttendanceStatusForm.btripType3"></el-input>
        </el-form-item>
        <el-form-item label="出差3，开始时间" prop="btripStime3">
          <el-input v-model="editEmpAttendanceStatusForm.btripStime3"></el-input>
        </el-form-item>
        <el-form-item label="出差3，结束时间" prop="btripEtime3">
          <el-input v-model="editEmpAttendanceStatusForm.btripEtime3"></el-input>
        </el-form-item>
        <el-form-item label="出差3所占当天上班时长" prop="btripLonDay3">
          <el-input v-model="editEmpAttendanceStatusForm.btripLonDay3"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editEmpAttendanceStatusDV = false">取 消</el-button>
        <el-button type="primary" @click="editEmpAttendanceStatus">确 定</el-button>
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
      EmpAttendanceStatusList: null,
      addEmpAttendanceStatusDV: false,
      addEmpAttendanceStatusForm: {
        empMdmCode: '',
        scheduleCode: '',
        scheduleName: '',
        workTimeMin: '',
        attendTimeToDay: '',
        scheduleFrontDay: '',
        punchTimes: '',
        permitMin: '',
        lateMin: '',
        wildMin: '',
        restType: '',
        workTime: '',
        restTime: '',
        attendStatus: '',
        attendDay: '',
        dayName: '',
        partAttendStatus: '',
        allAttendTime: '',
        attNumTimes: '',
        forgateAttAddTimes: '',
        aaLimitTime: '',
        aaTime: '',
        aaPreTime: '',
        aaChTime: '',
        aaStatus: '',
        aaMin: '',
        aaNeedSign: '',
        bbLimitTime: '',
        bbTime: '',
        bbPreTime: '',
        bbChTime: '',
        bbStatus: '',
        bbMin: '',
        bbNeedSign: '',
        ccLimitTime: '',
        ccTime: '',
        ccPreTime: '',
        ccChTime: '',
        ccStatus: '',
        ccMin: '',
        ccNeedSign: '',
        ddLimitTime: '',
        ddTime: '',
        ddPreTime: '',
        ddChTime: '',
        ddStatus: '',
        ddMin: '',
        ddNeedSign: '',
        eeLimitTime: '',
        eeTime: '',
        eePreTime: '',
        eeChTime: '',
        eeStatus: '',
        eeMin: '',
        eeNeedSign: '',
        ffLimitTime: '',
        ffTime: '',
        ffPreTime: '',
        ffChTime: '',
        ffStatus: '',
        ffMin: '',
        ffNeedSign: '',
        ggLimitTime: '',
        ggTime: '',
        ggPreTime: '',
        ggChTime: '',
        ggStatus: '',
        ggMin: '',
        ggNeedSign: '',
        hhLimitTime: '',
        hhTime: '',
        hhPreTime: '',
        hhChTime: '',
        hhStatus: '',
        hhMin: '',
        hhNeedSign: '',
        leaveTimes: '',
        leaveType1: '',
        leaveStime1: '',
        leaveEtime1: '',
        leaveLonDay1: '',
        leaveType2: '',
        leaveStime2: '',
        leaveEtime2: '',
        leaveLonDay2: '',
        leaveType3: '',
        leaveStime3: '',
        leaveEtime3: '',
        leaveLonDay3: '',
        btripTimes: '',
        btripType1: '',
        btripStime1: '',
        btripEtime1: '',
        btripLonDay1: '',
        btripType2: '',
        btripStime2: '',
        btripEtime2: '',
        btripLonDay2: '',
        btripType3: '',
        btripStime3: '',
        btripEtime3: '',
        btripLonDay3: ''
      },
      addEmpAttendanceStatusFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        workTimeMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attendTimeToDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleFrontDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        punchTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        permitMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        lateMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        wildMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        restType: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        workTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        restTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attendStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attendDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dayName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        partAttendStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        allAttendTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attNumTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        forgateAttAddTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eePreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveType1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEtime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveLonDay1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveType2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEtime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveLonDay2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveType3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEtime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveLonDay3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripType1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripStime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripEtime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripLonDay1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripType2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripStime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripEtime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripLonDay2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripType3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripStime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripEtime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripLonDay3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editEmpAttendanceStatusDV: false,
      editEmpAttendanceStatusForm: {
        empMdmCode: '',
        scheduleCode: '',
        scheduleName: '',
        workTimeMin: '',
        attendTimeToDay: '',
        scheduleFrontDay: '',
        punchTimes: '',
        permitMin: '',
        lateMin: '',
        wildMin: '',
        restType: '',
        workTime: '',
        restTime: '',
        attendStatus: '',
        attendDay: '',
        dayName: '',
        partAttendStatus: '',
        allAttendTime: '',
        attNumTimes: '',
        forgateAttAddTimes: '',
        aaLimitTime: '',
        aaTime: '',
        aaPreTime: '',
        aaChTime: '',
        aaStatus: '',
        aaMin: '',
        aaNeedSign: '',
        bbLimitTime: '',
        bbTime: '',
        bbPreTime: '',
        bbChTime: '',
        bbStatus: '',
        bbMin: '',
        bbNeedSign: '',
        ccLimitTime: '',
        ccTime: '',
        ccPreTime: '',
        ccChTime: '',
        ccStatus: '',
        ccMin: '',
        ccNeedSign: '',
        ddLimitTime: '',
        ddTime: '',
        ddPreTime: '',
        ddChTime: '',
        ddStatus: '',
        ddMin: '',
        ddNeedSign: '',
        eeLimitTime: '',
        eeTime: '',
        eePreTime: '',
        eeChTime: '',
        eeStatus: '',
        eeMin: '',
        eeNeedSign: '',
        ffLimitTime: '',
        ffTime: '',
        ffPreTime: '',
        ffChTime: '',
        ffStatus: '',
        ffMin: '',
        ffNeedSign: '',
        ggLimitTime: '',
        ggTime: '',
        ggPreTime: '',
        ggChTime: '',
        ggStatus: '',
        ggMin: '',
        ggNeedSign: '',
        hhLimitTime: '',
        hhTime: '',
        hhPreTime: '',
        hhChTime: '',
        hhStatus: '',
        hhMin: '',
        hhNeedSign: '',
        leaveTimes: '',
        leaveType1: '',
        leaveStime1: '',
        leaveEtime1: '',
        leaveLonDay1: '',
        leaveType2: '',
        leaveStime2: '',
        leaveEtime2: '',
        leaveLonDay2: '',
        leaveType3: '',
        leaveStime3: '',
        leaveEtime3: '',
        leaveLonDay3: '',
        btripTimes: '',
        btripType1: '',
        btripStime1: '',
        btripEtime1: '',
        btripLonDay1: '',
        btripType2: '',
        btripStime2: '',
        btripEtime2: '',
        btripLonDay2: '',
        btripType3: '',
        btripStime3: '',
        btripEtime3: '',
        btripLonDay3: ''
      },
      editEmpAttendanceStatusFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        workTimeMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attendTimeToDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        scheduleFrontDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        punchTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        permitMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        lateMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        wildMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        restType: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        workTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        restTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attendStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attendDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dayName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        partAttendStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        allAttendTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attNumTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        forgateAttAddTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        aaNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        bbNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ccNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ddNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eePreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        eeNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ffNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        ggNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhLimitTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhPreTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhChTime: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhStatus: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhMin: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        hhNeedSign: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveType1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEtime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveLonDay1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveType2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEtime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveLonDay2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveType3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveStime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveEtime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveLonDay3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripType1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripStime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripEtime1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripLonDay1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripType2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripStime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripEtime2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripLonDay2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripType3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripStime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripEtime3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        btripLonDay3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmpAttendanceStatusList()
  },
  methods: {
    async getEmpAttendanceStatusList() {
      const { data: res } = await this.$http.post('/api/empAttendanceStatus/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.EmpAttendanceStatusList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getEmpAttendanceStatusList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getEmpAttendanceStatusList()
    },
    async EmpAttendanceStatusStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/empAttendanceStatus/upstatebykey', domaimInfo)
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
        message: '更新考勤状态状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getEmpAttendanceStatusList()
    },
    addEmpAttendanceStatusDVClose() {
      this.$refs.addEmpAttendanceStatusFormRef.resetFields()
    },
    async addEmpAttendanceStatusBtn() {
      const { data: res } = await this.$http.post('/api/empAttendanceStatus/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addEmpAttendanceStatusForm = res.data
      this.addEmpAttendanceStatusForm.projectId = this.projectId
      this.addEmpAttendanceStatusDV = true
    },
    addEmpAttendanceStatus() {
      this.$refs.addEmpAttendanceStatusFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empAttendanceStatus/add', this.addEmpAttendanceStatusForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addEmpAttendanceStatusDV = false
        this.getEmpAttendanceStatusList()
      })
    },
    editEmpAttendanceStatusDVClose() {
      this.$refs.editEmpAttendanceStatusFormRef.resetFields()
    },
    handleClose() {

    },
    async editEmpAttendanceStatusDVShow(id) {
      this.editEmpAttendanceStatusDV = true
      this.editEmpAttendanceStatusForm.id = id
      const { data: res } = await this.$http.post('/api/empAttendanceStatus/getbykey', this.editEmpAttendanceStatusForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editEmpAttendanceStatusForm = res.data
    },
    editEmpAttendanceStatus() {
      this.$refs.editEmpAttendanceStatusFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/empAttendanceStatus/upbykey', this.editEmpAttendanceStatusForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editEmpAttendanceStatusDV = false
        this.getEmpAttendanceStatusList()
        this.$message.success(res.message)
      })
    },
    delEmpAttendanceStatusById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/empAttendanceStatus/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getEmpAttendanceStatusList()
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
