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
    this.aiService.getDiagnostic(this.responses).subscribe({
      next: (result) => {
        this.dialogRef.close(result);
      },
      error: (error) => {
        console.error('Error:', error);
        this.dialogRef.close(null);
      }
    });
  }
}