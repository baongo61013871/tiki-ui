import HomeBook from '~/pages/HomeBook';
import BookDetails from '~/pages/BookDetail';
import Cart from '~/pages/Cart';
import CategoryPage from '~/pages/CategoryPage';
// Public Routes
const publicRoutes = [
    { path: '/', component: HomeBook, books: true },
    { path: '/bookdetail/:id', component: BookDetails, books: true },
    { path: '/checkout/cart', component: Cart },
    { path: '/category/:categoryName', component: CategoryPage, books: true },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
