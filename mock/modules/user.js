/* eslint-disable */
const Mock = require("mockjs");

const data = {
    "/api/user/login": {
        POST: function (req, res) {
            res.status(200).json({
                success: true,
                data: {
                  token: Mock.Random.paragraph(1, 30, 30)
                }
            });
        }
    },
    "/api/user/getUserInfo": {
      GET: function (req, res) {
          res.status(200).json({
              success: true,
              data: {
                roles: ['admin'],
                name: Mock.Random.cname(),
                avatar: Mock.Random.image('50x50', '#50B347', '#FFF', 'hello'),
                introduction: Mock.Random.cparagraph(10, 30)
              }
          });
      }
  }
};

module.exports = Object.assign(data);
