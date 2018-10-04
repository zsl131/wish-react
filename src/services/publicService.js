import request from '../utils/request';

function listRecommentActivity(query) {
  return request("activityService.listRecommend", query, true);
}

export {
  listRecommentActivity,
}
