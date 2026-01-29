const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export class Browser {
    launchUrl(url, external = false) {
        if (external) {
            if (isMobile) {
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.open(`x-safari-${url}`);
                }
                else {
                    const urlObj = new URL(url);
                    const scheme = urlObj.protocol.replace(/:$/, "");
                    const intentUrl = `intent://${urlObj.host}${urlObj.pathname}${urlObj.search}#Intent;scheme=${scheme};action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(url)};package=com.android.chrome;end`;
                    const link = document.createElement('a');
                    link.href = intentUrl;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
            else {
                window.open(url, '_blank');
            }
        }
        else {
            window.open(url);
        }
    }
}
// React hook
import { useMemo } from 'react';
export function useBrowser() {
    return useMemo(() => new Browser(), []);
}
