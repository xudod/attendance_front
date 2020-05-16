import Vue from 'vue'
import Login from '../views/login/Login'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Welcome from '../views/home/Welcome'
import BaseSingleMdata from '../views/home/base_single_mdata/BaseSingleMdata'
import MachineUserTem from '../views/home/machine_user_tem/MachineUserTem'
import Role from '../views/home/role/Role'
import MachineUserFace from '../views/home/machine_user_face/MachineUserFace'
import UserRoleRelation from '../views/home/user_role_relation/UserRoleRelation'
import AttConfirmRec from '../views/home/att_confirm_rec/AttConfirmRec'
import UserOrgRelation from '../views/home/user_org_relation/UserOrgRelation'
import UserAttAppInfo from '../views/home/user_att_app_info/UserAttAppInfo'
import BaseManyMdata from '../views/home/base_many_mdata/BaseManyMdata'
import OrgIndeustryRelation from '../views/home/org_indeustry_relation/OrgIndeustryRelation'
import AppSysinfoMdata from '../views/home/app_sysinfo_mdata/AppSysinfoMdata'
import EmpAttendanceAdd from '../views/home/emp_attendance_add/EmpAttendanceAdd'
import EmpAttendanceStatus from '../views/home/emp_attendance_status/EmpAttendanceStatus'
import OrgSuperiorRelation from '../views/home/org_superior_relation/OrgSuperiorRelation'
import EmpLeave from '../views/home/emp_leave/EmpLeave'
import AllPunchRecord from '../views/home/all_punch_record/AllPunchRecord'
import EmpScheduleRelation from '../views/home/emp_schedule_relation/EmpScheduleRelation'
import UserSchedule from '../views/home/user_schedule/UserSchedule'
import FunResource from '../views/home/fun_resource/FunResource'
import Org from '../views/home/org/Org'
import BaseGroupMdata from '../views/home/base_group_mdata/BaseGroupMdata'
import WifiInfo from '../views/home/wifi_info/WifiInfo'
import MachineInfo from '../views/home/machine_info/MachineInfo'
import BpmContentRecord from '../views/home/bpm_content_record/BpmContentRecord'
import OrgProduceRelation from '../views/home/org_produce_relation/OrgProduceRelation'
import ScheduleCode from '../views/home/schedule_code/ScheduleCode'
import AttReport101 from '../views/home/att_report_101/AttReport101'
import Produce from '../views/home/produce/Produce'
import RoleFunRelation from '../views/home/role_fun_relation/RoleFunRelation'
import MachineUserRelation from '../views/home/machine_user_relation/MachineUserRelation'
// import ScheduleTime from '../views/home/schedule_time/ScheduleTime'
import Indeustry from '../views/home/indeustry/Indeustry'
import EmpBusinessTrip from '../views/home/emp_business_trip/EmpBusinessTrip'
import MachineUserInfo from '../views/home/machine_user_info/MachineUserInfo'
// import UserScheduleChange from '../views/home/user_schedule_change/UserScheduleChange'
import HolidayAndSpell from '../views/home/holiday_and_spell/HolidayAndSpell'
import User from '../views/home/user/User'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/BaseSingleMdata', component: BaseSingleMdata },
      { path: '/MachineUserTem', component: MachineUserTem },
      { path: '/Role', component: Role },
      { path: '/MachineUserFace', component: MachineUserFace },
      { path: '/UserRoleRelation', component: UserRoleRelation },
      { path: '/AttConfirmRec', component: AttConfirmRec },
      { path: '/UserOrgRelation', component: UserOrgRelation },
      { path: '/UserAttAppInfo', component: UserAttAppInfo },
      { path: '/BaseManyMdata', component: BaseManyMdata },
      { path: '/OrgIndeustryRelation', component: OrgIndeustryRelation },
      { path: '/AppSysinfoMdata', component: AppSysinfoMdata },
      { path: '/EmpAttendanceAdd', component: EmpAttendanceAdd },
      { path: '/EmpAttendanceStatus', component: EmpAttendanceStatus },
      { path: '/OrgSuperiorRelation', component: OrgSuperiorRelation },
      { path: '/EmpLeave', component: EmpLeave },
      { path: '/AllPunchRecord', component: AllPunchRecord },
      { path: '/EmpScheduleRelation', component: EmpScheduleRelation },
      { path: '/UserSchedule', component: UserSchedule },
      { path: '/FunResource', component: FunResource },
      { path: '/Org', component: Org },
      { path: '/BaseGroupMdata', component: BaseGroupMdata },
      { path: '/WifiInfo', component: WifiInfo },
      { path: '/MachineInfo', component: MachineInfo },
      { path: '/BpmContentRecord', component: BpmContentRecord },
      { path: '/OrgProduceRelation', component: OrgProduceRelation },
      { path: '/ScheduleCode', component: ScheduleCode },
      { path: '/AttReport101', component: AttReport101 },
      { path: '/Produce', component: Produce },
      { path: '/RoleFunRelation', component: RoleFunRelation },
      { path: '/MachineUserRelation', component: MachineUserRelation },
      // { path: '/ScheduleTime', component: ScheduleTime },
      { path: '/Indeustry', component: Indeustry },
      { path: '/EmpBusinessTrip', component: EmpBusinessTrip },
      { path: '/MachineUserInfo', component: MachineUserInfo },
      // { path: '/UserScheduleChange', component: UserScheduleChange },
      { path: '/HolidayAndSpell', component: HolidayAndSpell },
      { path: '/User', component: User }
    ]
  }
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
