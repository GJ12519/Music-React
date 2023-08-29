// import { getSongsUrl } from "@/views/player/service/player"

/* 由于音乐防盗设置，无法直接通过使用url的方式在audio中进行播放，所以这里使用的是网易云的外链地址 */

// function getUrl (id:number){
//   let songs = ''
//   getSongsUrl(id).then(res=>{
//     console.log(res.data.data[0].url);
//     songs = res.data.data[0].url
//   }).catch(err=>{
//     console.log(err);
//   })

//   return songs
// }

export function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
  // console.log('调用了多少次');
  
  // const aaa = getUrl(id)
  // return aaa
}
