export type MessageContentType =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "file";
      fileName: string;
      content: Blob;
      uri: string;
    };
export interface IMessage {
  senderId: number;
  id: number;
  content: MessageContentType;
  baseMsg?: IMessage;
  timeStamp: string;
  reaction?: string;
}
