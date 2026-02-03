import {
    MdEmail,
    MdHelpOutline,
    MdPhone,
    MdSupportAgent,
} from "react-icons/md";

const Help = () => {
    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Help & Support
                </h1>
                <p className="mt-2 text-gray-600">
                    Need assistance? Find answers or contact our support team.
                </p>
            </div>

            {/* FAQ */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                    <MdHelpOutline className="text-2xl text-blue-600" />
                    <h2 className="text-xl font-medium text-gray-800">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="bg-white border rounded-xl shadow-sm divide-y">
                    <div className="p-5">
                        <h3 className="font-semibold text-gray-700">
                            How do I manage products?
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Go to the Products section from the sidebar to add, edit,
                            delete, or hide products.
                        </p>
                    </div>

                    <div className="p-5">
                        <h3 className="font-semibold text-gray-700">
                            Who can access admin features?
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Only Super Admins and authorized Admin roles have access to
                            restricted features.
                        </p>
                    </div>

                    <div className="p-5">
                        <h3 className="font-semibold text-gray-700">
                            How can I reset my password?
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Use the “Forgot Password” option on the login page.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Support */}
            <div>
                <div className="flex items-center gap-2 mb-5">
                    <MdSupportAgent className="text-2xl text-green-600" />
                    <h2 className="text-xl font-medium text-gray-800">
                        Contact Support
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <MdEmail className="text-3xl text-blue-600 mb-3" />
                        <h3 className="font-semibold text-gray-800">
                            Email Support
                        </h3>
                        <a
                            href="mailto:support@yourdomain.com"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            support@yourdomain.com
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                        <MdPhone className="text-3xl text-green-600 mb-3" />
                        <h3 className="font-semibold text-gray-800">
                            Phone Support
                        </h3>
                        <a
                            href="tel:+918800099000"
                            className="text-sm text-green-600 hover:underline"
                        >
                            +91 88000 99000
                        </a>
                    </div>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    ⏰ Support Hours: Monday – Saturday, 10:00 AM – 7:00 PM
                </p>
            </div>
        </div>
    );
};

export default Help;
