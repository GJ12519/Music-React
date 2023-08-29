export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}y${height}`
}

export function formatTime(time: number) {
  let formatMinute = '00'
  let formatSecond = '00'
  if (time) {
    // 1.将毫秒转成秒钟
    const timeSeconds = time / 1000
    // console.log(time);


    // 2.获取分钟和秒钟
    // 100s => 01:40
    // 200s => 03:20
    // Math.floor(100 / 60) => 1
    const minute = Math.floor(timeSeconds / 60)
    const second = Math.floor(timeSeconds) % 60

    // 3.格式化时间
    formatMinute = String(minute).padStart(2, '0')
    formatSecond = String(second).padStart(2, '0')
  } else {
    formatMinute = '00'
    formatSecond = '00'
  }
  return `${formatMinute}:${formatSecond}`
}
