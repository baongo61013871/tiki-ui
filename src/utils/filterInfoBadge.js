const FilterInfoBadge = (array) => {
    // infor-badge
    // tìm xem object có fill code là delivery_info_badge
    const infor = Array.isArray(array)
        ? array.filter((info) => {
              return info.code === 'delivery_info_badge';
          })
        : [];

    return infor[0];
};

export { FilterInfoBadge };
