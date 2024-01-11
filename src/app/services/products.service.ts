import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Adjust the port if needed

  constructor(private http: HttpClient) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getProducts(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/products`)
      .pipe(map((response) => response))
      .pipe(catchError(this.handleError));
  }

  getProduct(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/products/${id}`)
      .pipe(map((response) => response))
      .pipe(catchError(this.handleError));
  }

  createProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(`${this.apiUrl}/products`, product, { headers })
      .pipe(map((response) => response))
      .pipe(catchError(this.handleError));
  }

  updateProduct(id: number, product: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put(`${this.apiUrl}/products/${id}`, product, { headers })
      .pipe(map((response) => response))
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/products/${id}`)
      .pipe(map((response) => response))
      .pipe(catchError(this.handleError));
  }
}
