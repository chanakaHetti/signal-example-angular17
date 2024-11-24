import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products = input.required<Product[]>(); // this input works as same as the signal. so can be used to cumputed signal too
  filteredProduct = computed(() => {
    return this.products().filter((product) =>
      product.name.toLocaleLowerCase().includes('milk')
    );
  });
}
