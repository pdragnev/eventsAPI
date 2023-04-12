export interface EventData {
  //Why do we need the key here?
  [key: string]: string;
  messageID: string;
  messageHash: string;
  fileHash: string;
  dealID: string;
}
