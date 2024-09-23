import { IMessage } from "./message.model";
import { IUser } from "./user.model";

export interface IChat {
  chatId: number;
  recipiant: IUser;
  messages: IMessage[];
}
