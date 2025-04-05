import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen py-12 px-6 md:px-16 lg:px-32">
    <div className="max-w-4xl mx-auto bg-gray-200 shadow-lg rounded-2xl p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Welcome to <span className="font-semibold text-gray-900">Styles</span>, your number one source for quality products.
        We are dedicated to giving you the very best shopping experience, with a focus on dependability, customer service, and uniqueness.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Founded in 2025, <span className="font-semibold text-gray-900">Styles</span> has come a long way from its beginnings.
        Our passion for excellence drove us to start our own business, and we are thrilled to be a part of the e-commerce industry.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments,
        please don’t hesitate to contact us.
      </p>
      <div className="mt-6 text-center">
        <button className="bg-gray-900 text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-700 transition-all">
          Contact Us
        </button>
      </div>
    </div>
  </div>
  )
}

export default About