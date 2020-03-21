目录结构：
   /api:   axios 访问restful接口的函数
      /type: 所有restful接口 vuex.store.state对象的结构定义，统一从此处获取
   /assets   css、icon 等静态文件
   /components:   页面用到的自定义组件，按页面分目录保存
   /mock:  调试用的模拟接口
   /router： 路由文件
   /store:  vuex 
   /views:  所有的页面文件
   

权限：
   登录地址: http://127.0.0.1:8080/login?userId=xxxx
   userId 可通过钉钉、手机卡等方式 获取后传入

   路由带参数跳转：
  this.$router.push({
      name: 'estate_portal',
      params: {
        estateId: this.objBuilding.estateId
      }
    });