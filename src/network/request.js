import axios from 'axios'
export function request(config){
  const instance = axios.create({  //axios.create自动调用Promise
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  //axios拦截器
  instance.interceptors.request.use(config => {   //请求拦截
    //1.当config的一些信息不符合服务器的要求，需要对config进行处理时拦截
    //2.发送网络请求时，希望在页面显示一个请求的图标
    //3.某些网站请求(比如登录(token))，必须携带一些特殊的信息
    return config;
  },err =>{
    console.log(err)
  })
  instance.interceptors.response.use(res =>{  //响应拦截
    //可以对响应的结果先处理再返回返回给
    return res.data;
  },err =>{
    console.log(err)
  })

  return instance(config)  //因为自动调用Promise所以直接return即可
}
