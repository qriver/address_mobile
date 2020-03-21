<template>
  <div id="room-picker">
    <van-field label="房间:" :value="roomtext" required readonly clickable input-align="right" placeholder="请选择房间" @click="onFieldClick()">
      <van-icon size="25" class-prefix="my-icon" name="arrow-right" slot="right-icon" />
    </van-field>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker ref="picker" show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Field, Popup, Picker } from 'vant';
// import 'vant/lib/cell-group/style';

import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
import 'vant/lib/field/style';

export default {
  name: 'room-picker',
  data() {
    return {
      columns: [], //pick控件的选择列表对象
      roomtext: '',
      buildingInstance: {},
      showPicker: false
    };
  },
  created() {
    //从sessionStorage中获取当前修改的数据对象
    this.buildingInstance = JSON.parse(sessionStorage.getItem('building'));
  },
  props: ['estateInstance'],
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Icon.name]: Icon
  },
  methods: {
    onConfirm() {
      //pick选择界面弹出后，确认选择的数据对象

      this.showPicker = false;
      const unit = this.buildingInstance.units[this.$refs.picker.getIndexes()[0]];
      const floor = unit.floors[this.$refs.picker.getIndexes()[1]];
      const room = floor.rooms[this.$refs.picker.getIndexes()[2]];
      this.roomtext = unit.unit_alias + '/' + floor.floor_alias + '/' + room.room_alias;

      this.$emit('room-picker-confirm', this.$refs.picker.getIndexes());
    },
    onCancel() {
      //pick选择界面弹出后，确认选择的数据对象
      this.currentUnit = {};
      // this.state = 1;
      // this.radio = '1';
      //window.console.log(this.currentUnit);
      this.showPicker = false;
    },
    onFieldClick() {
      //选择单元field点击动作
      if (!this.buildingInstance.units.length) {
        return;
      }
      this.showPicker = true;
      if (this.columns.length == 0) {
        for (let i = 0; i < this.buildingInstance.units.length; i++) {
          let column = {
            text: '',
            children: []
          };
          column.text = this.buildingInstance.units[i].unit_alias;
          let floors = this.buildingInstance.units[i].floors;
          for (let j = 0; j < floors.length; j++) {
            let floor = {
              text: '',
              children: []
            };
            let rooms = this.buildingInstance.units[i].floors[j].rooms;
            for (let k = 0; k < rooms.length; k++) {
              let room = {
                text: ''
              };
              room.text = rooms[k].room_alias;
              floor.children.push(room);
            }
            floor.text = floors[j].floor_alias;
            column.children.push(floor);
          }

          this.columns.push(column);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style/my-vant';
</style>
