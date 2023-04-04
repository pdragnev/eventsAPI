export interface EventData {
  //Why do we need the key here?
  [key: string]: string;
  dealId: string;
  fileId: string;
  fileHash: string;
}
