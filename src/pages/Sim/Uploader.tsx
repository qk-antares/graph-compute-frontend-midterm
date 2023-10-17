import {FileAddOutlined} from '@ant-design/icons';
import {Alert, Button, message, UploadProps} from 'antd';
import React, {useState} from 'react';
import Dragger from "antd/es/upload/Dragger";
import {downloadCaseData} from "@/utils/exampleData";
import {simCompute} from "@/services/sim/api";

type UploaderProps = {
  setResult: React.Dispatch<React.SetStateAction<Sim.SimResult | undefined>>;
  setGraph1: React.Dispatch<React.SetStateAction<Graph.GraphData | undefined>>;
  setGraph2: React.Dispatch<React.SetStateAction<Graph.GraphData | undefined>>;
}

const Uploader: React.FC<UploaderProps> = ({setResult, setGraph1, setGraph2}) => {
  //文件上传到后端的路径
  const [fileContent, setFileContent] = useState<any>(null);

  //数据格式转换，用于可视化图
  const dataConverter = (graph: string[][], labels: string[]) => {
    const nodes = labels.map((label, index) =>
      ({id: index.toString(), label: label.toString()}));
    const edges = graph.map(([source, target]) =>
      ({source: source.toString(), target: target.toString()}));
    return {nodes, edges}
  }

  const props: UploadProps = {
    accept: '.json',
    multiple: false,
    maxCount: 1,
    name: 'file',
    beforeUpload: (file) => {
      try {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const result = e.target?.result;
          if(typeof result === 'string'){
            const json = JSON.parse(result);
            setFileContent(json);
            console.log('文件内容:', json);

            const {graph_1, labels_1, graph_2, labels_2} = json;
            setGraph1(dataConverter(graph_1, labels_1));
            setGraph2(dataConverter(graph_2, labels_2));
          }
        };
        fileReader.readAsText(file);
      } catch (error) {
        message.error('文件读取失败');
      }
      return false;
    },
    onRemove: ()=>{
      setFileContent(null);
    }
  };

  const analysis = async () => {
    simCompute(fileContent).then(res => {
      console.log(res);
      setResult(res.data);
    })
  }

  return (
    <>
      <Alert
        description={<>
          <div>
            JSON 文件规范：图对数据必须放在同一个 JSON 文件中上传，labels_1 和 graph_1 代表图A节点的标签集合和连接关系，labels_2 和 graph_2 同理
          </div>
          <Button style={{marginTop:4, float: 'right'}} size="small" type="primary" onClick={()=>downloadCaseData('example-data1.json')}>
            下载示例数据
          </Button>
        </>}
        type="info"
        showIcon
        closable
      />
      <h4 style={{ marginTop: 10 }}>上传数据</h4>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <FileAddOutlined />
        </p>
        <p className="ant-upload-hint">
          点击或将数据文件拖拽到这里上传，支持JSON格式
        </p>
      </Dragger>

      <div style={{ padding: '30px 0px 10px', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={analysis} type="primary" shape="round" disabled={!fileContent}>
          执行分析
        </Button>
      </div>
    </>
  );
};

export default Uploader;
