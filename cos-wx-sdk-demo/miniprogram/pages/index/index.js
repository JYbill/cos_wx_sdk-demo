"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cos_1 = require("../../COS/cos");
var util_1 = require("../../utils/util");
Page({
    data: {
        taskId: '',
        taskArr: new Array(0),
        inputVal: '',
        timer: 0,
        taskIdArr: new Array(0)
    },
    onLoad: function () {
        var _this = this;
        this.data.timer = setInterval(function () {
            _this.setData({
                taskArr: cos_1.default.allTasks()
            });
        }, 500);
        cos_1.default.cos.on('list-update', function (list) {
            console.log(list);
        });
    },
    onUnload: function () {
        clearInterval(this.data.timer);
    },
    tapCOSBucket: function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cos_1.default.getBucket().then(function (res) {
                            console.log(res);
                        });
                        return [4, cos_1.default.getBucket()];
                    case 1:
                        ret = _a.sent();
                        console.log(ret);
                        return [2];
                }
            });
        });
    },
    tapSimpleUpload: function () {
        var _this = this;
        wx.chooseMessageFile({
            count: 10,
            type: 'all',
            success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                var file, ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = res.tempFiles[0];
                            return [4, cos_1.default.simpleUpload(file, function (res) { return console.log('简单progress: ', res); })];
                        case 1:
                            ret = _a.sent();
                            console.log('简单上传回调: ', ret);
                            return [2];
                    }
                });
            }); }
        });
    },
    tapUploadFile: function () {
        var _this = this;
        wx.chooseMessageFile({
            count: 10,
            type: 'all',
            success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                var fileName, ret;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fileName = util_1.Utils.randomFileName(res.tempFiles[0].name);
                            return [4, cos_1.default.uploadFile(cos_1.default.AVATAR_PREFIEX + fileName, res.tempFiles[0].path, function (taskId) {
                                    console.log('创建id: ', taskId);
                                    _this.setData({
                                        taskId: taskId
                                    });
                                }, function (loaded, total, speed) {
                                    console.log("\u6570\u636E\u603B\u5B57\u8282\u6570: " + total + ", \u5DF2\u4E0A\u4F20: " + loaded / total * 100 + "%, \u5F53\u524D\u901F\u5EA6: " + speed);
                                }, function (err, data, options) {
                                    console.log('options', options);
                                })];
                        case 1:
                            ret = _a.sent();
                            console.log(ret);
                            return [2];
                    }
                });
            }); }
        });
    },
    tapUploadMoreFiles: function () {
        var _this = this;
        wx.chooseMessageFile({
            count: 10,
            type: 'all',
            success: function (res) { return __awaiter(_this, void 0, void 0, function () {
                var ret;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, cos_1.default.uploadMoreFile(res.tempFiles, function (taskId) {
                                _this.data.taskIdArr.push(taskId);
                            }, function (total, speed, percent) {
                                console.log("\u603B\u5B57\u8282\u6570: " + total + ", \u5DF2\u5B8C\u6210: " + percent + "%");
                            })];
                        case 1:
                            ret = _a.sent();
                            console.log('Promise', ret);
                            return [2];
                    }
                });
            }); }
        });
    },
    tapPause: function () {
        console.log('暂停 => ', this.data.taskId);
        cos_1.default.pauseTask(this.data.taskId);
    },
    tapStart: function () {
        cos_1.default.reStartTask(this.data.taskId);
    },
    tapDel: function () {
        cos_1.default.clearTask(this.data.taskId);
    },
    tapPauseFiles: function () {
        console.log(this.data.taskIdArr);
        this.data.taskIdArr.forEach(function (item) {
            cos_1.default.pauseTask(item);
        });
    },
    tapStartFile: function () {
        this.data.taskIdArr.forEach(function (item) {
            cos_1.default.reStartTask(item);
        });
    },
    tapDelFile: function () {
        this.data.taskIdArr.forEach(function (item) {
            cos_1.default.clearTask(item);
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyx5Q0FBeUM7QUFFekMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEVBQUU7UUFDVixPQUFPLEVBQUUsSUFBSSxLQUFLLENBQU0sQ0FBQyxDQUFDO1FBQzFCLFFBQVEsRUFBRSxFQUFFO1FBQ1osS0FBSyxFQUFFLENBQUM7UUFDUixTQUFTLEVBQUUsSUFBSSxLQUFLLENBQVMsQ0FBQyxDQUFDO0tBQ2hDO0lBS0QsTUFBTSxFQUFOO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7WUFDNUIsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxPQUFPLEVBQUUsYUFBRyxDQUFDLFFBQVEsRUFBRTthQUN4QixDQUFDLENBQUE7UUFFSixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixhQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsVUFBQyxJQUFTO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBS0QsUUFBUTtRQUNOLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFLSyxZQUFZLEVBQWxCOzs7Ozs7d0JBR0UsYUFBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7NEJBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25CLENBQUMsQ0FBQyxDQUFBO3dCQUVVLFdBQU0sYUFBRyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBM0IsR0FBRyxHQUFH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QVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBS0QsUUFBUTtRQUNOLGFBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBS0QsTUFBTTtRQUNKLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBS0QsYUFBYSxFQUFiO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVk7WUFDdkMsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFLQSxZQUFZLEVBQVo7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFZO1lBQ3ZDLGFBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBS0EsVUFBVSxFQUFWO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBWTtZQUN2QyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb3MgZnJvbSAnLi4vLi4vQ09TL2Nvcyc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHRhc2tJZDogJycsXG4gICAgdGFza0FycjogbmV3IEFycmF5PGFueT4oMCksXG4gICAgaW5wdXRWYWw6ICcnLCAvLyBpbnB1dOWGheWuuVxuICAgIHRpbWVyOiAwLCAvLyDlrprml7blmahcbiAgICB0YXNrSWRBcnI6IG5ldyBBcnJheTxzdHJpbmc+KDApXG4gIH0sXG5cbiAgLyoqXG4gICAqIOW8gOWQr+WumuaXtuWZqCwg55uR5ZCsY29zIHRhc2vku7vliqHlj5jljJYg5pqC5YGc44CB5byA5aeL44CB5Yig6Zmk55qE5pS55Y+YXG4gICAqL1xuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5kYXRhLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdGFza0FycjogY29zLmFsbFRhc2tzKClcbiAgICAgIH0pXG4gICAgICAvLyBjb25zb2xlLmxvZygnNTAw5q+r56eS6L2u6K+i5omA5pyJQ09T5Lu75YqhID0+JywgdGhpcy5kYXRhLnRhc2tBcnIpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBjb3MuY29zLm9uKCdsaXN0LXVwZGF0ZScsIChsaXN0OiBhbnkpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGxpc3QpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDmuIXpmaTlrprml7blmahcbiAgICovXG4gIG9uVW5sb2FkKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLnRpbWVyKTtcbiAgfSxcblxuICAvKipcbiAgICog6I635Y+WL2F2YXRhci8q55qE5omA5pyJ5paH5Lu2XG4gICAqL1xuICBhc3luYyB0YXBDT1NCdWNrZXQoKSB7XG5cblxuICAgIGNvcy5nZXRCdWNrZXQoKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICB9KVxuXG4gICAgY29uc3QgcmV0ID0gYXdhaXQgY29zLmdldEJ1Y2tldCgpO1xuICAgIGNvbnNvbGUubG9nKHJldCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeugOWNleS4iuS8oFxuICAgKi9cbiAgdGFwU2ltcGxlVXBsb2FkKCkge1xuICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcbiAgICAgIGNvdW50OiAxMCxcbiAgICAgIHR5cGU6ICdhbGwnLFxuICAgICAgc3VjY2VzczogYXN5bmMgKHJlczogV2VjaGF0TWluaXByb2dyYW0uQ2hvb3NlTWVzc2FnZUZpbGVTdWNjZXNzQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZTogV2VjaGF0TWluaXByb2dyYW0uQ2hvb3NlRmlsZSA9IHJlcy50ZW1wRmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNvcy5zaW1wbGVVcGxvYWQoZmlsZSwgXG4gICAgICAgICAgKHJlczogYW55KSA9PiBjb25zb2xlLmxvZygn566A5Y2VcHJvZ3Jlc3M6ICcsIHJlcykpXG4gICAgICAgIGNvbnNvbGUubG9nKCfnroDljZXkuIrkvKDlm57osIM6ICcsIHJldCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSxcblxuICAvKipcbiAgICog5LiK5Lyg5Y2V5Liq5paH5Lu2XG4gICAqL1xuICB0YXBVcGxvYWRGaWxlKCk6IHZvaWQge1xuICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcbiAgICAgIGNvdW50OiAxMCxcbiAgICAgIHR5cGU6ICdhbGwnLFxuICAgICAgc3VjY2VzczogYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IFV0aWxzLnJhbmRvbUZpbGVOYW1lKHJlcy50ZW1wRmlsZXNbMF0ubmFtZSk7XG5cbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY29zLnVwbG9hZEZpbGUoY29zLkFWQVRBUl9QUkVGSUVYICsgZmlsZU5hbWUsXG4gICAgICAgICAgcmVzLnRlbXBGaWxlc1swXS5wYXRoLFxuXG4gICAgICAgICAgLy8g5Yib5bu65Lu75YqhXG4gICAgICAgICAgKHRhc2tJZDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yib5bu6aWQ6ICcsIHRhc2tJZCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICB0YXNrSWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8vIOS4iuS8oOaWh+S7tueahOi/m+W6puWbnuiwg+WHveaVsCwg6Z2e5b+F6aG7XG4gICAgICAgICAgKGxvYWRlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg5pWw5o2u5oC75a2X6IqC5pWwOiAke3RvdGFsfSwg5bey5LiK5LygOiAke2xvYWRlZCAvIHRvdGFsICogMTAwfSUsIOW9k+WJjemAn+W6pjogJHtzcGVlZH1gKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLy8g5paH5Lu25LiK5Lyg5a6M5oiQ5Zue6LCDLCDpnZ7lv4XpobtcbiAgICAgICAgICAoZXJyOiBhbnksIGRhdGE6IGFueSwgb3B0aW9uczogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9ucycsIG9wdGlvbnMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDkuIrkvKDlpJrkuKrmlofku7ZcbiAgICovXG4gIHRhcFVwbG9hZE1vcmVGaWxlcygpOiB2b2lkIHtcbiAgICB3eC5jaG9vc2VNZXNzYWdlRmlsZSh7XG4gICAgICBjb3VudDogMTAsXG4gICAgICB0eXBlOiAnYWxsJyxcbiAgICAgIHN1Y2Nlc3M6IGFzeW5jIChyZXM6IFdlY2hhdE1pbmlwcm9ncmFtLkNob29zZU1lc3NhZ2VGaWxlU3VjY2Vzc0NhbGxiYWNrUmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNvcy51cGxvYWRNb3JlRmlsZShyZXMudGVtcEZpbGVzLFxuICAgICAgICAgIC8vIOW8gOWni+S7u+WKoeaPkuWFpXRhc2tpSURcbiAgICAgICAgICAodGFza0lkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS50YXNrSWRBcnIucHVzaCh0YXNrSWQpXG4gICAgICAgICAgfSxcbiAgICAgICAgICAodG90YWw6IGFueSwgc3BlZWQ6IGFueSwgcGVyY2VudDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg5oC75a2X6IqC5pWwOiAke3RvdGFsfSwg5bey5a6M5oiQOiAke3BlcmNlbnR9JWApO1xuICAgICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnUHJvbWlzZScsIHJldCk7IC8vIOi/lOWbnuaJuemHj+S4iuS8oOeahOaWh+S7tlxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDmmoLlgZzkuIrkvKDjgIHkuIvovb1cbiAgICovXG4gIHRhcFBhdXNlKCkge1xuICAgIGNvbnNvbGUubG9nKCfmmoLlgZwgPT4gJywgdGhpcy5kYXRhLnRhc2tJZCk7XG4gICAgY29zLnBhdXNlVGFzayh0aGlzLmRhdGEudGFza0lkKTtcbiAgfSxcblxuICAvKipcbiAgICog5byA5aeL5LiK5Lyg44CB5LiL6L29XG4gICAqL1xuICB0YXBTdGFydCgpIHtcbiAgICBjb3MucmVTdGFydFRhc2sodGhpcy5kYXRhLnRhc2tJZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOa4hemZpOS4iuS8oOOAgeS4i+i9veS7u+WKoVxuICAgKi9cbiAgdGFwRGVsKCkge1xuICAgIGNvcy5jbGVhclRhc2sodGhpcy5kYXRhLnRhc2tJZCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOaaguWBnOaJuemHj+aWh+S7tlxuICAgKi9cbiAgdGFwUGF1c2VGaWxlcygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEudGFza0lkQXJyKTtcbiAgICB0aGlzLmRhdGEudGFza0lkQXJyLmZvckVhY2goKGl0ZW06IHN0cmluZykgPT4ge1xuICAgICAgY29zLnBhdXNlVGFzayhpdGVtKTtcbiAgICB9KSBcbiAgfSxcblxuICAvKipcbiAgICog5byA5aeL5om56YeP5paH5Lu2XG4gICAqL1xuICAgdGFwU3RhcnRGaWxlKCkge1xuICAgIHRoaXMuZGF0YS50YXNrSWRBcnIuZm9yRWFjaCgoaXRlbTogc3RyaW5nKSA9PiB7XG4gICAgICBjb3MucmVTdGFydFRhc2soaXRlbSk7XG4gICAgfSkgXG4gIH0sXG5cbiAgLyoqXG4gICAqIOWPlua2iOS4iuS8oOaJuemHj+aWh+S7tlxuICAgKi9cbiAgIHRhcERlbEZpbGUoKSB7XG4gICAgdGhpcy5kYXRhLnRhc2tJZEFyci5mb3JFYWNoKChpdGVtOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvcy5jbGVhclRhc2soaXRlbSk7XG4gICAgfSkgXG4gIH0sXG59KVxuIl19