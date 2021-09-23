# 使用腾讯云对象云存储进行上传文件(Java临时秘钥)

## 使用已经在腾讯云DNS解析下的域名

+ 登陆[对象存储控制台](./readme-imghttps://console.cloud.tencent.com/cos5)

  ![使用腾讯云对象云存储进行上传文件(Java临时秘钥)1](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)1.png)

  ![使用腾讯云对象云存储进行上传文件(Java临时秘钥)2](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)2.png)

+ 进入自己的域名列表 [自己的域名列表https://console.dnspod.cn/dns/list](./readme-imghttps://console.dnspod.cn/dns/list)

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)3](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)3.png)

+ 保存 -> 测试

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)4](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)4.png)

测试访问图片（已经上传了的...）

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)5](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)5.png)

## 使用Java SDK（多适用于Java开发桌面应用）

>  注意: Java SDK 大部分都是File对象操作, 不要想着用传给Java服务端再传给COS, 压力过大, 有失COS的初衷，且还有javascript SDK、小程序 SDK, 干嘛费那么大的劲去给服务端增压呢？

+ 需要：API密匙、bucketName信息、url信息（域名/默认提供的）

[API密匙https://console.cloud.tencent.com/cam/capi](./readme-imghttps://console.cloud.tencent.com/cam/capi)

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)6](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)6.png)

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)7](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)7.png)

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)8](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)8.png)

> 😒我是封装完自己的Utils才意识到，这不纯纯服务端增压工具类吗？
>
> + 如果你想传递文件并记录, js sdk or 小程序 sdk调用api + java后台api数据库字段记录

所以, 如果你是桌面app，直接参考`Java SDK`即可, 很简单。c + v就好

## 使用java获取临时秘钥（主要内容）

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)9](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)9.png)

> 如果你懒且不怕永久秘钥泄露, 可以直接找对应的SDK上手即可

+ Java COS STS SDK 文档：[https://cloud.tencent.com/document/product/436/14048](./readme-imghttps://cloud.tencent.com/document/product/436/14048)

+ 架构流程图：

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)10](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)10.png)

> 1. 1-2 小程序 || app || web  =>  我们的Java服务端 => 腾讯的CAM权限系统与我们的COS临时秘钥同步
> 2. 3-4 CAM => java服务端 => 小程序 || ... (拿到临时秘钥)
> 3. 5 携带临时秘钥请求上传、下载操作...



## 使用小程序SDK

+ npm安装 / npm构建小程序有问题的, 我也有小程序构建问题，最笨的方法就是下载`wx-cos-sdk-v5.js`然后引入即可

```she
npm install cos-wx-sdk-v5
```

+ 引入

```type
const COS = require('cos-wx-sdk-v5');
```

+ 配置微信小程序白名单

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)11](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)11.png)

> 因为我还没有将后台上传到服务器, 都在本地测试, 所以这里可以省略, 后期配置即可
>
> 设置: 微信开发者工具 -> 右上角详细 -> 本地设置 -> ✔不校验合法域名....以及HTTPS证书

</br>

### 官方方法一（推荐）：后端通过获取临时密钥给到前端，前端计算签名

1. `QCloundController.java`

```java
    // 临时秘钥配置
    TreeMap<String, Object> config = new TreeMap<String, Object>();
    Response credential = null; // 凭证结果

    try {
      config.put("SecretId", cosProperties.getSecretId());
      config.put("SecretKey", cosProperties.getSecretKey());
      config.put("durationSeconds", 1800); // 设置可使用事件1800秒 -> 30分钟
      config.put("bucket", cosProperties.getBucketName()); // 存储桶名
      config.put("region", cosProperties.getRegion()); // 地区
      // policy的resource => 前缀
      // 只允许访问: [avatar/*]
      config.put("allowPrefixes", new String[] {
              cosProperties.getAvatarPrefix()
      });

      // 密钥的权限列表。必须在这里指定本次临时密钥所需要的权限。
      // 简单上传、表单上传和分片上传需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
      config.put("allowActions", new String[] {
              "name/cos:PutObject",// 简单上传
              "name/cos:PostObject",// 表单上传、小程序上传
              "name/cos:GetBucket", // 允许获取桶的对象列表
              // 分片上传
              "name/cos:InitiateMultipartUpload",
              "name/cos:ListMultipartUploads",
              "name/cos:ListParts",
              "name/cos:UploadPart",
              "name/cos:CompleteMultipartUpload"
      });

      //成功返回临时密钥信息，如下打印密钥信息
      credential = CosStsClient.getCredential(config);
    } catch (Exception e) {
      //失败抛出异常
      e.printStackTrace();
      throw new IllegalArgumentException("no valid secret !");
    }
    return Result.success(credential);
```

