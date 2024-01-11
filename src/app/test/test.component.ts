import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  products: any[] = [];
  editedProduct: any = {}; // Store the product being edited
  modalVisible: boolean = false;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.data;
    });
  }

  // Open the modal with the data for editing
  editProduct(product: any): void {
    this.editedProduct = { ...product }; // Create a copy to avoid modifying the original data
    console.log('Selected Product:', this.editedProduct);
    this.modalVisible = true;
  }

  // Close the modal
  closeModal(): void {
    this.modalVisible = false;
  }

  // Save changes when the form inside the modal is submitted
  saveChanges(): void {
    // Call the updateProduct method from the service
    this.productService.updateProduct(this.editedProduct.id, this.editedProduct).subscribe(() => {
      // Update the local products array or fetch the products again from the API
      // This depends on your specific requirements
      this.productService.getProducts().subscribe((data) => {
        this.products = data.data;
      });

      // Close the modal after saving changes
      this.closeModal();
    });
  }
}
