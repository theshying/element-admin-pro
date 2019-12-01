import Mock from 'mockjs'
const tokens = {
  admin: {
    token: 'admin-token'
  },
}
const userInfo = {
  'admin-token': {
    id: '1',
    name: 'theshy',
    avatar: Mock.Random.image('50x50', '#50B347', '#FFF', 'hello'),
  },
  
}
const permissions = {
  '1': [
    'table:edit',
    'tabble:add'
  ]
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      if (!token) {
        return {
          success: false,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        success: true,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/me',
    type: 'get',
    response: () => {
      const info = userInfo['admin-token']
      if (!info) {
        return {
          success: false,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        success: true,
        data: info
      }
    }
  },
  // get user info
  {
    url: '/\.*/permission', //eslint-disable-line
    type: 'get',
    response: () => {
      return {
        success: true,
        data: permissions['1']
      };
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: ()=> {
      return {
        success: true,
        data: 'success'
      }
    }
  }
]