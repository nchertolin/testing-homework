export function addBugToBasename(basename: string) {
    let url = '';
    const bugID = process.env.BUG_ID || '';
    url += basename;
    if (Boolean(bugID)) {
        url += `?bug_id=${bugID}`
    }
    
    return url;
}

