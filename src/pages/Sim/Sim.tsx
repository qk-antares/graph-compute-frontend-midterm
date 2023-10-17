import React, {useState} from "react";
import {Card, Col, Row} from "antd";
import Uploader from "@/pages/Sim/Uploader";
import Result from "@/pages/Sim/Result";

const Sim: React.FC = ()=>{
  const [result, setResult] = useState<Sim.SimResult>();
  const [graph1, setGraph1] = useState<Graph.GraphData>()
  const [graph2, setGraph2] = useState<Graph.GraphData>()

  return (<Row>
    <Col span={8} style={{paddingRight: 4}}>
      <Card title="文件上传" bodyStyle={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 125px)', overflow: 'auto'}} style={{height: 'calc(100vh - 73px)', borderRadius: 4}}>
        <Uploader setResult={setResult} setGraph1={setGraph1} setGraph2={setGraph2}/>
      </Card>
    </Col>

    <Col span={16} style={{paddingLeft: 4}}>
      <Card title='图相似度计算' bodyStyle={{display: 'flex', flexDirection: 'column', height: 'calc(100vh - 125px)', overflow: 'auto'}} style={{height: 'calc(100vh - 73px)', borderRadius: 4}}>
        <Result result={result} graph1={graph1} graph2={graph2}/>
      </Card>
    </Col>
  </Row>);
}

export default Sim