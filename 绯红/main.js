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
threads.shutDownAll();//关闭线程
sleep(1000)
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function (event) {
    toast("音量上键被按下了,停止脚本");
    engines.stopAll()
});
//-------------脚本设置------------

//-------------读取配置------------
//let ip = files.read("/sdcard/Pictures/中控地址.txt")
let ip = files.read("/sdcard/Pictures/中控地址.txt")
let num = files.read("/sdcard/Pictures/索引.txt")
let sdPath = "/sdcard/pictures/auto/"
let apkPath = "./auto/"
let readpath = sdPath //写脚本 "/sdcard/pictures/auto/" APK "./auto/"
//-------------读取配置------------
//------------------测试-----------
log(findPicAll("模拟器测试"))
exit()
//upLV()
//---------------------测试-----------
//--------------------框架函数_链表------------------
function LinkList() {
    let Node = function (data) {
        this.data = data
        this.next = null
        this.getData = () => {
            if (typeof (this.data) == "string") {
                return this.data
            } else {
                return this.data[0]
            }

        }
    }

    this.length = 0
    this.outTimes = 0
    this.head = null
    this.tail = null
    this.isStart = false
    this.isloged = false
    this.getLength = () => {
        return this.length
    }
    this.init = () => {
        this.head = null
        this.tail = null
        this.isStart = false
        this.isloged = false
        this.length = 0
    }

    /**
     * @param {string} param1 - 返回头部对象
     */
    this.getHeadData = () => {
        let curr_node = head
        return curr_node.getData()
    }
    /**
     * @param {string} param1 - 将所有图片数据加入到链表
     */
    this.appendAll = (data) => {
        zhuxian.clean()
        for (let index = 0; index < data.length; index++) {
            this.append(data[index]);
        }
    }
    /**
     * @param {string} param1 - 开始执行找图任务
    */
    this.run = () => {
        if (funislog) log("run")
        let curr_node
        if (!this.isStart) {
            loadData()
            curr_node = this.head
            if (!this.isloged) {
                this.isloged = true
                seedmsg = "主线:正在定位"
                log("主线:正在定位")
            }
            while (curr_node) {
                //开始解析数据
                //图片名字 图片名字+方法 图片名字加X,Y
                if (typeof (curr_node.data) == "string") {
                    //如果找到并且点击 删除自身
                    // "图片"
                    if (findPicAllClick(curr_node.data) == true) {
                        if (this.removeData(curr_node.data)) {
                            this.isStart = true
                        }
                    }
                } else {
                    //["图片",偏移x,偏移y]
                    
                    if (curr_node.data.length == 3 && typeof (curr_node.data[2]) != "function") {//如果是偏移找图点击
                        //判断data[0] 是否是数组
                        let isArg = curr_node.data[0]
                        if(typeof(isArg) == "string"){
                            if (findPicAllClick(curr_node.data[0], curr_node.data[1], curr_node.data[2]) == true) {
                                if (this.removeData(curr_node.data[0])) {
                                    this.isStart = true
                                }
                            }
                        }else{
                            //log("是图片数组")
                            for (let i = 0; i < isArg.length; i++) {
                                if (findPicAllClick(isArg[i], curr_node.data[1], curr_node.data[2]) == true) {
                                    if (this.removeData(curr_node.data[0])) {
                                        this.isStart = true
                                    }
                                }
                            }
                        }

                    } else {
                        //["图片",[fun参数],fun]
                        if (curr_node.data.length == 3) {
                            if (findPicAll(curr_node.data[0], curr_node.data[1], curr_node.data[2]) == true) {
                                if (this.removeData(curr_node.data[0])) {
                                    this.isStart = true
                                }
                            }
                        } else {//["图片",fun]
                            if (findPicAll(curr_node.data[0], curr_node.data[1]) == true) {
                                if (this.removeData(curr_node.data[0])) {
                                    this.isStart = true
                                }
                            }
                        }
                    }
                }
                curr_node = curr_node.next
                if (this.isStart) {
                    this.isloged = false
                    break
                }
            }
        } else {
            curr_node = this.head
            this.outTimes = this.outTimes + 1
            if (this.outTimes > 45) {
                this.isStart = false
                this.outTimes = 0
            }
            if (curr_node) {
                if (!this.isloged) {
                    this.isloged = true
                    seedmsg = curr_node.getData()
                    log("主线:" + curr_node.getData())
                }
                //开始解析数据
                //图片名字 图片名字+方法 图片名字加X,Y
                if (typeof (curr_node.data) == "string") {
                    //如果找到并且点击 删除自身
                    if (findPicAllClick(curr_node.data) == true) this.removeData(curr_node.data);
                } else {
                    if (curr_node.data.length == 3 && typeof (curr_node.data[2]) != "function") {//如果是偏移找图点击
                        if (findPicAllClick(curr_node.data[0], curr_node.data[1], curr_node.data[2]) == true) this.removeData(curr_node.data[0]);
                    } else {
                        if (curr_node.data.length == 3) {
                            if (findPicAll(curr_node.data[0], curr_node.data[1], curr_node.data[2]) == true) {
                                this.removeData(curr_node.data[0]);
                            }
                        } else {
                            if (findPicAll(curr_node.data[0], curr_node.data[1]) == true) {
                                this.removeData(curr_node.data[0]);
                            }
                        }
                    }
                }
            }
        }
    }
    // 在尾部添加节点
    this.append = (data) => {
        // 创建新节点
        let new_node = new Node(data)
        if (this.head == null) {
            this.head = new_node
            this.tail = new_node
        } else {
            this.tail.next = new_node
            this.tail = new_node
        }
        this.length += 1
        return true
    }
    // 打印节点
    this.print = () => {
        let curr_node = this.head
        while (curr_node) {
            console.log(curr_node.data)
            curr_node = curr_node.next
        }
    }
    // 指定位置添加节点
    this.insert = (index, data) => {
        if (index > this.length || index < 0) {
            return
        } else if (index == this.length) {
            return this.append(data)
        } else {
            let new_node = new Node(data)
            if (index == 0) {
                new_node.next = head
                head = new_node
            } else {
                let insert_index = 1
                let curr_node = head
                while (insert_index < index) {
                    insert_index++
                    curr_node = curr_node.next
                }
                let next_node = curr_node.next
                curr_node.next = new_node
                new_node.next = next_node
            }
        }
        this.length++
        return true
    }
    /**
     * @param {string} param1 - 删除数据并将下一个设置为头部
    */
    this.removeData = (data) => {
        if (funislog) log("removeData")
        let curr_node = this.head
        let index = 0
        this.outTimes = 0
        let isArg
        let nodeData
        let listData,canData
        if(typeof(data) == "string") isArg = false
        while (curr_node) {
            index++
            if(!isArg){
                listData = curr_node.getData()
                canData = data
            }
            else{
                nodeData = curr_node.getData()
                //判断获取的数据是否数组
                if(typeof(nodeData) == "string"){
                    listData = nodeData
                }else{
                    listData = nodeData[0]
                }
                canData = data[0]
            }
            //log(nodeData)
            if (listData == canData) {
                if (this.length == 1) {//如果是头结点
                    this.head.data = null
                    this.head.next = null
                    this.head = null
                    this.tail = null
                    this.length = this.length - index
                    lock.lock()
                    time = 0
                    lock.unlock()
                    this.isloged = false
                    return true
                }
                else {
                    this.head = curr_node.next
                    this.length = this.length - index
                    lock.lock()
                    time = 0
                    lock.unlock()
                    this.isloged = false
                    return true
                }
            }
            curr_node = curr_node.next
        }
        return false
    }
    // 删除指定位置节点
    this.remove = (index) => {
        if (index < 0 || index >= length) {
            return false
        } else {
            let del_node = null
            if (index == 0) {
                del_node = head
                head = head.next
                del_node.next = null
            } else {
                let del_index = 0
                let pre_node = null
                let curr_node = head
                while (del_index < index) {
                    del_index++
                    pre_node = curr_node
                    curr_node = curr_node.next
                }
                del_node = curr_node
                pre_node.next = curr_node.next
                if (curr_node.next == null) {
                    tail = pre_node
                }
                del_node.next = null
            }
        }
        length--
        // return del_node.data
    }
    // 返回指定位置节点
    this.get = (index) => {
        if (index >= length || index < 0) {
            return false
        }
        let node_index = 0
        let curr_node = head
        while (node_index < index) {
            node_index++
            curr_node = curr_node.next
        }
        return curr_node.data
    }
    // 清空链表
    this.clean = () => {
        //将所有Node.data = null
        //将所有Node.next = null
        let curr_node = this.head
        let next_node
        while (curr_node) {
            curr_node.data = null
            //记录next
            next_node = curr_node.next
            curr_node.next = null
            curr_node = next_node
        }
        this.head = null
        this.tail = null
        this.length = 0
    }
}
//--------------------框架函数_链表------------------

