import React from 'react'

const Contact = () => {
  const onsubmithandler=async(event)=>{
    event.preventDefault();
   
 }
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen py-12 px-6 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4 text-center">
          Have any questions? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
        </p>
        <form  onSubmit={onsubmithandler}className="space-y-4">
          <div>
            <label className="block text-gray-900 font-semibold">Name</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700" placeholder="Your Email" />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold">Message</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700" rows="5" placeholder="Your Message"></textarea>
          </div>
          <div className="text-center">
            <button className="bg-gray-900 text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-700 transition-all">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact