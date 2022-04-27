import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store'
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient({
   defaultOptions:{
      refetchOnWindowFocus: false,
   }
})

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
       <QueryClientProvider client={queryClient}>
          <App />
       </QueryClientProvider>
    </PersistGate>
  </Provider>,

  document.getElementById('root')
)
