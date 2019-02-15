/*
 * @Author: suyuye 
 * @Date: 2018-12-03 15:58:49 
 * @Last Modified by: suyuye
 * @Last Modified time: 2018-12-04 19:03:30
 */
;
var myTouch = {

    tap: function(el, callback) {
        var time, nowTime;
        var isshow = false;

        if (typeof el === 'object') {
            el.addEventListener('touchstart', function() {
                time = new Date() * 1;
            }, false);
            el.addEventListener('touchmove', function() {
                isshow = true;
            }, false);
            el.addEventListener('touchend', function() {
                nowTime = new Date() * 1;
                if (nowTime - time < 150 && !isshow) {
                    callback && callback();
                }
                isshow = false;
            }, false)
        }

    },
    swipe: function(el, dir, callback) {
        var that = this;
        var dom = typeof el === 'string' ? document.querySelector(el) : el;
        dom.addEventListener('touchstart', function(e) {
            startDir = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }

        }, false);
        dom.addEventListener('touchmove', function(e) {
            moveDir = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }

        }, false);
        dom.addEventListener('touchend', function() {
            if (startDir && moveDir && dir === that.getDir(startDir, moveDir)) {
                callback && callback();
            }
        }, false);
    },
    getDir: function(start, move) {
        var disX = move.x - start.x;
        var disY = move.y - start.y;
        console.log(disX, '---------' + disY);
        var diffX = Math.abs(disX);
        var diffY = Math.abs(disY);
        console.log(diffX, '----' + diffY);
        if (diffX > diffY) { //水平  只要水平 X肯定比Y大
            if (diffX > 60) {
                swipe = disX < 0 ? 'swipeLeft' : 'swipeRight';
            }
        }
        if (diffX < diffY) { //垂直  只要垂直 X肯定比Y小
            swipe = disY < 0 ? 'swipeUp' : 'swipeDown';
        }
        return swipe;
    }
}