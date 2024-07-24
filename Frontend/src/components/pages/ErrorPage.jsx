import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div class="text-center mt-20">
        <h1 class="mb-4 text-6xl font-semibold text-[#C12A2A]">404</h1>
        <p class="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
        <div class="animate-bounce">
          <svg class="mx-auto h-16 w-16 text-[#C12A2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p class="mt-4 text-gray-600">Let's get you back <Link to="/" class="text-blue-500 underline">home</Link>.</p>
      </div>
    )
}

export default ErrorPage
