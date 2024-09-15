import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../HomeBook/HomeBook.module.scss';
import Header from '~/components/Header';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import StarRating from '~/components/StarRating';
import BreadCumb from '~/components/BreadCumb';
import * as productService from '~/services/ProductServices';

const cx = classNames.bind(styles);

function CategoryPage() {
    const [books, setCategoryBooks] = useState([]);
    const [checked, setChecked] = useState();
    const { categoryName } = useParams();
    const suppliersMockData = [
        { id: 53660, name: 'Nhà sách Fahasa' },
        { id: 281062, name: 'Bamboo Books' },
        { id: 127989, name: 'Time Books' },
        { id: 161219, name: 'Nhà sách trẻ online' },
        { id: 60209, name: 'VBooks' },
    ];
    useEffect(() => {
        const fetchApi = async () => {
            let result = [];
            switch (categoryName) {
                case 'sach-tieng-anh':
                    result = await productService.getEnglishBooks();
                    break;
                case 'sach-truyen-tieng-viet':
                    result = await productService.getVietnameseBooks();
                    break;
                case 'van-phong-pham':
                    result = await productService.getStationery();
                    break;
                case 'qua-luu-niem':
                    result = await productService.getSouvenirs();
                    break;
                default:
                    result = await productService.product(); // Lấy tất cả sản phẩm
                    break;
            }
            const dataBooks = result.data;
            setCategoryBooks(dataBooks);
        };
        fetchApi();
    }, [categoryName]);

    const handleSelectedChange = async (supplier) => {
        setChecked(supplier);
        const result = await productService.supplier(supplier);
        const dataBooks = result.data;
        setCategoryBooks(dataBooks);
    };
    const productListFuncPC = () => {
        const chunkArray = (arr, chunkSize) => {
            const chunkedArray = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                chunkedArray.push(arr.slice(i, i + chunkSize));
            }
            return chunkedArray;
        };
        return chunkArray(books, 5);
    };

    const productListFuncTablet = () => {
        const chunkArray = (arr, chunkSize) => {
            const chunkedArray = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                chunkedArray.push(arr.slice(i, i + chunkSize));
            }
            return chunkedArray;
        };
        return chunkArray(books, 3);
    };

    const productListPC = productListFuncPC();
    const productListTablet = productListFuncTablet();

    return (
        <div className={cx('wrapper')}>
            <Header />
            <BreadCumb name={categoryName} />
            <div className="custom-container-xxl">
                <div className={cx('content')}>
                    <div className="row">
                        <div className="col-lg-2 d-none d-lg-block">
                            <div className={cx('category')}>
                                <div className={cx('category-product')}>
                                    <h2 className={cx('title')}>Danh Mục Sản Phẩm</h2>
                                    <ul className={cx('product-list')}>
                                        <li className={cx('product')}>
                                            <Link to="/category/sach-tieng-anh">English Books</Link>
                                        </li>
                                        <li className={cx('product')}>
                                            <Link to="/category/sach-truyen-tieng-viet">Sách tiếng Việt</Link>
                                        </li>
                                        <li className={cx('product')}>
                                            <Link to="/category/van-phong-pham">Văn phòng phẩm</Link>
                                        </li>
                                        <li className={cx('product')}>
                                            <Link to="/category/qua-luu-niem">Quà lưu niệm</Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className={cx('supplier')}>
                                    <h2 className={cx('title')}>Nhà cung cấp</h2>
                                    {suppliersMockData.map((supplier, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={supplier.name}
                                                id={supplier.id}
                                                checked={checked === supplier.id}
                                                onChange={() => handleSelectedChange(supplier.id)}
                                            />
                                            <label className="form-check-label" htmlFor={supplier.id}>
                                                {supplier.name}
                                            </label>
                                        </div>
                                    ))}
                                    <span className={cx('more-btn')}>
                                        Xem thêm
                                        <FontAwesomeIcon className={cx('more-icon')} icon={faChevronDown} />
                                    </span>
                                </div>

                                <div className={cx('rating')}>
                                    <h2 className={cx('title')}>Đánh giá</h2>
                                    <div className={cx('star')}>
                                        <div className={cx('star-wrapper')}>
                                            <StarRating rating={5} large />
                                            <span>Từ 5 sao</span>
                                        </div>

                                        <div className={cx('star-wrapper')}>
                                            <StarRating rating={4} large />
                                            <span>Từ 4 sao</span>
                                        </div>
                                        <div className={cx('star-wrapper')}>
                                            <StarRating rating={3} large />
                                            <span>Từ 3 sao</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PC */}
                        <div className="col-lg-10 d-md-none d-sm-none d-none d-lg-block">
                            {productListPC.map((rowProduct, index) => (
                                <div className="row g-3 mb-3" key={index}>
                                    {rowProduct.map((result) => (
                                        <div className="col-lg-2-4" key={result.id}>
                                            <div className={cx('product-card')}>
                                                <ProductCard data={result} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Tablet */}
                        <div className="col-md-12 d-none d-lg-none d-sm-none d-md-block">
                            {productListTablet.map((rowProduct, index) => (
                                <div className="row g-3 mb-3" key={index}>
                                    {rowProduct.map((result) => (
                                        <div className="col-md-4" key={result.id}>
                                            <div className={cx('product-card')}>
                                                <ProductCard data={result} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Mobile >= 576px */}
                        <div className="col-sm-12 col-12 d-block d-sm-block d-md-none d-lg-none">
                            <div className="row g-3 mb-3">
                                {books.map((result) => (
                                    <div className="col-sm-6 col-6" key={result.id}>
                                        <div className={cx('product-card')}>
                                            <ProductCard data={result} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="custom-container-xxl">
                            <ul className={cx('pagination', 'd-xxl-flex d-xl-flex d-lg-flex d-md-none d-none')}>
                                {[1, 2, 3, 4, 5, 50].map((page) => (
                                    <li className={cx('pagination-item')} key={page}>
                                        <a href="/" className={cx('pagination-item-link', { active: page === 1 })}>
                                            {page}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CategoryPage;
