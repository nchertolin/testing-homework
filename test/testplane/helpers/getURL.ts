export function getURL(page: string) {
    let url = '';
    const basename = process.env.BASENAME || 'http://localhost:3000/hw/store';
    const bugID = process.env.BUG_ID || '';
    
    url += basename;
    url += page;
    if (Boolean(bugID)) {
        url += `?bug_id=${bugID}`
    }
    
    return url;
}

