const selector = {
    time_line :[
        '#P005 .nb-p-headers .nb-p-04-list li:first-child',
        '#P005 .nb-p-headers .nb-p-04-list li:nth-child(2)',
        '#P005 .nb-p-headers .nb-p-04-list li:last-child'
    ],
    USERNAME_SELECTOR : '#txtUserID',
    PASSWORD_SELECTOR : '#txtPwd',
    BUTTON_SELECTOR : '#form1 .btn-login',
    RESTAURANT: '#carteP005 .nb-p-04-02-01-a',
    AVAILABLE_TIME: '#carteP005 .nb-p-04-02-01-b',
    PRICE: '#carteP005 .nb-p-04-02-02-b',
    MENU: '#carteP005 .nb-p-04-03'
};

module.exports = selector;