//---------------------通讯----------------
// let req = visitPost(ip,{})
// log(req.code)
// if(req.code == "200"){
//     toast("连接中控成功")
// }
// else{
//     toast("连接中控失败")
//     exit()
// }
//递交当前模拟器脚本信息并获取中控台服务
function seedGet(p){
    let ser = ip + "/seedget"
    let req = visitPost(ser,p)

}

//获取名字
function getName() {
    let getnames = ip + "/getname"
    let req = visitPost(getnames, {})
    return req.name
}
//获取解码平台账号密码 todo
function getJmcode() {
    let getnames = ip + "/getjmcode"
    let req = visitPost(getnames, {})
    return req.name
}
function getPhone() {
    let getnames = ip + "/getPhone"
    let req = visitPost(getnames, {})
    return req.phone
}
//局域网识别验证码 todo
function ocr() {
    let getnames = ip + "/ocr"
    let img = images.read("/sdcard/Pictures/1.jpg");
    log(images.toBase64(img, "jpg", 100))
    let req = visitPost(getnames, { data: images.toBase64(img, "jpg", 100) })
    if (req.code == 200) {
        console.log("返回成功");
        console.log(req.ocrcode);
    }
    else {
        console.log("失败");
    }
    return req.ocrcode
}
//关闭模拟器 todo
function closeM() {
    let getnames = ip + "/end"
    let req = visitPost(getnames, {})
    return req.name
}
//递交账号密码
function saveDate(p) {
    let getnames = ip + "/saveDate"
    let req = visitPost(getnames, p)
    return req.code
}
function visitPost(url, body) {
    let r = http.post(url, body)
    return r.body.json()

}

//---------------------通讯----------------
//--------------------框架函数--------------

function getId_no() {
    var coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4",
        "2"
    ]; // 加权因子
    var lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; // 校验码


    //添加 新的住址信息 https://wenku.baidu.com/view/a3576ab13968011ca30091ec.html 即可随机生成更多
    var address = "430681"; // 住址 



    var birthday = "19" + random(30, 99) + "0101"; // 生日
    var s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(
        Math
            .random() * 10).toString();
    var array = (address + birthday + s).split("");
    var total = 0;
    for (i in array) {
        total = total + parseInt(array[i]) * parseInt(coefficientArray[i]);
    }
    var lastNumber = lastNumberArray[parseInt(total % 11)];
    var id_no_String = address + birthday + s + lastNumber;

    return id_no_String;
}


