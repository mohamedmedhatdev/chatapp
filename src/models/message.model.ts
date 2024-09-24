export type MessageContentType = {
    type : "text",
    content : string;
} | {
    type : "image",
    content : Blob;
}
export interface IMessage {
    senderId : number;
    content : MessageContentType;
    baseMsg? : IMessage;
    timeStamp: string;
}