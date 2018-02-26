const User = require('../model/user');
const http = require('http');
const rp = require('request-promise');

const api_version = process.env.CAPS_API_VERSION || 'v1';

/**
 * @deprecated use LoginASPNETBackend v2
 */
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

function LoginASPNETBackendv2(email, password) {

    // Build the post string from an object
    let post_data = {
        'email' : email,
        'password' : password
    };

    let options = {
        uri: (process.env.CAPS_ASPWEBSITE || 'https://capsdevelop.azurewebsites.net')+'/api/'+api_version+'/users/login',
        method: 'POST',
        body: post_data,
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);
}

/**
 * @deprecated use RegisterASPNETBackend v2
 */
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

function RegisterASPNETBackendv2(user) {

    // Build the post string from an object
    let post_data = JSON.stringify({
        Email: user.email,
        FullName: user.fullName,
        PhoneNumber: user.phoneNumber,
        Password: user.password
    });

    let options = {
        uri: (process.env.CAPS_ASPWEBSITE || 'https://capsdevelop.azurewebsites.net')+'/api/'+api_version+'/users/register',
        method: 'POST',
        body: post_data,
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);
}

/**
 * @deprecated use GetUserASPNETBackend v2
 */
function GetUserASPNETBackend(guid, callback) {

    let api_version = process.env.CAPS_API_VERSION || 'v1';

    // An object of options to indicate where to post to
    let post_options = {
        host: process.env.CAPS_ASPWEBSITE || 'capsdevelop.azurewebsites.net',
        port: '80',
        path: `/api/${api_version}/users/${guid}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
                    const user = {
                        guid: jsonResult.guid,
                        fullName: jsonResult.fullName,
                        email: jsonResult.email
                    };
                    callback(null, user);
                } else {
                    callback({error: 'Login not correct'});
                }
            } catch (error) {
                callback({error: 'Could not load user'});
            }

        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

function GetUserASPNETBackendv2(guid) {

    let options = {
        uri: (process.env.CAPS_ASPWEBSITE || 'https://capsdevelop.azurewebsites.net')+`/api/${api_version}/users/${guid}`,
        method: 'GET',
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);
}

module.exports = {
    RegisterASPNETBackend,
    RegisterASPNETBackendv2,
    LoginASPNETBackend,
    LoginASPNETBackendv2,
    GetUserASPNETBackend,
    GetUserASPNETBackendv2
};