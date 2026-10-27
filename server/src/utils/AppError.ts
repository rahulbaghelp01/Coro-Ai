// 1. "extends Error" makes this class inherit all native JavaScript error traits 
// (like generating a stack trace showing exactly which line of code broke).
export class AppError extends Error {

  // 2. The constructor runs every time you type "new AppError(...)".
  // It demands a 'message' string, and defaults the status code to 400 if you don't provide one.
  constructor(message: string, public statusCode = 400) {
    
    // 3. "super(message)" passes the text message up to the built-in JavaScript Error class.
    // This makes sure standard error features work correctly.
    super(message)
  }
}