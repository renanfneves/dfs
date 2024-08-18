/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponseResolver } from 'msw'

export function withCORS(
  resolver: HttpResponseResolver<any, any, any>,
): HttpResponseResolver<any, any, any> {
  return (input) => {
    const { request } = input

    request.headers.set('Access-Control-Allow-Origin', '*')
    request.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    )
    request.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    )

    return resolver(input)
  }
}
