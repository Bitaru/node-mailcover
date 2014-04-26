var mailcover = require('mailcover');

mailcover.config = {

    server: 'us1',
    key: '4838c775538ffefa01e3fcaf478c7cce',
    blockDEA: false,
    user:{
        user_ip: '127.0.1.2',
        user_agent: 'Mozilla 5.0'
    }

};
mailcover.validate('example@mail.com', function(response){
    console.log(response);
});