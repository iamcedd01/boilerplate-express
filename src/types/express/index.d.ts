declare global {
  namespace Express {
    interface Request {
      currentUser?: Record<string, unknown>;
    }
  }
}
