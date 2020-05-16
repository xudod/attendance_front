<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤101报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addAttReport101DV = true" style="margin-right: 20px; margin-bottom: 15px;">添加考勤101报表</el-button>
      </div>
      <el-table :data="AttReport101List" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="成员编码" prop="empMdmCode"></el-table-column>
        <el-table-column label="年" prop="attYear"></el-table-column>
        <el-table-column label="月" prop="attMonth"></el-table-column>
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
            <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" @change="AttReport101StateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAttReport101DVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delAttReport101ById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加考勤101报表" :visible.sync="addAttReport101DV" width="750px" :before-close="handleClose" @close="addAttReport101DVClose">
      <el-form inline :model="addAttReport101Form" :rules="addAttReport101FormRules" ref="addAttReport101FormRef" label-width="120px" size="small">
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="addAttReport101Form.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="年" prop="attYear">
          <el-input v-model="addAttReport101Form.attYear"></el-input>
        </el-form-item>
        <el-form-item label="月" prop="attMonth">
          <el-input v-model="addAttReport101Form.attMonth"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="positionTitle">
          <el-input v-model="addAttReport101Form.positionTitle"></el-input>
        </el-form-item>
        <el-form-item label="标准职级" prop="standardRank">
          <el-input v-model="addAttReport101Form.standardRank"></el-input>
        </el-form-item>
        <el-form-item label="出勤天数" prop="attDay">
          <el-input v-model="addAttReport101Form.attDay"></el-input>
        </el-form-item>
        <el-form-item label="休息天数" prop="restDay">
          <el-input v-model="addAttReport101Form.restDay"></el-input>
        </el-form-item>
        <el-form-item label="迟到早退次数" prop="tenMinTimesIn">
          <el-input v-model="addAttReport101Form.tenMinTimesIn"></el-input>
        </el-form-item>
        <el-form-item label="旷工次数" prop="tenMinTimesOut">
          <el-input v-model="addAttReport101Form.tenMinTimesOut"></el-input>
        </el-form-item>
        <el-form-item label="缺卡数" prop="lackAttTimes">
          <el-input v-model="addAttReport101Form.lackAttTimes"></el-input>
        </el-form-item>
        <el-form-item label="缺勤天数" prop="absence">
          <el-input v-model="addAttReport101Form.absence"></el-input>
        </el-form-item>
        <el-form-item label="1" prop="att1">
          <el-input v-model="addAttReport101Form.att1"></el-input>
        </el-form-item>
        <el-form-item label="2" prop="att2">
          <el-input v-model="addAttReport101Form.att2"></el-input>
        </el-form-item>
        <el-form-item label="3" prop="att3">
          <el-input v-model="addAttReport101Form.att3"></el-input>
        </el-form-item>
        <el-form-item label="4" prop="att4">
          <el-input v-model="addAttReport101Form.att4"></el-input>
        </el-form-item>
        <el-form-item label="5" prop="att5">
          <el-input v-model="addAttReport101Form.att5"></el-input>
        </el-form-item>
        <el-form-item label="6" prop="att6">
          <el-input v-model="addAttReport101Form.att6"></el-input>
        </el-form-item>
        <el-form-item label="7" prop="att7">
          <el-input v-model="addAttReport101Form.att7"></el-input>
        </el-form-item>
        <el-form-item label="8" prop="att8">
          <el-input v-model="addAttReport101Form.att8"></el-input>
        </el-form-item>
        <el-form-item label="9" prop="att9">
          <el-input v-model="addAttReport101Form.att9"></el-input>
        </el-form-item>
        <el-form-item label="10" prop="att10">
          <el-input v-model="addAttReport101Form.att10"></el-input>
        </el-form-item>
        <el-form-item label="11" prop="att11">
          <el-input v-model="addAttReport101Form.att11"></el-input>
        </el-form-item>
        <el-form-item label="12" prop="att12">
          <el-input v-model="addAttReport101Form.att12"></el-input>
        </el-form-item>
        <el-form-item label="13" prop="att13">
          <el-input v-model="addAttReport101Form.att13"></el-input>
        </el-form-item>
        <el-form-item label="14" prop="att14">
          <el-input v-model="addAttReport101Form.att14"></el-input>
        </el-form-item>
        <el-form-item label="15" prop="att15">
          <el-input v-model="addAttReport101Form.att15"></el-input>
        </el-form-item>
        <el-form-item label="16" prop="att16">
          <el-input v-model="addAttReport101Form.att16"></el-input>
        </el-form-item>
        <el-form-item label="17" prop="att17">
          <el-input v-model="addAttReport101Form.att17"></el-input>
        </el-form-item>
        <el-form-item label="18" prop="att18">
          <el-input v-model="addAttReport101Form.att18"></el-input>
        </el-form-item>
        <el-form-item label="19" prop="att19">
          <el-input v-model="addAttReport101Form.att19"></el-input>
        </el-form-item>
        <el-form-item label="20" prop="att20">
          <el-input v-model="addAttReport101Form.att20"></el-input>
        </el-form-item>
        <el-form-item label="21" prop="att21">
          <el-input v-model="addAttReport101Form.att21"></el-input>
        </el-form-item>
        <el-form-item label="22" prop="att22">
          <el-input v-model="addAttReport101Form.att22"></el-input>
        </el-form-item>
        <el-form-item label="23" prop="att23">
          <el-input v-model="addAttReport101Form.att23"></el-input>
        </el-form-item>
        <el-form-item label="24" prop="att24">
          <el-input v-model="addAttReport101Form.att24"></el-input>
        </el-form-item>
        <el-form-item label="25" prop="att25">
          <el-input v-model="addAttReport101Form.att25"></el-input>
        </el-form-item>
        <el-form-item label="26" prop="att26">
          <el-input v-model="addAttReport101Form.att26"></el-input>
        </el-form-item>
        <el-form-item label="27" prop="att27">
          <el-input v-model="addAttReport101Form.att27"></el-input>
        </el-form-item>
        <el-form-item label="28" prop="att28">
          <el-input v-model="addAttReport101Form.att28"></el-input>
        </el-form-item>
        <el-form-item label="29" prop="att29">
          <el-input v-model="addAttReport101Form.att29"></el-input>
        </el-form-item>
        <el-form-item label="30" prop="att30">
          <el-input v-model="addAttReport101Form.att30"></el-input>
        </el-form-item>
        <el-form-item label="31" prop="att31">
          <el-input v-model="addAttReport101Form.att31"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="addAttReport101Form.empName"></el-input>
        </el-form-item>
        <el-form-item label="因忘打卡补卡次数" prop="forgateAttAddTimes">
          <el-input v-model="addAttReport101Form.forgateAttAddTimes"></el-input>
        </el-form-item>
        <el-form-item label="婚假" prop="leaveTypeHun">
          <el-input v-model="addAttReport101Form.leaveTypeHun"></el-input>
        </el-form-item>
        <el-form-item label="事假" prop="leaveTypeShi">
          <el-input v-model="addAttReport101Form.leaveTypeShi"></el-input>
        </el-form-item>
        <el-form-item label="年假" prop="leaveTypeNian">
          <el-input v-model="addAttReport101Form.leaveTypeNian"></el-input>
        </el-form-item>
        <el-form-item label="调休" prop="leaveTypeTiao">
          <el-input v-model="addAttReport101Form.leaveTypeTiao"></el-input>
        </el-form-item>
        <el-form-item label="病假" prop="leaveTypeBing">
          <el-input v-model="addAttReport101Form.leaveTypeBing"></el-input>
        </el-form-item>
        <el-form-item label="调休假" prop="leaveTypeTiaoxiu">
          <el-input v-model="addAttReport101Form.leaveTypeTiaoxiu"></el-input>
        </el-form-item>
        <el-form-item label="产检假" prop="leaveTypeChanjian">
          <el-input v-model="addAttReport101Form.leaveTypeChanjian"></el-input>
        </el-form-item>
        <el-form-item label="分娩假" prop="leaveTypeFenmian">
          <el-input v-model="addAttReport101Form.leaveTypeFenmian"></el-input>
        </el-form-item>
        <el-form-item label="陪产假" prop="leaveTypePeichan">
          <el-input v-model="addAttReport101Form.leaveTypePeichan"></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="leaveTypeQita">
          <el-input v-model="addAttReport101Form.leaveTypeQita"></el-input>
        </el-form-item>
        <el-form-item label="丧假" prop="leaveTypeSang">
          <el-input v-model="addAttReport101Form.leaveTypeSang"></el-input>
        </el-form-item>
        <el-form-item label="工伤假" prop="leaveTypeGongshang">
          <el-input v-model="addAttReport101Form.leaveTypeGongshang"></el-input>
        </el-form-item>
        <el-form-item label="哺乳假" prop="leaveTypeBuru">
          <el-input v-model="addAttReport101Form.leaveTypeBuru"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAttReport101DV = false">取 消</el-button>
        <el-button type="primary" @click="addAttReport101">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑考勤101报表" :visible.sync="editAttReport101DV" width="750px" @close="editAttReport101DVClose">
      <el-form inline :model="editAttReport101Form" :rules="editAttReport101FormRules" ref="editAttReport101FormRef" label-width="120px" size="small">
        <el-form-item label="成员编码" prop="empMdmCode">
          <el-input v-model="editAttReport101Form.empMdmCode"></el-input>
        </el-form-item>
        <el-form-item label="年" prop="attYear">
          <el-input v-model="editAttReport101Form.attYear"></el-input>
        </el-form-item>
        <el-form-item label="月" prop="attMonth">
          <el-input v-model="editAttReport101Form.attMonth"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="positionTitle">
          <el-input v-model="editAttReport101Form.positionTitle"></el-input>
        </el-form-item>
        <el-form-item label="标准职级" prop="standardRank">
          <el-input v-model="editAttReport101Form.standardRank"></el-input>
        </el-form-item>
        <el-form-item label="出勤天数" prop="attDay">
          <el-input v-model="editAttReport101Form.attDay"></el-input>
        </el-form-item>
        <el-form-item label="休息天数" prop="restDay">
          <el-input v-model="editAttReport101Form.restDay"></el-input>
        </el-form-item>
        <el-form-item label="迟到早退次数" prop="tenMinTimesIn">
          <el-input v-model="editAttReport101Form.tenMinTimesIn"></el-input>
        </el-form-item>
        <el-form-item label="旷工次数" prop="tenMinTimesOut">
          <el-input v-model="editAttReport101Form.tenMinTimesOut"></el-input>
        </el-form-item>
        <el-form-item label="缺卡数" prop="lackAttTimes">
          <el-input v-model="editAttReport101Form.lackAttTimes"></el-input>
        </el-form-item>
        <el-form-item label="缺勤天数" prop="absence">
          <el-input v-model="editAttReport101Form.absence"></el-input>
        </el-form-item>
        <el-form-item label="1" prop="att1">
          <el-input v-model="editAttReport101Form.att1"></el-input>
        </el-form-item>
        <el-form-item label="2" prop="att2">
          <el-input v-model="editAttReport101Form.att2"></el-input>
        </el-form-item>
        <el-form-item label="3" prop="att3">
          <el-input v-model="editAttReport101Form.att3"></el-input>
        </el-form-item>
        <el-form-item label="4" prop="att4">
          <el-input v-model="editAttReport101Form.att4"></el-input>
        </el-form-item>
        <el-form-item label="5" prop="att5">
          <el-input v-model="editAttReport101Form.att5"></el-input>
        </el-form-item>
        <el-form-item label="6" prop="att6">
          <el-input v-model="editAttReport101Form.att6"></el-input>
        </el-form-item>
        <el-form-item label="7" prop="att7">
          <el-input v-model="editAttReport101Form.att7"></el-input>
        </el-form-item>
        <el-form-item label="8" prop="att8">
          <el-input v-model="editAttReport101Form.att8"></el-input>
        </el-form-item>
        <el-form-item label="9" prop="att9">
          <el-input v-model="editAttReport101Form.att9"></el-input>
        </el-form-item>
        <el-form-item label="10" prop="att10">
          <el-input v-model="editAttReport101Form.att10"></el-input>
        </el-form-item>
        <el-form-item label="11" prop="att11">
          <el-input v-model="editAttReport101Form.att11"></el-input>
        </el-form-item>
        <el-form-item label="12" prop="att12">
          <el-input v-model="editAttReport101Form.att12"></el-input>
        </el-form-item>
        <el-form-item label="13" prop="att13">
          <el-input v-model="editAttReport101Form.att13"></el-input>
        </el-form-item>
        <el-form-item label="14" prop="att14">
          <el-input v-model="editAttReport101Form.att14"></el-input>
        </el-form-item>
        <el-form-item label="15" prop="att15">
          <el-input v-model="editAttReport101Form.att15"></el-input>
        </el-form-item>
        <el-form-item label="16" prop="att16">
          <el-input v-model="editAttReport101Form.att16"></el-input>
        </el-form-item>
        <el-form-item label="17" prop="att17">
          <el-input v-model="editAttReport101Form.att17"></el-input>
        </el-form-item>
        <el-form-item label="18" prop="att18">
          <el-input v-model="editAttReport101Form.att18"></el-input>
        </el-form-item>
        <el-form-item label="19" prop="att19">
          <el-input v-model="editAttReport101Form.att19"></el-input>
        </el-form-item>
        <el-form-item label="20" prop="att20">
          <el-input v-model="editAttReport101Form.att20"></el-input>
        </el-form-item>
        <el-form-item label="21" prop="att21">
          <el-input v-model="editAttReport101Form.att21"></el-input>
        </el-form-item>
        <el-form-item label="22" prop="att22">
          <el-input v-model="editAttReport101Form.att22"></el-input>
        </el-form-item>
        <el-form-item label="23" prop="att23">
          <el-input v-model="editAttReport101Form.att23"></el-input>
        </el-form-item>
        <el-form-item label="24" prop="att24">
          <el-input v-model="editAttReport101Form.att24"></el-input>
        </el-form-item>
        <el-form-item label="25" prop="att25">
          <el-input v-model="editAttReport101Form.att25"></el-input>
        </el-form-item>
        <el-form-item label="26" prop="att26">
          <el-input v-model="editAttReport101Form.att26"></el-input>
        </el-form-item>
        <el-form-item label="27" prop="att27">
          <el-input v-model="editAttReport101Form.att27"></el-input>
        </el-form-item>
        <el-form-item label="28" prop="att28">
          <el-input v-model="editAttReport101Form.att28"></el-input>
        </el-form-item>
        <el-form-item label="29" prop="att29">
          <el-input v-model="editAttReport101Form.att29"></el-input>
        </el-form-item>
        <el-form-item label="30" prop="att30">
          <el-input v-model="editAttReport101Form.att30"></el-input>
        </el-form-item>
        <el-form-item label="31" prop="att31">
          <el-input v-model="editAttReport101Form.att31"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="empName">
          <el-input v-model="editAttReport101Form.empName"></el-input>
        </el-form-item>
        <el-form-item label="因忘打卡补卡次数" prop="forgateAttAddTimes">
          <el-input v-model="editAttReport101Form.forgateAttAddTimes"></el-input>
        </el-form-item>
        <el-form-item label="婚假" prop="leaveTypeHun">
          <el-input v-model="editAttReport101Form.leaveTypeHun"></el-input>
        </el-form-item>
        <el-form-item label="事假" prop="leaveTypeShi">
          <el-input v-model="editAttReport101Form.leaveTypeShi"></el-input>
        </el-form-item>
        <el-form-item label="年假" prop="leaveTypeNian">
          <el-input v-model="editAttReport101Form.leaveTypeNian"></el-input>
        </el-form-item>
        <el-form-item label="调休" prop="leaveTypeTiao">
          <el-input v-model="editAttReport101Form.leaveTypeTiao"></el-input>
        </el-form-item>
        <el-form-item label="病假" prop="leaveTypeBing">
          <el-input v-model="editAttReport101Form.leaveTypeBing"></el-input>
        </el-form-item>
        <el-form-item label="调休假" prop="leaveTypeTiaoxiu">
          <el-input v-model="editAttReport101Form.leaveTypeTiaoxiu"></el-input>
        </el-form-item>
        <el-form-item label="产检假" prop="leaveTypeChanjian">
          <el-input v-model="editAttReport101Form.leaveTypeChanjian"></el-input>
        </el-form-item>
        <el-form-item label="分娩假" prop="leaveTypeFenmian">
          <el-input v-model="editAttReport101Form.leaveTypeFenmian"></el-input>
        </el-form-item>
        <el-form-item label="陪产假" prop="leaveTypePeichan">
          <el-input v-model="editAttReport101Form.leaveTypePeichan"></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="leaveTypeQita">
          <el-input v-model="editAttReport101Form.leaveTypeQita"></el-input>
        </el-form-item>
        <el-form-item label="丧假" prop="leaveTypeSang">
          <el-input v-model="editAttReport101Form.leaveTypeSang"></el-input>
        </el-form-item>
        <el-form-item label="工伤假" prop="leaveTypeGongshang">
          <el-input v-model="editAttReport101Form.leaveTypeGongshang"></el-input>
        </el-form-item>
        <el-form-item label="哺乳假" prop="leaveTypeBuru">
          <el-input v-model="editAttReport101Form.leaveTypeBuru"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAttReport101DV = false">取 消</el-button>
        <el-button type="primary" @click="editAttReport101">确 定</el-button>
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
      AttReport101List: null,
      addAttReport101DV: false,
      addAttReport101Form: {
        empMdmCode: '',
        attYear: '',
        attMonth: '',
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
      addAttReport101FormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attYear: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attMonth: [
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
      editAttReport101DV: false,
      editAttReport101Form: {
        empMdmCode: '',
        attYear: '',
        attMonth: '',
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
      editAttReport101FormRules: {
        empMdmCode: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attYear: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        attMonth: [
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
    this.getAttReport101List()
  },
  methods: {
    async getAttReport101List() {
      const { data: res } = await this.$http.post('/api/attReport101/getpage', this.queryInfo)
      if (res.code !== 200) return this.$message.error(res.message)
      this.AttReport101List = res.data.records
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.size = newSize
      this.getAttReport101List()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.current = newPage
      this.getAttReport101List()
    },
    async AttReport101StateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/attReport101/upstatebykey', domaimInfo)
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
        message: '更新考勤101报表状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getAttReport101List()
    },
    addAttReport101DVClose() {
      this.$refs.addAttReport101FormRef.resetFields()
    },
    async addAttReport101Btn() {
      const { data: res } = await this.$http.post('/api/attReport101/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addAttReport101Form = res.data
      this.addAttReport101Form.projectId = this.projectId
      this.addAttReport101DV = true
    },
    addAttReport101() {
      this.$refs.addAttReport101FormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/attReport101/add', this.addAttReport101Form)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addAttReport101DV = false
        this.getAttReport101List()
      })
    },
    editAttReport101DVClose() {
      this.$refs.editAttReport101FormRef.resetFields()
    },
    handleClose() {

    },
    async editAttReport101DVShow(id) {
      this.editAttReport101DV = true
      this.editAttReport101Form.id = id
      const { data: res } = await this.$http.post('/api/attReport101/getbykey', this.editAttReport101Form)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editAttReport101Form = res.data
    },
    editAttReport101() {
      this.$refs.editAttReport101FormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/attReport101/upbykey', this.editAttReport101Form)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editAttReport101DV = false
        this.getAttReport101List()
        this.$message.success(res.message)
      })
    },
    delAttReport101ById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/attReport101/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getAttReport101List()
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
