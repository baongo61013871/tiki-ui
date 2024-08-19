import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars, faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import BreadCumb from '../BreadCumb';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Header() {
    return (
        <div>
            <div className={cx('wrapper', 'd-none d-lg-block d-md-block')}>
                <div className="custom-container-xxl container-xl">
                    <div className={cx('inner')}>
                        <div className={cx('logo')}>
                            <Link to="/">
                                <img className={cx('img-logo')} src={images.logo} alt="tiki"></img>
                            </Link>
                        </div>
                        <div className={cx('search', 'd-lg-flex d-md-flex d-xl-flex d-xxl-flex')}>
                            <img src={images.search} alt="search" />
                            <input className={cx('search-input')} placeholder="Bạn mua gì hôm nay" />
                            <button className={cx('search-btn')}>Tìm kiếm</button>
                        </div>

                        {/* PC */}
                        <div className={cx('actions', 'd-md-none d-lg-flex d-xl-flex d-xxl-flex')}>
                            <div className={cx('actions-wrapper')}>
                                <Link className={cx('actions-btn')} to="/">
                                    <img src={images.home} alt="home" />
                                    <span>Trang chủ</span>
                                </Link>
                                <Link className={cx('actions-btn')} to="/account">
                                    <img src={images.account} alt="home" />
                                    <span>Tài khoản</span>
                                </Link>
                            </div>
                            <span className={cx('separate-cart')}></span>
                            <div className={cx('cart-wrapper')}>
                                <img src={images.cart} alt="cart" />
                                <span className={cx('order-quantity')}>0</span>
                            </div>
                        </div>
                        {/* tablet <990px */}

                        <div className={cx('actions-tablet-mini', 'd-xl-none d-md-flex d-lg-none d-xxl-none')}>
                            <div className={cx('cart-wrapper-md', 'd-md-flex d-lg-none')}>
                                <img src={images.cart} alt="cart" />
                                <span className={cx('order-quantity')}>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* mobile */}
            <div className={cx('container', ' d-lg-none d-md-none d-sm-flex')}>
                <div className={cx('inner-mobile')}>
                    <div className={cx('icon')}>
                        <span className={cx('icon-left')}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </span>

                        <span className={cx('icon-bars')}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </div>

                    <div className={cx('search-mobile')}>
                        <span className={cx('search-btn-mobile')}>
                            <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} />
                        </span>
                        <input className={cx('input')} placeholder="Bạn đang tìm kiếm gì" />
                    </div>

                    <span className={cx('cart')}>
                        <span className={cx('order-quantity')}>0</span>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                </div>
            </div>

            <BreadCumb />
        </div>
    );
}

export default Header;
