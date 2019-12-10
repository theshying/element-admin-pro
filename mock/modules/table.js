import Mock from 'mockjs'
const list = Mock.mock(
      {
        'data|20': [{
            name: '@cname',
            "age|10-70":25,
            "gender|1" : ['男','女'],
            birthday: '@date("MM-dd")',
          address: '@county(true)',
        }]
      }
  ).data
export default [
  // user login
  {
    url: '/user/list',
    type: 'get',
    response: () => {
     return {
       data: {
         list,
         total: list.length
       }
     };
    }
  },  
]