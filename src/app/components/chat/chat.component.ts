import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SignalRService } from '@services/signal-r.service';
import { Message } from '@models/message.model';
import { UserdetailService } from '@services/userdetail.service';
import { User } from '@models/user.model';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDividerModule,
    MatListItem,
    MatList,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnDestroy, OnInit {
  @ViewChild('chatHistory') chatHistory!: ElementRef;
  public messages: Message[] = [];
  public newMessage: string = '';
  public selectedUserId: string = '';
  public selectedUser: string = '';
  public userList: User[] = [];
  public senderid!: string;
  public hubConnection = this.signalRService.getHubConnection();

  constructor(
    private signalRService: SignalRService,
    private userService: UserdetailService
  ) {}

  ngOnInit() {
    
    // Fetch users and filter out the logged-in user
    this.senderid = localStorage.getItem('UserId')!;
    this.userService.getUsers().subscribe((users) => {
      this.userList = users.filter(
        (user) => user.id.toString() !== this.senderid
      );
      console.log('Filtered Users:', this.userList);
    });

    // Establish SignalR connection
    this.signalRService
      .startConnection()
      .then(() => {
        this.hubConnection = this.signalRService.getHubConnection();

        // Handle incoming messages
        this.hubConnection.on('ReceiveMessage', (Id, message) => {
          console.log('Received Message:', Id, message);
          this.messagePush(Id, this.selectedUserId, message);
          this.scrollToBottom();
        });

        // Handle chat history
        this.hubConnection.on('ReceiveChatHistory', (history) => {
          this.messages = history;
          console.log('Chat History:', history);
        });
      })
      .catch((err) => console.error('Error starting connection:', err));
  }

  ngOnDestroy() {
    this.hubConnection.stop();
  }

  // Select a user from the list
  selectUser(userId: string) {
    this.selectedUserId = userId;
    this.selectedUser =
      this.userList.find((user) => user.id.toString() === userId)?.firstName ||
      '';
    this.getChatHistory(userId);
    this.scrollToBottom();
  }

  deselectUser() {
    this.selectedUserId = '';
    this.selectedUser = '';
  }

  // Scroll to the bottom of the chat history
  private scrollToBottom() {
    setTimeout(() => {
      this.chatHistory.nativeElement.scrollTop =
        this.chatHistory.nativeElement.scrollHeight;
    }, 100);
  }

  // Push a new message to the messages array
  private messagePush(senderId: string, recipientId: string, message: string) {
    this.messages.push({
      id: '',
      senderId: senderId,
      recipientId: recipientId,
      message: message,
      timestamp: new Date(),
    });
  }

  // Send a new message
  sendMessage() {
    if (this.selectedUserId && this.newMessage) {
      this.signalRService.sendMessage(
        this.senderid,
        this.selectedUserId,
        this.newMessage.trim()
      );
      this.messagePush(this.senderid, this.selectedUserId, this.newMessage.trim());
      this.newMessage = ''; // Clear the input field
      this.scrollToBottom();
    }
  }

  // Fetch chat history for the selected user
  getChatHistory(userId: string) {
    this.selectedUser =
      this.userList.find((user) => user.id.toString() === userId)?.firstName ||
      '';
    this.signalRService.getChatHistory(userId, this.senderid);
  }
}
