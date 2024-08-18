import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'

export const getTopicsMock = http.get(
  '*/api/topics',
  withCORS(async () => {
    return HttpResponse.json({
      topics: [
        {
          id: 'topic-football',
          category: "Football",
          subcategories: [
            {
              id: 'premier-league',
              name: "Premier League",
              suggestions: [
                "Liverpool",
                "Man. United",
                "Manchester City"
              ]
            },
            {
              id: 'serie-a',
              name: "Serie A",
              suggestions: [
                "Milan",
                "Inter",
                "Juventus"
              ]
            }
          ]
        },
        {
          id: 'topic-books',
          category: "Books",
          subcategories: [
            {
              id: 'investment',
              name: "Investment",
              suggestions: [
                "The Intelligent Investor - Benjamin Graham",
                "Rich Dad Poor Dad - Robert Kiyosaki"
              ]
            },
            {
              id: 'children',
              name: "Children",
              suggestions: [
                "Momo - Michael Ende",
                "BFG - Roald Dahl"
              ]
            }
          ]
        }
      ]
    })
  }),
)
