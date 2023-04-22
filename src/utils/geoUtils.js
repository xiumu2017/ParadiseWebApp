export function position() {
    if (navigator.geolocation) { // 判断浏览器是否支持 Geolocation API
        navigator.geolocation.getCurrentPosition(function (position) { // 获取当前位置信息
            const latitude = position.coords.latitude; // 获取经度
            const longitude = position.coords.longitude; // 获取纬度
            console.log(`当前位置经度：${latitude}，纬度：${longitude}`);
            return longitude + ',' + latitude;
        }, function () {
            console.log('定位失败');
        });
    } else {
        console.log('您的浏览器不支持 Geolocation API');
    }

}

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          error => {
            reject(error.message);
          }
        );
      } else {
        reject('浏览器不支持 Geolocation API');
      }
    });
  }
  