function GetIDCard() {
    let address = random(999999, 100000);
    let date = new Date();
    let yearfull = date.getFullYear();
    let y = random(yearfull + 1, yearfull - 70);
    let m = random(13, 1);
    let d = random(30, 1);
    let z = random(9999, 1000);
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    let data = address + '' + y + '' + m + '' + d + '' + z + ''
    /*将身份证号码前面的17位数分别乘以不同的系数。从第一位到第十七位的系数分别为：7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2。
将这17位数字和系数相乘的结果相加。
用加出来和除以11，取余数。
余数只可能有0－1－2－3－4－5－6－7－8－9－10这11个数字。其分别对应的最后一位身份证的号码为1－0－X－9－8－7－6－5－4－3－2。
通过上面计算得知如果余数是3，第18位的校验码就是9。如果余数是2那么对应的校验码就是X，X实际是罗马数字10。 */
    let v = data.substring(0, 17)
    let last, he = 0
    for (let index = 0; index < v.length; index++) {
        if (index == 0) he = parseInt(v[index]) * 7 + he
        if (index == 1) he = parseInt(v[index]) * 9 + he
        if (index == 2) he = parseInt(v[index]) * 10 + he
        if (index == 3) he = parseInt(v[index]) * 5 + he
        if (index == 4) he = parseInt(v[index]) * 8 + he
        if (index == 5) he = parseInt(v[index]) * 4 + he
        if (index == 6) he = parseInt(v[index]) * 2 + he
        if (index == 7) he = parseInt(v[index]) * 1 + he
        if (index == 8) he = parseInt(v[index]) * 6 + he
        if (index == 9) he = parseInt(v[index]) * 3 + he
        if (index == 10) he = parseInt(v[index]) * 7 + he
        if (index == 11) he = parseInt(v[index]) * 9 + he
        if (index == 12) he = parseInt(v[index]) * 10 + he
        if (index == 13) he = parseInt(v[index]) * 5 + he
        if (index == 14) he = parseInt(v[index]) * 8 + he
        if (index == 15) he = parseInt(v[index]) * 4 + he
        if (index == 16) he = parseInt(v[index]) * 2 + he
    }
    he = he % 11
    if (he == 0) last = "1"
    if (he == 1) last = "0"
    if (he == 2) last = "X"
    if (he == 3) last = "9"
    if (he == 4) last = "8"
    if (he == 5) last = "7"
    if (he == 6) last = "6"
    if (he == 7) last = "5"
    if (he == 8) last = "4"
    if (he == 9) last = "3"
    if (he == 10) last = "2"
    return v + last
}


function getNameNumberInInter() {
    let re = ["", ""]
    let nameHtml = http.get("https://www.qmsjmfb.com/");
    if (nameHtml.statusCode == 200) {
        re[0] = nameHtml.body.string().substring(nameHtml.body.string().indexOf("<li>") + 4, nameHtml.body.string().indexOf("</li>"))
        re[1] = getId_no()
        return re
    }
    return false
}
/**
 * @param {string}  获得字母数字的字符串 常用于设置账号密码 添加参数 number者返回多少长度的字符串 默认8位
 */
function getString() {
    let re = "", x = 9
    if (arguments.length != 0) {
        x = arguments[0]
    }
    let zimuArg = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    for (let index = 0; index < x; index++) {
        if (index == 0) {
            //如果是第一个字符串 必定为字母 通过取 random(0,1) 0数字 1字母
            re += zimuArg[random(0, 25)]
        }
        else {
            if (random(0, 1) == 0) {
                re += random(0, 9)
            } else {
                re += zimuArg[random(0, 25)]
            }
        }
    }
    return re
}
/**
 * @param {string} p 从下往上滑 [x,y,x1,y1,延时]
 */
function downup(p) {
    swipe(p[0], p[1], p[2], p[3], p[4])
    sleep(500)
    return true
}
function getArg(p) {
    let points = p.split(",")
    let findpicArg = []
    for (let index = 0; index < points.length; index++) {

        if (index > 1) {
            findpicArg[index] = points[index] - findpicArg[index - 2]
        } else {
            findpicArg[index] = parseInt(points[index])
        }

    }
    return findpicArg
}

function getStringArg(p) {
    let re = [] //[0]是否区域找到 true fals [1] 精度 [2] 图片 [3] 找图区域数组
    let f
    //分割p 判断是否有精度参数,区域找图参数
    if (p.indexOf("|") != -1) {
        //是否只有一个"|" 
        if (p.indexOf("|") == p.lastIndexOf("|")) {
            //只有一个 分割 0.9 "图片名字" 或者 "图片名字" "55,66,77,88"
            if (p.indexOf(",") != -1) { //有区域找图
                re[0] = "0.9"
                f = p.split("|")
                re[1] = f[0]
                re[2] = getArg(f[1])
            } else {//没有区域找图
                f = p.split("|")
                re[0] = f[0]
                re[1] = f[1]
                re[2] = [0, 0]
            }
        }
        else {
            //有3个 0.9 "图片名字" "55,66,77,88" 要查找的区域
            f = p.split("|")
            re[0] = f[0]
            re[1] = f[1]
            re[2] = getArg(f[2])
        }
    } else {
        re = ["0.9", p, [0, 0]]
    }
    return re
}
/**
 * @param {string}
 * "0.95|图片名字|0,0,540,960" 区域找图图片字符串 可指定精度 区域 不填则默认0.9精度 和全屏         
 * ("点击","点击","点击") 或(["点击","点击","点击"]) 多图单图找图 找到返回true        
 * ("点击","点击",[],fun) 找到则执行回调函数 参数2可空 参数2为回调函数参数 必须为数组       
 * ("点击",1) 单图或者多图返回找到的坐标数组 point[] x,y
 */
