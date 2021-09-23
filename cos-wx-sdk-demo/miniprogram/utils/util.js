"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils = (function () {
    function Utils() {
    }
    Utils.uuid = function () {
        return 'xxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    Utils.dateFormat = function (fmt, date) {
        date instanceof Date ? '' : date = new Date(date);
        var ret;
        var opt = {
            "Y+": date.getFullYear().toString(),
            "m+": (date.getMonth() + 1).toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "M+": date.getMinutes().toString(),
            "S+": date.getSeconds().toString()
        };
        for (var k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1)
                    ?
                        (opt[k])
                    :
                        (opt[k].padStart(ret[1].length, "0")));
            }
            ;
        }
        ;
        return fmt;
    };
    Utils.randomFileName = function (filename) {
        var separator = '.';
        var fileNameArr = filename.split(separator);
        return fileNameArr[0] + '_' + this.uuid() + '.' + fileNameArr[1];
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0E7SUFBQTtJQXVEQSxDQUFDO0lBakRRLFVBQUksR0FBWDtRQUNFLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7WUFDckQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFRUSxnQkFBVSxHQUFqQixVQUFrQixHQUFXLEVBQUUsSUFBVTtRQUN2QyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsRCxJQUFJLEdBQUcsQ0FBQztRQUNSLElBQU0sR0FBRyxHQUFRO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUN0QyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUVuQyxDQUFDO1FBQ0YsS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7WUFDakIsR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksR0FBRyxFQUFFO2dCQUNQLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO29CQUM1QyxDQUFDO3dCQUNELENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNSLENBQUM7d0JBQ0QsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1lBQUEsQ0FBQztTQUNIO1FBQUEsQ0FBQztRQUNGLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQU9NLG9CQUFjLEdBQXJCLFVBQXNCLFFBQWdCO1FBQ3BDLElBQU0sU0FBUyxHQUFXLEdBQUcsQ0FBQztRQUM5QixJQUFNLFdBQVcsR0FBa0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBdkRELElBdURDO0FBR0Msc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHV0aWxzIOW4uOeUqOW3peWFt+exu1xuICovXG5jbGFzcyBVdGlscyB7XG5cbiAgLyoqXG4gICAqIOiOt+WPllVVSURcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBzdGF0aWMgdXVpZCgpIHtcbiAgICByZXR1cm4gJ3h4eHh4eHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG4gICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5pel5pyf5qC85byP5YyWXG4gICAqIEBwYXJhbSBmbXQgXG4gICAqIEBwYXJhbSBkYXRlIFxuICAgKiBAcmV0dXJucyBcbiAgICovXG4gICAgc3RhdGljIGRhdGVGb3JtYXQoZm10OiBzdHJpbmcsIGRhdGU6IERhdGUpIHtcbiAgICAgIGRhdGUgaW5zdGFuY2VvZiBEYXRlID8gJycgOiBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gIFxuICAgICAgbGV0IHJldDtcbiAgICAgIGNvbnN0IG9wdDogYW55ID0ge1xuICAgICAgICBcIlkrXCI6IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLCAgICAgICAgLy8g5bm0XG4gICAgICAgIFwibStcIjogKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCksICAgICAvLyDmnIhcbiAgICAgICAgXCJkK1wiOiBkYXRlLmdldERhdGUoKS50b1N0cmluZygpLCAgICAgICAgICAgIC8vIOaXpVxuICAgICAgICBcIkgrXCI6IGRhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpLCAgICAgICAgICAgLy8g5pe2XG4gICAgICAgIFwiTStcIjogZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKSwgICAgICAgICAvLyDliIZcbiAgICAgICAgXCJTK1wiOiBkYXRlLmdldFNlY29uZHMoKS50b1N0cmluZygpICAgICAgICAgIC8vIOenklxuICAgICAgICAvLyDmnInlhbbku5bmoLzlvI/ljJblrZfnrKbpnIDmsYLlj6/ku6Xnu6fnu63mt7vliqDvvIzlv4XpobvovazljJbmiJDlrZfnrKbkuLJcbiAgICAgIH07XG4gICAgICBmb3IgKGxldCBrIGluIG9wdCkge1xuICAgICAgICByZXQgPSBuZXcgUmVnRXhwKFwiKFwiICsgayArIFwiKVwiKS5leGVjKGZtdCk7XG4gICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShyZXRbMV0sIChyZXRbMV0ubGVuZ3RoID09IDEpXG4gICAgICAgICAgICA/XG4gICAgICAgICAgICAob3B0W2tdKVxuICAgICAgICAgICAgOlxuICAgICAgICAgICAgKG9wdFtrXS5wYWRTdGFydChyZXRbMV0ubGVuZ3RoLCBcIjBcIikpKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gZm10O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaWh+S7tuWQjeiOt+WPlumaj+acuuaWh+S7tuWQjSAgYWJjLmpwZyA9PiBhYmNfODlkYWMzMDA0Y2JkZWU3ZjcuanBnXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyByYW5kb21GaWxlTmFtZShmaWxlbmFtZTogU3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIGNvbnN0IHNlcGFyYXRvcjogc3RyaW5nID0gJy4nO1xuICAgICAgY29uc3QgZmlsZU5hbWVBcnI6IEFycmF5PHN0cmluZz4gPSBmaWxlbmFtZS5zcGxpdChzZXBhcmF0b3IpO1xuICAgICAgcmV0dXJuIGZpbGVOYW1lQXJyWzBdICsgJ18nICsgdGhpcy51dWlkKCkgKyAnLicgKyBmaWxlTmFtZUFyclsxXTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gIFV0aWxzXG59XG4iXX0=