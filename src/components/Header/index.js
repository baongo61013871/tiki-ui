import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img
                            className={cx('img-logo')}
                            src="https://s3-alpha-sig.figma.com/img/0fc4/c1bd/682eccf8d6c5e3ed3e5df02dab272608?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FDQ~pvEqYhLIMrrRgEAjl7e6s0PUVsebmsoR9S4Arn87Bs7479qB4qW6yUYPl3Wl6QDtoAMqpr4VwzdiKLsa2u1H99HdxvO~wNly3X9faKrnMfUeaBcQ1Ca8TFEU05F-jzd8R7qMXPp2E1OLdZb~eWEbq~ZC3bT3aWG8P1omeefdJuXS7imKdGLh5wk--G0EyXXvENHIB3qSax5NXTThuSBg8XwiYGtnlbCoxRy5Gp3~sFsGngF2GWF3ARS5Xl7yGSg9AIcpqNNAV7WXSG0cfupOtDAXKEWltBM73OAkY0vI3-aBBQOOsGvyQ01BgwH7t~q~9Weg7~A6547yOa62Zg__"
                            alt="tiki"
                        ></img>
                    </Link>
                </div>

                <div className={cx('search')}>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/bb50/959f/71ce6b3c94884bf4eb034d18e6c5f3eb?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F5YsOEScUkvrqHoxYkCNBR8N2yP5F1BZWE161hNZAPAjUuDOBxuf2w4Qgz3opfA45Ty7ksx1xwcFFyjFNijbTQxDz7cCaekVYL~I8GRrmBZ~-3VHtdkfXyBXcORI6t0iQ2oYNcFErsMF5LclSSLv3k-tfYIvAQnAVUK4yXUkvwuJyt7RelV6LmfU8rq3fj6th7cYR-nVrZT0q96xmAiU12hnPQaBKRlHH2UCDSLAPQMcN6mj4eAsZYwMlQGkea9W7UVfihubX2B~GO8U1sKa1JDryCnlRucLqblDsETBTKha5ZJW777YilZXZ5mSIJLyXpfLXdUAD6VjsKbt8vm3Eg__"
                        alt="search"
                    />
                    <input className={cx('search-input')} placeholder="Bạn mua gì hôm nay" />
                    <button className={cx('search-btn')}>Tìm kiếm</button>
                </div>
                <div className={cx('actions')}>
                    <Link className={cx('actions-btn')} to="/">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/428e/3a18/014835c48fc3848c37a8147a0b848e40?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C2KH76~r643Nz2oY9UaImhFuerG1x8uYjYkiaRQRM6DlsrKHFo6LLT66kTmI-td9YDcdZaM5hGofHuOR~atTVSBLemHVJHlyb6AKOl4OBGTZe1pnd4XrDyK-4T1sNG272wk69ok9nEWk~i8IoKng-H-qL9ShRw9Jd~ZHGjNE3eQgW7PCFV3J3f1j6nbCEMCoEzaBc-~18tIeOEmIfBm8AnebmD5a9whhYpbtD5vlARvIz1mmrrMd7ZJ4EgEjEQKQXCWGMAMWmKYa4n3FW174tebnFSlzKOi4fOfHhTNs9L9~1McdEnoxDQNIzD~CUVBTo4IfLCwWh2QB9FtUdEqKKQ__"
                            alt="home"
                        />
                        <span>Trang chủ</span>
                    </Link>
                    <Link className={cx('actions-btn')} to="/account">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/4b75/ae06/c1ed80deda31d49b91763474ad6f4e8b?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dj4771CMxiYoiHzIPZywnHPdB7NE3ujuKMdXo7apIJs~Wlb4-iBhEso5V8b9Ff8kDtbjDYmp~d3DFoZgehXFyb0DKalc01sZu5DuNsXJHS~gRd5k8lj328N2NDxMKaJw7N8AdLq8xxm-KIY-6MJPdIyveKi6Qqg18rAl98Zbp9XjDTG~j4qMf8Z7vfBQWZXZdJl1zT4eriPS-MjS9b5FmvDGXQPoMj7wVA59Es8v6WYKQMBTgOXHX5rHeHLJAxtZPePs244KEsxZxSypcrOiBJHO2quAC0HJXqYJr0cTtJgh2E5Lwhx~PjhLrzKc~iT6dvnVmgAOEcLqAYM9RZH2Og__"
                            alt="home"
                        />
                        <span>Tài khoản</span>
                    </Link>

                    <div className={cx('cart-wrapper')}>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/a084/d2e6/defd412e1477724456bfb6c09607f2de?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QQx5c03AYLmQW79Ug6NsrbYQ1liObE30WSGsDW2bFLJMMhPETdckHrERNE802nIL8ATV9D8mfLjujWOxQrR31W7Y7gMaBHHDyS2Z1GHxUHQgjldCWnFGX7h9FiOX7HtAs-aHS-H9587-ttKdPd0tKtLFUbtTgYPvc58dC406xt94Xzy6IULsKotbyXtz1OK6anmDQHSP8zZgzEAupP47UyTUa7cp4gs6Rpx7WASA~RJ2u7Zac6txTfEdLuEhr84F~MDGDVi9Vfwbb8uDsLZ~J9X7RfVXP8DnUcYU2jEZ9ZgwfGWqYIYH8q8YNLJA7pemedILktYh1NjF5YC6MzSBOA__"
                            alt="cart"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
