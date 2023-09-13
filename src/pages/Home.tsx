import {Card, Col, Row} from 'antd';
import React, {useState} from 'react';
import Uploader from "@/pages/Uploader";
import Result from "@/pages/Result";

const Home: React.FC = () => {
  //计算结果，每个图模体的数量
  const [results, setResults] = useState<number[]>([]);

  return (<Row>
    <Col span={8} style={{paddingRight: 4}}>
      <Card title="文件上传" style={{height: 'calc(100vh - 73px)', borderRadius: 4}}>
        <Uploader setResults={setResults}/>
      </Card>
    </Col>

    <Col span={16} style={{paddingLeft: 4}}>
      <Card title='图模体分析' bodyStyle={{width: '100%', height: 'calc(100vh - 125px)', overflow: 'auto'}} style={{height: 'calc(100vh - 73px)', borderRadius: 4}}>
        <Result results={results}/>
      </Card>
    </Col>
  </Row>);
};

export default Home;
