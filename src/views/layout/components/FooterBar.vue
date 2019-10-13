<template>
  <div class="footer">
      {{$t('footer.copyRight')}}
  </div>
</template>

<script>
export default {
    name: 'FooterBar'
};
</script>

<style lang="less" scoped>
.footer{
    color: #898989;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    background-color: #fff;
    text-align: center;
}
</style>
