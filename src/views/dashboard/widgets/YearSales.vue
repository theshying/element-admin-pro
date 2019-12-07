<template>
  <sales-overview
    :type="type"
    class="year-sales"
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
            type: 'year',
        }
    },
}
</script>

<style scope lang="less">
.year-sales{
    background-image: linear-gradient(to right, rgb(251,0,182), rgb(249,88,197));
}
</style>