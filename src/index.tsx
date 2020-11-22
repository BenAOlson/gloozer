import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from 'features/App'
import FirebaseProvider from 'features/firebase'
// import reportWebVitals from './reportWebVitals'
import '@elastic/eui/dist/eui_theme_amsterdam_dark.css'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
