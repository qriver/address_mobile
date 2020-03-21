function userObject() {
  const userObject = {
    userId: '',
    userName: '',
    access_token: '',
    role: '',
    department: {
      deptId: '',
      deptName: ''
    },
    grid: {
      gridId: '',
      gridName: ''
    },
    auditor: {
      //审核人员
      auditorId: '',
      auditorName: '',
      departMent: {
        deptId: '',
        deptName: ''
      }
    }
  };
  return userObject;
}
export { userObject };
