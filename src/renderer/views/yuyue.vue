<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  import {zh} from 'vuejs-datepicker/dist/locale';
  import { handleLoading } from "../utils/utils";
  import * as request from "../utils/request";

  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        showing: 'form',
        showed: [],
        form: {
          type: '活动报名'
        },
        zh,
        submitModal: false,
        floor: null
      };
    },
    methods: {
      submit() {
        this.submitModal = true;
        request.submitAppointment(this.form);
      },
      clearForm() {
        this.form = {
          type: '活动报名'
        };
        this.submitModal = false;
      },
      back() {
        if (this.showed.length) {
          this.showing = this.showed.pop();
        } else {
          this.$router.back();
        }
      }
    },
    computed: {
      disabledDatesProp() {
        return {
          to: moment().startOf('day').add(7, 'days').toDate(),
          from: moment().startOf('day').add(7, 'days').add(3, 'months').toDate()
        };
      },
      appointmentDate() {
        if (!this.form['预约日期']) {
          return;
        }
        return moment(this.form['预约日期']).format('YYYY-MM-DD');
      }
    }
  }
</script>
<template>
  <div class="yuyue-view main page-yuyue">
    <div class="header">
      <a @click.prevent="back()" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
      <b><img src="~@/assets/images/index/icon7.png"/>活动预约</b>
    </div>
    <div v-if="showing=='form'" class="content form hongting">
      <form @submit.prevent="submit()">
        <h2>场馆预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['预约单位']" placeholder="单位名称" required/>
        </div>
        <div class="item">
          <label>活动名称</label>
          <input v-model="form['活动名称']" placeholder="名称" required/>
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" placeholder="预约日期" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" required/>
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="人数" required/>
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" required/>
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" required/>
        </div>
        <div class="item">
          <label>备注</label>
          <textarea v-model="form['备注']"></textarea> 
        </div>
        <button type="submit" class="btn-block blue">提交</button>
        <div class="modal" v-if="submitModal" @click="back()">
          <div class="message blue">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="less">
.yuyue-view {
  background: white;
  height: 100%;
  .header {
    height: 16vw;
    background: #51a7dc;
    line-height: 16vw;
    color: #fff;
    font-size: 5.7vw;
    text-align: center;
    padding: 0 5vw;
    position: static;
  }

  .header a {
    font-size: 4vw;
    color: #fff;
    position: absolute;
    z-index: 0;
    left: 5vw; top: 0;
  }

  .header a i {
    font-size: 5vw;
    top: 0.5vw;
    position: relative;
  }

  .header img {
    display: inline-block;
    width: 9vw;
    position: relative;
    top: 2vw;
    margin-right: 2vw;
  }
  .content {
    padding: 7vw;
    height: calc(100vh - 16vw);
    overflow-y: auto;
    padding-bottom: 15vw !important;
    img {
      width: 100%;
    }
    h2 {
      color: #888;
      font-size: 5vw;
      text-align: center;
      margin-top: -3vw;
      font-weight: normal;
      margin-bottom: 1.5vw;
    }
  }
  .btn-block {
    margin: 2vw auto 0;
    display: block;
    left: 7vw;
    right: 7vw;
    width: calc(100% - 14vw);
    bottom: 2vw;
    border: none;
    height: 13vw;
    color: white;
    font-size: 5.5vw;
    font-weight: bold;
    line-height: 1;
    border-radius: 2vw;
    outline: none;
    position: fixed;
  }
  .form {
    background: #f7f8f8;
    padding: 6vw;
    .item {
      border: #ddd 1px solid;
      padding: 3vw;
      background: white;
      font-size: 4.5vw;
      margin-bottom: 2.5vw;
      min-height: 14vw;
    }
    label {
      font-weight: bold;
      margin-right: 2vw;
      width: 33%;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
    }
    ::placeholder {
      color: #c8c8c8;
    }
    input, select, textarea {
      outline: none;
      font-family: inherit;
      width: 62%;
      background: none;
      border: none;
      vertical-align: middle;
    }
    select {
      margin-left: -1.1vw;
      -webkit-appearance: none;
    }
    textarea {
      outline: none;
      width: 62%;
      height: 26vw;
    }
    .vdp-datepicker {
      display: inline-block;
      .vdp-datepicker__calendar {
        width: 80vw;
        header {
          line-height: 10vw;
          .prev:after, .next:after {
            border-width: 2vw;
          }
        }
        .cell {
          height: 10vw;
          line-height: 10vw;
        }
      }
    }
    .vdp-datepicker__calendar {
      left: -22vw !important;
    }
    .modal {
      background: rgba(127, 127, 127, 0.5);
      position: absolute;
      top: 0;
      height: 100vh;
      left: 0;
      right: 0;
    }

    .modal .message {
      position: absolute;
      top: 50%;
      height: 27vw;
      margin-top: -20vw;
      left: 5vw;
      width: 90vw;
      padding: 5vw;
      font-size: 6vw;
      color: white;
      font-weight: bold;
      border-radius: 4vw;
      text-align: center;
      line-height: 1.3;
    }
  }
  .fapiao {
    h3 {
      font-size: 4.5vw;
      text-align: center;
      margin-bottom: 1vw;
      margin-top: 5vw;
    }
    .item {
      padding: 1vw 3vw;
      min-height: 10vw;
    }
  }
  .orange {
    background-color: #e79b32;
  }
  .red {
    background-color: #952320;
  }
  .blue {
    background-color: #51a7dc;
  }
  .green {
    background-color: #84c5cf;
  }
}
</style>