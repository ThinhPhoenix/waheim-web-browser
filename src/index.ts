const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export class Browser {
    launchUrl(url: string, external: boolean = false) {
        if (external) {
            if (isMobile) {
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = `x-safari-${url}`
                } else {
                    const urlObj = new URL(url);
                    const scheme = urlObj.protocol.replace(/:$/, "");
                    const intentUrl = `intent://${urlObj.host}${urlObj.pathname}${urlObj.search}#Intent;scheme=${scheme};action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(url)};end`;
                    window.location.href = intentUrl;
                }
            } else {
                window.open(url, '_blank')
            }
        } else {
            window.open(url)
        }
    }
}

// React hook
import { useMemo } from 'react'

export function useBrowser() {
  return useMemo(() => new Browser(), [])
}