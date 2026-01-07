/**
 * * Implementing my own .map function to learn
 * @param {*} cb
 * @returns
 */

Array.prototype.myMap = function (cb) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(cb(this[i]));
    }
    return arr;
};

Array.prototype.flatten = function () {
    let a = [];
    const checkArr = function (isArr) {
        let c = 0;
        while (c < isArr.length) {
            let x = isArr[c];
            if (Array.isArray(x)) {
                checkArr(x);
            } else {
                newArr.push(x);
            }
            c++;
        }
    };
    checkArr(this);
    return a;
};
