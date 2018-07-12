import { parse as parseContentTypeHeader } from 'content-type';
import isLocalFile from './is-local-file';

/** Convenience function to check if a resource is a HTMLDocument. */
export default (targetURL: string, responseHeaders: object): boolean => {

    // If it's a local file, presume it's a HTML document.

    if (isLocalFile(targetURL)) {
        return true;
    }

    // Otherwise, check.

    const contentTypeHeaderValue: string = responseHeaders['content-type'];
    let mediaType: string;

    try {
        mediaType = parseContentTypeHeader(contentTypeHeaderValue).type;
        if(!contentTypeHeaderValue.includes('text/html') && mediaType === 'text/html'){
            console.error(`WEIRD THING GOING ON!!!:\nCONTENT-TYPE: ${contentTypeHeaderValue}`);
        }
    } catch (e) {
        return false;
    }

    return mediaType === 'text/html';
};
