import classNames from 'classnames/bind';
import styles from './StarRating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function StarRating({ rating, small = false, large = false }) {
    const maxStars = 5;
    const classes = cx('wrapper', {
        small,
        large,
    });
    return (
        <div className={classes}>
            {[...Array(maxStars)].map((_, index) => (
                <FontAwesomeIcon
                    key={index}
                    className={cx(index < rating ? 'star-gold' : 'star-normal')}
                    icon={faStar}
                />
            ))}
        </div>
    );
}

export default StarRating;