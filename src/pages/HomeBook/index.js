import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './HomeBook.module.scss';
import Header from '~/components/Header';
import ProductCard from '~/components/ProductCard';
import Footer from '~/components/Footer';
import BreadCumb from '~/components/BreadCumb';
const cx = classNames.bind(styles);
function Home({ books }) {
    const productListFunc = useCallback(() => {
        const chunkArray = (arr, chunkSize) => {
            const chunkedArray = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                chunkedArray.push(arr.slice(i, i + chunkSize));
            }
            return chunkedArray;
        };
        return chunkArray(books, 5);
    }, [books]);

    const productList = productListFunc();
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className="container">
                <BreadCumb />
                <div className={cx('content')}>
                    <div className="row">
                        <div className="col-lg-2">
                            <div className={cx('category')}>
                                <div className={cx('category-product')}>
                                    <h2 className={cx('title')}>Danh Mục Sản Phẩm</h2>
                                    <ul className={cx('product-list')}>
                                        <li className={cx('product')}>
                                            <a href="/">English Books</a>
                                        </li>
                                        <li className={cx('product')}>
                                            <a href="/">Sách tiếng Việt</a>
                                        </li>
                                        <li className={cx('product')}>
                                            <a href="/">Văn phòng phẩm</a>
                                        </li>
                                        <li className={cx('product')}>
                                            <a href="/">Quà lưu niệm</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('supplier')}>
                                    <h2 className={cx('title')}>Nhà cung cấp</h2>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="Fahasa" />
                                        <label className="form-check-label" for="Fahasa">
                                            Nhà sách Fahasa
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="bamboo" />
                                        <label className="form-check-label" for="bamboo">
                                            Bamboo Books
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="time" />
                                        <label className="form-check-label" for="time">
                                            Time Books
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="youngbooks" />
                                        <label className="form-check-label" for="youngbooks">
                                            Nhà sách trẻ online
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="vbooks" />
                                        <label className="form-check-label" for="vbooks">
                                            VBooks
                                        </label>
                                    </div>

                                    <span className={cx('more-btn')}>
                                        Xem thêm
                                        <FontAwesomeIcon className={cx('more-icon')} icon={faChevronDown} />
                                    </span>
                                </div>

                                <div className={cx('rating')}>
                                    <h2 className={cx('title')}>Đánh giá</h2>
                                    <div className={cx('rating-wrapper')}>
                                        <div className={cx('star')}>
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <span>từ 5 sao</span>
                                        </div>
                                        <div className={cx('star')}>
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-normal')} icon={faStar} />
                                            <span>từ 4 sao</span>
                                        </div>
                                        <div className={cx('star')}>
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-normal')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-normal')} icon={faStar} />
                                            <span>từ 3 sao</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            {productList.map((rowProduct) => (
                                <div className="row g-3 mb-3">
                                    {rowProduct.map((result) => (
                                        <div className="col-lg-2-4">
                                            <div className={cx('product-card')}>
                                                <ProductCard key={result.id} data={result} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <ul className={cx('pagination')}>
                                <li className={cx('pagination-item')}>
                                    <a href="/" className={cx('pagination-item-link', 'active')}>
                                        1
                                    </a>
                                </li>

                                <li className={cx('pagination-item')}>
                                    <a href="/" className={cx('pagination-item-link')}>
                                        2
                                    </a>
                                </li>

                                <li className={cx('pagination-item')}>
                                    <a href="/" className={cx('pagination-item-link')}>
                                        3
                                    </a>
                                </li>

                                <li className={cx('pagination-item')}>
                                    <a href="/" className={cx('pagination-item-link')}>
                                        4
                                    </a>
                                </li>

                                <li className={cx('pagination-item')}>
                                    <a href="/" className={cx('pagination-item-link')}>
                                        5
                                    </a>
                                </li>

                                <li className={cx('pagination-item')}>
                                    <a href="/" className={cx('pagination-item-link')}>
                                        50
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Home;
