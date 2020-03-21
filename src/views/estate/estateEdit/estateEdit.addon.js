import { $dialog, $toast } from '@/assets/common/common.js';

// import { $toastClose } from '../../../assets/common/common';
function computePlateDesc(estate) {
  var str = estate.estatePlate.streetValue;
  if (estate.estatePlate.platePrefixValue) {
    str = str + estate.estatePlate.platePrefixValue;
  }
  str = str + estate.estatePlate.plateNumber;
  if (estate.estatePlate.plateSuffixValue) {
    str = str + estate.estatePlate.plateSuffixValue;
  }
  return str;
}
const SaveEstateToDb = (estate, that) => {
  $dialog('提示', '您确定要保存数据吗？')
    .then(() => {
      $toast.loading('正在保存...', 0);

      estate.estatePlate.plate_desc = computePlateDesc(estate);
      estate.worker_id = that.$store.state.user.userId;
      //调用 restful接口函数`

      const params = Object.assign({}, params, {
        estate: estate
      });
      // window.console.log(params);
      that.$api.estate.createEstate(params).then(
        res => {
          if (res.data.statusCode !== '-1') {
            $toast.close();
            $toast.success('保存成功！', 1500);
            that.$store.commit('estate/setEstate', that.objEstate);
            sessionStorage.setItem('estate', JSON.stringify(estate));
            that.$router.push('/estate');

            return true;
          } else {
            $toast.close();
            $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
            return;
          }
        },
        err => {
          //$toast('保存失败！', 3000);
          return err;
        }
      );
    })
    .catch(() => {
      $toast('没有保存！', 1000);
    });
};

const UpdateEstateToDb = that => {
  $dialog('提示', '您确定要保存数据吗？')
    .then(() => {
      var estate = that.objEstate;
      estate.estatePlate.plateDesc = computePlateDesc(estate);
      $toast.loading('正在保存...', 0);

      //调用 restful接口函数`

      const params = Object.assign({}, params, {
        estate: that.objEstate
      });
      // window.console.log(params);
      that.$api.estate.updateEstate(params).then(
        res => {
          // window.console.log(res);
          if (res.data.statusCode !== '-1') {
            $toast.close();
            $toast.success('保存成功！', 1500);
            that.$store.commit('estate/setEstate', that.objEstate);
            sessionStorage.setItem('estate', JSON.stringify(that.objEstate));
            that.$router.push('/estate/portal');
            return true;
          } else {
            $toast.close();
            $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
            return;
          }
        },
        err => {
          //$toast('保存失败！', 3000);
          return err;
        }
      );
    })
    .catch(() => {
      $toast('没有保存！', 1000);
    });
};

const DeleteEstateFromDb = that => {
  $dialog('提示', '您确定要删除数据吗？')
    .then(() => {
      $toast.loading('正在保存...', 0);

      //调用 restful接口函数`

      const params = Object.assign({}, params, {
        estate: that.estateInstance
      });
      // window.console.log(params);
      that.$api.estate.deleteEstate(params).then(
        res => {
          // window.console.log(res);
          if (res.data.statusCode !== '-1') {
            $toast.close();
            $toast.success('删除数据成功！', 1500);
            that.$store.commit('estate/cleanEstate');
            sessionStorage.setItem('estate', '');
            that.$router.push('/estate');
            return true;
          } else {
            $toast.close();
            $toast.alert('保存失败\n' + JSON.stringify(res.data.result), 5000);
            return;
          }
        },
        err => {
          //$toast('保存失败！', 3000);
          return err;
        }
      );
    })
    .catch(() => {
      $toast('没有保存！', 1000);
    });
};

export { SaveEstateToDb, UpdateEstateToDb, DeleteEstateFromDb };
