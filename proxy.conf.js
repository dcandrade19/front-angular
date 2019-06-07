const proxy = [
  {
    context: '/api',
    target: 'ec2-18-219-68-243.us-east-2.compute.amazonaws.com:3002',
    pathRewrite: { '^/api': '' }
  }
];
module.exports = proxy;
