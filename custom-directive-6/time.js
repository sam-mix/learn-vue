var Time = {

    // 获取当前时间戳
    getUnix: function () {
        return new Date().getTime()
    },

    // 获取今天0点0分0秒的时间戳
    getTodayUnix: function () {
        var date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date.getTime()
    },

    // 获取今年1月1日0点0时0分0秒的时间戳
    getYearUnix: function () {
        var date = new Date()
        date.setMonth(0)
        date.setDate(0)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date.getTime()
    },

    // 获取标准格式年月日
    getLastDate: function (time) {
        var date = new Date(time)
        var om = date.getMonth() + 1
        var month = om < 10 ? '0' + om : om
        var od = date.getDate()
        var day = od < 10 ? '0' + od : od

        return date.getFullYear() + '-' + month + '-' + day
    },

    // 转换时间
    getFormatTime: function (timestamp) {
        var now = this.getUnix()
        var today = this.getTodayUnix()
        // var year = this.getYearUnix()
        var timer = (now - timestamp) / 1000

        var tip = ''

        if (timer < 0) {
            tip = '刚刚'
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '刚刚'
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前'
        } else if (timestamp - today >= 0) {
            tip = Math.floor(timer / 3600 + '小时前')
        } else if (timer / 86400 <= 31) {
            tip = Math.ceil(timer / 86400) + '天前'
        } else {
            tip = this.getLastDate(timestamp)
        }
        return tip
    }

}


Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value)
        el.__timeout__ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value)
        }, 60000)
    }
})