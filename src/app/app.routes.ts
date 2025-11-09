import { Routes } from '@angular/router';
import { productResolver } from './resolvers/product.resolver';
import { categoryResolver } from './resolvers/category.resolver';
import { myOrdersResolver } from './resolvers/my-order.resolver';
import { featuredResolver } from './resolvers/featured.resolver';
import { categoriesResolver } from './resolvers/categories.resolver';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./components/home/home.component')
            .then(m => m.HomeComponent),
            resolve: {
                featured: featuredResolver
            }
    }, {
        path: 'products',
        loadComponent: () =>
            import('./components/product-list/product-list.component')
            .then(m => m.ProductListComponent),
            resolve: {
                categories: categoriesResolver,
            }
    }, {
        path: 'products/:product_id/:category_id',
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
    }, {// [QuienesSomos] AGREGADO: ruta para la página de Quienes Somos
    path: 'quienes-somos',
    loadComponent: () =>
        import('./components/quienes-somos/quienes-somos.component')
        .then(m => m.QuienesSomosComponent)
    },{
        path: '**',
        loadComponent: () =>
            import('./components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    },
];