<template>
  <sales-overview
    :type="type"
    class="week-sales"
  />
</template>

<script>
import SalesOverview from './SalesOverview'
export default {
        name: 'WeekSales',
    components: {
        SalesOverview
    },
    data() {
        return {
            type: 'week',
        }
    },
}
</script>

<style scope lang="less">
.week-sales{
    background-image: linear-gradient(to right, rgb(53,67,210), rgb(40,161,254));
}
</style>