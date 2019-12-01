import Mock from 'mockjs'
const list = {
  ...Mock.mock(
      {
        'data|1000': [{
            name: '@cname'
        }]
      }
  ).data
}
export default [
  // user login
  {
    url: '/user/list',
    type: 'get',
    response: () => {
     return list;
    }
  },  
]