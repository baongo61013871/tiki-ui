import request from '~/utils/request';

export const product = async () => {
    try {
        const res = await request.get(
            'personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=1566ec9b-04d5-40d0-cdd6-17b38c2b4afb&category=623&page=1&urlKey=art-photography',
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
