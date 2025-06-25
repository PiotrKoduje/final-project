"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOnlyFirstPhoto = void 0;
const selectOnlyFirstPhoto = (wines) => {
    const winesWithOnePhoto = wines.map(wine => (Object.assign(Object.assign({}, wine), { photos: wine.photos.split(',')[0].trim() })));
    return winesWithOnePhoto;
};
exports.selectOnlyFirstPhoto = selectOnlyFirstPhoto;
//# sourceMappingURL=selectOnlyFirstPhoto.js.map