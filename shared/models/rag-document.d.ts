export interface IRAGDocument {
  _id: string;

  content: string;
  embedding: number[];
  metadata: {
    source: string;
    [key: string]: any;
  };
}
