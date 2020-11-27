import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from 'features/app'
import FirebaseProvider from 'features/firebase'
// import reportWebVitals from './reportWebVitals'
import 'themes/gloozer/sass/gloozer-theme.scss'
import UserProvider from 'features/firebase/user-context'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
