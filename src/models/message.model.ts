export type MessageContentType = {
    type : "text",
    content : string;
} | {
    type : "image",
    content : Blob;
}
export interface IMessage {
    senderId : string;
    content : MessageContentType;
    timeStamp: Date;
}