import hyRequest from '@/service'

/* 歌曲详情 */
export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

/* 歌曲url */
export function getSongsUrl(id:number){
  return hyRequest.get({
    url:'/song/url',
    params:{
      id
    }
  })
}

/* 歌词 */
export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
