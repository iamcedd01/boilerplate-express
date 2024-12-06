import Facility from '@models/partners/facility.model';
import UtilCounter from '@models/utils/utilCounter.model';

export const getFacilityDropdownSearch = async (searchString: string) => {
  await UtilCounter.find();

  return await Facility.find(
    {
      $or: [
        { id: { $regex: searchString, $options: 'i' } },
        { name: { $regex: searchString, $options: 'i' } },
        { fullAddress: { $regex: searchString, $options: 'i' } },
      ],
    },
    { id: 1, name: 1, fullAddress: 1 },
    { limit: 25 }
  );
};
