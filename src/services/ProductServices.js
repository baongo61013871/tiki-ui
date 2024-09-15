import request from '~/utils/request';

export const product = async () => {
    try {
        const res = await request.get(
            'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=8322&page=1&urlKey=nha-sach-tiki',
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getEnglishBooks = async () => {
    try {
        const res = await request.get(
            'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=320&page=1&urlKey=sach-tieng-anh',
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const getVietnameseBooks = async () => {
    try {
        const res = await request.get(
            'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=316&page=1&urlKey=sach-truyen-tieng-viet',
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const getStationery = async () => {
    try {
        const res = await request.get(
            'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=18328&page=1&urlKey=qua-luu-niem',
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
export const getSouvenirs = async () => {
    try {
        const res = await request.get(
            'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=18328&page=1&urlKey=qua-luu-niem',
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const supplier = async (id) => {
    try {
        const res = await request.get(
            `personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=aaaba2c8-2dd3-ea29-724f-c153a03511a6&category=8322&page=1&seller=${id}&urlKey=nha-sach-tiki`,
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
