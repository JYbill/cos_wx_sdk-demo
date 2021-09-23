package top.jybill.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 返回JSON结果集
 */
@Data
@AllArgsConstructor
public class Result {


  private Boolean success;

  private Integer code;

  private String msg;

  private Object data;

  /**
   * 重载success方法, 有msg和无msg传参的区别
   * @param data
   * @return
   */
  public static Result success(Object data) {
    return new Result(true, 200, "OK", data);
  }

  public static Result success(String msg, Object data) {
    return new Result(true, 200, msg, data);
  }

  /**
   * 失败方法
   * @param msg
   * @return
   */
  public static Result failure(String msg) {
    return new Result(false, 500, msg, null);
  }

  public static Result failure(Integer code, String msg) {
    return new Result(false, code, msg, null);
  }
}
