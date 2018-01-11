const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('../model/authorization');
const http = require('http');

router.post('/auth/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if( email !== undefined && password !== undefined ) {
        LoginASPNETBackend(email, password, res);
    } else {
        res.next(new Error('Login not correct'));
    }
});

function LoginASPNETBackend(email, password, response) {
    // Build the post string from an object
    let post_data = JSON.stringify({
        'email' : email,
        'password' : password
    });

    let api_version = process.env.CAPS_API_VERSION || 'v1';

    // An object of options to indicate where to post to
    let post_options = {
        host: process.env.CAPS_ASPWEBSITE || 'capsdevelop.azurewebsites.net',
        port: '80',
        path: '/api/'+api_version+'/users/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    let post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);

            let jsonResult = JSON.parse(chunk);

            if(jsonResult.Error === undefined && jsonResult.id !== undefined) {
                let user = {
                    id: jsonResult.id,
                    guid: jsonResult.guid,
                    fullName: jsonResult.fullName,
                    vendorId: jsonResult.vendorId,
                    email: jsonResult.email,
                    phoneNumber: jsonResult.phoneNumber,
                    password: jsonResult.password,
                    roleIds: jsonResult.roleIds
                };

                let token = auth.encodeToken(user);

                response.json({token: token, user: user});
            } else {
                response.status(400).json({error: 'Login not correct'})
                //response.next(new Error('Login not correct'));
            }

        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

}

module.exports = router;