function findPicAll() {
    let img = images.captureScreen();
    let stringRe
    let isArg = arguments[0]
    if (typeof (isArg) == "string") {
        isArg = false
    } else {
        isArg = true
    }
    let p = arguments[0]
    let fun = false
    if (typeof (arguments[arguments.length - 1]) == "function") {
        fun = true
    }

    if ((arguments.length == 1 || (arguments.length == 2 && (fun || typeof (arguments[arguments.length - 1]) == "number")) || (arguments.length == 3 && typeof arguments[arguments.length - 2] != "string")) && !isArg) {
        //分割p 判断是否有精度参数,区域找图参数
        stringRe = getStringArg(p)
        let templ = images.read(readpath + stringRe[1] + ".png");
        if (templ == null) {
            log(p + "--图库读图失败");
            templ.recycle()
            return false
        }
        let p1 = findImage(img, templ, { threshold: parseFloat(stringRe[0]), region: stringRe[2] });
        if (p1) {
            if (islog) log("找到啦:" + stringRe[1]);
            if (!(arguments.length == 2 && typeof (arguments[arguments.length - 1]) == "number")) templ.recycle()
            if (fun) {
                if (arguments.length > 2) {
                    if (arguments[arguments.length - 1](arguments[arguments.length - 2])) {
                        return true
                    }
                    else {
                        return false
                    }
                } else {
                    if (arguments[1]()) {
                        return true
                    }
                    else {
                        return false
                    }
                }
            } else {
                if (typeof (arguments[arguments.length - 1]) == "number") {
                    let rex = p1.x + templ.getWidth() / 2
                    let rey = p1.y + templ.getHeight() / 2
                    templ.recycle()
                    return [rex, rey]
                } else {
                    return true
                }
            }
        } else {
            //if (islog) log("没找到:" + p);
            templ.recycle()
            return false
        }
    }
    else {
        //如果是(["点击","等到"])形式传参
        let picArg
        let templ = []
        //如果是以数组形式传参(["点击","0.95|三层","0.95|汽车|33,55,88,77"]) 或 (["点击","0.95|三层","0.95|汽车|33,55,88,77"],fun) 
        //或 (["点击","0.95|三层","0.95|汽车|33,55,88,77"],[25,55],fun) 参数二是以数组传参给回调函数
        if (isArg) {
            //载入 图片数组 例子:["点击","0.95|三层","0.95|汽车|33,55,88,77"]
            //picArg[0] = "点击" picArg[1] = "0.95|三层" picArg[2] = "0.95|汽车|33,55,88,77" 
            picArg = arguments[0]
            for (i = 0; i < picArg.length; i++) {
                //log(arguments[i])
                //如果该参数是字符串 则开始找图 否则返回
                //开始解析 图片数组返回 找图参数
                stringRe = getStringArg(picArg[i])
                templ[i] = images.read(readpath + stringRe[1] + ".png");
                if (templ[i] == null) {
                    log(picArg[i] + "--图库读图失败");
                    templ[i].recycle()
                    continue
                }
                var p1 = findImage(img, templ[i], { threshold: parseFloat(stringRe[0]), region: stringRe[2] });
                if (p1) {
                    if (islog) log("找到啦:" + stringRe[1]);
                    //如果有回调方法则运行回调方法
                    if (!fun) {
                        //如果参数末位是数字 则返回坐标数组
                        if (typeof (arguments[arguments.length - 1]) == "number") {
                            let rex = p1.x + templ[i].getWidth() / 2
                            let rey = p1.y + templ[i].getHeight() / 2
                            templ[i].recycle()
                            return [rex, rey]
                        } else {
                            templ[i].recycle()
                            return true
                        }
                    } else {
                        templ[i].recycle()
                        //(["点击","发财"],fun)
                        if (arguments.length == 2) {
                            if (arguments[arguments.length - 1]()) {
                                return true
                            } else {
                                return false
                            }
                        } else {//否则(["点击","发财"],[32,58,69,44],fun)
                            if (arguments[arguments.length - 1](arguments[arguments.length - 2])) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                } else {
                    //if (islog) log("没找到:" + arguments[i]);
                    templ[i].recycle()
                }
            }
        }
        else {
            //多图 遍历 
            //如果首个参数不是以数组形式传参
            for (i = 0; i < arguments.length; i++) {
                //log(arguments[i])
                //如果该参数是字符串 则开始找图 否则返回
                if (typeof (arguments[i]) == "string") {//判断该参数是否是图片
                    stringRe = getStringArg(arguments[i])//处理图片数据
                    templ[i] = images.read(readpath + stringRe[1] + ".png");
                    if (templ[i] == null) {
                        log(arguments[i] + "--图库读图失败");
                        templ[i].recycle()
                        continue
                    }
                } else {
                    break
                }
                var p1 = findImage(img, templ[i], { threshold: parseFloat(stringRe[0]), region: stringRe[2] });
                if (p1) {
                    if (islog) log("找到啦:" + stringRe[1]);
                    //如果有回调方法则运行回调方法
                    if (!fun) {
                        //如果参数末位是数字 则返回坐标数组
                        if (typeof (arguments[arguments.length - 1]) == "number") {
                            let rex = p1.x + templ[i].getWidth() / 2
                            let rey = p1.y + templ[i].getHeight() / 2
                            templ[i].recycle()
                            return [rex, rey]
                        } else {
                            templ[i].recycle()
                            return true
                        }
                    } else {
                        templ[i].recycle()
                        //("点击",fun) 
                        if (typeof (arguments[arguments.length - 2]) == "string") {
                            if (arguments[arguments.length - 1]()) {
                                return true
                            } else {
                                return false
                            }
                        } else {//否则("点击",[221,2],fun)
                            if (arguments[arguments.length - 1](arguments[arguments.length - 2])) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }

                } else {
                    //if (islog) log("没找到:" + arguments[i]);
                    templ[i].recycle()
                }
            }
        }
        return false
    }

}
/**
 * @param {string} 详情参考findPicAll 方法类似 多了一个偏移点击 则 找到图片则点击特定位置 
 * 但是没有回调方法
 */
function findPicAllClick() {
    var img = images.captureScreen();
    let stringRe
    let isArg = arguments[0]
    if (typeof (isArg) == "string") {
        isArg = false
    } else {
        isArg = true
    }
    let p = arguments[0]
    let pianyi = false
    if (arguments.length > 1) {
        if (typeof (arguments[arguments.length - 1]) == "number") {
            pianyi = true
        }
    }
    if ((arguments.length == 1 || (arguments.length == 3 && typeof (arguments[arguments.length - 1]) == "number")) && !isArg) {
        stringRe = getStringArg(p)
        let templ = images.read(readpath + stringRe[1] + ".png");
        if (templ == null) {
            log(stringRe[1] + "--图库读图失败");
            templ.recycle()
            return false
        }
        var p1 = findImage(img, templ, { threshold: parseFloat(stringRe[0]), region: stringRe[2] });
        if (p1) {
            if (islog) log("单图点击找到啦:" + stringRe[0] + stringRe[1] + stringRe[2]);
            if (pianyi) {
                click(arguments[arguments.length - 2], arguments[arguments.length - 1])
            } else {
                click(p1.x + templ.getWidth() / 2, p1.y + templ.getHeight() / 2);
            }
            sleep(100)
            templ.recycle()
            return true
        } else {
            //if (islog) log("单图没找到:" + p[1]);
            templ.recycle()
            return false
        }
    }
    else {
        let templ = []
        if (isArg) {
            isArg = arguments[0]
            for (let i = 0; i < isArg.length; i++) {
                stringRe = getStringArg(isArg[i])

                templ[i] = images.read(readpath + stringRe[1] + ".png");
                if (templ[i] == null) {
                    log(stringRe[1] + "--图库读图失败");
                    templ[i].recycle()
                    continue
                }
                var p1 = findImage(img, templ[i], { threshold: parseFloat(stringRe[0]), region: stringRe[2] });
                if (p1) {
                    if (islog) log("多图点击找到啦:" + stringRe[1]);
                    if (pianyi) {
                        click(arguments[arguments.length - 2], arguments[arguments.length - 1])
                    } else {
                        click(p1.x + templ[i].getWidth() / 2, p1.y + templ[i].getHeight() / 2);
                    }
                    sleep(100)
                    templ[i].recycle()
                    return true
                } else {
                    //if (islog) log("多图没找到:" + f[1]);
                    templ[i].recycle()
                    return false
                }

            }
        } 
        else {
            for (i = 0; i < arguments.length; i++) {
                //log(arguments[i])
                if (pianyi && i == (arguments.length - 2)) break; //此行用于加快 多图偏移点击遍历速度 如果是偏移点击 最后2个参数不用解析
                stringRe = getStringArg(arguments[i])
                templ[i] = images.read(readpath + stringRe[1] + ".png");
                if (templ[i] == null) {
                    log(stringRe[1] + "--图库读图失败");
                    templ[i].recycle()
                    continue
                }
                var p1 = findImage(img, templ[i], { threshold: parseFloat(stringRe[0]), region: stringRe[2] });
                if (p1) {
                    if (islog) log("多图点击找到啦:" + stringRe[1]);
                    if (pianyi) {
                        click(arguments[arguments.length - 2], arguments[arguments.length - 1])
                    } else {
                        click(p1.x + templ[i].getWidth() / 2, p1.y + templ[i].getHeight() / 2);
                    }
                    sleep(100)
                    templ[i].recycle()
                    return true
                } else {
                    //if (islog) log("多图没找到:" + f[1]);
                    templ[i].recycle()
                    
                }
            }
            return false
        }

    }

}
/**
 * @param {string} param1 -找图直到找到60秒 可输入多个图片 例子 : findPicAllUntilAppears("点击","跳过","放弃")如果需要自定义时间 第一个参数为num 返回值 找到其中一个为true 都没找到为fals 
 */
function findPicAllUntilAppears() {
    let times, i, x = 0
    let pianyi = false
    if (typeof (arguments[0]) == "string") {
        times = 60;
    } else {
        times = arguments[0]
        x = 1
    }
    if (arguments.length > 2) {
        if (typeof (arguments[arguments.length - 1]) == "number") {
            pianyi = true
        }
    }
    let nowTime = 0
    do {
        i = x
        for (i; i < arguments.length; i++) {
            if (pianyi && i == (arguments.length - 2)) break;
            if (findPicAll(arguments[i], arguments[arguments.length - 2], arguments[arguments.length - 1])) return true
        }
        sleep(1000)
        nowTime = nowTime + 1
    } while (nowTime < times);
    return false
}
/**
 * @param {string} param1 -找图点击直到找到60秒 可输入多个图片 例子 : findPicAllUntilAppears("点击","跳过","放弃")如果需要自定义时间 第一个参数为num 返回值 找到其中一个为true 都没找到为fals 
 */
function findPicAllClickUntilAppears() {
    let times, i, x = 0
    if (typeof (arguments[0]) == "string") {
        times = 20;
    } else {
        times = arguments[0]
        x = 1
    }
    let pianyi = false
    if (arguments.length > 2) {
        if (typeof (arguments[arguments.length - 1]) == "number") {
            pianyi = true
        }
    }


    let nowTime = 0
    do {
        i = x
        for (i; i < arguments.length; i++) {
            if (pianyi && i == (arguments.length - 2)) break;
            if (pianyi) {
                if (findPicAllClick(arguments[i], arguments[arguments.length - 2], arguments[arguments.length - 1])) return true
            } else {
                if (findPicAllClick(arguments[i])) return true
            }

        }
        sleep(1000)
        nowTime = nowTime + 1
    } while (nowTime < times);
    return false
}
function showPic(p) {
    var templ = images.read(readpath + p + ".png");
    app.viewFile(templ)
    templ.recycle()
}
/**
 * @param {string} param1 -每隔1秒找文本为p值的控件直到出现 默认1秒 成功 true 失败false
 */
function findText(p, times) {
    if (times === undefined) {
        times = 1000;
    }
    if (text(p).findOne(times) == null) {
        return false
    }
    else {
        return true
    }
}
/**
 * @param {string} param1 -每隔1秒找文本为p值的控件直到出现并点击 默认1秒 成功 true 失败false
 */
function clickText(p, times) {
    if (times === undefined) {
        times = 1000;
    }
    let clicker = text(p).findOne(times)
    if (clicker != null) {
        clicker.click()
        return true
    }
    else {
        return false
    }
}
function findId(p, times) {
    if (times === undefined) {
        times = 1000;
    }
    if (id(p).findOne(times) == null) {
        return false
    }
    else {
        return true
    }
}
function clickId(p, times) {
    if (times === undefined) {
        times = 1000;
    }
    let clicker = id(p).findOne(times)
    if (clicker != null) {
        clicker.click()
        return true
    }
    else {
        return false
    }
}
function findDesc(p, times) {
    if (times === undefined) {
        times = 1000;
    }
    if (desc(p).findOne(times) == null) {
        return false
    }
    else {
        return true
    }
}
function clickDesc(p, times) {
    if (times === undefined) {
        times = 1000;
    }
    let clicker = desc(p).findOne(times)
    if (clicker != null) {
        clicker.click()
        return true
    }
    else {
        return false
    }

}
function clickRa(x, y) {
    ra.tap(x, y)
    sleep(100)
}
function killApp(packageName) {
    shell('am force-stop ' + packageName, true);
};
function killAppTwo(packageName) {
    var name = getPackageName(packageName);
    if (!name) {
        if (getAppName(packageName)) {
            name = packageName;
        } else {
            return false;
        }
    }
    app.openAppSetting(name);
    text(app.getAppName(name)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(name) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}
/**
 * @param {string} 超时操作与记录相关
 */
function outTime() {
    log("超时检测启动")
    //开始计时
    do {
        seedTime = seedTime +1
        if(seedTime == 2){
            seedTime = 0
            http.postJson(ip + "/seedget",{"tou":"实时脚本状态","脚本任务":"绯红自抽",sy:num,states:state+":"+seedmsg+time.toString()})
        }

        
        
        //判断当前脚本状态 设置超时标签
        if (state == "登录") outtime = 120
        if (state == "主线") outtime = 180
        sleep(1000)
        lock.lock()
        time = time + 1
        lock.unlock()
        if (time > outtime) {//超时操作
            log(state + "超时,关闭游戏")
            lock.lock()
            time = 0 //重置超时标签
            state = "关闭游戏"
            lock.unlock()
        }
    } while (true);
}
//-------------------游戏脚本方法---------------------
/**
 * @param {string} param1 -实名认证
 * 
 */
function readyname() {
    let shiming = getNameNumberInInter()
    if (shiming) {
        id("et_inputname").findOne(2000).setText(shiming[0])
        id("et_inputidnumber").findOne(2000).setText(shiming[1])
        if (id("tv_authen_submit_dialog").findOne(2000).click()) return true
    }
    return false
}
/**
 * @param {string} param1 -注册账号并发送服务器记录 创建"/sdcard/pictures/zhanghao.txt" 记录账号密码进度第一行账号第二行密码第三行进度
 */
function register() {
    if (funislog) log("register")
    findPicAllClickUntilAppears(2, "登录_账号")
    if (false) {//直到游客登陆出现并点击findPicAllClickUntilAppears(5, "登录_游客登录")
        zhanghao = id("tv_account_value").findOne(2000).text().replace(/账号：/, "")//直到账号出现
        mima = id("tv_passwordvalue").findOne(2000).text().replace(/密码：/, "")
        if (saveDate({ "zhanghao": zhanghao, "mima": mima }) == 200) {
            //写进手机记录进度 
            files.write("/sdcard/pictures/zhanghao.txt", zhanghao + "\n" + mima + "\n" + "0")
            if (id("tv_info_ok").findOne(2000)) {
                id("tv_info_ok").findOne(2000).click()
                return true
            } else {
                return false
            }
        }
        return false
    } else {
        if (!findPicAll("登录_账号注册")) return
        zhanghao = getString(12)
        mima = getString()
        //写进手机记录进度 
        files.write("/sdcard/pictures/zhanghao.txt", zhanghao + "\n" + mima + "\n" + "0")
        findPicAllClickUntilAppears(5, "登录_账号注册")
        let list = className("android.widget.RelativeLayout").findOne();//查找控件
        for (let i = 0; i < list.childCount(); i++) {//循环找出子控件 判断自己要操作的控件
            let child = list.child(i);
            if (child.className() == "android.widget.EditText") {
                child.setText(zhanghao) //输入账号
            }
        }
        id("et_login_password").findOne(2000).setText(mima)
        sleep(1500)
        if (id("tv_login").findOne(2000).click()) return true

        return false

    }
}
function login() {
    if (funislog) log("login")
    //开始登录
    findPicAllClick("登录_账号")//"登录_账号登录"
    findPicAllClick("登录_账号登录", "登录_UI账号登录")
    let list = className("android.widget.RelativeLayout").findOne(1000);//查找控件
    if (list) {
        for (let i = 0; i < list.childCount(); i++) {//循环找出子控件 判断自己要操作的控件
            let child = list.child(i);
            if (child.className() == "android.widget.EditText") {
                child.setText(zhanghao) //输入账号
            }
        }
    }
    //输入密码
    if (id("et_login_password").findOne(1000)) id("et_login_password").findOne(1000).setText(mima)
    //点击登录
    if (id("tv_login").findOne(1000)) {
        id("tv_login").findOne(1000).click()
        return true
    }
    return false

}
function gameName() {
    if (funislog) log("gameName")
    findPicAllClickUntilAppears(5, "游戏_UI吾名为")//"游戏_UI回忆您的名字" 262 773
    let list = className("android.widget.ScrollView").findOne()
    for (let i = 0; i < list.childCount(); i++) {//循环找出子控件 判断自己要操作的控件
        let child = list.child(i);
        //className("android.widget.ScrollView").findOne()
        child.setText(getNameNumberInInter()[0]) //输入名字
        sleep(1000)
    }
    return findPicAllClickUntilAppears(4, "游戏_BTN名字决定")
}
function fight() {
    fighting = true
    if (funislog) log("fight")
    if(findPicAllClick("游戏_BTN冒险")) sleep(3000)
    findPicAllClick("游戏_BTN开始战斗")
    if (findPicAll("游戏_BTN跳过")) return
    //设置角色
    findPicAll("游戏_UI右下绿色数字0", setRole)
    //战斗过程
    //判断并释放技能
    //findPicAllClick("游戏_UI调律5", releaseSkill)
    if (findPicAll("战斗_UI战报")) fighting = false
    sleep(1000)
    return true
}
function setRole() {
    if (funislog) log("setRole")
    //清空队伍
    findPicAllClick("游戏_BTN开始战斗", 81, 300)
    findPicAllClick("游戏_BTN开始战斗", 64, 394)
    findPicAllClick("游戏_BTN开始战斗", 63, 491)
    findPicAllClick("游戏_BTN开始战斗", 177, 300)
    findPicAllClick("游戏_BTN开始战斗", 177, 394)
    findPicAllClick("游戏_BTN开始战斗", 177, 491)
    //默认 点击前面6个 参战
    findPicAllClick("游戏_BTN开始战斗", 85, 626)
    findPicAllClick("游戏_BTN开始战斗", 185, 626)
    findPicAllClick("游戏_BTN开始战斗", 285, 626)
    findPicAllClick("游戏_BTN开始战斗", 385, 626)
    findPicAllClick("游戏_BTN开始战斗", 485, 626)
    findPicAllClick("游戏_BTN开始战斗", 85, 706)
}
function releaseSkill() {
    if (funislog) log("releaseSkill")
    //默认释放 制裁者
    //找到 制裁者 获得坐标
    let x = findPicAll("游戏_UI调律制裁者", 5)
    //找到 怪物 获得坐标
    //暂时无法智能 用固定坐标代替
    //实现拖拉 
    if (x) {
        downup(x[0], x[1], 360, 455, 500)
        downup(x[0], x[1], 360, 555, 500)
        downup(x[0], x[1], 360, 655, 500)
        downup(x[0], x[1], 461, 431, 500)
        downup(x[0], x[1], 461, 531, 500)
        downup(x[0], x[1], 461, 631, 500)
    } else {
        return
    }
}
function getMail() {
    if (funislog) log("getMail")
    if (!goMain()) return false
    findPicAllClick("游戏_BTN邮箱")
    return findPicAllClickUntilAppears(10, "游戏_BTN邮箱一键领取")
}
function setGunkaLv() {
    if (funislog) log("setLv")
    if (findPicAllClick("游戏_BTN主页冒险")) {
        lock.lock()
        state = "主线_选择关卡"
        lock.unlock()
        sleep(4000)
    }
    if (findPicAll("游戏_主线对话音符")) {
        lock.lock()
        state = "主线"
        lock.unlock()
        return false
    }
    //默认第一章 以后根据参数选择关卡 现在
    if (findPicAllClick("游戏_BTN主线")) {
        lock.lock()
        state = "主线"
        lock.unlock()
        return true
    }

}
function goMain() {
    let timer = 0
    do {
        back()
        sleep(300)
        findPicAllClick("游戏_BTN确认退出游戏取消")
        sleep(300)
        findPicAllClick("游戏_BTN大主页")
        sleep(300)
        findPicAll("游戏_主线对话")
        timer = timer + 1
        if (timer > 5) return false
    } while (!findPicAll("游戏_BTN邮箱"));
    return true
}
/**
 * @param {string} param1 -("离合","新月") 吃完新月书籍                                         
 *                         ("离合","新月",20) 吃新月书籍20本 弦月
 */
function upLV() {
    if (!goMain()) return false
    let re = false
    findPicAllClickUntilAppears("游戏_BTN唤灵")
    // 选择 唤灵  arguments[0]
    //解析参数
    let ling, book, ci, temp, isarg = false
    if (typeof (arguments[0]) == "string")//如果参数1 是字符串 正常调用 
    {
        ling = "唤灵_" + arguments[0]
        book = "唤灵_BTN" + arguments[1] + "之书"
        if (arguments.length == 3) ci = arguments[2]
    } else {
        isarg = true
        temp = arguments[0]
        ling = "唤灵_" + temp[0]
        book = "唤灵_BTN" + temp[1] + "之书"
        if (temp.length == 3) ci = temp[2]
        log("数组调用" + ling + book)
    }
    //选择唤灵
    findPicAllClickUntilAppears(3, ling)
    sleep(1000)
    findPicAllClickUntilAppears(3, "唤灵_BTN加号")
    sleep(2000)
    let pots = findPicAll(book, 1)
    if (arguments.length == 2 || isarg) {
        if (pots) {
            log()
            press(pots[0], pots[1], 5000)
        } else {
            return "没有书"
        }
    } else {
        if (pots) {
            for (let index = 0; index < ci; index++) {
                click(pots[0], pots[1])
                sleep(200)
            }
        } else {
            return "没有书"
        }
    }
    sleep(1500)
    re = findPicAllClick("唤灵_BTN升级")
    goMain()
    return re
}
function zhuxianupLV(p){
    upLV(p)
    return true
}
function 关闭游戏() {
    killAppTwo("com.blackwasp")
    init()
    if (threadOutTime) threadOutTime.interrupt()
    lock.lock()
    state = "登录"
    lock.unlock()
}
function loadData() {
    zhuxian.appendAll(["游戏_BTN跳过剧情打钩", ["游戏_UI回忆你的名字", gameName], [["游戏_对话等到你","0.95|游戏_主线1-1白点|96,707,177,796"], 128, 740], "游戏_主线点击角色",
        ["游戏_主线对话SP值", 276, 831], [["游戏_主线对话下一关","0.95|游戏_主线1-2白点|249,706,283,745"], 266, 727],
        ["游戏_主线对话切换至自动", [148, 860, 158, 753, 1000], downup], [["游戏_主线1-3","0.96|游戏_主线1-3白点|360,650,420,735"], 397, 683], ["游戏_主线升级幻灵", 43, 878], "游戏_主线升级幻灵点击幻灵",
        "游戏_主线升级幻灵加号", "游戏_主线升级幻灵点书", "游戏_主线升级幻灵升级", ["游戏_主线升级幻灵424", goMain], ["游戏_主线对话下一目的", 44, 891],
        [["游戏_主线下一关1-4","0.95|游戏_主线1-4白点|232,601,259,629"], 247, 618], [["游戏_主线下一关1-5","0.96|游戏_主线1-5白点|60,550,115,605"], 86, 578], 
        [["0.95|游戏_主线下一关1-6","0.96|游戏_主线1-6白点|60,452,116,519"], 83, 481], [["游戏_主线下一关1-7","0.96|游戏_主线1-7白点|180,420,240,500"], 213, 445],
        "游戏_主线对话调律技能点击一", ["游戏_主线对话调律技能点击二|227,849,290,886", [271, 813, 460, 470, 500], downup],
        [["0.92|游戏_主线下一关1-8","0.96|游戏_主线1-8白点|282,424,349,494"], 320, 462], [["游戏_主线下一关1-9","0.96|游戏_主线1-9白点|392,415,441,478"], 423, 449], 
        [["游戏_主线下一关1-10","0.96|游戏_主线1-10白点|275,369,327,423"], 309, 407], [["0.92|游戏_主线下一关1-11","0.96|游戏_主线1-11白点|300,355,391,453"], 352, 403],
        [["游戏_主线下一关1-12","0.96|游戏_主线1-12白点|240,358,287,411"], ["卡雅", "新月"], zhuxianupLV], [["游戏_主线下一关1-12","0.96|游戏_主线1-12白点|240,358,287,411"], ["离合", "弦月"], zhuxianupLV],[["游戏_主线下一关1-12","0.96|游戏_主线1-12白点|240,358,287,411"], 272, 396], 
        [["游戏_主线下一关1-13","0.95|游戏_主线1-13白点|116,305,173,359"], 152, 346],[["游戏_主线下一关1-14","0.96|游戏_主线1-14白点|73,174,120,229"], 109, 210], 
        [["游戏_主线下一关1-15","0.96|游戏_主线1-15白点|219,177,271,245"], 255, 219],
        "游戏_主线第二章解锁", ["游戏_主线对话45星", 269, 894], ["游戏_主线对话完成第一章", () => {
            click(46, 920)
            zhuxian.init()
            zhuxianjindu = true
            saveDate({ "zhanghao": zhanghao, "mima": mima })
        }]
    ])
}
function 主线() {
    if (!zhuxianjindu) zhuxian.run()
    findPicAllClick("游戏_主线冒险", "游戏_主线开始战斗", "游戏_BTN跳过", "游戏_主线对话", "游戏_BTN点击屏幕继续")
    if (findPicAllClick("游戏_点击空白区域关闭")) fighting = false
    findPicAllClick("游戏_主线对话音符", 226, 903)
    findPicAllClick("游戏_分享", 270, 839)

    if (zhuxianjindu) {
        if (getMail()) {
            files.remove("/sdcard/pictures/zhanghao.txt")
            lock.lock()
            time = 0
            state = "关闭游戏"
            lock.unlock()
        }
    }
    findPicAll("游戏_BTN开始战斗", "游戏_BTN冒险", fight)
    if ((state.indexOf("关卡") || findPicAll("游戏_BTN主页冒险", "游戏_BTN主线") && !zhuxianjindu)) setGunkaLv();
    //实现关卡点击 
    //关卡图片数组 从 1-15 到 1-1
    //找到关卡 设置关卡标签guanka 

}
function 登录() {
    if (currentPackage() != "com.blackwasp") app.launchApp("绯红之境");
    do {
        if (text("允许").findOne(1000)) text("允许").findOne(1000).click()
        sleep(2000)
    } while (text("允许").findOne(1000));

    findPicAllClick("登录_公告确定")
    //登录 判断 读取手机文件是否有zhanghao.txt 没有 则 注册 有 则判断该账号是否完成指定目标 第三行是否为1
    if (denglu) {
        findPicAllClickUntilAppears("登录_点击进入")
        lock.lock()
        time = 0
        state = "主线"
        lock.unlock()
        return

    }
    //如果出现公告 证明已经登录了 不用注册和登录

    if (files.exists("/sdcard/pictures/zhanghao.txt")) {//如果有文件 账号已注册
        let zhanghaoText = files.open("/sdcard/pictures/zhanghao.txt", "r")
        zhanghao = zhanghaoText.readline()
        mima = zhanghaoText.readline()
        if (zhanghaoText.readline() == "1") {//如果已经完成
            zhanghaoText.close()
            if (files.remove("/sdcard/pictures/zhanghao.txt")) {
                if (register()) {//重新注册//将账号密码发送到控制台并存到数据库
                    sleep(1500)
                    if (findPicAll("登录_切换账号")) {
                        denglu = readyname()
                        sleep(5000)
                    }

                }
            }
        } else {//没完成
            zhanghaoText.close()
            denglu = login()
            sleep(5000)
        }
    } else {
        if (register()) {//重新注册//将账号密码发送到控制台并存到数据库
            sleep(1500)
            if (findPicAll("登录_切换账号")) {
                denglu = readyname()
                sleep(5000)
            }
        }
    }

}
/**
 * @param {string} 脚本数据初始化
 */
function init() {
    denglu = false
    fighting = false
    zhuxianjindu = false
    threadstart = false
    seedmsg = ""
}
//-------------------游戏脚本方法---------------------
//--------------------自抽号脚本主体--------------
let islog = false
let funislog = false
//练号 流程
let state = "登录"
let denglu = false
let fighting = false
let zhuxianjindu = false
let threadOutTime, threadstart = false
let seedmsg = ""
let lock = threads.lock(); //超时创建锁
let outtime, time = 0
let zhanghao, mima
let zhuxian = new LinkList()
关闭游戏()
let seedTime = 0
do {
    //登录
    if (threadstart == false) {
        threadstart = true
        threadOutTime = threads.start(outTime)
    }
    if (state == "登录") 登录()
    if (state.indexOf("主线") != -1) 主线()
    if (state == "关闭游戏") 关闭游戏()
    sleep(100)
} while (true);

//启动线程




//启动游戏 包名启动launch("com.tencent.mm"); 应用名启动launchApp("Auto.js");
//判断应用是否启动


//获取权限直到没有允许文本
//启动游戏----更新----登陆游戏

//注册(获取数据库账号) 如果是从中控数据库拿取账号 此处不用注册
//手机注册流程
//从服务器获取手机号码 

//登录

//主线








//抽卡

//记录获取并发送至中控数据库

