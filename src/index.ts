import express from "express";
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN || '';

// define a route handler for the default home page
app.get("/twits/:username/:count", async (req, res) => {

    const username = req.params.username;
    const count = req.params.count;
    let tweets = [];
    let response;
    try {
        // fetchs tweets from api
        response = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?tweet_mode=extended&include_rts=true&exclude_replies=false&screen_name=${username}&count=${count}`,
            { headers: { 'Authorization': `Bearer ${TOKEN}` } });

        const json = await response.json() as any[];

        tweets = json.map(tweet => {
            // if is retwit
            if(tweet.retweeted_status) {
                return tweet.retweeted_status.full_text;
            } else {
                return tweet.full_text;
            }
        } );
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log(e);
        const erroResult = {
            success: false,
            body: [''],
        };
        res.status(400).json(erroResult);
    }

    const result = {
        success: true,
        body: tweets,
    };
    res.status(200).json(result);
});

// start the Express server
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
});