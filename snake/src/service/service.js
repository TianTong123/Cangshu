import axios from 'axios'
import router from '../router';

// 超时时间 axios.defaults.timeout = 30000; 
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //console.log(config);
  if (sessionStorage.getItem('access_token')) {
    if ('post' == config.method || 'put' == config.method) {
      config.data = config.data + '&token=' + sessionStorage.getItem('access_token');
    } else if ('get' == config.method) {
      config.params = {
        token: sessionStorage.getItem('access_token'),
        ...config.params,
      }
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  //console.log("我错了啥！");
  return Promise.reject(error);
});


//添加响应拦截器
axios.interceptors.response.use(function (response) {

  //显示响应信息
 // messageShow(response.data);

  //如果code为2003则token 已过期,让他失效，重定向到登录页（要求用户重新）
  if (2003 == response.data.code) {
    //清除本地、sessionStorage的数据
    localStorage.clear();
    sessionStorage.clear();
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 * 获取相对路径
 */
function GetUrlRelativePath(){
　var url = document.location.toString();
　var arrUrl = url.split("//");

　var start = arrUrl[1].indexOf("#");//拿到#的下标
　var relUrl = arrUrl[1].substring(start + 1);//#的下标的下一个“/”就是相对路径的开始

  /**
   * 去掉尾部参数
   */
　if(relUrl.indexOf("?") != -1){
　　　relUrl = relUrl.split("?")[0];
　}
　return relUrl;
}
export default {
  post(url, params) {
    return axios({
      method: 'post',
      url: `${url}`,
      data: params || {}
    });
  },
  get(url, params) {
    //console.log(params);
    let tempParams = {
      ...(params || {}),
      _timer: +(new Date()), // 解决IE缓存添加一个随机时间戳
    }
    return axios({
      method: 'get',
      params: tempParams,
      url: `${url}`
    });
  },
  put(url, params) {
    return axios({
      method: 'put',
      url: `${url}`,
      data: params || {}
    });
  },
  delete(url, params) {
    return axios({
      method: 'delete',
      params: params || {},
      url: `${url}`
    });
  }

}
