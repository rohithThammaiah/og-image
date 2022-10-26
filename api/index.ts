import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getScreenshot } from './_lib/chromium';
import { getHtml } from './_lib/template';
import { ActivityDetails } from './_lib/types';
import fetch from "node-fetch";

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

const logo = './_lib/logo.png';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedReq = parseRequest(req);
        console.log('HEW');
        const activityDetails: ActivityDetails = await getActivtyDetails("807a1d67-6d27-4654-bd93-70b0edd0371c");
        console.log(logo);
        const html = getHtml(activityDetails, logo);
        if (isHtmlDebug) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
        const fileType = 'jpeg';
        const file = await getScreenshot(html, fileType, isDev);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}

/**
* https://api.playo.io/activity/details/807a1d67-6d27-4654-bd93-70b0edd0371c/6ea6c52a-e8c2-42c2-a883-ad16338b5b4c
**/

async function getActivtyDetails(activityId: string) {
    const userId = "6ea6c52a-e8c2-42c2-a883-ad16338b5b4c";
    const response = await fetch(`https://api.playo.io/activity/details/${activityId}/${userId}`,{
        headers: {
            'Authorization': '3fd693d0-50a0-11ed-927e-e372bb655546:6ea6c52a-e8c2-42c2-a883-ad16338b5b4c'
        }
    });
    console.error('HEW');
    console.log(response)
    const result = await response.json()


    const details: ActivityDetails = {
        activityId: activityId,
        location: 'PlayZone, Indiranagar',
        date: '12th Dec, 2022',
        time: 'Evening',
        hostInfo: {
            userId: '',
            profilePic: 'https://playov2.gumlet.io/profiles/1664510675011-SAVED-20220930_0934_32348.jpg',
            name: 'Saurabh'
        }
    }

    return details
}