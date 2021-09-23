import cos from '../../COS/cos';
import { Utils } from '../../utils/util';

Page({
  data: {
    taskId: '',
    taskArr: new Array<any>(0),
    inputVal: '', // input内容
    timer: 0, // 定时器
    taskIdArr: new Array<string>(0)
  },

  /**
   * 开启定时器, 监听cos task任务变化 暂停、开始、删除的改变
   */
  onLoad() {
    this.data.timer = setInterval(() => {
      this.setData({
        taskArr: cos.allTasks()
      })
      // console.log('500毫秒轮询所有COS任务 =>', this.data.taskArr);
    }, 500);

    cos.cos.on('list-update', (list: any) => {
      console.log(list);
    });
  },

  /**
   * 清除定时器
   */
  onUnload() {
    clearInterval(this.data.timer);
  },

  /**
   * 获取/avatar/*的所有文件
   */
  async tapCOSBucket() {


    cos.getBucket().then((res: any) => {
      console.log(res);
    })

    const ret = await cos.getBucket();
    console.log(ret);
  },

  /**
   * 简单上传
   */
  tapSimpleUpload() {
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success: async (res: WechatMiniprogram.ChooseMessageFileSuccessCallbackResult) => {
        const file: WechatMiniprogram.ChooseFile = res.tempFiles[0];
        const ret = await cos.simpleUpload(file, 
          (res: any) => console.log('简单progress: ', res))
        console.log('简单上传回调: ', ret);
      }
    });

  },

  /**
   * 上传单个文件
   */
  tapUploadFile(): void {
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success: async (res) => {
        const fileName = Utils.randomFileName(res.tempFiles[0].name);

        const ret = await cos.uploadFile(cos.AVATAR_PREFIEX + fileName,
          res.tempFiles[0].path,

          // 创建任务
          (taskId: string): void => {
            console.log('创建id: ', taskId);
            this.setData({
              taskId
            })
          },

          // 上传文件的进度回调函数, 非必须
          (loaded: number, total: number, speed: number) => {
            console.log(`数据总字节数: ${total}, 已上传: ${loaded / total * 100}%, 当前速度: ${speed}`);
          },

          // 文件上传完成回调, 非必须
          (err: any, data: any, options: any) => {
            console.log('options', options);
          });
        console.log(ret);
      }
    });
  },

  /**
   * 上传多个文件
   */
  tapUploadMoreFiles(): void {
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success: async (res: WechatMiniprogram.ChooseMessageFileSuccessCallbackResult) => {
        const ret = await cos.uploadMoreFile(res.tempFiles,
          // 开始任务插入taskiID
          (taskId: string) => {
            this.data.taskIdArr.push(taskId)
          },
          (total: any, speed: any, percent: any) => {
            console.log(`总字节数: ${total}, 已完成: ${percent}%`);
          });
        console.log('Promise', ret); // 返回批量上传的文件
      }
    });
  },

  /**
   * 暂停上传、下载
   */
  tapPause() {
    console.log('暂停 => ', this.data.taskId);
    cos.pauseTask(this.data.taskId);
  },

  /**
   * 开始上传、下载
   */
  tapStart() {
    cos.reStartTask(this.data.taskId);
  },

  /**
   * 清除上传、下载任务
   */
  tapDel() {
    cos.clearTask(this.data.taskId);
  },

  /**
   * 暂停批量文件
   */
  tapPauseFiles() {
    console.log(this.data.taskIdArr);
    this.data.taskIdArr.forEach((item: string) => {
      cos.pauseTask(item);
    }) 
  },

  /**
   * 开始批量文件
   */
   tapStartFile() {
    this.data.taskIdArr.forEach((item: string) => {
      cos.reStartTask(item);
    }) 
  },

  /**
   * 取消上传批量文件
   */
   tapDelFile() {
    this.data.taskIdArr.forEach((item: string) => {
      cos.clearTask(item);
    }) 
  },
})
