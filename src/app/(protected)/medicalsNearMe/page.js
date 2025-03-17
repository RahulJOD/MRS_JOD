'use client';
import Greeting from '@/components/dashboard/Greeting';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsHospital } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { TbAlertHexagon } from 'react-icons/tb';
import { Alert, AlertTitle } from '@/components/ui/alert';

const MedicalsNearMe = () => {
  const { data } = useSession();
  const userFirstName = data?.user?.name ? data.user.name.split(' ')[0] : '';

  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);

  const getCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setIsLocationPermissionGranted(true);
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      localStorage.setItem('medical_lat', lat);
      localStorage.setItem('medical_long', long);
      localStorage.setItem('medicalLocationPermission', true);
    });
  };

  const checkLocationPermission = () => {
    if (localStorage.getItem('medicalLocationPermission') === 'true') {
      setIsLocationPermissionGranted(true);
    } else {
      alert('We need Location Permission to work, Please allow us');
      getCurrentUserLocation();
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      getCurrentUserLocation();
    } else {
      checkLocationPermission();
    }
  }, []);

  const openNearbyMedicals = () => {
    window.open(
      `https://www.google.com/maps/search/medicals/@${localStorage.getItem(
        'medical_lat'
      )},${localStorage.getItem('medical_long')}`,
      '_blank'
    );
  };

  return (
    <div>
      {!isLocationPermissionGranted && (
        <Alert>
          <TbAlertHexagon className='h-4 w-4' />
          <AlertTitle>
            Please allow location permission to use these features.
          </AlertTitle>
        </Alert>
      )}
      <Greeting userFirstName={userFirstName} />
      <p className='my-2'>Find nearby medical stores instantly</p>
      <div className='border shadow-sm border-gray-200 rounded-xl'>
        <button
          onClick={openNearbyMedicals}
          className='cursor-pointer p-3 text-center w-full flex flex-row justify-between items-center gap-2 rounded-xl'
        >
          <div className='flex flex-row justify-start items-center gap-2 '>
            <BsHospital className='text-lg text-rose-600' />
            Medical Stores
          </div>
          <FaLocationArrow className='text-lg' />
        </button>
      </div>
    </div>
  );
};

export default MedicalsNearMe;
