import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AiDiagnosticService } from '../../service/ai-diagnostic.service';

@Component({
  selector: 'app-ai-diagnostic-dialog',
  templateUrl: './ai-diagnostic-dialog.component.html',
  styleUrls: ['./ai-diagnostic-dialog.component.css']
})
export class AiDiagnosticDialogComponent {
  currentQuestionIndex = 0;
  currentResponse = '';
  isLoading = false;
  errorMessage: string | null = null;
  analysis: string | null = null;
  
  responses: { [key: string]: string } = {};
  questions = [
    "Can you describe the problem you're experiencing with your car?",
    "When did the issue first start happening?",
    "Does the problem occur consistently or only in certain conditions?",
    "Have you noticed any unusual sounds, smells, or vibrations?",
    "Have there been any recent changes in the car's performance?"
  ];

  constructor(
    private dialogRef: MatDialogRef<AiDiagnosticDialogComponent>,
    private aiService: AiDiagnosticService
  ) {}

  nextQuestion(response: string) {
    if (response.trim()) {
      this.responses[this.questions[this.currentQuestionIndex]] = response;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentResponse = '';
      } else {
        this.submitDiagnosis();
      }
    }
  }

  submitDiagnosis() {
    this.isLoading = true;
    this.errorMessage = null;
    
    if (Object.keys(this.responses).length === 0) {
      this.errorMessage = 'Please answer at least one question';
      this.isLoading = false;
      return;
    }
    
    console.log('Submitting responses:', this.responses);
    
    this.aiService.getDiagnostic(this.responses).subscribe({
      next: (result) => {
        console.log('Received response:', result);
        this.isLoading = false;
        if (result.success) {
          this.analysis = result.analysis;
        } else {
          this.errorMessage = result.errorMessage || 'An error occurred during diagnosis';
        }
      },
      error: (error) => {
        console.error('Error details:', error);
        this.isLoading = false;
        if (error.status === 0) {
          this.errorMessage = 'Cannot connect to the server. Please ensure both backend services are running.';
        } else {
          this.errorMessage = `Error: ${error.message || 'Unknown error occurred'}`;
        }
      }
    });
  }
}