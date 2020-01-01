const puppeteer = require('puppeteer');
require('dotenv').config();
(async () => {
    try{
        const browser = await puppeteer.launch({
            headless: false,
            // slowMo: 150
        });
        const page = await browser.newPage();
        
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
        const BRANCH = {
            time_line :['#P005 .nb-p-headers .nb-p-04-list li:first-child',
            '#P005 .nb-p-headers .nb-p-04-list li:nth-child(2)',
            '#P005 .nb-p-headers .nb-p-04-list li:last-child'
            ],
            USERNAME_SELECTOR : '#txtUserID',
            PASSWORD_SELECTOR : '#txtPwd',
            BUTTON_SELECTOR : '#form1 .btn-login'

        };


        await page.goto('https://mportal.cau.ac.kr/common/auth/SSOlogin.do');
        await page.waitForNavigation();
        await page.waitFor(USERNAME_SELECTOR);
        await page.evaluate((id, pw, BRANCH) => {  
            document.querySelector(BRANCH.USERNAME_SELECTOR).value = id;
            document.querySelector(BRANCH.PASSWORD_SELECTOR).value = pw;
        }, process.env.cau_id, process.env.cau_pw, BRANCH);
        await page.click(BUTTON_SELECTOR);

        await page.waitForSelector('#P005');
        
        // 조식, 중식, 양식 click
        for(let i=0; i<BRANCH.time_line.length; i++){
            await page.click(BRANCH.time_line[i]);
            await page.waitFor(2000);
        }
        //     const total_menu = document.querySelectorAll('#carteP005 dd .nb-p-04-detail .nb-p-04-02');
        //     const total_detail = document.querySelector('#carteP005 dd .nb-p-04-detail .nb-p-04-03');
        // });

    }catch(err){
        console.error(err);
    }
})();