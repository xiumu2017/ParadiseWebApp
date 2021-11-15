<template>
  <div>
    <van-cell-group v-for="(item,index) in bings" inset :key="index">
      <van-cell :title="item.title" @click="showImage(index)">
        <van-image
            slot="right-icon"
            round
            width="3rem"
            height="3rem"
            fit="cover"
            :src="item.url"
        />
      </van-cell>
    </van-cell-group>
    <van-image-preview
        v-model="show"
        :images="images"
        @change="onChange"
        show-indicators
        :start-position="startPosition"
    >
      <!-- <template v-slot:index>第{{ index }}页</template> -->
      <template v-slot:cover>
        <div
            style="
            font-size: medium;
            color: greenyellow;
            bottom: 15px;
            margin-top: 100px;
            margin-left: 20px;
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
import {ImagePreview} from "vant";
import {query} from "@/api/bing.js";
// 全局注册
Vue.use(ImagePreview);

export default {
  data() {
    return {
      show: false,
      startPosition: 0,
      images: [],
      index: 1,
      bings: [],
      desc: "",
      date: "",
    };
  },
  created() {
    query().then((res) => {
      this.bings = res.data.list;
      this.bings.forEach(item => {
        this.images.push(item.url);
      })
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
      if (!index) {
        return;
      }
      console.log("index", index)
      this.index = index;
      if (this.bings && this.bings[index]) {
        this.desc = this.bings[index].title;
        this.date = this.bings[index].date;
      }
    },
    showImage(index) {
      console.log("show image index", index)
      this.index = index;
      this.startPosition = index;
      this.show = true;
    }
  },
};
</script>
