import { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars, faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import Fuse from 'fuse.js';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import { BookContext } from '~/App';
import BreadCumb from '../BreadCumb';
import images from '~/assets/images';
import NavBar from '~/components/NavBar';
const cx = classNames.bind(styles);

function Header() {
    const books = useContext(BookContext);
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState(books);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1); // Vị trí mục đang được chọn
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const fuseOptions = {
        keys: ['name'], // Các trường tìm kiếm
        threshold: 0.3, // Ngưỡng tìm kiếm mờ (0.0 chính xác, 1.0 tìm kiếm rất mờ)
    };

    useEffect(() => {
        if (selectedIndex !== -1 && resultsRef.current[selectedIndex]) {
            resultsRef.current[selectedIndex].scrollIntoView({ block: 'nearest' }); // Cuộn tới mục đang được chọn
        }
    }, [selectedIndex]);
    const resultsRef = useRef([]); // Tham chiếu tới các item trong danh sách tìm kiếm
    const inputRef = useRef(null); // Tham chiếu tới input tìm kiếm
    const fuse = new Fuse(books, fuseOptions);

    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        const searchResults = fuse.search(searchValue).map((result) => result.item);

        if (searchResults) {
            setResults(searchResults);
        }
    };

    const handleHideResult = () => {
        setResults([]);
        setIsVisible(false);
    };

    const handleFocus = () => {
        setShowOverlay(true); // Hiển thị overlay khi focus vào input
        setResults(books);
        setIsVisible(true);
    };
    const handleCloseSearch = () => {
        setShowOverlay(false);
    };

    const handleClickSearchItem = () => {
        setIsVisible(false);
        setShowOverlay(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter') {
            if (selectedIndex !== -1 && results[selectedIndex]) {
                // Xử lý logic khi nhấn Enter vào item đã chọn
                console.log('Selected item:', results[selectedIndex].name);
            }
        }
    };
    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prevState) => !prevState);
        setShowOverlay((prevState) => !prevState);
    }, []);

    return (
        <div>
            {showOverlay && <div className="overlay show" onClick={handleCloseSearch}></div>}
            <div className={cx('wrapper', 'd-none d-lg-block d-md-block')}>
                <div className="custom-container-xxl container-xl">
                    <div className={cx('inner')}>
                        <div className={cx('logo')}>
                            <Link to="/">
                                <img className={cx('img-logo')} src={images.logo} alt="tiki"></img>
                            </Link>
                        </div>

                        <Tippy
                            visible={isVisible}
                            offset={[0, 10]} /* Điều chỉnh khoảng cách giữa input và popper */
                            placement="bottom-start" /* Vị trí xuất hiện của dropdown */
                            interactive
                            appendTo={() => document.body} /* Gắn kết phần tử dropdown vào body */
                            render={(attrs) => (
                                <ul className={cx('search-popper')} tabIndex="-1" {...attrs}>
                                    {results.map((product, index) => (
                                        <li
                                            className={`search-result ${selectedIndex === index ? 'active' : ''}`}
                                            key={product.id}
                                        >
                                            <Link to={`/bookdetail/${product.id}`} onClick={handleClickSearchItem}>
                                                <img
                                                    width="35px"
                                                    className={cx('search-img')}
                                                    src={images.searchItem}
                                                    alt="tìm kiếm"
                                                />
                                                <div className={cx('keyword')} href="/">
                                                    {product.name}
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            popperOptions={{
                                modifiers: [
                                    {
                                        name: 'sameWidth' /* Tùy chỉnh tên modifier */,
                                        enabled: true,
                                        phase: 'beforeWrite',
                                        requires: ['computeStyles'],
                                        fn: ({ state }) => {
                                            state.styles.popper.width = `${state.rects.reference.width}px`; /* Đặt chiều rộng của popper theo chiều rộng của phần tử tham chiếu (input) */
                                        },
                                    },
                                ],
                            }}
                            onClickOutside={handleHideResult}
                        >
                            <div className={cx('search', 'd-lg-flex d-md-flex d-xl-flex d-xxl-flex')}>
                                <img src={images.search} alt="search" />
                                <input
                                    className={cx('search-input')}
                                    onChange={handleChangeSearch}
                                    onKeyDown={handleKeyDown}
                                    onFocus={handleFocus} // Khi focus vào input, hiển thị overla
                                    placeholder="Giao hàng nhanh 2H & đúng khung giờ"
                                    value={searchValue}
                                    ref={inputRef}
                                />
                                <button className={cx('search-btn')}>Tìm kiếm</button>
                            </div>
                        </Tippy>

                        {/* PC */}
                        <div className={cx('actions', 'd-md-none d-lg-flex d-xl-flex d-xxl-flex')}>
                            <div className={cx('actions-wrapper')}>
                                <Link className={cx('actions-btn')} to="/">
                                    <img src={images.home} alt="home" />
                                    <span>Trang chủ</span>
                                </Link>
                                <Tippy
                                    offset={[10, 0]}
                                    placement="bottom-end"
                                    interactive
                                    render={(attrs) => (
                                        <ul className={cx('account-popper')} tabIndex="-1" {...attrs}>
                                            <li>
                                                <Link className={cx('popper-link')} to="/account">
                                                    Thông tin tài khoản
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className={cx('popper-link')} to="/account">
                                                    Đơn hàng của tôi
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className={cx('popper-link')} to="/account">
                                                    Trung tâm hỗ trợ
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className={cx('popper-link')} to="/account">
                                                    Đăng xuất
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                >
                                    <div className={cx('actions-btn')}>
                                        <img src={images.account} alt="home" />
                                        <span>Tài khoản</span>
                                    </div>
                                </Tippy>
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

                        <span className={cx('icon-bars')} onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                        {isMenuOpen && <NavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />}
                    </div>

                    <div className={cx('search-mobile')}>
                        <span className={cx('search-btn-mobile')}>
                            <FontAwesomeIcon className={cx('icon-search')} icon={faSearch} />
                        </span>
                        <input
                            className={cx('input')}
                            onChange={handleChangeSearch}
                            value={searchValue}
                            placeholder="Bạn đang tìm kiếm gì"
                        />
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
