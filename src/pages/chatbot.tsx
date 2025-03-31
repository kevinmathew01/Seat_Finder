import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Ticket, Train, Bus } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPDF from './TicketPDF';

// Initialize Gemini AI with the correct configuration
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

type Booking = {
    type: 'bus' | 'train';
    name: string;
    from: string;
    to: string;
    date: string;
    time: string;
    stations: string[];
    fare: number;
    passengerName: string;
    passengerCount: number;
};


const busData = [
    {
        "name": "Bus 1",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "06:30",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 236
    },
    {
        "name": "Bus 2",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "08:54",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 241
    },
    {
        "name": "Bus 3",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "19:31",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 196
    },
    {
        "name": "Bus 4",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "10:47",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 268
    },
    {
        "name": "Bus 5",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "12:36",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 69
    },
    {
        "name": "Bus 6",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "19:43",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 164
    },
    {
        "name": "Bus 7",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "07:18",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 263
    },
    {
        "name": "Bus 8",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "20:00",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 265
    },
    {
        "name": "Bus 9",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "14:50",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 236
    },
    {
        "name": "Bus 10",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "06:24",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 30
    }
];

const trainData = [



    {
        "name": "Train 1",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "19:31",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 163
    },
    {
        "name": "Train 2",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "18:02",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 390
    },
    {
        "name": "Train 3",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "10:07",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 278
    },
    {
        "name": "Train 4",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "19:37",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 143
    },
    {
        "name": "Train 5",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "16:56",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 420
    },
    {
        "name": "Train 6",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "12:19",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 247
    },
    {
        "name": "Train 7",
        "start": "Kanjirapally",
        "end": "Kottayam",
        "timing": "18:11",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam"
        ],
        "fare": 336
    },
    {
        "name": "Train 8",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "16:02",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 204
    },
    {
        "name": "Train 9",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "07:19",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 337
    },
    {
        "name": "Train 10",
        "start": "Kanjirapally",
        "end": "Thiruvananthapuram",
        "timing": "13:40",
        "stations": [
            "Kanjirapally",
            "Pala",
            "Ettumanoor",
            "Kottayam",
            "Changanassery",
            "Thiruvalla",
            "Chengannur",
            "Mavelikara",
            "Kayamkulam",
            "Kollam",
            "Thiruvananthapuram"
        ],
        "fare": 272
    }
];


