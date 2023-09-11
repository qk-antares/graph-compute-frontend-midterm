import {Col, message, Row, Statistic} from "antd";
import React, {useEffect} from "react";
import G6 from "@antv/g6";
import {getGraphCfg, motifData} from "@/utils/exampleData";
import {useEmotionCss} from "@ant-design/use-emotion-css";

type ResultProps = {
  results: number[];//计算结果
}

const Result: React.FC<ResultProps> = ({results})=> {
  //渲染图的函数，id为容器id，后者是图的数据
  const renderGraph = (id: string, graphData: any)=>{
    const element = document.getElementById(id);
    if(!element){
      message.error('元素不存在！');
      return;
    }
    const graph = new G6.Graph(getGraphCfg(id));

    graph.data(graphData);
    graph.render();
  }

  //当页面首次渲染，渲染所有的图
  useEffect(()=>{
    for(let i = 1; i <= 6; i++){
      for(let j = 1;j <= 6;j++){
        renderGraph(`M${i}${j}`, motifData[(i-1)*6+(j-1)]);
      }
    }
  }, []);

  //一些css
  const statisticCss = useEmotionCss(()=>{
    return {
      marginLeft: 8,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      ':hover': {
        cursor: 'pointer',
      },
      '.ant-statistic-title': {
        fontFamily: 'Times New Roman',
        fontSize: 14,
        marginBottom: 0,
      }
    }
  })

  return (<>
    {
      //渲染行
      Array.from({ length: 6 }, (_, index) => index + 1).map(row => {
        return <Row key={row} style={{minWidth: 750, height: 150}}>
          {
            //渲染每个单元格
            Array.from({ length: 6 }, (_, index) => index + 1).map(col => {
              return <Col key={col} span={4} style={{border: '1px solid #8B8B8B'}}>
                <div id={`M${row}${col}`} style={{margin: '0 auto', width: '125px', height: '120px'}}></div>
                <div style={{backgroundColor: 'rgb(240,240,240)', height: 30}}>
                  <Statistic
                    className={statisticCss}
                    valueStyle={{ fontSize: 16, fontWeight: 500}}
                    title={`M(${row}, ${col})：`}
                    //值
                    value={results.length === 36 ? results[(row-1)*6+col-1] : 0}
                  />
                </div>
              </Col>
            })
          }
        </Row>
      })
    }
  </>)
}

export default Result
