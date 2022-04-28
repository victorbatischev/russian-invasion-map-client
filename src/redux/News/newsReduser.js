import { GET_NEWS } from './newsConstants'

let initialState = {
  news: [
    {
      id: 1,
      json_data: 'nd cnd cnd',
      url: 'https://hochuiedu.ru/wp-content/uploads/2019/11/nature-3595382_1920.jpg',
      title: 'Новость за 2022-04-18 12:36:11',
      created_at: '2022-04-18',
      status: 1,
      _links: {
        self: {
          href: 'http://battlemap.loc/api/map/map?map_id=2'
        }
      }
    },
    {
      id: 2,
      json_data: 'nd cnd cnd',
      url: 'https://hochuiedu.ru/wp-content/uploads/2019/11/nature-3595382_1920.jpg',
      title: 'Новость за 2022-04-20 12:36:11',
      created_at: '2022-04-20',
      status: 1,
      _links: {
        self: {
          href: 'http://battlemap.loc/api/map/map?map_id=2'
        }
      }
    },
    {
      id: 3,
      json_data: 'nd cnd cnd',
      url: 'https://hochuiedu.ru/wp-content/uploads/2019/11/nature-3595382_1920.jpg',
      title: 'Новость за 2022-04-22 12:36:11',
      created_at: '2022-04-22',
      status: 1,
      _links: {
        self: {
          href: 'http://battlemap.loc/api/map/map?map_id=2'
        }
      }
    }
  ],
  _links: {
    self: {
      href: 'https://map.da-info.pro/api/map/map-list?date=2022-04-04&expand=json_data&page=1'
    }
  },
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
