import { Routes } from '@angular/router';
import { productsResolver } from './resolvers/products.resolver';
import { productResolver } from './resolvers/product.resolver';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./components/home/home.component')
            .then(m => m.HomeComponent)
    }, {
        path: 'products',
        loadComponent: () =>
            import('./components/product-list/product-list.component')
            .then(m => m.ProductListComponent),
            resolve: {
                products: productsResolver
            }
    }, {
        path: 'products/:id',
        loadComponent: () =>
            import('./components/product-details/product-details.component')
            .then(m => m.ProductDetailsComponent),
            resolve: {
                product: productResolver
            }
    }, {
        path: 'my-order',
        loadComponent: () =>
            import('./components/my-order/my-order.component')
            .then(m => m.MyOrderComponent)
    }, {
        path: '**',
        loadComponent: () =>
            import('./components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    },
];
