<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤确认管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addAttConfirmRecDV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤确认管理</el-button>
      </div>
      <el-table :data="AttConfirmRecList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="成员编码" prop="empMdmCode"></el-table-column>
        <el-table-column label="考勤确认" prop="isAttConfirm"></el-table-column>
        <el-table-column label="年" prop="year"></el-table-column>
        <el-table-column label="月" prop="month"></el-table-column>
        <el-table-column label="岗位名称" prop="positionTitle"></el-table-column>
        <el-table-column label="标准职级" prop="standardRank"></el-table-column>
        <el-table-column label="出勤天数" prop="attDay"></el-table-column>
        <el-table-column label="休息天数" prop="restDay"></el-table-column>
        <el-table-column label="迟到早退次数" prop="tenMinTimesIn"></el-table-column>
        <el-table-column label="旷工次数" prop="tenMinTimesOut"></el-table-column>
        <el-table-column label="缺卡数" prop="lackAttTimes"></el-table-column>
        <el-table-column label="缺勤天数" prop="absence"></el-table-column>
        <el-table-column label="1" prop="att1"></el-table-column>
        <el-table-column label="2" prop="att2"></el-table-column>
        <el-table-column label="3" prop="att3"></el-table-column>
        <el-table-column label="4" prop="att4"></el-table-column>
        <el-table-column label="5" prop="att5"></el-table-column>
        <el-table-column label="6" prop="att6"></el-table-column>
        <el-table-column label="7" prop="att7"></el-table-column>
        <el-table-column label="8" prop="att8"></el-table-column>
        <el-table-column label="9" prop="att9"></el-table-column>
        <el-table-column label="10" prop="att10"></el-table-column>
        <el-table-column label="11" prop="att11"></el-table-column>
        <el-table-column label="12" prop="att12"></el-table-column>
        <el-table-column label="13" prop="att13"></el-table-column>
        <el-table-column label="14" prop="att14"></el-table-column>
        <el-table-column label="15" prop="att15"></el-table-column>
        <el-table-column label="16" prop="att16"></el-table-column>
        <el-table-column label="17" prop="att17"></el-table-column>
        <el-table-column label="18" prop="att18"></el-table-column>
        <el-table-column label="19" prop="att19"></el-table-column>
        <el-table-column label="20" prop="att20"></el-table-column>
        <el-table-column label="21" prop="att21"></el-table-column>
        <el-table-column label="22" prop="att22"></el-table-column>
        <el-table-column label="23" prop="att23"></el-table-column>
        <el-table-column label="24" prop="att24"></el-table-column>
        <el-table-column label="25" prop="att25"></el-table-column>
        <el-table-column label="26" prop="att26"></el-table-column>
        <el-table-column label="27" prop="att27"></el-table-column>
        <el-table-column label="28" prop="att28"></el-table-column>
        <el-table-column label="29" prop="att29"></el-table-column>
        <el-table-column label="30" prop="att30"></el-table-column>
        <el-table-column label="31" prop="att31"></el-table-column>
        <el-table-column label="员工姓名" prop="empName"></el-table-column>
        <el-table-column label="因忘打卡补卡次数" prop="forgateAttAddTimes"></el-table-column>
        <el-table-column label="婚假" prop="leaveTypeHun"></el-table-column>
        <el-table-column label="事假" prop="leaveTypeShi"></el-table-column>
        <el-table-column label="年假" prop="leaveTypeNian"></el-table-column>
        <el-table-column label="调休" prop="leaveTypeTiao"></el-table-column>
        <el-table-column label="病假" prop="leaveTypeBing"></el-table-column>
        <el-table-column label="调休假" prop="leaveTypeTiaoxiu"></el-table-column>
        <el-table-column label="产检假" prop="leaveTypeChanjian"></el-table-column>
        <el-table-column label="分娩假" prop="leaveTypeFenmian"></el-table-column>
        <el-table-column label="陪产假" prop="leaveTypePeichan"></el-table-column>
        <el-table-column label="其他" prop="leaveTypeQita"></el-table-column>
        <el-table-column label="丧假" prop="leaveTypeSang"></el-table-column>
        <el-table-column label="工伤假" prop="leaveTypeGongshang"></el-table-column>
        <el-table-column label="哺乳假" prop="leaveTypeBuru"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="AttConfirmRecStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAttConfirmRecDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delAttConfirmRecById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤确认管理" :visible.sync="addAttConfirmRecDV" width="750px" :before-close="handleClose" @close="addAttConfirmRecDVClose">
      <el-form inline :model="addAttConfirmRecForm" :rules="addAttConfirmRecFormRules" ref="addAttConfirmRecFormRef" label-width="120px" size="small">
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="addAttConfirmRecForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="考勤确认" prop="isAttConfirm">
          <el-input v-model="addAttConfirmRecForm.isAttConfirm"></el-input>
        </el-form-item>
        <el-form-item label="年" prop="year">
          <el-input v-model="addAttConfirmRecForm.year"></el-input>
        </el-form-item>
        <el-form-item label="月" prop="month">
          <el-input v-model="addAttConfirmRecForm.month"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="positionTitle">
          <el-input v-model="addAttConfirmRecForm.positionTitle"></el-input>
        </el-form-item>
        <el-form-item label="标准职级" prop="standardRank">
          <el-input v-model="addAttConfirmRecForm.standardRank"></el-input>
        </el-form-item>
        <el-form-item label="出勤天数" prop="attDay">
          <el-input v-model="addAttConfirmRecForm.attDay"></el-input>
        </el-form-item>
        <el-form-item label="休息天数" prop="restDay">
          <el-input v-model="addAttConfirmRecForm.restDay"></el-input>
        </el-form-item>
        <el-form-item label="迟到早退次数" prop="tenMinTimesIn">
          <el-input v-model="addAttConfirmRecForm.tenMinTimesIn"></el-input>
        </el-form-item>
        <el-form-item label="旷工次数" prop="tenMinTimesOut">
          <el-input v-model="addAttConfirmRecForm.tenMinTimesOut"></el-input>
        </el-form-item>
        <el-form-item label="缺卡数" prop="lackAttTimes">
          <el-input v-model="addAttConfirmRecForm.lackAttTimes"></el-input>
        </el-form-item>
        <el-form-item label="缺勤天数" prop="absence">
          <el-input v-model="addAttConfirmRecForm.absence"></el-input>
        </el-form-item>
        <el-form-item label="1" prop="att1">
          <el-input v-model="addAttConfirmRecForm.att1"></el-input>
        </el-form-item>
        <el-form-item label="2" prop="att2">
          <el-input v-model="addAttConfirmRecForm.att2"></el-input>
        </el-form-item>
        <el-form-item label="3" prop="att3">
          <el-input v-model="addAttConfirmRecForm.att3"></el-input>
        </el-form-item>
        <el-form-item label="4" prop="att4">
          <el-input v-model="addAttConfirmRecForm.att4"></el-input>
        </el-form-item>
        <el-form-item label="5" prop="att5">
          <el-input v-model="addAttConfirmRecForm.att5"></el-input>
        </el-form-item>
        <el-form-item label="6" prop="att6">
          <el-input v-model="addAttConfirmRecForm.att6"></el-input>
        </el-form-item>
        <el-form-item label="7" prop="att7">
          <el-input v-model="addAttConfirmRecForm.att7"></el-input>
        </el-form-item>
        <el-form-item label="8" prop="att8">
          <el-input v-model="addAttConfirmRecForm.att8"></el-input>
        </el-form-item>
        <el-form-item label="9" prop="att9">
          <el-input v-model="addAttConfirmRecForm.att9"></el-input>
        </el-form-item>
        <el-form-item label="10" prop="att10">
          <el-input v-model="addAttConfirmRecForm.att10"></el-input>
        </el-form-item>
        <el-form-item label="11" prop="att11">
          <el-input v-model="addAttConfirmRecForm.att11"></el-input>
        </el-form-item>
        <el-form-item label="12" prop="att12">
          <el-input v-model="addAttConfirmRecForm.att12"></el-input>
        </el-form-item>
        <el-form-item label="13" prop="att13">
          <el-input v-model="addAttConfirmRecForm.att13"></el-input>
        </el-form-item>
        <el-form-item label="14" prop="att14">
          <el-input v-model="addAttConfirmRecForm.att14"></el-input>
        </el-form-item>
        <el-form-item label="15" prop="att15">
          <el-input v-model="addAttConfirmRecForm.att15"></el-input>
        </el-form-item>
        <el-form-item label="16" prop="att16">
          <el-input v-model="addAttConfirmRecForm.att16"></el-input>
        </el-form-item>
        <el-form-item label="17" prop="att17">
          <el-input v-model="addAttConfirmRecForm.att17"></el-input>
        </el-form-item>
        <el-form-item label="18" prop="att18">
          <el-input v-model="addAttConfirmRecForm.att18"></el-input>
        </el-form-item>
        <el-form-item label="19" prop="att19">
          <el-input v-model="addAttConfirmRecForm.att19"></el-input>
        </el-form-item>
        <el-form-item label="20" prop="att20">
          <el-input v-model="addAttConfirmRecForm.att20"></el-input>
        </el-form-item>
        <el-form-item label="21" prop="att21">
          <el-input v-model="addAttConfirmRecForm.att21"></el-input>
        </el-form-item>
        <el-form-item label="22" prop="att22">
          <el-input v-model="addAttConfirmRecForm.att22"></el-input>
        </el-form-item>
        <el-form-item label="23" prop="att23">
          <el-input v-model="addAttConfirmRecForm.att23"></el-input>
        </el-form-item>
        <el-form-item label="24" prop="att24">
          <el-input v-model="addAttConfirmRecForm.att24"></el-input>
        </el-form-item>
        <el-form-item label="25" prop="att25">
          <el-input v-model="addAttConfirmRecForm.att25"></el-input>
        </el-form-item>
        <el-form-item label="26" prop="att26">
          <el-input v-model="addAttConfirmRecForm.att26"></el-input>
        </el-form-item>
        <el-form-item label="27" prop="att27">
          <el-input v-model="addAttConfirmRecForm.att27"></el-input>
        </el-form-item>
        <el-form-item label="28" prop="att28">
          <el-input v-model="addAttConfirmRecForm.att28"></el-input>
        </el-form-item>
        <el-form-item label="29" prop="att29">
          <el-input v-model="addAttConfirmRecForm.att29"></el-input>
        </el-form-item>
        <el-form-item label="30" prop="att30">
          <el-input v-model="addAttConfirmRecForm.att30"></el-input>
        </el-form-item>
        <el-form-item label="31" prop="att31">
          <el-input v-model="addAttConfirmRecForm.att31"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="addAttConfirmRecForm.empName"></el-input>
        </el-form-item>
        <el-form-item label="因忘打卡补卡次数" prop="forgateAttAddTimes">
          <el-input v-model="addAttConfirmRecForm.forgateAttAddTimes"></el-input>
        </el-form-item>
        <el-form-item label="婚假" prop="leaveTypeHun">
          <el-input v-model="addAttConfirmRecForm.leaveTypeHun"></el-input>
        </el-form-item>
        <el-form-item label="事假" prop="leaveTypeShi">
          <el-input v-model="addAttConfirmRecForm.leaveTypeShi"></el-input>
        </el-form-item>
        <el-form-item label="年假" prop="leaveTypeNian">
          <el-input v-model="addAttConfirmRecForm.leaveTypeNian"></el-input>
        </el-form-item>
        <el-form-item label="调休" prop="leaveTypeTiao">
          <el-input v-model="addAttConfirmRecForm.leaveTypeTiao"></el-input>
        </el-form-item>
        <el-form-item label="病假" prop="leaveTypeBing">
          <el-input v-model="addAttConfirmRecForm.leaveTypeBing"></el-input>
        </el-form-item>
        <el-form-item label="调休假" prop="leaveTypeTiaoxiu">
          <el-input v-model="addAttConfirmRecForm.leaveTypeTiaoxiu"></el-input>
        </el-form-item>
        <el-form-item label="产检假" prop="leaveTypeChanjian">
          <el-input v-model="addAttConfirmRecForm.leaveTypeChanjian"></el-input>
        </el-form-item>
        <el-form-item label="分娩假" prop="leaveTypeFenmian">
          <el-input v-model="addAttConfirmRecForm.leaveTypeFenmian"></el-input>
        </el-form-item>
        <el-form-item label="陪产假" prop="leaveTypePeichan">
          <el-input v-model="addAttConfirmRecForm.leaveTypePeichan"></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="leaveTypeQita">
          <el-input v-model="addAttConfirmRecForm.leaveTypeQita"></el-input>
        </el-form-item>
        <el-form-item label="丧假" prop="leaveTypeSang">
          <el-input v-model="addAttConfirmRecForm.leaveTypeSang"></el-input>
        </el-form-item>
        <el-form-item label="工伤假" prop="leaveTypeGongshang">
          <el-input v-model="addAttConfirmRecForm.leaveTypeGongshang"></el-input>
        </el-form-item>
        <el-form-item label="哺乳假" prop="leaveTypeBuru">
          <el-input v-model="addAttConfirmRecForm.leaveTypeBuru"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAttConfirmRecDV = false">取 消</el-button>
        <el-button type="primary" @click="addAttConfirmRec">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤确认管理" :visible.sync="editAttConfirmRecDV" width="750px" @close="editAttConfirmRecDVClose">
      <el-form inline :model="editAttConfirmRecForm" :rules="editAttConfirmRecFormRules" ref="editAttConfirmRecFormRef" label-width="120px" size="small">
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="editAttConfirmRecForm.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="考勤确认" prop="isAttConfirm">
          <el-input v-model="editAttConfirmRecForm.isAttConfirm"></el-input>
        </el-form-item>
        <el-form-item label="年" prop="year">
          <el-input v-model="editAttConfirmRecForm.year"></el-input>
        </el-form-item>
        <el-form-item label="月" prop="month">
          <el-input v-model="editAttConfirmRecForm.month"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="positionTitle">
          <el-input v-model="editAttConfirmRecForm.positionTitle"></el-input>
        </el-form-item>
        <el-form-item label="标准职级" prop="standardRank">
          <el-input v-model="editAttConfirmRecForm.standardRank"></el-input>
        </el-form-item>
        <el-form-item label="出勤天数" prop="attDay">
          <el-input v-model="editAttConfirmRecForm.attDay"></el-input>
        </el-form-item>
        <el-form-item label="休息天数" prop="restDay">
          <el-input v-model="editAttConfirmRecForm.restDay"></el-input>
        </el-form-item>
        <el-form-item label="迟到早退次数" prop="tenMinTimesIn">
          <el-input v-model="editAttConfirmRecForm.tenMinTimesIn"></el-input>
        </el-form-item>
        <el-form-item label="旷工次数" prop="tenMinTimesOut">
          <el-input v-model="editAttConfirmRecForm.tenMinTimesOut"></el-input>
        </el-form-item>
        <el-form-item label="缺卡数" prop="lackAttTimes">
          <el-input v-model="editAttConfirmRecForm.lackAttTimes"></el-input>
        </el-form-item>
        <el-form-item label="缺勤天数" prop="absence">
          <el-input v-model="editAttConfirmRecForm.absence"></el-input>
        </el-form-item>
        <el-form-item label="1" prop="att1">
          <el-input v-model="editAttConfirmRecForm.att1"></el-input>
        </el-form-item>
        <el-form-item label="2" prop="att2">
          <el-input v-model="editAttConfirmRecForm.att2"></el-input>
        </el-form-item>
        <el-form-item label="3" prop="att3">
          <el-input v-model="editAttConfirmRecForm.att3"></el-input>
        </el-form-item>
        <el-form-item label="4" prop="att4">
          <el-input v-model="editAttConfirmRecForm.att4"></el-input>
        </el-form-item>
        <el-form-item label="5" prop="att5">
          <el-input v-model="editAttConfirmRecForm.att5"></el-input>
        </el-form-item>
        <el-form-item label="6" prop="att6">
          <el-input v-model="editAttConfirmRecForm.att6"></el-input>
        </el-form-item>
        <el-form-item label="7" prop="att7">
          <el-input v-model="editAttConfirmRecForm.att7"></el-input>
        </el-form-item>
        <el-form-item label="8" prop="att8">
          <el-input v-model="editAttConfirmRecForm.att8"></el-input>
        </el-form-item>
        <el-form-item label="9" prop="att9">
          <el-input v-model="editAttConfirmRecForm.att9"></el-input>
        </el-form-item>
        <el-form-item label="10" prop="att10">
          <el-input v-model="editAttConfirmRecForm.att10"></el-input>
        </el-form-item>
        <el-form-item label="11" prop="att11">
          <el-input v-model="editAttConfirmRecForm.att11"></el-input>
        </el-form-item>
        <el-form-item label="12" prop="att12">
          <el-input v-model="editAttConfirmRecForm.att12"></el-input>
        </el-form-item>
        <el-form-item label="13" prop="att13">
          <el-input v-model="editAttConfirmRecForm.att13"></el-input>
        </el-form-item>
        <el-form-item label="14" prop="att14">
          <el-input v-model="editAttConfirmRecForm.att14"></el-input>
        </el-form-item>
        <el-form-item label="15" prop="att15">
          <el-input v-model="editAttConfirmRecForm.att15"></el-input>
        </el-form-item>
        <el-form-item label="16" prop="att16">
          <el-input v-model="editAttConfirmRecForm.att16"></el-input>
        </el-form-item>
        <el-form-item label="17" prop="att17">
          <el-input v-model="editAttConfirmRecForm.att17"></el-input>
        </el-form-item>
        <el-form-item label="18" prop="att18">
          <el-input v-model="editAttConfirmRecForm.att18"></el-input>
        </el-form-item>
        <el-form-item label="19" prop="att19">
          <el-input v-model="editAttConfirmRecForm.att19"></el-input>
        </el-form-item>
        <el-form-item label="20" prop="att20">
          <el-input v-model="editAttConfirmRecForm.att20"></el-input>
        </el-form-item>
        <el-form-item label="21" prop="att21">
          <el-input v-model="editAttConfirmRecForm.att21"></el-input>
        </el-form-item>
        <el-form-item label="22" prop="att22">
          <el-input v-model="editAttConfirmRecForm.att22"></el-input>
        </el-form-item>
        <el-form-item label="23" prop="att23">
          <el-input v-model="editAttConfirmRecForm.att23"></el-input>
        </el-form-item>
        <el-form-item label="24" prop="att24">
          <el-input v-model="editAttConfirmRecForm.att24"></el-input>
        </el-form-item>
        <el-form-item label="25" prop="att25">
          <el-input v-model="editAttConfirmRecForm.att25"></el-input>
        </el-form-item>
        <el-form-item label="26" prop="att26">
          <el-input v-model="editAttConfirmRecForm.att26"></el-input>
        </el-form-item>
        <el-form-item label="27" prop="att27">
          <el-input v-model="editAttConfirmRecForm.att27"></el-input>
        </el-form-item>
        <el-form-item label="28" prop="att28">
          <el-input v-model="editAttConfirmRecForm.att28"></el-input>
        </el-form-item>
        <el-form-item label="29" prop="att29">
          <el-input v-model="editAttConfirmRecForm.att29"></el-input>
        </el-form-item>
        <el-form-item label="30" prop="att30">
          <el-input v-model="editAttConfirmRecForm.att30"></el-input>
        </el-form-item>
        <el-form-item label="31" prop="att31">
          <el-input v-model="editAttConfirmRecForm.att31"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="editAttConfirmRecForm.empName"></el-input>
        </el-form-item>
        <el-form-item label="因忘打卡补卡次数" prop="forgateAttAddTimes">
          <el-input v-model="editAttConfirmRecForm.forgateAttAddTimes"></el-input>
        </el-form-item>
        <el-form-item label="婚假" prop="leaveTypeHun">
          <el-input v-model="editAttConfirmRecForm.leaveTypeHun"></el-input>
        </el-form-item>
        <el-form-item label="事假" prop="leaveTypeShi">
          <el-input v-model="editAttConfirmRecForm.leaveTypeShi"></el-input>
        </el-form-item>
        <el-form-item label="年假" prop="leaveTypeNian">
          <el-input v-model="editAttConfirmRecForm.leaveTypeNian"></el-input>
        </el-form-item>
        <el-form-item label="调休" prop="leaveTypeTiao">
          <el-input v-model="editAttConfirmRecForm.leaveTypeTiao"></el-input>
        </el-form-item>
        <el-form-item label="病假" prop="leaveTypeBing">
          <el-input v-model="editAttConfirmRecForm.leaveTypeBing"></el-input>
        </el-form-item>
        <el-form-item label="调休假" prop="leaveTypeTiaoxiu">
          <el-input v-model="editAttConfirmRecForm.leaveTypeTiaoxiu"></el-input>
        </el-form-item>
        <el-form-item label="产检假" prop="leaveTypeChanjian">
          <el-input v-model="editAttConfirmRecForm.leaveTypeChanjian"></el-input>
        </el-form-item>
        <el-form-item label="分娩假" prop="leaveTypeFenmian">
          <el-input v-model="editAttConfirmRecForm.leaveTypeFenmian"></el-input>
        </el-form-item>
        <el-form-item label="陪产假" prop="leaveTypePeichan">
          <el-input v-model="editAttConfirmRecForm.leaveTypePeichan"></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="leaveTypeQita">
          <el-input v-model="editAttConfirmRecForm.leaveTypeQita"></el-input>
        </el-form-item>
        <el-form-item label="丧假" prop="leaveTypeSang">
          <el-input v-model="editAttConfirmRecForm.leaveTypeSang"></el-input>
        </el-form-item>
        <el-form-item label="工伤假" prop="leaveTypeGongshang">
          <el-input v-model="editAttConfirmRecForm.leaveTypeGongshang"></el-input>
        </el-form-item>
        <el-form-item label="哺乳假" prop="leaveTypeBuru">
          <el-input v-model="editAttConfirmRecForm.leaveTypeBuru"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAttConfirmRecDV = false">取 消</el-button>
        <el-button type="primary" @click="editAttConfirmRec">确 定</el-button>
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
      AttConfirmRecList: null,
      addAttConfirmRecDV: false,
      addAttConfirmRecForm: {
        empMdmCode: '',
        isAttConfirm: '',
        year: '',
        month: '',
        positionTitle: '',
        standardRank: '',
        attDay: '',
        restDay: '',
        tenMinTimesIn: '',
        tenMinTimesOut: '',
        lackAttTimes: '',
        absence: '',
        att1: '',
        att2: '',
        att3: '',
        att4: '',
        att5: '',
        att6: '',
        att7: '',
        att8: '',
        att9: '',
        att10: '',
        att11: '',
        att12: '',
        att13: '',
        att14: '',
        att15: '',
        att16: '',
        att17: '',
        att18: '',
        att19: '',
        att20: '',
        att21: '',
        att22: '',
        att23: '',
        att24: '',
        att25: '',
        att26: '',
        att27: '',
        att28: '',
        att29: '',
        att30: '',
        att31: '',
        empName: '',
        forgateAttAddTimes: '',
        leaveTypeHun: '',
        leaveTypeShi: '',
        leaveTypeNian: '',
        leaveTypeTiao: '',
        leaveTypeBing: '',
        leaveTypeTiaoxiu: '',
        leaveTypeChanjian: '',
        leaveTypeFenmian: '',
        leaveTypePeichan: '',
        leaveTypeQita: '',
        leaveTypeSang: '',
        leaveTypeGongshang: '',
        leaveTypeBuru: ''
      },
      addAttConfirmRecFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isAttConfirm: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        year: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        month: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        positionTitle: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        standardRank: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        restDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tenMinTimesIn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tenMinTimesOut: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        lackAttTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        absence: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att4: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att5: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att6: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att7: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att8: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att9: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att10: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att11: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att12: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att13: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att14: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att15: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att16: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att17: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att18: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att19: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att20: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att21: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att22: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att23: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att24: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att25: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att26: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att27: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att28: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att29: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att30: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att31: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        forgateAttAddTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeHun: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeShi: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeNian: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeTiao: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeBing: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeTiaoxiu: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeChanjian: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeFenmian: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypePeichan: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeQita: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeSang: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeGongshang: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeBuru: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      },
      editAttConfirmRecDV: false,
      editAttConfirmRecForm: {
        empMdmCode: '',
        isAttConfirm: '',
        year: '',
        month: '',
        positionTitle: '',
        standardRank: '',
        attDay: '',
        restDay: '',
        tenMinTimesIn: '',
        tenMinTimesOut: '',
        lackAttTimes: '',
        absence: '',
        att1: '',
        att2: '',
        att3: '',
        att4: '',
        att5: '',
        att6: '',
        att7: '',
        att8: '',
        att9: '',
        att10: '',
        att11: '',
        att12: '',
        att13: '',
        att14: '',
        att15: '',
        att16: '',
        att17: '',
        att18: '',
        att19: '',
        att20: '',
        att21: '',
        att22: '',
        att23: '',
        att24: '',
        att25: '',
        att26: '',
        att27: '',
        att28: '',
        att29: '',
        att30: '',
        att31: '',
        empName: '',
        forgateAttAddTimes: '',
        leaveTypeHun: '',
        leaveTypeShi: '',
        leaveTypeNian: '',
        leaveTypeTiao: '',
        leaveTypeBing: '',
        leaveTypeTiaoxiu: '',
        leaveTypeChanjian: '',
        leaveTypeFenmian: '',
        leaveTypePeichan: '',
        leaveTypeQita: '',
        leaveTypeSang: '',
        leaveTypeGongshang: '',
        leaveTypeBuru: ''
      },
      editAttConfirmRecFormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        isAttConfirm: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        year: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        month: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        positionTitle: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        standardRank: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        restDay: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tenMinTimesIn: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        tenMinTimesOut: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        lackAttTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        absence: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att1: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att2: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att3: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att4: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att5: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att6: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att7: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att8: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att9: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att10: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att11: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att12: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att13: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att14: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att15: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att16: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att17: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att18: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att19: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att20: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att21: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att22: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att23: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att24: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att25: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att26: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att27: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att28: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att29: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att30: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        att31: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        empName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        forgateAttAddTimes: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeHun: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeShi: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeNian: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeTiao: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeBing: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeTiaoxiu: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeChanjian: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeFenmian: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypePeichan: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeQita: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeSang: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeGongshang: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        leaveTypeBuru: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAttConfirmRecList()
  },
  methods: {
    async getAttConfirmRecList() {
      const { data: res } = await this.$http.post('/api/attConfirmRec/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.AttConfirmRecList = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getAttConfirmRecList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getAttConfirmRecList()
    },
    async AttConfirmRecStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/attConfirmRec/upstatebykey', domaimInfo)
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
        message: '更新考勤确认管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getAttConfirmRecList()
    },
    addAttConfirmRecDVClose() {
      this.$refs.addAttConfirmRecFormRef.resetFields()
    },
    async addAttConfirmRecBtn() {
      const { data: res } = await this.$http.post('/api/attConfirmRec/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addAttConfirmRecForm = res.data
      this.addAttConfirmRecForm.projectId = this.projectId
      this.addAttConfirmRecDV = true
    },
    addAttConfirmRec() {
      this.$refs.addAttConfirmRecFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/attConfirmRec/add', this.addAttConfirmRecForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addAttConfirmRecDV = false
        this.getAttConfirmRecList()
      })
    },
    editAttConfirmRecDVClose() {
      this.$refs.editAttConfirmRecFormRef.resetFields()
    },
    handleClose() {

    },
    async editAttConfirmRecDVShow(id) {
      this.editAttConfirmRecDV = true
      this.editAttConfirmRecForm.id = id
      const { data: res } = await this.$http.post('/api/attConfirmRec/getbykey', this.editAttConfirmRecForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editAttConfirmRecForm = res.data
    },
    editAttConfirmRec() {
      this.$refs.editAttConfirmRecFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/attConfirmRec/upbykey', this.editAttConfirmRecForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editAttConfirmRecDV = false
        this.getAttConfirmRecList()
        this.$message.success(res.message)
      })
    },
    delAttConfirmRecById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/attConfirmRec/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getAttConfirmRecList()
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
