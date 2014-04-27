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

## Messages

You can customize default messages by adding or revrite **mailcover.messages** object

Default is:

```
mailcover.messages = {
	blank: 'Email must not be blank',
	incorrect: 'Email is invalid',
	dea: 'Email is blacklisted'
};
```
And default messages in callback are:

**Invalid address** - email address does`t looks valid

**Invalid domain** - email-server does not exist on this host

**Invalid username** - email-server is available, but don`t have this post-box for this user name

**Domain blacklisted** - this domain name in black list

You can rewrite default messages in mailcover.messages object or in campaign editor

```
mailcover.messages = {
	blank: 'Email must not be blank',
	incorrect: 'Email is invalid',
	dea: 'Email is blacklisted',
	'Invalid address': 'You made a mistake in email address'
};
```
![](https://dl.dropboxusercontent.com/u/106914318/mailcover_messages.png)
