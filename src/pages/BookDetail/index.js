import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './BookDetail.module.scss';
import Header from '~/components/Header';
import request from '~/utils/request';
import images from '~/assets/images';
import { formatCurrency } from '~/utils';
import Footer from '~/components/Footer';
import BreadCumb from '~/components/BreadCumb';

const cx = classNames.bind(styles);

function BookDetail({ books }) {
    const [bookDetailResult, setBookDetailResult] = useState({});
    const { id } = useParams();
    const book = books.find((b) => b.id === parseInt(id));
    const authIcon = bookDetailResult?.badges_new?.find((item) => {
        return item.placement === 'left_brand';
    });

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
        };
        fetchApi();
    }, [id]);

    if (!book) {
        return <h2>Không tìm thấy sách!</h2>;
    }
    console.log('checkbook', book);
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('custom-container')}>
                <BreadCumb />

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
                                <div className={cx('highlight-title')}>Đặc điểm nổi bật</div>
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
                                        <span className={cx('rating-average')}>{bookDetailResult.rating_average}</span>
                                        <span className={cx('star')}>
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('star-gold')} icon={faStar} />
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
                                    <button className={cx('minus')}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <input className={cx('input')} type="text" value={1} />
                                    <button className={cx('plus')}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>

                            <div className={cx('price-container')}>
                                <h4 className={cx('info-title')}> Tạm tính </h4>

                                <span className={cx('price-pay')}>
                                    {bookDetailResult && bookDetailResult.price
                                        ? formatCurrency(bookDetailResult.price)
                                        : ''}
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

            <Footer />
        </div>
    );
}

export default BookDetail;
