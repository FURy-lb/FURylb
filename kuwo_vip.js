// @supported Kuwo Music 解锁脚本

let body = $response.body;
let obj = JSON.parse(body);

// 处理 VIP 用户信息接口
if (obj?.userInfo || obj?.vip) {
  if (obj.userInfo) {
    obj.userInfo.isVip = true;
    obj.userInfo.vip = 1;
    obj.userInfo.expireTime = "2099-12-31";
    obj.userInfo.vipName = "超级会员";
  }

  if (obj.vip) {
    obj.vip.status = 1;
    obj.vip.type = "vip";
    obj.vip.expire = "2099-12-31";
  }
}

// 处理主题皮肤接口
if (Array.isArray(obj?.data)) {
  obj.data = obj.data.map(item => {
    item.isBuy = true;
    item.status = 1;
    return item;
  });
}

// 处理听书接口
if (obj?.audiobook) {
  obj.audiobook.isBuy = true;
  obj.audiobook.status = 1;
}

// 返回修改后的数据
$done({ body: JSON.stringify(obj) });
