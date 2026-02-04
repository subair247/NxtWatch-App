import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  activeTab: 'Home',
  toggleTheme: () => {},
  addVideo: () => {},
  changeTab: () => {},
})

export default NxtWatchContext
