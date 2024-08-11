import HomeBook from '~/pages/HomeBook';
import BookDetails from '~/pages/BookDetail';
import Question from '~/pages/Question';
// Public Routes
const publicRoutes = [
    { path: '/', component: HomeBook, books: true },
    { path: '/bookdetail/:id', component: BookDetails, books: true },
    { path: '/question', component: Question },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
