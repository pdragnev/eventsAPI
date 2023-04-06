export interface EventData {
  //Why do we need the key here?
  [key: string]: string;
  dealID: string;
  fileID: string;
  fileHash: string;
}
