//-------------脚本设置------------

auto();//请求无障碍服务 auto(fast);缓存界面控件 空间换取时间
//请求截图 如果请求失败脚本停止运行 
//images.requestScreenCapture([landscape]) landscape = true 横屏 false竖屏
//启动线程 自动点击一次立即开始 必须开启无障碍服务
threads.start(function () {
    var beginBtn;
    if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
        beginBtn.click();
    }
});

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
sleep(1500)
//-------------脚本设置------------

function findPicAll(p) {
    var img = images.captureScreen();
    var templ = images.read("/sdcard/pictures/auto/"+p+".png");
    if(templ == null) {
        log(p+"--图库读图失败");
        return 
    }
    var p1 = findImage(img, templ);
    if (p1) {
        log("找到啦:" + p);
    } else {
        log("没找到:" + p);
    }
    templ.recycle()
}

function findPicAllClick(p) {
    var img = images.captureScreen();
    var templ = images.read("/sdcard/pictures/auto/"+p+".png");
    if(templ == null) {
        log(p+"--图库读图失败");
        return 
    }
    var p1 = findImage(img, templ);
    if (p1) {
        log("找到点击:" + p);
        click(p1.x + templ.getWidth()/2,p1.y+templ.getHeight()/2);
        sleep(100)
    } else {
        log("没找到:" + p);
    }
    templ.recycle()
}
function getPicH(x1, y1, x2, y2,name) {
    
    let clip = images.clip(images.captureScreen(), x1, y1, x2-x1, y2-y1);
    images.save(clip, "/sdcard/Pictures/auto/"+name+".png");
    return [x1-20,y1-20,x2,y2]
}
function getPicW(x1, y1, x2, y2,name) {
    
    let clip = images.clip(images.captureScreen(), x1,y1, x2-x1, y2-y1);
    images.save(clip, "/sdcard/Pictures/auto/"+name+".png");
}

// getPicH(142,633,160,660,"游戏_主线对话")//关卡坐标265,920,307,935
//getPicH(358,582,,"游戏_UI血条")
let re
let pic = "模拟器测试"
re = getPicH(89,71,161,155,pic)
log("\n" +"\n" +"\n" +"0.96|"+pic+"|"+re[0].toString()+","+re[1].toString()+","+re[2].toString()+","+re[3].toString()+"\n" +"\n" +"\n")
