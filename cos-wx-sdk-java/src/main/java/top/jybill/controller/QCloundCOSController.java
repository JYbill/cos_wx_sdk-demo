package top.jybill.controller;

import com.tencent.cloud.CosStsClient;
import com.tencent.cloud.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.jybill.config.properties.QCloundCosProperties;
import top.jybill.vo.Result;

import java.util.TreeMap;

/**
 * @PackageName: top.jybill.blog.controller
 * @ClassName: QCloundCOSController
 * @Description:  腾讯云COS对象存储临时秘钥控制器
 * @Author: 小钦var
 * @Date: 2021/9/22 9:03
 */
@RestController
@RequestMapping("/qc")
public class QCloundCOSController {

  private final QCloundCosProperties cosProperties;

  @Autowired
  public QCloundCOSController(QCloundCosProperties cosProperties) {
    this.cosProperties = cosProperties;
  }

  @GetMapping("/key")
  public Result getTmpKey() {

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
      // 只允许访问: avatar/*
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
              "name/cos:CompleteMultipartUpload",
              "name/cos:AbortMultipartUpload"
      });

      //成功返回临时密钥信息，如下打印密钥信息
      credential = CosStsClient.getCredential(config);
    } catch (Exception e) {
      //失败抛出异常
      e.printStackTrace();
      throw new IllegalArgumentException("no valid secret !");
    }
    return Result.success(credential);
  }
}
