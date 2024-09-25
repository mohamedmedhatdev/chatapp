export type MessageContentType =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "image";
      content: Blob;
    };
export interface IMessage {
  senderId: number;
  id : number;
  content: MessageContentType;
  baseMsg?: IMessage;
  timeStamp: string;
  isLiked?: boolean;
}
