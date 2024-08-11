import classNames from 'classnames/bind';
import styles from './BreadCumb.module.scss';
const cx = classNames.bind(styles);

function BreadCumb() {
    return (
        <div className={cx('breadcumb')}>
            <a className={cx('breadcumb-item')} href="/">
                <span>Trang chủ</span>
            </a>
            <span className={cx('icon-next')}>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#808089"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L6.35355 5.64645C6.54882 5.84171 6.54882 6.15829 6.35355 6.35355L1.35355 11.3536C1.15829 11.5488 0.841709 11.5488 0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464L5.29289 6L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                    ></path>
                </svg>
            </span>
            <a className={cx('breadcumb-item')} href="/">
                <span>Nhà sách Tiki</span>
            </a>
        </div>
    );
}

export default BreadCumb;
