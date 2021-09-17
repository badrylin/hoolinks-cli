import { forIn } from 'lodash';
function enumerable(
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    descriptor.enumerable = true;
};
class TestForIn {
    a = 1;
    @enumerable
    get b(){
        return this.a;
    }
}
/* let triangle = {a: 1, b: 2, c: 3};
TestForIn.prototype = triangle; */
const obj = new TestForIn;
console.log('obj', obj);

// for (const key in obj) {
//     console.log('key', key)
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//     }
// }
forIn(obj, (v,k) => {
    console.log(v,k);
})
