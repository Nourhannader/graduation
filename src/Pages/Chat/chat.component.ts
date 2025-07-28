import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../Services/chat.service';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
    ask:boolean=false
    _chatService=inject(ChatService);              
    chatForm: FormGroup;
    newMessage: FormControl = new FormControl('');

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      messages: this.fb.array([])
    });
  }

  get messages(): FormArray {
    return this.chatForm.get('messages') as FormArray;
  }

  sendMessage() {
    const message = this.newMessage.value?.trim();
    if (!message) return;

    // Add user message
    this.messages.push(this.fb.group({
      sender: 'user',
      message
    }));

    this.newMessage.reset();

    // Simulate AI response
    this.getAIResponse(message);
  }

  getAIResponse(userMessage: string) {
    this._chatService.getAnswer(userMessage).subscribe({
      next: (response) => {
        const aiReply = response.answer; 
        this.messages.push(this.fb.group({
          sender: 'assistant',
          message: aiReply
        }));
      },
      error: (error) => {
        console.error('Error fetching AI response:', error);
        this.messages.push(this.fb.group({
          sender: 'assistant',
          message: 'Sorry, I could not process your request.'
        }));
      }
    });

  }

    openChat(): void {
        this.ask=true
        console.log("Chat opened"); 
    }

    closeChat(): void {
        this.ask=false
        console.log("Chat closed");
    }
}
