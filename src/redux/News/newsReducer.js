import {GET_NEWS, SET_NEWS} from './newsConstants'

let initialState = {
  news: [
    {
      "id": "30338",
      "title": "Освобождение Лисичанска",
      "content": "< html-разметка >",
      "photo": "/media/upload/novosti/novosti_goroda/papaya1.jpg",
      "coordinates": "[48.90997743446598,38.43532195898715]", // Строка
      "event_time": "03.07.2022",
      "type": "Обстрел"
    },
    {
      "id": "30438",
      "title": "Донецкий ботанический сад подвергся обстрелу",
      "content": "< html-разметка >",
      "photo": "/media/upload/novosti/novosti_goroda/some_pic.jpg",
      "coordinates": "[48.01124303426088,37.87926047379321]", // Строка
      "event_time": "25.06.2022",
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
