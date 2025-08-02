import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';

const FundForm = () => {
  const { user } = useUser();

  const [raisedfunds, setRaisedFunds] = useState('');
  const [referralcode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first!');
      return;
    }

    // Validate raisedfunds
    if (
      !raisedfunds ||
      isNaN(Number(raisedfunds)) ||
      Number(raisedfunds) <= 0
    ) {
      alert('Please enter a valid amount raised.');
      return;
    }

    if (!referralcode.trim()) {
      alert('Please enter a referral code.');
      return;
    }

    const payload = {
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      raisedfunds: Number(raisedfunds),
      referralcode: referralcode.trim(),
    };

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('🎉 Submitted successfully!');
        setRaisedFunds('');
        setReferralCode('');
      } else {
        alert('⚠️ Submission failed.\n' + (data.message || ''));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center text-sm text-slate-800 px-4">
      <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
        Contact Us
      </p>
      <h1 className="text-4xl font-bold py-4 text-center">
        Tell Us About Your Contributions.
      </h1>
      <p className="max-md:text-sm text-gray-500 pb-10 text-center">
        Your intern dashboard is live — monitor your progress and funds raised easily.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {/* Full Name (Autofill from Clerk) */}
        <div>
          <label className="font-medium">Full Name</label>
          <div className="flex items-center mt-2 h-10 pl-3 border border-slate-300 rounded-full">
            <input
              type="text"
              className="h-full px-2 w-full outline-none bg-transparent"
              value={user?.fullName || ''}
              readOnly
              disabled
            />
          </div>
        </div>

        {/* Email (Autofill from Clerk) */}
        <div>
          <label className="font-medium">Email Address</label>
          <div className="flex items-center mt-2 h-10 pl-3 border border-slate-300 rounded-full">
            <input
              type="email"
              className="h-full px-2 w-full outline-none bg-transparent"
              value={user?.primaryEmailAddress?.emailAddress || ''}
              readOnly
              disabled
            />
          </div>
        </div>

        {/* Donations Raised */}
        <div>
          <label className="font-medium">Donations Raised</label>
          <input
            type="number"
            className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter the amount you've raised"
            value={raisedfunds}
            onChange={(e) => setRaisedFunds(e.target.value)}
            required
            min={1}
            disabled={!user}
          />
        </div>

        {/* Referral Code */}
        <div>
          <label className="font-medium">Referral Code</label>
          <input
            type="text"
            className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="e.g. yourname2025"
            value={referralcode}
            onChange={(e) => setReferralCode(e.target.value)}
            required
            disabled={!user}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition"
          disabled={loading || !user}
        >
          {loading ? 'Submitting...' : 'Submit Form'}
          <svg
            className="mt-0.5"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33"
              fill="#fff"
            />
          </svg>
        </button>
      </form>

      <div className="h-20"></div> {/* Bottom spacing */}
    </div>
  );
};

export default FundForm;