> `allowPrefixes `对应 policy的resource（原本是allowPrefix, 从源码中可以得出）
>
> `allowActions `对应policy的action
>
> policy更多了解：[https://cloud.tencent.com/document/product/436/31923](./readme-imghttps://cloud.tencent.com/document/product/436/31923)

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)12](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)12.png)

	2. 写完java后台就该写前端小程序了

`cos.ts`

```typescript
// cos.ts
const COS = require('cos-wx-sdk-v5');


var cos = new COS({
  getAuthorization: function (options: any, callback: any) {
    console.log(options);
    
    wx.request({
      url: 'http://127.0.0.1:8080/qc/key',
      data: {
      },
      dataType: 'json',
      success: function (result: any) {
        var data = result.data.data;
        console.log(data);
        var credentials = data && data.credentials;
        if (!data || !credentials) return console.error('credentials invalid');
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
        });
      }
    });
  }
});

export {
  cos
}
```

`app.ts`：app文件

```typescript
import { cos } from './COS/cos';

App<IAppOption>({
  globalData: {
  },
  onLaunch() {
    cos.getBucket({
      Bucket: 'myblogspringboot-1300326898',
      Region: 'ap-nanjing',
      Prefix: 'avatar/', // 这里传入列出的myblogspringboot-1300326898/avatar下的所有文件
    }, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data, 2);
    });
  },
})
```

+ 请求结果

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)13](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)13.png)

### 官方方法二（不推荐上线，推荐测试）：纯前端，简单

`cos.ts`

```typescript
// cos.ts
const COS = require('cos-wx-sdk-v5');

var cos = new COS({
  SecretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxx', // 这是用永久
  SecretKey: '0mJbdT6UdWBbmjRu75pKbeT4QXP1PYS7' // 永久的
});

export {
  cos
}
```

> 永久秘钥获取方式：[https://console.cloud.tencent.com/cam/capi](./readme-imghttps://console.cloud.tencent.com/cam/capi)

`app.ts`：还是一样的

```typescript
import { cos } from './COS/cos';

App<IAppOption>({
  globalData: {
  },
  onLaunch() {
    cos.getBucket({
      Bucket: 'myblogspringboot-1300326898',
      Region: 'ap-nanjing',
      Prefix: 'avatar/', // 这里传入列出的myblogspringboot-1300326898/avatar下的所有文件
    }, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data, 2);
    });
  },
})
```

+ 结果

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)14](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)14.png)

> 将这种重要的秘钥放在前端肯定不安全, 所以官方推荐`方法一`

### 小程序SDK简单使用及封装

`utils.ts`: 自己的工具类

```typescript
/**
 * utils 常用工具类
 */
class Utils {

  /**
   * 获取UUID
   * @returns 
   */
  static uuid() {
    return 'xxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * 日期格式化
   * @param fmt 
   * @param date 
   * @returns 
   */
    static dateFormat(fmt: string, date: Date) {
      date instanceof Date ? '' : date = new Date(date);
  
      let ret;
      const opt: any = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1)
            ?
            (opt[k])
            :
            (opt[k].padStart(ret[1].length, "0")));
        };
      };
      return fmt;
    }

    /**
     * 文件名获取随机文件名  abc.jpg => abc_89dac3004cbdee7f7.jpg
     * @param filename 
     * @returns 
     */
    static randomFileName(filename: String): string {
      const separator: string = '.';
      const fileNameArr: Array<string> = filename.split(separator);
      return fileNameArr[0] + '_' + this.uuid() + '.' + fileNameArr[1];
    }
}

export {
  Utils
}
```

`cos.ts`：cos的封装

