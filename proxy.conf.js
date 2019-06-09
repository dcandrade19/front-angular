const proxy = [
  {
    context: '/api',
    target: 'http://ec2-18-220-2-109.us-east-2.compute.amazonaws.com:3002',
    pathRewrite: { '^/api': '' }
  }
];
module.exports = proxy;
