// import necessary module

import { check } from "k6";
import http from "k6/http";

export const options = {
    //define thresholds
    thresholds: {
        http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }], //http errors should be less than 1%
        http_req_duration: ['p(99)<1000'], //99% of requests should be below 1s
    },

    //define scenarios
    scenarios: {
        breaking: {
            executor: "ramping-vus",
            stages: [
                { duration: "10s", target: 20 },
                { duration: "50s", target: 20 },
                { duration: "50s", target: 40 },
                { duration: "50s", target: 60 },
                { duration: "50s", target: 80 },
                { duration: "50s", target: 100 },
                { duration: "50s", target: 120 },
                { duration: "50s", target: 140 },
            ],
        },
        //arbitrary name of scenario
        //average_load: {
            //executor: "ramping-vus",
            //stages: [
                //ramp up to an average load of 20 vitual users
                //{ duration: "10s", target: 20 },
                //maintain load
                //{ duration: "50s", target: 20 },
                //ramp down to zero
                //{ duration: "5s", target: 0 },
            //],
        //},
    }
};

export default function () {

    // define URL and payload
    const url = "https://test-api.k6.io/auth/basic/login/";
    const payload = JSON.stringify({
        username: "test_case",
        password: "1234",
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    //send a post request and save the response as a variable
    const res = http.post(url, payload, params);

    //log the request body
    console.log(res.body);

    //check that response is 200
    check(res, {
        "response code was 200": (res) => res.status == 200,
    });
}