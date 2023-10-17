import {request} from "@@/exports";

/** 计算两个图的相似度 POST */
export async function simCompute(fileJson: any, options?: { [key: string]: any }) {
  return request<Common.R>('/sim/compute', {
    method: 'POST',
    data: fileJson,
    ...(options || {}),
  });
}