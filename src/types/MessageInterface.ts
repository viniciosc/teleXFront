import { UserInterface } from './UserInterface';

export interface MessageInterface {
  id?: string;
  message: string;
  name?: string;
  user?: UserInterface;
  createdAt?: Date;
  updatedAt?: Date;
}
