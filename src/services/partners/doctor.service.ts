import Doctor from '@models/partners/doctor.model';

export const getDoctorDropdownSearch = async (searchString: string) => {
  return await Doctor.find(
    {
      $or: [
        { id: { $regex: searchString, $options: 'i' } },
        { fullName: { $regex: searchString, $options: 'i' } },
        { fullAddress: { $regex: searchString, $options: 'i' } },
      ],
    },
    { id: 1, name: '$fullName', fullAddress: 1 },
    { limit: 25 }
  );
};
