<template>
  <div>
    <Button @click="mock">inmap模拟数据</Button>
    <Button @click="produce">真实数据</Button>
  </div>
</template>
<script>
import sourceJson from '@/assets/json/source.json'
import dataJson from '@/assets/json/data.json'
const fs = require('fs')
const path = require('path')
export default {
  data () {
    return {}
  },
  methods: {
    produce: function () {
      var min = 0;
      var max = 0;
      var dataSource = sourceJson.map(element => {
        // min = Math.min(min, element.count);
        // max = Math.max(max, element.count);
        return {
          count: 1,
          geometry: {"type":"Point","coordinates":element.lnglat}
        }
      });
      fs.promises.writeFile('文件.txt',new Uint8Array(Buffer.from(JSON.stringify(dataSource))))
      .then( () => {
        console.log('文件已被保存');
      })
    },
    mock: function () {
      var min = 0;
      var max = 0;
      var dataSource = dataJson.map(element => {
        min = Math.min(min, element.count);
        max = Math.max(max, element.count);
        element.count=1;
      });
      dataSource[0].count = 100;
      fs.promises.writeFile('文件.txt',new Uint8Array(Buffer.from(JSON.stringify(dataSource))))
      .then( () => {
          console.log('文件已被保存');
        })
    }
  }
}
</script>
