package top.jybill.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @PackageName: top.jybill.config.properties
 * @ClassName: QCloundCosProperties
 * @Description: 配置bean
 * @Author: 小钦var
 * @Date: 2021/9/19 14:32
 */
@Component
@ConfigurationProperties("my.clound-cos")
@Data
public class QCloundCosProperties {

  //API密钥secretId
  private String secretId;

  //API密钥secretKey
  private String secretKey;

  //存储桶所属地域
  private String region;

  //存储桶空间名称
  private String bucketName;

  //存储桶访问域名
  private String url;

  //上传文件前缀路径(eg:/images/)
  private String avatarPrefix;

  // 限定上传速度 默认: 10M/s
  private Integer trafficLimit = 8 * 1024 * 1024 * 10;

}
