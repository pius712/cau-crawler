# cau-crawler


## page

### evaluate()

You return a promise and resolve it when you want. Returning a promise will make it wait until it's resolved.

```javascript
var wait = await page3.evaluate(()=> {
 return new Promise((resolve,reject)=>{
    $('.modal').hide()
    setTimeout(()=>{
      resolve(true)
    }, 3000);
 });
});
```