```typescript
// cos.ts
const COS = require('cos-wx-sdk-v5');
import { Utils } from '../utils/util';
import { UploadFilesArgOP } from '../interface/index';

class MyCOS {
  public AVATAR_PREFIEX: string = 'avatar/'; // 默认存储路径(头像)
  public BASE_COS_JAVA_KEY_SERVER: string = 'http://127.0.0.1:8080/qc/key'; // java 服务
  public BUCKET: string = 'myblogspringboot-1300326898';
  public REGION: string = 'ap-nanjing'; // 地区
  public cos: any;

  /**
 * 获取avatar/* 下的所有文件
 * @returns promise
 */
  public getBucket(): any {
    return new Promise((resolve: any): void => {
      this.cos.getBucket({
        Bucket: this.BUCKET,
        Region: this.REGION,
        Prefix: 'avatar/', // 这里传入列出的myblogspringboot-1300326898/avatar下的所有文件
      }, function (err: any, data: any) {
        err ? resolve(err) : '';
        resolve(data.Contents);
      });
    })
  }

  /**
   * 简单上传文件
   * @param f 
   * @param progress 
   * @returns 
   */
  public simpleUpload(f: WechatMiniprogram.ChooseFile, progress: Function): any{
    return new Promise((resolve: (value: unknown) => void) => {
      this.cos.postObject({
        Bucket: this.BUCKET,
        Region: this.REGION,
        Key: this.AVATAR_PREFIEX + Utils.randomFileName(f.name),
        FilePath: f.path, 
        onProgress: function (progressData: any) {
          progress(progressData);
        }
      }, function (err: any, data: any) {
        resolve(err || data);
      });
    });
  }

  /**
* 上传单个文件
* @param key 文件上传路径
* @param path 本地文件路径
* @param taskReady 准备上传回调
* @param progress  上传进度回调
* @param fileFinish 上传完成回调
* @returns 
*/
  uploadFile(key: string, path: string, taskReady?: Function, progress?: Function, fileFinish?: Function): object {
    return new Promise(resolve => {
      this.cos.uploadFile({
        Bucket: this.BUCKET, /* 必须 */
        Region: this.REGION,     /* 存储桶所在地域，必须字段 */
        Key: key,              /* 必须 */
        FilePath: path,                /* 必须 */
        SliceSize: 1024 * 1024 * 20,     /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */

        // 非必须, 上传任务创建时的回调函数

        onTaskReady: function (taskId: number) {
          taskReady ? taskReady(taskId) : '';
        },

        // 上传文件的进度回调函数, 非必须
        onProgress: function ({ loaded, total, speed }: { loaded: number, total: number, speed: number }) {
          progress ? progress(loaded, total, speed) : '';
        },

        // 文件上传完成回调, 非必须
        onFileFinish: function (err: any, data: any, options: any) {
          fileFinish ? fileFinish(err, data, options) : '';
        },

      }, function (err: any, data: any) {
        err ? resolve(err) : resolve(data);
      });
    });
  }


  /**
   * 上传多个文件
   * @param files 
   * @param taskReady 
   * @param progress 
   * @param fileFinish 
   * @returns 
   */
  uploadMoreFile(files: WechatMiniprogram.ChooseFile[], taskReady?: Function, progress?: Function, fileFinish?: Function) {

    // 迭代浅拷贝
    const uploadFiles: UploadFilesArgOP[] = files.
      map((item: WechatMiniprogram.ChooseFile) => {
        return Object.assign(item, {
          FilePath: item.path,
          FileSize: item.size,
          Bucket: this.BUCKET,
          Region: this.REGION,
          Key: this.AVATAR_PREFIEX + Utils.randomFileName(item.name),
          onTaskReady(taskId: number) {
            taskReady ? taskReady(taskId) : '';
          }
        })
      });

    return new Promise((resolve: (value: unknown) => void) => {
      this.cos.uploadFiles({
        files: uploadFiles,
        SliceSize: 1024 * 1024 * 10,    /* 设置大于10MB采用分块上传 */

        // 进度回调
        onProgress: (info: any) => {
          console.log(info);
          progress ? progress(info.total, info.speed, info.percent) : '';
        },

        // 全部完成 or 出错回调
        onFileFinish: (err: any, data: any, options: any) => {
          fileFinish ? fileFinish(err || data, options) : '';
        },
      }, function (err: any, data: any) {
        resolve(err || data);
      });
    })
  }

  /**
   * 所有的COS任务
   */
  allTasks(): Array<any> {
    return this.cos.getTaskList();
  }

  /**
   * 清除指定任务
   * @param taskId 
   * @returns 
   */
  clearTask(taskId: string) {
    return this.cos.cancelTask(taskId);
  }

  /**
   * 暂停指定任务
   * @param taskId 
   */
  pauseTask(taskId: string) {
    this.cos.pauseTask(taskId);
  }


  /**
   * 重新开始指定任务
   * @param taskId 
   */
  reStartTask(taskId: string) {
    this.cos.restartTask(taskId);
  }
}
const myCos: MyCOS = new MyCOS();
myCos.cos = new COS({
  getAuthorization: function (options: any, callback: any) {
    // console.log('options', options);

    wx.request({
      url: myCos.BASE_COS_JAVA_KEY_SERVER,
      data: {},
      dataType: 'json',
      success: function (result: any) {
        var data = result.data.data;
        var credentials = data && data.credentials;
        if (!data || !credentials) return console.error('凭证无效...');
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
        });
      }
    });
  }
})
export default myCos;

```

+ 源码

> 码云地址：
>
> Github地址：

+ 测试

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)15](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)15.png)

![使用腾讯云对象云存储进行上传文件(Java临时秘钥)16](./readme-img/使用腾讯云对象云存储进行上传文件(Java临时秘钥)16.png)