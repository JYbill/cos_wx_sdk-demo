"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COS = require('cos-wx-sdk-v5');
var util_1 = require("../utils/util");
var MyCOS = (function () {
    function MyCOS() {
        this.AVATAR_PREFIEX = 'avatar/';
        this.BASE_COS_JAVA_KEY_SERVER = 'http://127.0.0.1:8080/qc/key';
        this.BUCKET = 'myblogspringboot-1300326898';
        this.REGION = 'ap-nanjing';
    }
    MyCOS.prototype.getBucket = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.cos.getBucket({
                Bucket: _this.BUCKET,
                Region: _this.REGION,
                Prefix: 'avatar/',
            }, function (err, data) {
                err ? resolve(err) : '';
                resolve(data.Contents);
            });
        });
    };
    MyCOS.prototype.simpleUpload = function (f, progress) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.cos.postObject({
                Bucket: _this.BUCKET,
                Region: _this.REGION,
                Key: _this.AVATAR_PREFIEX + util_1.Utils.randomFileName(f.name),
                FilePath: f.path,
                onProgress: function (progressData) {
                    progress(progressData);
                }
            }, function (err, data) {
                resolve(err || data);
            });
        });
    };
    MyCOS.prototype.uploadFile = function (key, path, taskReady, progress, fileFinish) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.cos.uploadFile({
                Bucket: _this.BUCKET,
                Region: _this.REGION,
                Key: key,
                FilePath: path,
                SliceSize: 1024 * 1024 * 20,
                onTaskReady: function (taskId) {
                    taskReady ? taskReady(taskId) : '';
                },
                onProgress: function (_a) {
                    var loaded = _a.loaded, total = _a.total, speed = _a.speed;
                    progress ? progress(loaded, total, speed) : '';
                },
                onFileFinish: function (err, data, options) {
                    fileFinish ? fileFinish(err, data, options) : '';
                },
            }, function (err, data) {
                err ? resolve(err) : resolve(data);
            });
        });
    };
    MyCOS.prototype.uploadMoreFile = function (files, taskReady, progress, fileFinish) {
        var _this = this;
        var uploadFiles = files.
            map(function (item) {
            return Object.assign(item, {
                FilePath: item.path,
                FileSize: item.size,
                Bucket: _this.BUCKET,
                Region: _this.REGION,
                Key: _this.AVATAR_PREFIEX + util_1.Utils.randomFileName(item.name),
                onTaskReady: function (taskId) {
                    taskReady ? taskReady(taskId) : '';
                }
            });
        });
        return new Promise(function (resolve) {
            _this.cos.uploadFiles({
                files: uploadFiles,
                SliceSize: 1024 * 1024 * 10,
                onProgress: function (info) {
                    console.log(info);
                    progress ? progress(info.total, info.speed, info.percent) : '';
                },
                onFileFinish: function (err, data, options) {
                    fileFinish ? fileFinish(err || data, options) : '';
                },
            }, function (err, data) {
                resolve(err || data);
            });
        });
    };
    MyCOS.prototype.allTasks = function () {
        return this.cos.getTaskList();
    };
    MyCOS.prototype.clearTask = function (taskId) {
        return this.cos.cancelTask(taskId);
    };
    MyCOS.prototype.pauseTask = function (taskId) {
        this.cos.pauseTask(taskId);
    };
    MyCOS.prototype.reStartTask = function (taskId) {
        this.cos.restartTask(taskId);
    };
    return MyCOS;
}());
var myCos = new MyCOS();
myCos.cos = new COS({
    getAuthorization: function (options, callback) {
        wx.request({
            url: myCos.BASE_COS_JAVA_KEY_SERVER,
            data: {},
            dataType: 'json',
            success: function (result) {
                var data = result.data.data;
                var credentials = data && data.credentials;
                if (!data || !credentials)
                    return console.error('凭证无效...');
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    XCosSecurityToken: credentials.sessionToken,
                    StartTime: data.startTime,
                    ExpiredTime: data.expiredTime,
                });
            }
        });
    }
});
exports.default = myCos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3JDLHNDQUFzQztBQUd0QztJQUFBO1FBQ1MsbUJBQWMsR0FBVyxTQUFTLENBQUM7UUFDbkMsNkJBQXdCLEdBQVcsOEJBQThCLENBQUM7UUFDbEUsV0FBTSxHQUFXLDZCQUE2QixDQUFDO1FBQy9DLFdBQU0sR0FBVyxZQUFZLENBQUM7SUFpS3ZDLENBQUM7SUExSlEseUJBQVMsR0FBaEI7UUFBQSxpQkFXQztRQVZDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFZO1lBQzlCLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO2dCQUNqQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLFNBQVM7YUFDbEIsRUFBRSxVQUFVLEdBQVEsRUFBRSxJQUFTO2dCQUM5QixHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBUU0sNEJBQVksR0FBbkIsVUFBb0IsQ0FBK0IsRUFBRSxRQUFrQjtRQUF2RSxpQkFjQztRQWJDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFpQztZQUNuRCxLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztnQkFDbEIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07Z0JBQ25CLEdBQUcsRUFBRSxLQUFJLENBQUMsY0FBYyxHQUFHLFlBQUssQ0FBQyxj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QUFFLENBQUM7QUFDakMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNsQixnQkFBZ0IsRUFBRSxVQUFVLE9BQVksRUFBRSxRQUFhO1FBR3JELEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsS0FBSyxDQUFDLHdCQUF3QjtZQUNuQyxJQUFJLEVBQUUsRUFBRTtZQUNSLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxVQUFVLE1BQVc7Z0JBQzVCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUM1QixJQUFJLFdBQVcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVc7b0JBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCxRQUFRLENBQUM7b0JBQ1AsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXO29CQUNwQyxZQUFZLEVBQUUsV0FBVyxDQUFDLFlBQVk7b0JBQ3RDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxZQUFZO29CQUUzQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDOUIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUE7QUFDRixrQkFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb3MudHNcclxuY29uc3QgQ09TID0gcmVxdWlyZSgnY29zLXd4LXNkay12NScpO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uL3V0aWxzL3V0aWwnO1xyXG5pbXBvcnQgeyBVcGxvYWRGaWxlc0FyZ09QIH0gZnJvbSAnLi4vaW50ZXJmYWNlL2luZGV4JztcclxuXHJcbmNsYXNzIE15Q09TIHtcclxuICBwdWJsaWMgQVZBVEFSX1BSRUZJRVg6IHN0cmluZyA9ICdhdmF0YXIvJzsgLy8g6buY6K6k5a2Y5YKo6Lev5b6EKOWktOWDjylcclxuICBwdWJsaWMgQkFTRV9DT1NfSkFWQV9LRVlfU0VSVkVSOiBzdHJpbmcgPSAnaHR0cDovLzEyNy4wLjAuMTo4MDgwL3FjL2tleSc7IC8vIGphdmEg5pyN5YqhXHJcbiAgcHVibGljIEJVQ0tFVDogc3RyaW5nID0gJ215YmxvZ3NwcmluZ2Jvb3QtMTMwMDMyNjg5OCc7XHJcbiAgcHVibGljIFJFR0lPTjogc3RyaW5nID0gJ2FwLW5hbmppbmcnOyAvLyDlnLDljLpcclxuICBwdWJsaWMgY29zOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gKiDojrflj5ZhdmF0YXIvKiDkuIvnmoTmiYDmnInmlofku7ZcclxuICogQHJldHVybnMgcHJvbWlzZVxyXG4gKi9cclxuICBwdWJsaWMgZ2V0QnVja2V0KCk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICB0aGlzLmNvcy5nZXRCdWNrZXQoe1xyXG4gICAgICAgIEJ1Y2tldDogdGhpcy5CVUNLRVQsXHJcbiAgICAgICAgUmVnaW9uOiB0aGlzLlJFR0lPTixcclxuICAgICAgICBQcmVmaXg6ICdhdmF0YXIvJywgLy8g6L+Z6YeM5Lyg5YWl5YiX5Ye655qEbXlibG9nc3ByaW5nYm9vdC0xMzAwMzI2ODk4L2F2YXRhcuS4i+eahOaJgOacieaWh+S7tlxyXG4gICAgICB9LCBmdW5jdGlvbiAoZXJyOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGVyciA/IHJlc29sdmUoZXJyKSA6ICcnO1xyXG4gICAgICAgIHJlc29sdmUoZGF0YS5Db250ZW50cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOeugOWNleS4iuS8oOaWh+S7tlxyXG4gICAqIEBwYXJhbSBmIFxyXG4gICAqIEBwYXJhbSBwcm9ncmVzcyBcclxuICAgKiBAcmV0dXJucyBcclxuICAgKi9cclxuICBwdWJsaWMgc2ltcGxlVXBsb2FkKGY6IFdlY2hhdE1pbmlwcm9ncmFtLkNob29zZUZpbGUsIHByb2dyZXNzOiBGdW5jdGlvbik6IGFueXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgIHRoaXMuY29zLnBvc3RPYmplY3Qoe1xyXG4gICAgICAgIEJ1Y2tldDogdGhpcy5CVUNLRVQsXHJcbiAgICAgICAgUmVnaW9uOiB0aGlzLlJFR0lPTixcclxuICAgICAgICBLZXk6IHRoaXMuQVZBVEFSX1BSRUZJRVggKyBVdGlscy5yYW5kb21GaWxlTmFtZShmLm5hbWUpLFxyXG4gICAgICAgIEZpbGVQYXRoOiBmLnBhdGgsIFxyXG4gICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uIChwcm9ncmVzc0RhdGE6IGFueSkge1xyXG4gICAgICAgICAgcHJvZ3Jlc3MocHJvZ3Jlc3NEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmVzb2x2ZShlcnIgfHwgZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuKiDkuIrkvKDljZXkuKrmlofku7ZcclxuKiBAcGFyYW0ga2V5IOaWh+S7tuS4iuS8oOi3r+W+hFxyXG4qIEBwYXJhbSBwYXRoIOacrOWcsOaWh+S7tui3r+W+hFxyXG4qIEBwYXJhbSB0YXNrUmVhZHkg5YeG5aSH5LiK5Lyg5Zue6LCDXHJcbiogQHBhcmFtIHByb2dyZXNzICDkuIrkvKDov5vluqblm57osINcclxuKiBAcGFyYW0gZmlsZUZpbmlzaCDkuIrkvKDlrozmiJDlm57osINcclxuKiBAcmV0dXJucyBcclxuKi9cclxuICB1cGxvYWRGaWxlKGtleTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHRhc2tSZWFkeT86IEZ1bmN0aW9uLCBwcm9ncmVzcz86IEZ1bmN0aW9uLCBmaWxlRmluaXNoPzogRnVuY3Rpb24pOiBvYmplY3Qge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICB0aGlzLmNvcy51cGxvYWRGaWxlKHtcclxuICAgICAgICBCdWNrZXQ6IHRoaXMuQlVDS0VULCAvKiDlv4XpobsgKi9cclxuICAgICAgICBSZWdpb246IHRoaXMuUkVHSU9OLCAgICAgLyog5a2Y5YKo5qG25omA5Zyo5Zyw5Z+f77yM5b+F6aG75a2X5q61ICovXHJcbiAgICAgICAgS2V5OiBrZXksICAgICAgICAgICAgICAvKiDlv4XpobsgKi9cclxuICAgICAgICBGaWxlUGF0aDogcGF0aCwgICAgICAgICAgICAgICAgLyog5b+F6aG7ICovXHJcbiAgICAgICAgU2xpY2VTaXplOiAxMDI0ICogMTAyNCAqIDIwLCAgICAgLyog6Kem5Y+R5YiG5Z2X5LiK5Lyg55qE6ZiI5YC877yM6LaF6L+HNU1C5L2/55So5YiG5Z2X5LiK5Lyg77yM6Z2e5b+F6aG7ICovXHJcblxyXG4gICAgICAgIC8vIOmdnuW/hemhuywg5LiK5Lyg5Lu75Yqh5Yib5bu65pe255qE5Zue6LCD5Ye95pWwXHJcblxyXG4gICAgICAgIG9uVGFza1JlYWR5OiBmdW5jdGlvbiAodGFza0lkOiBudW1iZXIpIHtcclxuICAgICAgICAgIHRhc2tSZWFkeSA/IHRhc2tSZWFkeSh0YXNrSWQpIDogJyc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g5LiK5Lyg5paH5Lu255qE6L+b5bqm5Zue6LCD5Ye95pWwLCDpnZ7lv4XpobtcclxuICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbiAoeyBsb2FkZWQsIHRvdGFsLCBzcGVlZCB9OiB7IGxvYWRlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBzcGVlZDogbnVtYmVyIH0pIHtcclxuICAgICAgICAgIHByb2dyZXNzID8gcHJvZ3Jlc3MobG9hZGVkLCB0b3RhbCwgc3BlZWQpIDogJyc7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g5paH5Lu25LiK5Lyg5a6M5oiQ5Zue6LCDLCDpnZ7lv4XpobtcclxuICAgICAgICBvbkZpbGVGaW5pc2g6IGZ1bmN0aW9uIChlcnI6IGFueSwgZGF0YTogYW55LCBvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICAgIGZpbGVGaW5pc2ggPyBmaWxlRmluaXNoKGVyciwgZGF0YSwgb3B0aW9ucykgOiAnJztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgfSwgZnVuY3Rpb24gKGVycjogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBlcnIgPyByZXNvbHZlKGVycikgOiByZXNvbHZlKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIOS4iuS8oOWkmuS4quaWh+S7tlxyXG4gICAqIEBwYXJhbSBmaWxlcyBcclxuICAgKiBAcGFyYW0gdGFza1JlYWR5IFxyXG4gICAqIEBwYXJhbSBwcm9ncmVzcyBcclxuICAgKiBAcGFyYW0gZmlsZUZpbmlzaCBcclxuICAgKiBAcmV0dXJucyBcclxuICAgKi9cclxuICB1cGxvYWRNb3JlRmlsZShmaWxlczogV2VjaGF0TWluaXByb2dyYW0uQ2hvb3NlRmlsZVtdLCB0YXNrUmVhZHk/OiBGdW5jdGlvbiwgcHJvZ3Jlc3M/OiBGdW5jdGlvbiwgZmlsZUZpbmlzaD86IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgLy8g6L+t5Luj5rWF5ou36LSdXHJcbiAgICBjb25zdCB1cGxvYWRGaWxlczogVXBsb2FkRmlsZXNBcmdPUFtdID0gZmlsZXMuXHJcbiAgICAgIG1hcCgoaXRlbTogV2VjaGF0TWluaXByb2dyYW0uQ2hvb3NlRmlsZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGl0ZW0sIHtcclxuICAgICAgICAgIEZpbGVQYXRoOiBpdGVtLnBhdGgsXHJcbiAgICAgICAgICBGaWxlU2l6ZTogaXRlbS5zaXplLFxyXG4gICAgICAgICAgQnVja2V0OiB0aGlzLkJVQ0tFVCxcclxuICAgICAgICAgIFJlZ2lvbjogdGhpcy5SRUdJT04sXHJcbiAgICAgICAgICBLZXk6IHRoaXMuQVZBVEFSX1BSRUZJRVggKyBVdGlscy5yYW5kb21GaWxlTmFtZShpdGVtLm5hbWUpLFxyXG4gICAgICAgICAgb25UYXNrUmVhZHkodGFza0lkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGFza1JlYWR5ID8gdGFza1JlYWR5KHRhc2tJZCkgOiAnJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6ICh2YWx1ZTogdW5rbm93bikgPT4gdm9pZCkgPT4ge1xyXG4gICAgICB0aGlzLmNvcy51cGxvYWRGaWxlcyh7XHJcbiAgICAgICAgZmlsZXM6IHVwbG9hZEZpbGVzLFxyXG4gICAgICAgIFNsaWNlU2l6ZTogMTAyNCAqIDEwMjQgKiAxMCwgICAgLyog6K6+572u5aSn5LqOMTBNQumHh+eUqOWIhuWdl+S4iuS8oCAqL1xyXG5cclxuICAgICAgICAvLyDov5vluqblm57osINcclxuICAgICAgICBvblByb2dyZXNzOiAoaW5mbzogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvKTtcclxuICAgICAgICAgIHByb2dyZXNzID8gcHJvZ3Jlc3MoaW5mby50b3RhbCwgaW5mby5zcGVlZCwgaW5mby5wZXJjZW50KSA6ICcnO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIOWFqOmDqOWujOaIkCBvciDlh7rplJnlm57osINcclxuICAgICAgICBvbkZpbGVGaW5pc2g6IChlcnI6IGFueSwgZGF0YTogYW55LCBvcHRpb25zOiBhbnkpID0+IHtcclxuICAgICAgICAgIGZpbGVGaW5pc2ggPyBmaWxlRmluaXNoKGVyciB8fCBkYXRhLCBvcHRpb25zKSA6ICcnO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmVzb2x2ZShlcnIgfHwgZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaJgOacieeahENPU+S7u+WKoVxyXG4gICAqL1xyXG4gIGFsbFRhc2tzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29zLmdldFRhc2tMaXN0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmuIXpmaTmjIflrprku7vliqFcclxuICAgKiBAcGFyYW0gdGFza0lkIFxyXG4gICAqIEByZXR1cm5zIFxyXG4gICAqL1xyXG4gIGNsZWFyVGFzayh0YXNrSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuY29zLmNhbmNlbFRhc2sodGFza0lkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaaguWBnOaMh+WumuS7u+WKoVxyXG4gICAqIEBwYXJhbSB0YXNrSWQgXHJcbiAgICovXHJcbiAgcGF1c2VUYXNrKHRhc2tJZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNvcy5wYXVzZVRhc2sodGFza0lkKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiDph43mlrDlvIDlp4vmjIflrprku7vliqFcclxuICAgKiBAcGFyYW0gdGFza0lkIFxyXG4gICAqL1xyXG4gIHJlU3RhcnRUYXNrKHRhc2tJZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmNvcy5yZXN0YXJ0VGFzayh0YXNrSWQpO1xyXG4gIH1cclxufVxyXG5jb25zdCBteUNvczogTXlDT1MgPSBuZXcgTXlDT1MoKTtcclxubXlDb3MuY29zID0gbmV3IENPUyh7XHJcbiAgZ2V0QXV0aG9yaXphdGlvbjogZnVuY3Rpb24gKG9wdGlvbnM6IGFueSwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ29wdGlvbnMnLCBvcHRpb25zKTtcclxuXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiBteUNvcy5CQVNFX0NPU19KQVZBX0tFWV9TRVJWRVIsXHJcbiAgICAgIGRhdGE6IHt9LFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHJlc3VsdC5kYXRhLmRhdGE7XHJcbiAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0gZGF0YSAmJiBkYXRhLmNyZWRlbnRpYWxzO1xyXG4gICAgICAgIGlmICghZGF0YSB8fCAhY3JlZGVudGlhbHMpIHJldHVybiBjb25zb2xlLmVycm9yKCflh63or4Hml6DmlYguLi4nKTtcclxuICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICBUbXBTZWNyZXRJZDogY3JlZGVudGlhbHMudG1wU2VjcmV0SWQsXHJcbiAgICAgICAgICBUbXBTZWNyZXRLZXk6IGNyZWRlbnRpYWxzLnRtcFNlY3JldEtleSxcclxuICAgICAgICAgIFhDb3NTZWN1cml0eVRva2VuOiBjcmVkZW50aWFscy5zZXNzaW9uVG9rZW4sXHJcbiAgICAgICAgICAvLyDlu7rorq7ov5Tlm57mnI3liqHlmajml7bpl7TkvZzkuLrnrb7lkI3nmoTlvIDlp4vml7bpl7TvvIzpgb/lhY3nlKjmiLfmtY/op4jlmajmnKzlnLDml7bpl7TlgY/lt67ov4flpKflr7zoh7Tnrb7lkI3plJnor69cclxuICAgICAgICAgIFN0YXJ0VGltZTogZGF0YS5zdGFydFRpbWUsIC8vIOaXtumXtOaIs++8jOWNleS9jeenku+8jOWmgu+8mjE1ODAwMDAwMDBcclxuICAgICAgICAgIEV4cGlyZWRUaW1lOiBkYXRhLmV4cGlyZWRUaW1lLCAvLyDml7bpl7TmiLPvvIzljZXkvY3np5LvvIzlpoLvvJoxNTgwMDAwOTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGRlZmF1bHQgbXlDb3M7XHJcbiJdfQ==