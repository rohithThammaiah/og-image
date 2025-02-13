import {readFileSync} from 'fs';
import {sanitizeHtml} from './sanitizer';
import {ActivityDetails} from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/Montserrat-Regular.ttf`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Montserrat-Bold.ttf`).toString('base64');

function getCss() {
    return `
    html {
        font-family: 'Montserrat', sans-serif;
    }

    body {
        margin: 0;
        width: 1200px;
        height: 600px;
    }

    .content {
        margin: 42px;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;
        justify-content: space-between;
    }

    .left_content {
        display: flex;
        flex-direction: column;
        width: 60%;
        justify-content: center;
    }

    .right_content {
        margin-right: 120px;
        margin-bottom: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h1 {
        margin: 0;
        font: ${bold};
        font-weight: 600;
        font-size: 56px;
        line-height: 64px;
        letter-spacing: 2px;
    }

    h4 {
        font: ${rglr};
        font-weight: 500;
        font-size: 40px;
        margin: 0;
        letter-spacing: 1px;
    }

    .subtitle {
        display: inline-flex;
        flex-direction: row;
    }

    .details {
        display: inline-flex;
        flex-direction: column;
        max-width: 70%;
    }

    .detailsItem {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .tags {
        display: inline-grid;
        grid-template-columns: 50% 50%;
        row-gap: 32px;
        column-gap: 32px;
        width: 70%;
        margin-top: 16px;
    }

    .tagItem {
        background: #F1F3F2;
        border-radius: 8px;
        text-align: center;
    }

    .profileImage {
        border-radius: 50%;
    }

    .default-row-spacer {
        margin-bottom:50px;
    }

    .default-spacer {
        margin-right: 10px;
    }

    .large-row-spacer {
        margin-bottom: 32px;
    }
    `;
}

export function getHtml(parsedReq: ActivityDetails, logo: String) {
    const {location, date, time} = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
    <div class="content">
        <div class="left_content">
            <h1 class="default-row-spacer">Rohith's Badminton Doubles Activity</h1>
            <h4 class="default-row-spacer">${location}</h4>
            <h4 class="default-row-spacer">${date}</h4>
            <h4 class="default-row-spacer">${time}</h4>
        </div>

        <div class="right_content">
            <img class="profileImage" alt="Profile Picture"
                src="https://playov2.gumlet.io/profiles/1664510675011-SAVED-20220930_0934_32348.jpg" width="310"
                height="310" />
            <img class="logo" alt="Playo logo"
                src="${logo}" width="300"
                height="140" />
        </div>
    </div>
</body>
</html>`;
}


function getProfileImage(src: string, width = '310', height = '310') {
    return `<img
        class="profileImage"
        alt="Profile Picture"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getImage(src: string, width = 'auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
