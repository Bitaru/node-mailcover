# Node-Mailcover

Node-Mailcover - is simple way to add [Mailcover](https://mailcover.com/) email validation in you node.js application.


## Installation

* Install package wth `npm install mailcover`

* Create campaign for you ip address on [Mailcover](https://mailcover.com/) web-site
* Pass API key and server id to `mailcover.config`

## Usage

```
var mailcover = require('mailcover');

mailcover.validate('example@email.com', function(data){
	console.log(data);
});
```

## Options

```
mailcover.config = {
	server: 'eu1',    //= Chosen server region	
	key: '*****', 	  //= Your unique API key
	blockDEA: 'true', //= {true|false} If true validate function will return "Email is blacklisted" if given address is DEA
	user: {
		user_ip: request.connection.remoteAddress,
		user_agent: request.headers['user-agent']
	
	}
};
```
**mailcover.config.user** - this is optional user data, Mailcover need it only for export more detailed campaign statistic. I highly recommend that you send this data.