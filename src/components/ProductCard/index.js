import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { formatCurrency, FilterInfoBadge } from '~/utils';
import StarRating from '../StarRating';
const cx = classNames.bind(styles);

function ProductCard({ data }) {
    // lấy thông tin object đó và gán vào biến badgesNew
    const badgesNew = FilterInfoBadge(data.badges_new);
    return (
        <Link to={`/bookdetail/${data.id}`} className={cx('wrapper')}>
            <img className={cx('img')} src={data.thumbnail_url} alt="thumbnail" />
            <div className={cx('body')}>
                <p className={cx('title')}>{data.name}</p>
                <div className={cx('actions')}>
                    <div className={cx('rating')}>
                        {data.rating_average > 4 ? <StarRating rating={5} small /> : <StarRating rating={4} small />}
                    </div>
                    <span className={cx('sold')}>
                        {!data.quantity_sold || data.quantity_sold.text == null ? '0' : data.quantity_sold.text}
                    </span>
                </div>
                <div className={cx('price')}>
                    <span className={cx('priceVND')}>{formatCurrency(data.price)}</span>
                    <sup>₫</sup>
                    <span className={cx('discount')}>-{data.discount_rate}%</span>
                </div>

                <div className={cx('delivery')}>
                    {/* nếu có badgesNew và badgesNew.text thì lấy không thì trả về default value:'giao hàng 24h' */}
                    {badgesNew && badgesNew.text != null ? badgesNew.text : 'Giao siêu tốc 24h'}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
