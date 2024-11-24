import { Component, signal, effect, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signal-example-angular17';

  // Signal
  theme = signal('light');
  label = this.theme();

  // Computed signal
  price = 19;
  quantity = signal(10);
  totalPrice = computed(() => this.price * this.quantity());

  // Signal usecase with Computed signal
  products = signal([
    { id: 1, name: 'Milk', price: 1.45 },
    { id: 2, name: 'Bread', price: 2.9 },
    { id: 3, name: 'Chicken', price: 3.25 },
  ]);
  filterName = signal('');
  filteredProducts = computed(() => {
    return this.products().filter((product) =>
      product.name.toLowerCase().includes(this.filterName().toLowerCase())
    );
  });

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

  changeFilter(event: Event) {
    let newFilterName = (event.target as HTMLInputElement).value;
    this.filterName.set(newFilterName);
  }
}
