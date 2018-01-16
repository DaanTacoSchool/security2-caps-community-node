const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('../model/authorization');
const http = require('http');

const api_version = process.env.CAPS_API_VERSION || 'v1';

router.post('/auth/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if( email !== undefined && password !== undefined ) {
        LoginASPNETBackend(email, password, function(error, result) {
            if(error) {
                res.status(400).json({error: 'Login not correct'});
            } else {
                let user = {
                    id: result.id,
                    guid: result.guid,
                    fullName: result.fullName,
                    vendorId: result.vendorId,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    password: result.password,
                    roleIds: result.roleIds
                };

                let token = auth.encodeToken(user);

                res.json({token: token, user: user});
            }
        });
    } else {
        res.status(400).json({error: 'Login not correct'});
    }
});

router.post('/auth/register', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;
    let phoneNumber = req.body.phoneNumber;

    if( email !== undefined && password !== undefined && fullName !== undefined && phoneNumber !== undefined ) {
        RegisterASPNETBackend(
            { email: email, password: password, fullName: fullName, phoneNumber: phoneNumber },
            function(error, response) {
                if(error) {
                    res.status(400).json({error: 'Registration not correct'});
                } else {
                    let user = {
                        id: response.id,
                        guid: response.guid,
                        fullName: response.fullName,
                        vendorId: response.vendorId,
                        email: response.email,
                        phoneNumber: response.phoneNumber,
                        password: response.password,
                        roleIds: response.roleIds
                    };

                    let token = auth.encodeToken(user);

                    res.json({token: token, user: user});
                }
            });
    } else {
        res.status(400).json({error: 'Registration not correct'});
    }
});

function LoginASPNETBackend(email, password, callback) {
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

    let result = '';

    // Set up the request
    let post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            result += chunk;
        });
        res.on('end', function () {
            try {
                let jsonResult = JSON.parse(result);

                if (jsonResult.Error === undefined && jsonResult.id !== undefined) {
                    callback(null, jsonResult);
                } else {
                    callback({error: 'Login not correct'});
                }
            } catch (error) {
                callback({error: 'Login not correct'});
            }

        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

function RegisterASPNETBackend(user, callback) {
    // Build the post string from an object
    let post_data = JSON.stringify({
        Email: user.email,
        FullName: user.fullName,
        PhoneNumber: user.phoneNumber,
        Password: user.password
    });
    console.log(post_data);
    // An object of options to indicate where to post to
    let post_options = {
        host: process.env.CAPS_ASPWEBSITE || 'capsdevelop.azurewebsites.net',
        port: '80',
        path: '/api/'+api_version+'/users/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    let result = {};

    // Set up the request
    let post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            result += chunk;
        });
        res.on('end', function () {
            console.log(result);
            try {
                let jsonResult = JSON.parse(result);

                if(jsonResult.Error === undefined && jsonResult.id !== undefined) {
                    callback(null, jsonResult);
                } else {
                    callback({error: 'Register not correct'});
                }
            } catch(e) {
                callback({error: 'Register not correct'});
            }
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

}

module.exports = router;
