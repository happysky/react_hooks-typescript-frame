import axios from 'axios'
import qs from 'qs';
import jsonpAdapter from 'axios-jsonp'

const axiosInstance = axios.create({
    baseURL: "/",
    timeout: 10000,
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

axiosInstance.interceptors.request.use(
    config => {
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            config.data = qs.stringify(config.data);
        }

        //url中如果有{{1,2,3,4}}这样的字符串则随机取其中一个，并修改url
        if (config.url.indexOf("{{") != -1 && config.url.indexOf("}}") != -1) {
            config.url = config.url.replace(/\{\{((\d(,)?)+)\}\}/, (str, nums) => {
                const arr = nums.split(",");
                const id = Math.floor(Math.random() * arr.length);

                return arr[id];
            })
        }

        console.log('config', config)


        if (config.dataType === 'jsonp') {
            config.adapter = jsonpAdapter

            //script标签 crossorigin  配置
            if (config.url.indexOf('sotile/m/tplist.php') > 0) {
                config.crossorigin = true
            }

            if (config.url.indexOf('https://login.so.com') == 0 || config.url.indexOf('https://login.360.cn') == 0) {
                config.callbackParamName = 'func'
            } else if (config.url.indexOf('sotile/m/tplist.php') > 0 || config.url.indexOf('map0.ssl.qhimg.com/figure') > 0) {
                config.callbackParamName = 'cbk'
            }
        }

        //url添加时间戳，防缓存
        config.params = config.params || {}
        //config.params["_"] = +(new Date)

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance