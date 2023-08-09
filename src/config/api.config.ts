const isProduction = process.env.NODE_ENV === "production";

export const BASE_URL =
    process.env.REACT_APP_API_BASE_URL || isProduction
        ? "https://todo-app-vercel-iota.vercel.app"
        : "http://localhost:8182";