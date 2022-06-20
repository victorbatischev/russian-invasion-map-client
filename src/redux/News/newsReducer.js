import {GET_NEWS, SET_NEWS} from './newsConstants'

let initialState = {
  news: [
    {
      "id": "30338",
      "title": "Донецкий ботанический сад подвергся обстрелу папайи",
      "content": "< html-разметка >",
      "photo": "/media/upload/novosti/novosti_goroda/papaya1.jpg",
      "coordinates": "[48.505, 38]", // Строка
      "event_time": "1656536400",
      "type": "Обстрел"
    },
    {
      "id": "30438",
      "title": "Example Title",
      "content": "< html-разметка >",
      "photo": "/media/upload/novosti/novosti_goroda/some_pic.jpg",
      "coordinates": "[48.404, 37.116]", // Строка
      "event_time": "1655845200",
      "type": "Несчастный случай"
    }
  ]
}

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.payload
      }

    default:
      return state
  }
}
