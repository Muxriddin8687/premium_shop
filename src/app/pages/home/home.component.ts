import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNgxMask()],
})
export class HomeComponent {
  private _http = inject(HttpClient);
  private _fb = inject(FormBuilder);
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

  getQueryParameter() {
    return window.location.search.replace('?', '\n').replaceAll('=', ': ').replaceAll('&', '\n');
  }

  send() {
    if (this.form.valid) {
      let data = "Buyurtma" +
        "\n\nIsm: " + this.form.value.name +
        "\nTel: " + this.form.value.phone +
        this.getQueryParameter();

      data = encodeURI(data);

      this._http
        .get(`${this.telegram_api}premium1shopc&text=${data}`, { 'headers': this.headers })
        .pipe(catchError((error) => {
          this.btnText = "Yana jo'natish (Aloqa yo'q!)";
          return of();
        }))
        .subscribe((res) => {
          this.form.reset();
          this.btnDisabled = true;
          this.btnText = "Raxmat, tez orada operatorlarimiz siz bilan bog'lanishadi!"
        });
    }
  }
}
