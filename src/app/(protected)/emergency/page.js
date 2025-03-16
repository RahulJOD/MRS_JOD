'use client';

import { toast } from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/config/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const EmergencyData = () => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  
  const [emergencyData, setEmergencyData] = useState({
    name: '',
    contact: '',
    address: '',
    sex: 'not-set',
    organDonor: 'not-set',
    medicalConditions: '',
    medications: '',
    allergiesAndReactions: '',
    remarks: '',
    location: { lat: null, lon: null },
  });

  const loadEmergencyData = async (data) => {
    setLoading(true);
    if (data?.user?.email) {
      const docRef = doc(db, 'emergencyData', data?.user?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmergencyData(docSnap.data());
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEmergencyData(data);
  }, [data]);

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setEmergencyData((prev) => ({
          ...prev,
          location: { lat: latitude, lon: longitude },
        }));

        const docRef = doc(db, 'emergencyData', data?.user?.email);
        await setDoc(docRef, { ...emergencyData, location: { lat: latitude, lon: longitude } }, { merge: true });

        toast.success('Location shared successfully!');
      },
      (error) => {
        toast.error('Failed to get location: ' + error.message);
      }
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const docRef = collection(db, 'emergencyData');
    setLoading(true);
    setDoc(doc(docRef, data?.user?.email), { ...emergencyData })
      .then(() => {
        window.location.href = '/dashboard';
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <h1 className='mb-2'>Your Emergency Data</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 accent-pink-400'>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            disabled={loading}
            value={emergencyData.name}
            onChange={(e) => setEmergencyData({ ...emergencyData, name: e.target.value })}
          />
        </div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='contact'>Contact</Label>
          <Input
            type='tel'
            id='contact'
            disabled={loading}
            value={emergencyData.contact}
            onChange={(e) => setEmergencyData({ ...emergencyData, contact: e.target.value })}
          />
        </div>
        
        <button
          type='button'
          disabled={loading}
          className='bg-green-500 text-white font-semibold p-2 w-full flex justify-center items-center gap-2 rounded-md'
          onClick={async () => {
            await shareLocation();
            window.location.href = 'tel:' + emergencyData.contact;
          }}
        >
          {loading && <BiLoaderAlt className='text-xl animate-spin' />} Call Emergency Contact
        </button>
      </form>
    </div>
  );
};

export default EmergencyData;
