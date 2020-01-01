const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');

const selector = require('./src/selector');

require('dotenv').config();

(async () => {
    try{
        const browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 150
        });
        const page = await browser.newPage();
        const pendingXHR = new PendingXHR(page);
        const blockResource = [
            'image', 
            'font', 
        ];
        await page.setRequestInterception(true);

        page.on('request', req => {
            // 리소스 유형
            const resource = req.resourceType(); 
            if (blockResource.indexOf(resource) !== -1) {
                req.abort();  // 리소스 막기
            } else {
                req.continue(); // 리소스 허용하기
            }
        });
        let data_set = {}; 
        
        const menu = '#carteP005 li dl dd .nb-p-04-detail';

        await page.goto('https://mportal.cau.ac.kr/common/auth/SSOlogin.do?redirectUrl=/main.do');
        // await page.waitForNavigation();
        await page.waitFor(selector.USERNAME_SELECTOR);
        
        // login section 
        await page.evaluate((id, pw, selector) => {  
            document.querySelector(selector.USERNAME_SELECTOR).value = id;
            document.querySelector(selector.PASSWORD_SELECTOR).value = pw;
        }, process.env.cau_id, process.env.cau_pw, selector);
      
        await page.click(selector.BUTTON_SELECTOR);

        await page.waitForSelector(selector.time_line[0]);
        
        
        // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        // 조식, 중식, 양식 click
        for(let i=0; i<selector.time_line.length; i++){
            await page.click(selector.time_line[i]);
            console.log('here');
            await pendingXHR.waitForAllXhrFinished();
            // await page.waitForSelector(selector.RESTAURANT);
            console.log('there');
           let templist = {
                                location : '',
                                available: '',
                                price: '',
                                offer: [],
                            };
            list_length = await page.$$eval(selector.RESTAURANT, el => el.length);
            for(let j=0; j<list_length; j++){
                let rest_name = await page.evaluate((sel,j)=>{
                    return document.querySelectorAll(sel)[j].textContent;
                }, selector.RESTAURANT,j)
                console.log(rest_name);
            }
            
            // rest_list = await page.$$(selector.RESTAURANT);  // restaurant list 
            // avail_list = await page.$$(selector.AVAILABLE_TIME); //available_time list
            // price_list = await page.$$(selector.PRICE);
            
            // rest_list
            // for(let j=0; j<rest_list; j++){
            //     console.log(rest_list[j]);
                
            // }
            // menu_list = await page.$$(selector.MENU);
            // console.log(rest_list.length);
            // var temp1 = [];
            // var temp2 = [];
            // var temp3 = [];
            // page.on('console', msg => console.log(msg.text()));
            // console.log(rest_list);
              // restaurant list 
            // avail_list = await page.$$eval(selector.AVAILABLE_TIME, (el)=>{
            //     temp2.push(el);
            // }, temp2); //available_time list
            // price_list = await page.$$eval(selector.PRICE, (el)=>{
            //     temp3.push(el);
            // }, temp3);
            // console.log(temp1);
            // console.log(temp2);
            // console.log(temp3);
            // menu_list = await page.$$eval(selector.MENU);
            
            // await page.evaluate((rest_list)=>{
            //     for(let j=0; j<rest_list.length; j++){
            //         console.log('loc', rest_list[j].innerText);
            //         console.log('ava', avail_list[j].innerText);
            //         console.log('pri', price_list[j].innerText);
            //     }
            // },  rest_list);
            // for(let j=0; j<rest_list.length; j++){
            //     templist.location = rest_list[j].innerText;
            //     templist.available = avail_list[j].innerText;
            //     templist.price = price_list[j].innerText;
                // for(let k=0; k<menu_list[j].length; k++){
                //     templist.offer.push(menu_list[j][k]);
                // }
            // }
            // console.dir(templist, {depth: 3});
            // const temp = page.evaluate(()=>{
            //     menu_list = document.querySelectorAll('#carteP005 li dl dd .nb-p-04-detail');
            //     // console.log(menu_list);
            //     // return menu_list;
            //     const templist = [];
            //     for(let j=0; j<menu_list.length;j++){
            //         menu_title = menu_list[j].children[1].innerText.replace(/ /g,'');
            //         menu_info = menu_list[j].children[2].innerText.replace(/ /g,'');
                    
            //         templist.push(menu_title);
            //     }
            //     return Promise.resolve(templist);
            // }).then(value=>{
            //     console.log(value);
            // })
            
            // menu_list = page.$('#carteP005 li dl dd .nb-p-04-detail');
            // for(let j=0; j<menu_list.length;j++){
            //     menu_title = menu_list.child(2).innerHTML;
            //     menu_info = menu_list.child(3).innerHTML;
            //     console.log(menu_title);
            //     console.log(menu_info);
            // }
        }
        

    }catch(err){
        console.error(err);
    }
})();


