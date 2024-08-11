import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import * as productService from '~/services/ProductServices';
import { useEffect, useState } from 'react';
function App() {
    const [productResult, setProductResult] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.product();
            setProductResult(result.data);
        };
        fetchApi();
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        if (route.books) {
                            return <Route key={index} path={route.path} element={<Page books={productResult} />} />;
                        }
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
