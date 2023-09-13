## 图模体计算前端

git地址：[qk-antares/graph-motif-frontend (github.com)](https://github.com/qk-antares/graph-motif-frontend)

安装依赖：

```bash
npm install
```

或

```bash
yarn
```

运行项目：

```bash
npm start
```

在线访问：http://motif.zqk.asia

项目的部署使用的是自己搭建的服务器，使用IPv6+DDNS实现公网访问。如果你无法访问，可能是由于你的网络环境不支持IPv6（通常是公司内网和校园网），你可以到IPv6 测试 (test-ipv6.com)这个网站测试你是否支持IPv6，如果不支持可以连接手机热点后访问，手机网络一般支持IPv6

### 界面预览

![image-20230911180348259](http://image.antares.cool/PicGo/Project/motif/image-20230911180348259.png)

### 待算法完善

![image-20230913164135075](http://image.antares.cool/PicGo/Project/motif/dcb20c51900ea39593ab2630fa38e9fe044aff83.png)

1、将baseURL修改为后端地址

![image-20230913163055888](http://image.antares.cool/PicGo/Project/motif/63d2fe77608cc4af3810957e19296464cb938a7a.png)

2、确保后端的接口地址与前端一致，POST请求

![image-20230913163153318](http://image.antares.cool/PicGo/Project/motif/12b193d7bbb247666dcd4c32650019cf55804528.png)

3、确保返回的结构，data应该是一个长度36的数组

![image-20230913163253558](http://image.antares.cool/PicGo/Project/motif/19f106127e26fd5fe4f65e19263ef06aea55bf0b.png)

示例后端

![image-20230913164032243](http://image.antares.cool/PicGo/Project/motif/afc33e40ed4ff84cd99c6fae11f72f454a6edb41.png)

fileContent是一个string，不同行之间有换行符分割，同一行用空格分隔

```
@RestController
@RequestMapping("/motif/compute")
public class DemoController {
    @PostMapping
    public R demo(@RequestBody String fileContent){
        System.out.println(fileContent);

        ArrayList<Integer> arrayList = new ArrayList<>();
        for (int i = 1; i <= 36; i++) {
            arrayList.add(i);
        }
        return R.ok(arrayList);
    }
}
```

