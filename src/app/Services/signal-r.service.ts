// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public startConnection(): Promise<void> {
    var senderid = localStorage.getItem('UserId')!;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7088/chatHub?userId=${senderid}`)
      .build();

    // Return the promise from start
    return this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => {
        console.error('Error while starting connection: ' + err);
        throw err;
      });
  }

  public getHubConnection() {
    return this.hubConnection;
  }

  public sendMessage(senderid: string, recipientId: string, message: string) {
    console.log('sendmessage works');
    this.hubConnection
      .invoke('SendMessage', senderid, recipientId, message)
      .catch((err) => console.error(err));
  }

  public getChatHistory(userId: string, senderId: string) {
    return this.hubConnection
      .invoke('GetChatHistory', userId, senderId)
      .catch((err) => console.error(err));
  }
}
