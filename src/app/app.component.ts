import { Component, signal, effect, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signal-example-angular17';

  // Signal
  theme = signal('light');
  label = this.theme();

  // Calculated signal
  price = 19;
  quantity = signal(10);
  totalPrice = computed(() => this.price * this.quantity());

  constructor() {
    console.log('constructor run');
    effect(() => {
      console.log('effect run');
      this.label = this.theme();
      document.body.className = this.theme();
    });
  }

  ngOnInit() {
    console.log('ngOnInit run');
    // this.theme.set('dark');
    // this.theme.set(this.theme === 'light' ? 'dark' : 'light);
    // document.body.className = this.theme();
  }

  ngOnChnage() {
    console.log('ngOnChnage run');
  }

  toggleDarkMode() {
    this.theme.update((currentValue) =>
      currentValue === 'light' ? 'dark' : 'light'
    );
  }

  changeQuantity(event: Event) {
    this.quantity.set((event.target as HTMLInputElement).valueAsNumber);
  }
}
