import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxMaskDirective, ReactiveFormsModule, JsonPipe, HttpClientModule],
  providers: [provideNgxMask()]
})
export class AppComponent {
  _htpp = inject(HttpClient);
  _fb = inject(FormBuilder);
  title = 'Premium Shop';
  btnText = "Jo'natish";
  btnDisabled = false;
  private telegram_api = environment.telegram_api;

  private headers = new HttpHeaders()
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin', '*');

  form = this._fb.group({
    name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    phone: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(20)]]
  });

  send() {
    if (this.form.valid) {
      let data = "Buyurtma" +
        "\n\nIsm: " + this.form.value.name +
        "\nTel: " + this.form.value.phone;

      data = encodeURI(data);

      this._htpp
        .get(`${this.telegram_api}+z7dGgdSiqg9kYWEy&text=${data}`, { 'headers': this.headers })
        .pipe(catchError((error) => {
          console.log(error);

          this.btnText = "Yana jo'natish (Aloqa yo'q!)";
          return of();
        }))
        .subscribe((res) => {
          console.log(res);

          this.form.reset();
          this.btnDisabled = true;
          this.btnText = "Raxmat, tez orada operatorlarimiz siz bilan bog'lanishadi!"
        });
    }
  }
}
