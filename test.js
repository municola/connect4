let arr = [['asdf', 'eeee'], ['nicioo', 'adolf'], ['eva', 'hitler']];

for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].filter((item) => {
    return item !== 'adolf';
  });
}

console.log('arr: ', arr);
