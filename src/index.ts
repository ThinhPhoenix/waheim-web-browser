const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
const isAndroid = /Android/i.test(navigator.userAgent)
const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
              (window.navigator as any).standalone === true

export class Browser {
    launchUrl(url: string, external: boolean = false) {
        if (external) {
            if (isIOS) {
                // iOS: Use window.location for safari scheme
                window.location.href = `x-safari-${url}`
            } else if (isAndroid && isPWA) {
                // Android PWA: Use window.open with specific features
                // or fallback to location change
                const newWindow = window.open(url, '_system', 'noopener,noreferrer')
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    // Fallback: try intent with browser package
                    window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;end`
                }
            } else if (isAndroid) {
                // Android Web: Use intent URL to force external browser
                const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`
                window.location.href = intentUrl
            } else {
                // Desktop: Use anchor element for reliable new tab
                const a = document.createElement('a')
                a.href = url
                a.target = '_blank'
                a.rel = 'noopener noreferrer'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
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