<script>
  import * as request from "../utils/request";

  export default {
    data() {
      return {
        items: [],
        item: null,
        page: null,
        totalPages: 0
      };
    },
    watch: {
      page(page) {
        this.getItems();
      }
    },
    methods: {
      async getItems() {
        this.items = await request.getPosts({query: {category: '五点半党校', page: this.page, limit: 8}, options: {cacheable: false}});
        this.totalPages = this.items._totalPages;
      },
      prev() {
        this.page --;
      },
      next() {
        this.page ++;
      },
      back() {
        if (this.item) {
          this.item = null;
        } else {
          this.$router.back();
        }
      },
      showDetail(item) {
        this.item = item;
      }
    },
    mounted() {
      this.page = 1;
    }
  }
</script>

<template>
  <div class="main view-dangxiao">
    <div class="header">
      <a class="fl back" @click="back()"><i class="fa fa-angle-left"></i>返回</a>
      <span><img src="~@/assets/images/icons/dangxiao.png"/>五点半党校</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in items" @click="showDetail(item)">
          <div class="title">{{ item.title }}</div>
          <i class="arrow fa fa-angle-right"></i>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <ul>
        <li class="prev" @click="prev" :class="{disabled:page==1}"><i class="fa fa-chevron-circle-left"></i></li>
        <li class="page-dot" :class="{active:i==page}" v-for="(i, index ) in totalPages"></li>
        <li class="next" @click="next" :class="{disabled:page>=totalPages}"><i class="fa fa-chevron-circle-right"></i></li>
      </ul>
    </div>
    <div v-if="this.item" class="detail">
      <h1>{{ this.item.title }}</h1>
      <div v-html="this.item.content"></div>
    </div>
  </div>
</template>

<style lang="less">
  .view-dangxiao {
    .header {
      background-color: #9e8d76;
    }
    .content {
      height: 93vh;
      background-color: #ececec;
      padding-left: 2vw;
      padding-right: 2vw;
      overflow-y: auto;
      ul {
        li {
          background-color: #fff;
          margin-top: 3vw;
          font-size: 4vw;
          font-weight: bold;
          padding: 3.5vw;
          line-height: 1;
          .title {
            text-overflow: ellipsis;
            white-space: pre;
            word-wrap: break-word;
            overflow: hidden;
            display: inline-block;
            width: 85vw;
          }
          .arrow {
            float: right;
            font-size: 5vw;
          }
          .date {
            display: inline-block;
            width: 50vw;
          }
        }
      }
    }
    .pagination {
      background-color: #ececec;
      height: 7vh;
      text-align: center;
      font-size: 5vw;
      padding-top: 2vh;
      ul {
        li {
          display: inline-block;
          color: #9e8d76;
          &.disabled {
            color: #d4d3d2;
          }
          &.page-dot {
            background-color: #d4d3d2;
            width: 1.5vw;
            height: 1.5vw;
            margin: auto 0.5vw;
            border-radius: 0.75vw;
            margin-bottom: 0.75vw;
            vertical-align: middle;
            &.active {
              background-color: #9e8d76;
            }
          }
        }
      }
    }
    .detail {
      position: absolute;
      top: 15vw; left: 0; right: 0; bottom: 0;
      background: white;
      padding: 4vw 4vw 0;
      h1 {
        font-size: 5vw;
        margin-bottom: 2vw;
        padding-bottom: 2vw;
        border-bottom: 1px solid #9e8d76;
      }
      p {
        font-size: 3.5vw;
        margin-bottom: 0.5em;
      }
      img {
        width: 100%;
        height: auto;
        border: 0.5vw #9e8d76 solid;
      }
    }
  }
</style>