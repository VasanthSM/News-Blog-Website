import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('Email');
    setIsLoggedIn(!!userEmail);
  }, []);

  const getUserEmail = () => localStorage.getItem('Email');

  const getSubscriptions = () => {
    const subscriptions = localStorage.getItem('subscriptions');
    return subscriptions ? JSON.parse(subscriptions) : {};
  };

  const saveSubscriptions = (subscriptions) => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  };

  const handleSubscription = async () => {
    if (!isLoggedIn) {
      setError('You must be logged in to subscribe.');
      return;
    }

    if (!selectedPlan) {
      setError('Please select a plan.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userEmail = getUserEmail();
      const subscriptions = getSubscriptions();
      const currentDate = new Date().toISOString();
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      subscriptions[userEmail] = {
        ...subscriptions[userEmail],
        [selectedPlan]: {
          startDate: currentDate,
          endDate: subscriptionEndDate.toISOString(),
        },
      };

      saveSubscriptions(subscriptions);

      console.log(`Subscribed ${userEmail} to plan: ${selectedPlan}`);
      navigate('/');
    } catch (err) {
      setError('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 md:p-8'>
      <header className='text-center mb-8'>
        <h1 className='text-3xl font-bold mb-4'>Subscribe to Our Premium Content</h1>
        <p className='text-lg'>Choose a plan that fits your needs and enjoy unrestricted access to all our news and exclusive content.</p>
      </header>

      <section className='mb-8'>
        <div className='flex flex-col md:flex-row justify-center gap-6'>
          <div className={`border rounded-md shadow-lg p-4 w-full md:w-1/3 ${selectedPlan === 'basic' ? 'border-blue-500' : ''}`}>
            <h2 className='text-2xl font-semibold mb-2'>Basic Plan</h2>
            <p className='text-xl mb-4'>$5/month</p>
            <ul className='mb-4'>
              <li>Access to daily news</li>
              <li>Weekly newsletters</li>
            </ul>
            <button onClick={() => setSelectedPlan('basic')} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
              Select Plan
            </button>
          </div>
          <div className={`border rounded-md shadow-lg p-4 w-full md:w-1/3 ${selectedPlan === 'standard' ? 'border-blue-500' : ''}`}>
            <h2 className='text-2xl font-semibold mb-2'>Standard Plan</h2>
            <p className='text-xl mb-4'>$10/month</p>
            <ul className='mb-4'>
              <li>Access to all news</li>
              <li>Ad-free experience</li>
              <li>Weekly newsletters</li>
            </ul>
            <button onClick={() => setSelectedPlan('standard')} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
              Select Plan
            </button>
          </div>
          <div className={`border rounded-md shadow-lg p-4 w-full md:w-1/3 ${selectedPlan === 'premium' ? 'border-blue-500' : ''}`}>
            <h2 className='text-2xl font-semibold mb-2'>Premium Plan</h2>
            <p className='text-xl mb-4'>$20/month</p>
            <ul className='mb-4'>
              <li>All Standard Plan features</li>
              <li>Exclusive content</li>
              <li>24/7 customer support</li>
            </ul>
            <button onClick={() => setSelectedPlan('premium')} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
              Select Plan
            </button>
          </div>
        </div>
      </section>

      <section className='text-center mb-8'>
        <button
          onClick={handleSubscription}
          disabled={loading}
          className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </section>
    </div>
  );
}

export default Subscription;
