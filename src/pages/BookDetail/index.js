import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faChevronLeft,
    faEllipsis,
    faMinus,
    faPlus,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from './BookDetail.module.scss';
import Header from '~/components/Header';
import request from '~/utils/request';
import images from '~/assets/images';
import { formatCurrency } from '~/utils';
import Footer from '~/components/Footer';
import StarRating from '~/components/StarRating';

const cx = classNames.bind(styles);

function BookDetail({ books }) {
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id));
    const [bookDetailResult, setBookDetailResult] = useState({});
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isDisabled, setIsDisabled] = useState(true);
    const authIcon = bookDetailResult?.badges_new?.find((item) => {
        return item.placement === 'left_brand';
    });
    const intialPrice = useRef(0);

    useEffect(() => {
        const fetchApi = async () => {
            const getDetail = async () => {
                try {
                    const res = await request.get(`v2/products/${id}?platform=web&spid=${id}&version=3`);
                    return res.data;
                } catch (e) {
                    console.log(e);
                }
            };
            const result = await getDetail();

            setBookDetailResult(result);
            setPrice(result.price);
            intialPrice.current = result.price;
        };
        fetchApi();
    }, [id]);

    if (!book) {
        return <h2>Không tìm thấy sách!</h2>;
    }

    const updatePrice = () => {
        setPrice((prevPrice) => {
            const newPrice = prevPrice + intialPrice.current; // Tính toán giá trị mới của price

            // Nếu `newPrice` lớn hơn `intialPrice.current` và `quantity > 1`, nút sẽ không bị vô hiệu hóa
            if (newPrice >= intialPrice.current && quantity >= 1) {
                setIsDisabled(false);
            }

            return newPrice; // Trả về giá trị mới cho `price`
        });

        // Cập nhật `quantity`
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const minusPrice = () => {
        setPrice((prevPrice) => {
            if (prevPrice <= intialPrice.current) {
                return prevPrice; // Không thay đổi giá trị price
            } else {
                return prevPrice - intialPrice.current; // Cập nhật giá trị price
            }
        });
        setQuantity((prevQuantity) => {
            if (prevQuantity <= 2) {
                setIsDisabled(true);
            }
            if (prevQuantity <= 1) {
                return prevQuantity;
            } else {
                return prevQuantity - 1;
            }
        });
    };

    const handleChangeQuantity = (e) => {
        const value = Number(e.target.value);

        if (value === 1) setIsDisabled(true);
        else {
            setIsDisabled(false);
        }
        if (isNaN(value) || value === 0) {
            setQuantity('');
            setPrice(intialPrice.current);

            setIsDisabled(true);
            return;
        }
        setQuantity(value);
        setPrice(intialPrice.current * value);
    };

    return (
        <>
            <div className={cx('wrapper', 'd-xxl-block d-md-block d-lg-block d-xl-block d-none ')}>
                <Header />

                <div className="custom-container-xxl">
                    <div className={cx('main')}>
                        <div className={cx('sidebar-wrapper')}>
                            <div className={cx('sidebar')}>
                                <div className={cx('image-wrapper')}>
                                    <img className={cx('image')} src={bookDetailResult.thumbnail_url} alt="product" />
                                    <div className={cx('slider')}>
                                        <a href="#image">
                                            <img className={cx('slider-img')} src={images.slider01} alt="hello" />
                                        </a>
                                        <a href="#image">
                                            <img className={cx('slider-img')} src={images.slider02} alt="hello" />
                                        </a>
                                        <a href="#image">
                                            <img className={cx('slider-img')} src={images.slider03} alt="hello" />
                                        </a>
                                        <a href="#image">
                                            <img className={cx('slider-img')} src={images.slider04} alt="hello" />
                                        </a>

                                        <a href="#image">
                                            <img className={cx('slider-img')} src={images.slider05} alt="hello" />
                                        </a>
                                        <a href="#image">
                                            <img className={cx('slider-img')} src={images.slider06} alt="hello" />
                                        </a>
                                    </div>
                                </div>

                                <div className={cx('highlight')}>
                                    {bookDetailResult?.highlight?.items.length > 0 &&
                                        bookDetailResult?.highlight?.items && (
                                            <div className={cx('highlight-title')}>Đặc điểm nổi bật</div>
                                        )}
                                    <div className={cx('highlight-list')}>
                                        {bookDetailResult.highlight &&
                                            bookDetailResult.highlight.items &&
                                            bookDetailResult.highlight.items.map((hl) => (
                                                <div className={cx('highlight-body')}>
                                                    <img
                                                        width="16"
                                                        height="16"
                                                        src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                                                        alt="blue-check"
                                                    />
                                                    <div className={cx('highlight-info')}>{hl}</div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className={cx('summorize')}>
                                    <div className={cx('summorize-body')}>
                                        <img
                                            src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
                                            alt="icon-left"
                                            width="24"
                                            height="24"
                                        />
                                        <div className={cx('summorize-text')}>
                                            <span className={cx('more')}>Xem thêm</span>
                                            <span className={cx('summorize-content')}> Tóm tắt nội dung sách</span>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon className={cx('summorize-icon')} icon={faChevronRight} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('info')}>
                                <div className={cx('intro')}>
                                    <div className={cx('author')}>
                                        {authIcon && authIcon !== undefined ? (
                                            <img
                                                src={authIcon.icon}
                                                alt="auth-icon"
                                                width={authIcon.icon_width}
                                                height={authIcon.icon_height}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        <span className={cx('author-label')}>Tác giả:</span>
                                        <span className={cx('author-link')}>
                                            <a href="/">
                                                {bookDetailResult &&
                                                    bookDetailResult?.authors &&
                                                    bookDetailResult?.authors[0]?.name}
                                            </a>
                                        </span>
                                    </div>
                                    <h3 className={cx('title')}>{bookDetailResult.name}</h3>
                                    <div className={cx('rating')}>
                                        <div className={cx('rating-wrapper')}>
                                            <span className={cx('rating-average')}>
                                                {bookDetailResult.rating_average}
                                            </span>
                                            <span className={cx('star')}>
                                                <StarRating rating={5} large />
                                            </span>

                                            <span className={cx('review-count')}>{bookDetailResult.review_text}</span>
                                        </div>

                                        <span className={cx('sold')}>
                                            <span className={cx('separate')}></span>

                                            <span className={cx('sold-text')}>
                                                {bookDetailResult.all_time_quantity_sold <= 5000
                                                    ? `Đã bán ${bookDetailResult.all_time_quantity_sold}`
                                                    : 'Đã bán 5000+'}
                                            </span>
                                        </span>
                                    </div>
                                    <div className={cx('price')}>
                                        <span className={cx('priceVND')}>
                                            {bookDetailResult && bookDetailResult.price
                                                ? formatCurrency(bookDetailResult.price)
                                                : ''}
                                            <sup>₫</sup>
                                        </span>
                                        <span className={cx('discount')}>-{bookDetailResult.discount_rate}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info-detail')}>
                                <h4 className={cx('info-title')}> Thông tin chi tiết</h4>
                                {bookDetailResult &&
                                    bookDetailResult.specifications &&
                                    bookDetailResult.specifications.map((item) =>
                                        item.attributes.map((attribute) => (
                                            <div className={cx('detail')}>
                                                <span className={cx('detail-left')}>{attribute.name}</span>
                                                <span className={cx('detail-right')}>{attribute.value}</span>
                                            </div>
                                        )),
                                    )}
                            </div>
                            <div className={cx('description')}>
                                <h4 className={cx('info-title')}> Mô tả sản phẩm</h4>
                                <div className={cx('description-wrapper')}>
                                    <div dangerouslySetInnerHTML={{ __html: bookDetailResult.description }} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('pay-wrapper')}>
                            <div className={cx('pay')}>
                                <div className={cx('quantity-input')}>
                                    <h4 className={cx('info-title')}> Số lượng </h4>
                                    <div className={cx('group-input')}>
                                        <button
                                            className={cx('minus', {
                                                isDisabled: isDisabled,
                                            })}
                                            onClick={minusPrice}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            value={quantity}
                                            onChange={handleChangeQuantity}
                                        />
                                        <button className={cx('plus')} onClick={updatePrice}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>

                                <div className={cx('price-container')}>
                                    <h4 className={cx('info-title')}> Tạm tính </h4>

                                    <span className={cx('price-pay')}>
                                        {formatCurrency(price)}

                                        <sup>₫</sup>
                                    </span>
                                </div>

                                <div className={cx('group-button')}>
                                    <button className={cx('button', 'btn--primary')}>Mua ngay</button>
                                    <button className={cx('button', 'btn--normal')}>Thêm vào giỏ</button>
                                    <button className={cx('button', 'btn--normal')}>Mua trước trả sau</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('footer', ' d-xxl-block d-md-none d-lg-block d-xl-block')}>
                    <Footer />
                </div>
            </div>

            <div className={cx('wrapper-mobile', 'd-xxl-none d-md-none d-lg-none d-xl-none d-block ')}>
                <div className={cx('product-detail')}>
                    <header className={cx('header-detail-mobile')}>
                        <Link to="/">
                            <span className={cx('icon-boundary')}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </span>
                        </Link>

                        <div className={cx('icon-wrapper')}>
                            <span className={cx('icon-boundary', 'me-4')}>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </span>
                            <span className={cx('icon-boundary')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </span>
                        </div>
                    </header>
                    <div className={cx('img-wrapper')}>
                        <img className={cx('detail-img')} src={bookDetailResult.thumbnail_url} alt="product" />
                    </div>
                    <div className={cx('intro', 'p-4 bg-white')}>
                        <div className="d-flex flex-column gap-1">
                            <div className={cx('auth')}>
                                {authIcon && authIcon !== undefined ? (
                                    <img
                                        src={authIcon.icon}
                                        alt="auth-icon"
                                        width={authIcon.icon_width}
                                        height={authIcon.icon_height}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={cx('author')}>
                                <span className={cx('author-label', 'm-0')}>Tác giả:</span>
                                <span className={cx('author-link')}>
                                    <a href="/">
                                        {bookDetailResult &&
                                            bookDetailResult?.authors &&
                                            bookDetailResult?.authors[0]?.name}
                                    </a>
                                </span>
                            </div>
                            <h3 className={cx('title', 'fs-3 fw-normal')}>{bookDetailResult.name}</h3>
                            <div className={cx('rating', 'fs-5 d-flex align-items-center')}>
                                <div className={cx('rating-wrapper', 'fs-5')}>
                                    <span className={cx('rating-average')}>{bookDetailResult.rating_average}</span>
                                    <span className={cx('star', 'm-0')}>
                                        <StarRating rating={5} large />
                                    </span>

                                    <span className={cx('review-count', 'fs-5')}>{bookDetailResult.review_text}</span>
                                </div>

                                <span className={cx('sold', 'fs-5')}>
                                    <span className={cx('separate')}></span>

                                    <span className={cx('sold-text')}>
                                        {bookDetailResult.all_time_quantity_sold <= 5000
                                            ? `Đã bán ${bookDetailResult.all_time_quantity_sold}`
                                            : 'Đã bán 5000+'}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className={cx('price')}>
                            <span className={cx('priceVND', 'fs-2')}>
                                {bookDetailResult && bookDetailResult.price
                                    ? formatCurrency(bookDetailResult.price)
                                    : ''}
                                <sup>₫</sup>
                            </span>
                            <span className={cx('discount')}>-{bookDetailResult.discount_rate}%</span>
                        </div>
                    </div>
                    <div className={cx('highlight', 'pb-3 bg-white')}>
                        {bookDetailResult?.highlight?.items.length > 0 && bookDetailResult?.highlight?.items && (
                            <div className={cx('highlight-title', 'fs-4')}>Đặc điểm nổi bật</div>
                        )}
                        <div className={cx('highlight-list')}>
                            {bookDetailResult.highlight &&
                                bookDetailResult.highlight.items &&
                                bookDetailResult.highlight.items.map((hl) => (
                                    <div className={cx('highlight-body')}>
                                        <img
                                            width="16"
                                            height="16"
                                            src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                                            alt="blue-check"
                                        />
                                        <div className={cx('highlight-info', 'fs-5')}>{hl}</div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className={cx('summorize', 'position-static bg-white pb-4')}>
                        <div className={cx('summorize-body')}>
                            <img
                                src="https://salt.tikicdn.com/ts/ta/d3/d4/1c/1d4ee6bf8bc9c5795529ac50a6b439dd.png"
                                alt="icon-left"
                                width="24"
                                height="24"
                            />
                            <div className={cx('summorize-text')}>
                                <span className={cx('more')}>Xem thêm</span>
                                <span className={cx('summorize-content')}> Tóm tắt nội dung sách</span>
                            </div>
                        </div>
                        <FontAwesomeIcon className={cx('summorize-icon', 'fs-5')} icon={faChevronRight} />
                    </div>

                    <div className={cx('group-button', 'p-4 bg-white my-3')}>
                        <button className={cx('button', 'btn--primary', 'fs-4')}>Mua ngay không cần đăng nhập</button>
                        <button className={cx('button', 'btn--normal', 'fs-4')}>Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetail;
