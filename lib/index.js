const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export class Browser {
    launchUrl(url, external = false) {
        if (external) {
            if (isMobile) {
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.open(`x-safari://${url}`, '_blank');
                }
                else {
                    window.open(url, '_blank');
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
