const gtjaUrl = "https://www.gtja.com";
const companyUrl ="http://172.16.1.103:8082";
const mallUrl ="http://172.16.2.148:8082";

module.exports = {
  versionUrl:companyUrl +'/api/v1/version/0',//从本地获取数据
  szzsUrl:gtjaUrl + '/cos/rest/quotations/query.json',//从国泰君安接口获取数据
  adUrl: mallUrl +'/ad/getAd',
  goodDetailUrl: mallUrl +'/good/detail',
  carAddUrl: mallUrl +'/good/addCar'
};