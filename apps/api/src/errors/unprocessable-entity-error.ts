export class UnprocessableEntityError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unprocessable Entity')
  }
}
