import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-link',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './generate-link.component.html',
  styleUrl: './generate-link.component.scss'
})
export class GenerateLinkComponent implements OnInit {
  private _fb = inject(FormBuilder);
  url = 'https://muxriddin8687.github.io/premium_shop/home?';

  myForm: FormGroup = this._fb.group({
    items: this._fb.array([])
  });

  ngOnInit(): void {
    this.addForm();
  }

  send() {
    const items = this.myForm.value.items;

    if (items.length > 0)
      items.forEach((i: { key: string; value: string }) => {
        if (i.key != null && i.value != null)
          this.url += this.fixValue(i.key) + '=' + this.fixValue(i.value) + '&';
      })
  }

  copy() {
    document.addEventListener('copy', (e: any) => {
      e.clipboardData.setData('text/plain', (this.url));
      e.preventDefault();
    });
    document.execCommand('copy');
  }

  fixValue(value: string): string {
    const text = value.trim().replaceAll(' ', '_');

    return text;
  }

  get items() {
    return this.myForm.get('items') as FormArray;
  }

  addForm() {
    const item = this._fb.group({
      key: [null, [Validators.required, Validators.minLength(2)]],
      value: [null, [Validators.required, Validators.minLength(2)]]
    });

    this.items.push(item);
  }

  removeForm(i: number) {
    this.items.removeAt(i);
  }
}
