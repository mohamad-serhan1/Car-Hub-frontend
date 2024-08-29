import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const aboutUs = () => {
    return (
        <div className='h-full bg-gray-200'>
            <div className=" bg-contain bg-right bg-no-repeat bg-black justify-end flex items-center relative">
                <img className='h-64 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />
                <div className='absolute left-11 bottom-16 text-white'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">About Us</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-10">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Welcome to <span className='font-bold text-orange-500'>Car Hub</span>! We are passionate about providing the best cars and services to our customers.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-700">
                        Our mission is to revolutionize the car buying and selling experience by providing a reliable platform where customers can easily purchase, sell, or rent vehicles. We aim to deliver exceptional services and build lasting relationships with our customers.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                    <p className="text-gray-700">
                        We envision a future where our platform becomes the go-to destination for all car-related needs, offering unparalleled convenience and trustworthiness. We strive to be at the forefront of innovation in the automotive industry.
                    </p>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-center">Our Values</h2>
                <ul className="list-disc list-inside text-gray-700">
                    <li className="mb-2">Integrity: We uphold the highest standards of integrity in all of our actions.</li>
                    <li className="mb-2">Customer Commitment: We develop relationships that make a positive difference in our customers' lives.</li>
                    <li className="mb-2">Innovation: We embrace innovation to meet the needs of our customers and provide a unique experience.</li>
                    <li className="mb-2">Teamwork: We work together, across boundaries, to meet the needs of our customers and help our company win.</li>
                </ul>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
                <p className="text-gray-700 mb-4">
                    Our team is comprised of dedicated professionals who are committed to delivering the best experience to our customers.
                </p>
                <div className="flex justify-center space-x-4">
                    {/* Add team member profiles here */}
                    <div className="text-center">
                        <img
                            src="/said.jpg"
                            alt="Team Member 1"
                            className="w-32 h-32 rounded-full mx-auto mb-2"
                        />
                        <p className="text-lg font-semibold">Said el Said</p>
                        <p className="text-gray-600">CEO & Founder</p>
                    </div>
                    <div className="text-center">
                        <img
                            src="/abd.jpg"
                            alt="Team Member 2"
                            className="w-32 h-32 rounded-full mx-auto mb-2"
                        />
                        <p className="text-lg font-semibold">Abdulrahim dukhan</p>
                        <p className="text-gray-600">Head of Operations</p>
                    </div>
                </div>
            </div>
        </div>
           
        </div>
    )
}

export default aboutUs