import { MessageInterface } from './MessageInterface';

export interface UserInterface {
  id?: string;
  name: string;
  nameTelegram?: string | null;
  password?: string;
  chatId?: string;
  messages?: MessageInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}
