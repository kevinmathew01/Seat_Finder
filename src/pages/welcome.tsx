import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Train, Bus, Navigation, ArrowRight } from 'lucide-react';

export function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
            <nav className="bg-white/10 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <MessageSquare className="w-8 h-8 text-white" />
                            <span className="ml-2 text-xl font-bold text-white">Seat Finder</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
                            <Link
                                to="/signup"
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Book Your Journey with AI Assistant
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Experience the future of travel booking with our AI-powered chatbot.
                        Quick, easy, and personalized booking for all your transportation needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                            <Train className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Train Tickets</h3>
                        <p className="text-blue-100">Book train tickets across the country with real-time availability and instant confirmation.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                            <Bus className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Bus Tickets</h3>
                        <p className="text-blue-100">Find and book bus tickets for any route with our extensive network of bus operators.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                            <Navigation className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Smart Routes</h3>
                        <p className="text-blue-100">Get AI-powered suggestions for the best routes and combinations for your journey.</p>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        to="/signup"
                        className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Get Started
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                <div className="mt-24 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Travel Planning"
                            className="rounded-xl shadow-2xl"
                        />
                    </div>
                    <div className="text-white">
                        <h2 className="text-3xl font-bold mb-6">Why Choose Seat Finder?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 mt-1">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">24/7 AI Assistant</h3>
                                    <p className="text-blue-100">Our AI chatbot is always ready to help you find and book the perfect journey.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 mt-1">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Smart Recommendations</h3>
                                    <p className="text-blue-100">Get personalized travel suggestions based on your preferences and history.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-blue-500/20 p-2 rounded-lg mr-3 mt-1">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Instant Booking</h3>
                                    <p className="text-blue-100">Book your tickets in seconds with our streamlined chatbot interface.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}