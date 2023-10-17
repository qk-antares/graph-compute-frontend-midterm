import {Card, Col, Row} from "antd";
import React, {useEffect, useState} from "react";
import styles from './styles.less'
import {IconFont} from "@/utils/iconUtil";
import {Graph} from "@antv/g6";
import {renderGraph} from "@/utils/graphRender";

type ResultProps = {
  result: Sim.SimResult | undefined;//计算结果
  graph1: Graph.GraphData | undefined;
  graph2: Graph.GraphData | undefined;
}

const Result: React.FC<ResultProps> = ({result, graph1, graph2})=> {
  const [g1, setG1] = useState<Graph>();
  const [g2, setG2] = useState<Graph>();

  //当页面首次渲染，渲染所有的图
  useEffect(()=>{
    if(graph1 && graph2){
      console.log(graph1)

      renderGraph('graph1', undefined, 270, graph1, 'radial', false, 100, 100,1.5, g1, setG1)
      renderGraph('graph2', undefined, 270, graph2, 'radial', false, 100, 100, 1.5,g2, setG2)
    }
  }, [graph1, graph2]);


  return (
    <>
      <Row>
        <Col span={12}>
          <div className={styles.graph1}
            style={!graph1 ? {background: 'linear-gradient(180deg,transparent,rgba(0,0,0,.3) 99.32%)'} : undefined}>
            <div id='graph1' className={styles.graphContainer}>
              {
                !graph1 &&
                <div className={styles.empty}>
                  <IconFont className={styles.icon} type='icon-graphql'/>
                  <div>请先上传数据</div>
                </div>
              }
            </div>
            <div className={styles.bottomBox}>图A</div>
          </div>
        </Col>

        <Col span={12}>
          <div className={styles.graph2}
               style={!graph2 ? {background: 'linear-gradient(180deg,transparent,rgba(0,0,0,.3) 99.32%)'} : undefined}>
            <div id='graph2' className={styles.graphContainer}>
              {
                !graph1 &&
                <div className={styles.empty}>
                  <IconFont className={styles.icon} type='icon-graphql'/>
                  <div>请先上传数据</div>
                </div>
              }
            </div>
            <div className={styles.bottomBox}>图B</div>
          </div>
        </Col>
      </Row>

      <Card bodyStyle={{padding: 20}} style={{marginTop: 16, borderRadius: 0}}>
        <h3 style={{fontSize: 14, fontWeight: 700, padding: 0, marginBottom: 16}}>计算结果信息</h3>

        <Row style={{padding: '6px 0'}}>
          <Col span={12}>
            <Row>
              <Col style={{fontSize: 13, color: 'rgba(0,0,0,.4)'}} flex='80px'>
                相似度分数
              </Col>
              <Col style={{fontSize: 13, color: 'rgba(0,0,0,.9)'}} flex='auto'>
                {result?.simScore || '-'}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col style={{fontSize: 13, color: 'rgba(0,0,0,.4)'}} flex='80px'>
                计算耗时
              </Col>
              <Col style={{fontSize: 13, color: 'rgba(0,0,0,.9)'}} flex='auto'>
                {result ? result.timeUse*1000 : '-'} ms
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
)
}

export default Result
