import { FileAddOutlined } from '@ant-design/icons';
import {Alert, Button, message, notification, UploadProps} from 'antd';
import React, {useState} from 'react';
import Dragger from "antd/es/upload/Dragger";
import {downloadCaseData} from "@/utils/exampleData";
import {motifCompute} from "@/services/motif/api";

type UploaderProps = {
  setResults:  React.Dispatch<React.SetStateAction<number[]>>;
}

const Uploader: React.FC<UploaderProps> = ({setResults}) => {
  const [api, contextHolder] = notification.useNotification();
  const [fileContent, setFileContent] = useState<any>(null);

  const props: UploadProps = {
    accept: '.txt',
    multiple: false,
    maxCount: 1,
    name: 'file',
    beforeUpload: (file) => {
      try {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const content = e.target?.result;
          setFileContent(content);
          console.log('文件内容:', content);
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

  //todo: 执行图模体的分析，后续这里请求后端或在前端写逻辑
  const analysis = async () => {
    api.info({
      message: `读取文件成功`,
      description: fileContent,
      placement: 'topRight',
    });

    motifCompute(fileContent.toString()).then(res => {
      setResults(res.data);
    })
    //假设计算结果是1，2，3...
    //setResults(Array.from({ length: 36 }, (_, index) => index + 1));
  }

  return (
    <>
      {contextHolder}
      <Alert
        description={<>
          <div>
            TXT 文件规范：点边数据必须放在同一个 JSON 文件中上传，nodes 表示点的集合，edges 表示边的集合
          </div>
          <Button style={{marginTop:4, float: 'right'}} size="small" type="primary" onClick={()=>downloadCaseData()}>
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
          点击或将数据文件拖拽到这里上传，支持TXT格式
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
