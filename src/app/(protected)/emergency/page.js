'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { FaChevronRight, FaHospital } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { MdEmergency } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/Toast';
import { useSession } from 'next-auth/react';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '@/config/firebase';
import Greeting from '@/components/dashboard/Greeting';

const Emergency = () => {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

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

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div>
      <Greeting userFirstName={userFirstName} />
      <h3 className='text-lg mb-2'>Emergency Contacts</h3>
      <div className='border shadow-sm border-gray-200 rounded-xl'>
        <div className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'>
          <div className='flex flex-row justify-start items-center gap-2'>
            <FaPerson className='text-lg text-emerald-600' />
            Family
          </div>
          <button onClick={() => handleCall(emergencyData?.contact)}>
            <FiPhoneCall className='text-lg' />
          </button>
        </div>
        <hr />
        <div className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'>
          <div className='flex flex-row justify-start items-center gap-2'>
            <MdEmergency className='text-lg text-rose-600' />
            Emergency
          </div>
          <button onClick={() => handleCall('7827170170')}>
            <FiPhoneCall className='text-lg' />
          </button>
        </div>
        <hr />
        <div className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'>
          <div className='flex flex-row justify-start items-center gap-2'>
            <FaHospital className='text-lg text-amber-600' />
            Hospital
          </div>
          <button onClick={() => handleCall('108')}>
            <FiPhoneCall className='text-lg' />
          </button>
        </div>
      </div>

      <Link
        href='/emergency-data'
        className='cursor-pointer border shadow-sm border-gray-200 rounded-xl font-semibold px-2 py-3 text-center w-full flex flex-row justify-start items-center gap-2'
      >
        View/Update Emergency Data
      </Link>
    </div>
  );
};

export default Emergency;
