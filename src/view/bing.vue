<template>
  <div>
    <van-image-preview
      v-model="show"
      :images="images"
      @change="onChange"
      show-indicators
    >
      <!-- <template v-slot:index>第{{ index }}页</template> -->
      <template v-slot:cover>
        <div
          style="
            font-size: medium;
            color: greenyellow;
            bottom: 15px;
            margin: 20px;
          "
        >
          {{ desc }}
        </div>
        <div style="font-size: small; color: yellow; margin: 20px">
          {{ date }}
        </div>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview } from "vant";
import { getUrl, query } from "@/api/bing.js";
// 全局注册
Vue.use(ImagePreview);

export default {
  data() {
    return {
      show: false,
      images: [],
      index: 1,
      bings: [],
      desc: "",
      date: "",
    };
  },
  created() {
    getUrl().then((res) => {
      console.log("res", res);
      this.images = res.data.list;
    });
    query().then((res) => {
      this.bings = res.data.list;
      this.show = true;
      this.desc = this.bings[0].title;
      this.date = this.bings[0].date;
    });
    // ImagePreview({
    //     images: res.data.list,
    //     startPosition: 1,
    //     closeable: true,
    //   });
  },
  methods: {
    onChange(index) {
      this.index = index;
      this.desc = this.bings[index].title;
      this.date = this.bings[index].date;
    },
  },
};
</script>