function App() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hello! I\'m your AI travel assistant. I can help you book bus or train tickets. You can tell me your travel plans in natural language like:\n\n"Book a bus from Kanjirapally to Thiruvananthapuram for 2 people named Neil Mown for tomorrow morning"\n\nOr you can go through step-by-step booking if you prefer.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [bookingData, setBookingData] = useState<Booking | null>(null);
    const [availableOptions, setAvailableOptions] = useState<any[]>([]);
    const [bookingStep, setBookingStep] = useState<'type' | 'route' | 'details' | 'passenger' | 'confirmation' | 'completed' | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const extractBookingDetails = async (text: string): Promise<Partial<Booking> | null> => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = `
      Extract travel booking details from the following text. Return ONLY a JSON object with the following possible fields:
      - type (either "bus" or "train")
      - from (departure location)
      - to (destination)
      - date (in YYYY-MM-DD format if mentioned)
      - time (in HH:MM format if mentioned)
      - passengerName
      - passengerCount (number)
      
      If any field is not mentioned, exclude it from the JSON. Today's date is ${new Date().toISOString().split('T')[0]}.
      
      Text: "${text}"
      
      Example response for "Book a bus from Kanjirapally to Kottayam for tomorrow at 10am for 2 people named Alice":
      {
        "type": "bus",
        "from": "Kanjirapally",
        "to": "Kottayam",
        "date": "${new Date(Date.now() + 86400000).toISOString().split('T')[0]}",
        "time": "10:00",
        "passengerName": "Alice",
        "passengerCount": 2
      }
      `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = response.text();

            // Extract JSON from the response
            const jsonStart = responseText.indexOf('{');
            const jsonEnd = responseText.lastIndexOf('}') + 1;
            const jsonString = responseText.slice(jsonStart, jsonEnd);

            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error extracting details:', error);
            return null;
        }
    };

    const findTravelOptions = (type: 'bus' | 'train', from: string, to: string, time?: string) => {
        const data = type === 'bus' ? busData : trainData;

        // First try exact matches
        let options = data.filter(option =>
            option.start.toLowerCase().includes(from.toLowerCase()) &&
            option.end.toLowerCase().includes(to.toLowerCase())
        );

        // If no exact matches, try partial matches
        if (options.length === 0) {
            options = data.filter(option =>
                option.start.toLowerCase().startsWith(from.toLowerCase()) &&
                option.end.toLowerCase().startsWith(to.toLowerCase())
            );
        }

        // Filter by time if specified
        if (time) {
            options = options.filter(option =>
                option.timing.includes(time) ||
                Math.abs(parseInt(option.timing.split(':')[0]) - parseInt(time.split(':')[0])) <= 2
            );
        }

        return options;
    };

    const handleBooking = async (userMessage: string) => {
        // Try to extract all booking details at once
        const extractedDetails = await extractBookingDetails(userMessage);

        if (extractedDetails) {
            // If we got at least from and to, proceed with booking
            if (extractedDetails.from && extractedDetails.to) {
                const type = extractedDetails.type || 'bus'; // default to bus
                const options = findTravelOptions(
                    type,
                    extractedDetails.from,
                    extractedDetails.to,
                    extractedDetails.time
                );

                if (options.length === 0) {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: `Sorry, I couldn't find any ${type} routes from ${extractedDetails.from} to ${extractedDetails.to}. Please try different locations.`
                    }]);
                    setBookingStep(null);
                    return true;
                }

                // Auto-select the first option if time is specified
                const selectedOption = extractedDetails.time && options.length > 0 ?
                    options.reduce((prev, curr) =>
                        Math.abs(parseInt(curr.timing.split(':')[0]) - parseInt(extractedDetails.time!.split(':')[0])) <
                            Math.abs(parseInt(prev.timing.split(':')[0]) - parseInt(extractedDetails.time!.split(':')[0])) ?
                            curr : prev
                    ) :
                    options[0];

                const booking: Booking = {
                    type,
                    name: selectedOption.name,
                    from: extractedDetails.from,
                    to: extractedDetails.to,
                    date: extractedDetails.date || new Date().toISOString().split('T')[0],
                    time: selectedOption.timing,
                    stations: selectedOption.stations,
                    fare: selectedOption.fare,
                    passengerName: extractedDetails.passengerName || '',
                    passengerCount: extractedDetails.passengerCount || 1
                };

                setBookingData(booking);
                setAvailableOptions(options);
                setBookingStep('details');

                let response = `I found a ${type} option for your trip:\n`;
                response += `• ${selectedOption.name} - Departs at ${selectedOption.timing} (Fare: ₹${selectedOption.fare})\n`;
                response += `• Route: ${selectedOption.stations.join(' → ')}\n\n`;

                if (!extractedDetails.passengerName) {
                    response += "Please provide the passenger name to complete booking:";
                    setBookingStep('passenger');
                    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                    return true;
                } else if (!extractedDetails.passengerCount) {
                    response += `Passenger: ${extractedDetails.passengerName}\n`;
                    response += "Please confirm number of passengers:";
                    setBookingStep('passenger');
                    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                    return true;
                } else {
                    // All details are present, show confirmation
                    const totalFare = selectedOption.fare * (extractedDetails.passengerCount || 1);
                    response += `Booking summary:\n` +
                        `Passenger: ${extractedDetails.passengerName}\n` +
                        `Passengers: ${extractedDetails.passengerCount}\n` +
                        `Service: ${selectedOption.name}\n` +
                        `From: ${extractedDetails.from} to ${extractedDetails.to}\n` +
                        `Date: ${booking.date}\n` +
                        `Departure: ${selectedOption.timing}\n` +
                        `Total Fare: ₹${totalFare}\n\n` +
                        "Type 'confirm' to proceed or 'cancel' to start over.";

                    setBookingStep('confirmation');
                    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                    return true;
                }
            }
        }

        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // First try to handle booking
            const handledInBookingFlow = await handleBooking(userMessage);
            if (handledInBookingFlow) {
                setIsLoading(false);
                return;
            }

            // If not in booking flow, check if user is trying to confirm/cancel
            const lowerMessage = userMessage.toLowerCase();
            if (bookingData) {
                if (lowerMessage.includes('confirm')) {
                    const totalFare = bookingData.fare * bookingData.passengerCount;
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: `Booking confirmed! Total fare: ₹${totalFare}\nGenerating your ticket now...`
                    }]);
                    setBookingStep('completed');
                    setIsLoading(false);
                    return;
                } else if (lowerMessage.includes('cancel')) {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: "Booking cancelled. Would you like to search for another trip?"
                    }]);
                    setBookingData(null);
                    setBookingStep(null);
                    setIsLoading(false);
                    return;
                }
            }

            // Handle passenger name input
            if (bookingStep === 'passenger' && bookingData && !bookingData.passengerName) {
                setBookingData({ ...bookingData, passengerName: userMessage });
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "Thank you. How many passengers are traveling? (Enter a number)"
                }]);
                setIsLoading(false);
                return;
            }

            // Handle passenger count input
            if (bookingStep === 'passenger' && bookingData && bookingData.passengerName && !isNaN(parseInt(userMessage))) {
                const count = parseInt(userMessage);
                const totalFare = bookingData.fare * count;
                setBookingData({ ...bookingData, passengerCount: count });
                setBookingStep('confirmation');
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `Booking summary:\n` +
                        `Passenger: ${bookingData.passengerName}\n` +
                        `Passengers: ${count}\n` +
                        `Service: ${bookingData.name}\n` +
                        `From: ${bookingData.from} to ${bookingData.to}\n` +
                        `Date: ${bookingData.date}\n` +
                        `Departure: ${bookingData.time}\n` +
                        `Total Fare: ₹${totalFare}\n\n` +
                        "Type 'confirm' to proceed or 'cancel' to start over."
                }]);
                setIsLoading(false);
                return;
            }

            // If not handling booking, use AI for general conversation
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const chat = model.startChat({
                history: messages.map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(userMessage);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'assistant', content: text }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I apologize, but I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <header className="bg-white shadow-sm p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-2">
                    <Bot className="w-8 h-8 text-indigo-600" />
                    <h1 className="text-xl font-bold text-gray-900">Seat Finder</h1>
                </div>
            </header>

            <main className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'
                                }`}
                        >
                            {message.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-indigo-600" />
                                </div>
                            )}
                            <div
                                className={`rounded-lg p-4 max-w-[80%] ${message.role === 'assistant'
                                    ? 'bg-white shadow-sm'
                                    : 'bg-indigo-600 text-white'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                    {bookingData && bookingStep === 'completed' && (
                        <div className="flex justify-center mt-4">
                            <PDFDownloadLink
                                document={<TicketPDF booking={bookingData} />}
                                fileName={`ticket-${bookingData.name}-${new Date().toISOString().slice(0, 10)}.pdf`}
                                className="bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition flex items-center gap-2"
                            >
                                {({ loading }) => (
                                    <>
                                        <Ticket className="w-5 h-5" />
                                        {loading ? 'Preparing ticket...' : 'Download Ticket'}
                                    </>
                                )}
                            </PDFDownloadLink>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg border border-gray-300 p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-indigo-600 text-white rounded-lg px-6 py-4 hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </main>
        </div>
    );
}

export default App;