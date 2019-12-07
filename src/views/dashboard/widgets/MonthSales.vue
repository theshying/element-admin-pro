<template>
  <sales-overview
    :type="type"
    class="month-sales"
  />
</template>

<script>
import SalesOverview from './SalesOverview'
export default {
    components: {
        SalesOverview
    },
    data() {
        return {
            type: 'month',
        }
    },
}
</script>

<style scope lang="less">
.month-sales{
    background-image: linear-gradient(to right, rgb(251,77,50), rgb(254,196,41));
}
</style>