import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  @Output() close = new EventEmitter()

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    color: new FormControl('red')
  })

  clickCancel() {
    this.close.emit()
  }

  confirm() {
    if(this.taskForm.invalid) {
      Object.keys(this.taskForm.controls).forEach(controlName => {
        this.taskForm.get(controlName)?.markAsDirty()
      })
      return
    }

        
  }
}
