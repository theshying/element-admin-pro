<template>
  <div class="page-container h100p">
    <search-table-pagination
      :columns="columns"
      :fetch="$client.getUserList"
      :formOptions="formOptions"
    >

    </search-table-pagination>
  </div>
</template>
<script>
import SearchTablePagination from '@/components/SearchTablePagination'
export default {
  components: {
    SearchTablePagination,
  },
  computed: {
    formOptions() {
      return {
        forms: [
       {
          itemType: 'input',
          prop: 'name',
          modelValue: 'name',
          label: this.$t('table.column.name')

       }
      ]}
    },
    columns() {
      return [
        {
          type: 'index',
        },
        {
          prop: 'name',
          label: this.$t('table.column.name')
        },
        {
          prop: 'age',
          label: this.$t('table.column.age')
        },
         {
          prop: 'gender',
          label: this.$t('table.column.name')
        },
         {
          prop: 'address',
          label: this.$t('table.column.address'),
          width: 'auto'
        },
         {
          prop: 'birthday',
          label: this.$t('table.column.birthday')
        },
        {
          prop: 'action',
          label: this.$t('table.column.action')
        },
      ]
    }
  },
  created() {
    this.$client.getUserList({})
  }

}
</script>

<style>

</style>