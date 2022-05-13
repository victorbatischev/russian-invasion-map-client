import { GET_NEWS } from './newsConstants'

let initialState = {
  news: [
    {
      id: 1,
      coordinates: [50.401515322782366, 30.5419921875],
      img: 'https://hochuiedu.ru/wp-content/uploads/2019/11/nature-3595382_1920.jpg',
      title: 'Новость за 16.04.2022 12:36:11',
      created_at: '16.04.2022',
      text: 1,
      type: null
    },
    {
      id: 2,
      coordinates: [48.98382212608503, 37.8204345703125],
      img: 'https://tamgdeteplo.ru/wp-content/uploads/2021/11/npivr6-e1638197617920.jpg',
      title: 'Новость за 18.04.2022 12:36:11',
      created_at: '18.04.2022',
      text: 1,
      type: null
    },
    {
      id: 3,
      coordinates: [48.73445537176822, 37.58422851562499],
      img: 'https://i.pinimg.com/originals/08/9d/73/089d73fb6a141ab96f31cdd6209990a1.jpg',
      title: 'Новость за 20.04.2022 12:36:11',
      created_at: '20.04.2022',
      text: 1,
      type: null
    }
  ],
  _meta: {
    totalCount: 0,
    pageCount: 0,
    currentPage: 1,
    perPage: 20
  }
}

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state
      }

    default:
      return state
  }
}
