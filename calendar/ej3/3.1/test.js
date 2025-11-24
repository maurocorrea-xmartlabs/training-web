let str = 'mul(1,2)';
console.log(str.slice(3).replaceAll('(', '').replaceAll(')', '').split(','));