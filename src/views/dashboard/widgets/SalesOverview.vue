<template>
  <div class="sales-overview">
    <h2 class="sales-overview__header">
      本{{ type | convertType }}销售（元）
    </h2>
    <div class="sales-overview__body">
      <div class="body__left">
        本{{ type | convertType }}已完成:
        <count-to
          :start-val="0"
          :end-val="data.prev"
          :duration="durition"
        />
      </div>
      <div class="body__right">
        上{{ type | convertType }}已经完成:
        <count-to
          :start-val="0"
          :end-val="data.current"
          :duration="durition"
        />
      </div>
    </div>
    <div class="sales-overview__footer">
      距离目标
      <el-progress
        :percentage="data.precent"
        :color="colors"
      />
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
    name: "SalesOverview",
    components: {
      'count-to': countTo
    },
    filters: {
        convertType(type) {
            const map = {
                'year': '年',
                'month': '月',
                'week': '周'
            }
            return map[type];
        }
    },
    props: {
        type: {
            type: String,
            default: '周',
        },
    },
    data() {
        return {
            data: {},
            durition: 1000,
            colors: [
                { color: "#f56c6c", percentage: 20 },
                { color: "#e6a23c", percentage: 40 },
                { color: "#5cb87a", percentage: 60 },
                { color: "#1989fa", percentage: 80 },
                { color: "#6f7ad3", percentage: 100 }
            ]
        };
    },
    created() {
        this.getSalesData()
    },
    methods: {
        getSalesData() {
            this.$client.getDashboardSales(this.type).then(({data}) => {
                this.data = data;
            })
        }
    }
};
</script>

<style lang="less" scope>
.sales-overview {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
    color: white;
    box-sizing: border-box;
    &:hover {
        opacity: 0.8;
    }
    &__header {
        font-weight: normal;
        font-size: 18px;
    }
    &__body {
        display: flex;
        justify-content: space-around;
        font-size: 14px;
        span {
            font-size: 18px;
        }
    }
    &__footer {
        font-size: 14px;
        /deep/ .el-progress__text{
          color: white;
        }
    }
}
</style>