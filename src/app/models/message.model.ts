export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: Date;
}
