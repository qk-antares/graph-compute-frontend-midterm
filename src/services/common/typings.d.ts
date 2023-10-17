declare namespace Common {
  type R = {
    code?: number;
    msg?: string;
    data?: any;
  }
}

declare namespace Graph {
  type Node = {
    id: string;
    label: string;
    style?: any;
  };

  type Edge = {
    source: string;
    target: string;
    style?: any;
  };

  type GraphData = {
    nodes: Node[];
    edges: Edge[];
  };
}
