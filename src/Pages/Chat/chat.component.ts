import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../Services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
    ask:boolean=false
    _chatService=inject(ChatService);              


    // /////////////////

  chatForm: FormGroup;
  messages: { sender: 'user' | 'bot', text: string }[] = [];

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      userInput: ['']
    });
  }


  sendMessage() {
    const userText = this.chatForm.value.userInput;
    if (!userText) return;

    this.messages.push({ sender: 'user', text: userText });
    this.chatForm.reset();

    // Simulate API response
    this._chatService.getAnswer(userText).subscribe({
      next: (response) => {

        this.messages.push({ sender: 'bot', text: response.answer });
        console.log('AI response:', response.answer);
        this.chatForm.patchValue({ userInput: '' }); // Clear input after response
      }
        ,
        error: (error) => {
            console.error('Error fetching AI response:', error);
            this.messages.push({ sender: 'bot', text: 'Sorry, I could not process your request.' });
            }
    });
  }

   openChat(): void {
        this.ask=true
        console.log("Chat opened"); 
         if (this.messages.length === 0) {
    this.messages.push({ sender: 'bot', text: 'How can I help you?' });
  }
        
    }

    closeChat(): void {
  this.ask = false;
  this.messages = []; 
  console.log("Chat closed");
}
}
