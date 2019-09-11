const gtjaUrl = "https://www.gtja.com";
const companyUrl ="http://172.16.1.103:8082";
const mallUrl ="http://127.0.0.1:8084";


module.exports = {
  versionUrl:companyUrl +'/api/v1/version/0',//从本地获取数据
  szzsUrl:gtjaUrl + '/cos/rest/quotations/query.json',//从国泰君安接口获取数据
  adUrl: mallUrl +'/ad/getAd',
  goodDetailUrl: mallUrl +'/good/detail',
  goodListUrl: mallUrl+'/good/list',
  cartAddUrl: mallUrl +'/good/addCar',
  cartListUrl: mallUrl + '/good/listCart',
  cartCheckedUrl: mallUrl + '/good/checkedCart',
  cartCheckedAllUrl: mallUrl + '/good/checkedCartAll',
  cartUpdateUrl: mallUrl + '/good/cartUpdate',
  cartDeleteUrl: mallUrl + '/good/cartDelete',
  orderSaverUrl: mallUrl + '/order/saveOrder',
  orderSingleSaveUrl: mallUrl +'/order/saveSingleOrder',
  orderListUrl:  mallUrl +'/order/list',
  orderDetailUrl: mallUrl +'/order/detail',
  loginUrl: mallUrl + '/account/login'
};