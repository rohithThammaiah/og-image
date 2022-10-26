import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ActivityRequest, Theme } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname } = parse(req.url || '/', true);

    const arr = (pathname || '/').slice(1);
    let activityId = '';
    if (arr.length === 0) {
        activityId = '';
    } else {
        activityId = arr[0];
    }

    const parsedRequest: ActivityRequest = {
        activityId: activityId
    };
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
    const defaultImage = theme === 'light'
        ? 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg'
        : 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }
    if (!images[0].startsWith('https://assets.vercel.com/') && !images[0].startsWith('https://assets.zeit.co/')) {
        images[0] = defaultImage;
    }
    return images;
}
