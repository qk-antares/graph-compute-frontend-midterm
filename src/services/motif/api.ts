import {request} from "@@/exports";

/** 计算36个模体的数量 POST */
export async function motifCompute(fileContent: any, options?: { [key: string]: any }) {
  return request<Common.R>('/motif/compute', {
    method: 'POST',
    data: fileContent,
    headers: {
      'Content-Type': 'text/plain',
    },
    ...(options || {}),
  });
}
