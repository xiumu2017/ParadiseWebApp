<template>
  <div>
    <van-cell-group inset>
      <van-cell :title="item" v-for="(item,index) in words" :key="index" style="margin-top: 10px">
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>

export default {
  data() {
    return {
      index: 1,
      words:['Absolute',"Hello","World"]
    };
  },
  created() {
  },
  methods: {},
};
</script>
