import {request} from "@@/exports";

/** 计算两个图的相似度 POST */
export async function gedCompute(graphPair: Ged.GedComputeRequest, options?: { [key: string]: any }) {
  return request<Common.R>('/ged/compute', {
    method: 'POST',
    data: graphPair,
    ...(options || {}),
  });
}