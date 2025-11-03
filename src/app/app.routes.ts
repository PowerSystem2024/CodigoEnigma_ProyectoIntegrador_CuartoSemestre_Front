import { Routes } from '@angular/router';
import { productsResolver } from './resolvers/products.resolver';
import { productResolver } from './resolvers/product.resolver';
import { categoryResolver } from './resolvers/category.resolver';
import { myOrdersResolver } from './resolvers/my-order.resolver';

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
        path: 'products/:product_id',
        loadComponent: () =>
            import('./components/product-details/product-details.component')
            .then(m => m.ProductDetailsComponent),
            resolve: {
                product: productResolver,
                category: categoryResolver,
            }
    }, {
        path: 'my-orders',
        loadComponent: () =>
            import('./components/my-orders/my-orders.component')
            .then(m => m.MyOrdersComponent),
            resolve: {
                orders: myOrdersResolver
            }
    }, {
        path: '**',
        loadComponent: () =>
            import('./components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    },
];
