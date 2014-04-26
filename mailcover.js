/*!
 * Copyright (c) 2014 Bitaru <web@mailcover.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function (name, definition) {

    module.exports = definition();

})('mailcover', function (mailcover) {

    'use strict';

    var https = require('https'),

        pattern = /^([^@]+)@([^@]+)\.([^@]+)$/;

    mailcover = {};

    mailcover.messages = {

        blank: 'Email must not be blank',
        incorrect: 'Email is invalid',
        dea: 'Email is blacklisted'

    };

    /**
     * Main validation method
     * @param {string} email to validate
     * @param {string} callback
     */
    mailcover.validate = function(email, callback){

        var connect, req, config, messages;

        config = this.config;
        messages = this.messages;

        // NotBlank checker
        if(email.replace(' ', '') == ''){
            return callback(messages.blank);
        }

        // Simple syntax validation
        if(!pattern.test(email)){
            return callback(messages.incorrect);
        }else{

            connect = {
                hostname: config.server+'.api.mailcover.com',
                port: 443,
                path: '/'+config.key + '/private/' + encodeURIComponent(email) +'/json',
                method: 'POST',
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            };

            req = https.request(connect, function(response){
                var str = '';

                response.on('data', function (chunk) {
                    str += chunk;
                });

                response.on('end', function () {
                    var data = JSON.parse(str);
                    if(data.status == 'invalid'){
                        return callback(messages[data.reason] || data.reason);
                    }else{
                        if(config.blockDEA && data.is_disposable){
                            return callback(messages.dea);
                        }else{
                            return callback('success');
                        }
                    }

                });
            });

            req.write( JSON.stringify(mailcover.config.user) || '', 'utf8' );
            req.end();

        }

    };


    /*
    * Helpers
    * */
    var extend = function(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }

    return mailcover;

});