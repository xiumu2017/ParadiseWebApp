import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Paradise H5 App'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
