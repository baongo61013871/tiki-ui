import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Header from '~/components/Header';
import { removeItem, updateQuantity } from '~/redux/cartSlice';
import { formatCurrency } from '~/utils';
import Footer from '~/components/Footer';

const cx = classNames.bind(styles);

const Cart = () => {
    const bookItems = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const [products, setProducts] = useState(bookItems.map((product) => ({ ...product, checked: false })));
    const [selectAll, setSelectAll] = useState(false);
    const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        // Đồng bộ products khi bookItems thay đổi
        setProducts(bookItems.map((product) => ({ ...product, checked: false })));
    }, [bookItems]);

    useEffect(() => {
        // Cập nhật trạng thái "Tất cả" khi sản phẩm thay đổi
        setSelectAll(products.every((product) => product.checked));
        // Cập nhật lại tổng tiền
        setTotalSelectedPrice(calculateTotalPrice());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    // Hàm tính tổng tiền các sản phẩm đã được chọn
    const calculateTotalPrice = () => {
        return products
            .filter((product) => product.checked)
            .reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const updatedProducts = products.map((product) => ({
            ...product,
            checked: newSelectAll,
        }));
        setProducts(updatedProducts);
    };

    const handleSelectItem = (id) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, checked: !product.checked } : product,
        );
        setProducts(updatedProducts);
    };

    const handleRemoveSelectedItems = () => {
        const updatedProducts = products.filter((product) => !product.checked);

        products.forEach((product) => {
            if (product.checked) {
                dispatch(removeItem(product.id));
            }
        });

        setProducts(updatedProducts);
    };

    const handleRemoveCartById = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const handleIncreaseQuantity = (id, currentQuantity) => {
        dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
    };

    const handleDecreaseQuantity = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('cart-content')}>
                <h2 className={cx('cart-title', 'my-4')}>GIỎ HÀNG</h2>
                <div className="row">
                    <div className="col-9">
                        <div className={cx('cart-container')}>
                            <div className={cx('cart-header')}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="d-flex">
                                            <input
                                                type="checkbox"
                                                id="selectAll"
                                                className={cx('all-input')}
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                            <label htmlFor="selectAll" className={cx('label-select-all')}>
                                                Tất cả ({totalQuantity} sản phẩm)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-5">
                                                <div>Đơn giá</div>
                                            </div>
                                            <div className="col-3">
                                                <div>Số lượng</div>
                                            </div>
                                            <div className="col-3">
                                                <div>Thành tiền</div>
                                            </div>
                                            <div className="col-1">
                                                <div className="text-center">
                                                    <img
                                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                                                        className="remove-all"
                                                        alt="deleted"
                                                        onClick={handleRemoveSelectedItems}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cart-item-container')}>
                                {products.map((item) => (
                                    <div className={cx('cart-item-wrapper')} key={item.id}>
                                        <div className={cx('cart-item')}>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className={cx('infor-wrapper')}>
                                                        <input
                                                            type="checkbox"
                                                            checked={item.checked}
                                                            onChange={() => handleSelectItem(item.id)}
                                                        />
                                                        <img src={item.image} alt="book" className={cx('book-image')} />
                                                        <div className={cx('body')}>
                                                            {item.authIcon &&
                                                                item.authIcon.map((auth) => (
                                                                    <img
                                                                        src={auth.icon}
                                                                        alt="auth"
                                                                        width={auth.icon_width}
                                                                        height={auth.icon_height}
                                                                        className="me-2"
                                                                        key={auth.icon}
                                                                    />
                                                                ))}
                                                            <div className={cx('item-name')}>{item.name}</div>
                                                            <div className={cx('delivery')}>
                                                                <img
                                                                    width="32"
                                                                    height="16"
                                                                    className="delivery-icon"
                                                                    src="https://salt.tikicdn.com/cache/w96/ts/tka/65/be/89/d0c3208134f19e4bab8b50d81b41933a.png"
                                                                    alt="delivery-icon"
                                                                />
                                                                <span className={cx('delivery-text')}>
                                                                    {item.badgesNew_v2?.text || 'Giao siêu tốc 24h'}
                                                                </span>
                                                            </div>
                                                            <div className={cx('advice')}>Có thể bọc bằng Bookcare</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 my-auto">
                                                    <div className={cx('price')}>
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <div className={cx('value')}>
                                                                    {formatCurrency(item.price)} <sup>₫</sup>
                                                                </div>
                                                            </div>
                                                            <div className="col-3">
                                                                <div className={cx('quantity')}>
                                                                    <span className={cx('qty-decrease')}>
                                                                        <img
                                                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                                                            alt="decrease"
                                                                            onClick={() =>
                                                                                handleDecreaseQuantity(
                                                                                    item.id,
                                                                                    item.quantity,
                                                                                )
                                                                            }
                                                                        />
                                                                    </span>
                                                                    <input
                                                                        type="tel"
                                                                        className={cx('qty-input')}
                                                                        value={item.quantity}
                                                                        readOnly
                                                                    />
                                                                    <span className={cx('qty-increase')}>
                                                                        <img
                                                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                                                            alt="increase"
                                                                            onClick={() =>
                                                                                handleIncreaseQuantity(
                                                                                    item.id,
                                                                                    item.quantity,
                                                                                )
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-3">
                                                                <div className={cx('value-final')}>
                                                                    {formatCurrency(item.quantity * item.price)}{' '}
                                                                    <sup>₫</sup>
                                                                </div>
                                                            </div>
                                                            <div className="col-1">
                                                                <div className="text-center">
                                                                    <img
                                                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                                                                        className="remove-all"
                                                                        alt="deleted"
                                                                        onClick={() => handleRemoveCartById(item.id)}
                                                                        height="17px"
                                                                        width="17px"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('discount', 'd-flex')}>
                                            <span className={cx('discount-shop')}>Shop Khuyến Mãi</span>
                                            <span className={cx('please')}>Vui lòng chọn sản phẩm trước</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className={cx('right-inner')}>
                            <div className={cx('delivery-address')}>
                                <div className={cx('block-header')}>
                                    <h3 className={cx('block-title')}>Giao tới</h3>
                                    <a className={cx('block-header_nav')} href="/account">
                                        Thay đổi
                                    </a>
                                </div>
                                <div className={cx('customer-info')}>
                                    <span className={cx('customer-name')}>Bảo Ngô</span>
                                    <span className={cx('separate')}></span>
                                    <span className={cx('customer-phone')}>0397155365</span>
                                </div>
                                <div className={cx('customer-address')}>
                                    <span className={cx('type-address--home')}>Nhà</span>
                                    Xã Tả Thanh Oai, Thanh Trì, Hà Nội
                                </div>
                            </div>

                            <div className={cx('price-summary')}>
                                <ul className={cx('prices-items')}>
                                    <li className={cx('prices-item')}>
                                        <span className={cx('prices-text')}>Tạm tính</span>
                                        <span className={cx('prices-value')}>
                                            {formatCurrency(totalSelectedPrice)} <sup>₫</sup>
                                        </span>
                                    </li>
                                    <li className={cx('prices-item')}>
                                        <span className={cx('prices-text')}>Giảm giá từ Deal</span>
                                        <span className={cx('prices-value', 'prices-value--positive')}>
                                            {totalSelectedPrice > 0 ? '-20.000' : '0'} <sup>₫</sup>
                                        </span>
                                    </li>
                                    <li className={cx('prices-item')}>
                                        <span className={cx('prices-text')}>Giảm giá từ mã khuyến mãi</span>
                                        <span className={cx('prices-value', 'prices-value--positive')}>
                                            {totalSelectedPrice > 0 ? '-15.000' : '0'} <sup>₫</sup>
                                        </span>
                                    </li>
                                </ul>
                                <div className={cx('total-wrapper')}>
                                    <div className={cx('prices-total')}>
                                        <span className={cx('prices-total-text')}>Tổng tiền</span>
                                        <div className={cx('prices-total-value')}>
                                            {formatCurrency(
                                                totalSelectedPrice - 35000 > 0
                                                    ? totalSelectedPrice - 35000
                                                    : totalSelectedPrice,
                                            )}{' '}
                                            <sup>₫</sup>
                                        </div>
                                    </div>
                                    <div className={cx('price-saving')}>
                                        Tiết kiệm 35.000<sup>₫</sup>
                                    </div>

                                    <span className={cx('vat-text')}>(Đã bao gồm VAT nếu có)</span>
                                    <button
                                        className={cx('button', 'btn--primary')}
                                        disabled={!products.some((p) => p.checked)}
                                    >
                                        Mua Hàng ({products.filter((p) => p.checked).length})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
