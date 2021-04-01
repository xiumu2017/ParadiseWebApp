<template>
  <div>
    <van-empty v-if="showEmpty" description="暂无数据" />
    <van-cell-group
      v-for="item in timelineData"
      :key="item.id"
      :title="item.title"
    >
      <van-cell title="时间" :value="item.time" />
      <van-cell title="干了啥" :value="item.things" :label="item.remark">
        <template #title>
          <van-tag
            plain
            type="primary"
            v-for="tag in item.label.split(',')"
            :key="tag.index"
            >{{ tag }}</van-tag
          >
        </template>
      </van-cell>
      <van-cell title="在哪儿" :value="item.location" />
    </van-cell-group>
    <van-button type="info" block to="/timeline-things">添加新记录</van-button>
  </div>
</template>

<script>
import { fetch } from "@/api/timeline.js";

export default {
  name: "meal",
  created() {
    this.fetchData();
    if (this.timelineData && this.timelineData.length > 0) {
      this.showEmpty = false;
    }
  },
  data() {
    return {
      showEmpty: true,
      timelineData: [],
    };
  },
  methods: {
    fetchData() {
      fetch({ pageNum: 1, pageSize: 10 }).then((res) => {
        if (res.code === 200) {
          this.timelineData = res.data.list;
          this.timelineData.forEach((item) => {
            item.title = this.formatDate(item.date) + " ";
            item.time =
              this.formatTime(item.startTime) +
              " ~ " +
              this.formatTime(item.endTime);
          });
          if (this.timelineData && this.timelineData.length > 0) {
            this.showEmpty = false;
          }
        }
      });
    },
    formatDate(date) {
      return date.split(" ")[0];
    },
    formatTime(date) {
      return date.split(" ")[1];
    },
  },
};
</script>