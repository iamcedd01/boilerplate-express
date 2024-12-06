// doctors.forEach(async ({ id, profile, address }) => {
//     const fullName = [
//       profile.firstName?.trim(),
//       profile.middleName?.trim(),
//       profile.lastName?.trim(),
//       profile.suffix?.trim(),
//     ]
//       .filter((v) => !!v)
//       .join(' ');

//     const newProfile = {
//       firstName: profile.firstName?.trim(),
//       middleName: profile.middleName?.trim(),
//       lastName: profile.lastName?.trim(),
//       suffix: profile.suffix?.trim(),
//     };

//     const addressLine1 = [
//       address?.unitNo ?? '',
//       address?.floor ?? '',
//       address?.buildingNo ?? '',
//       address?.buildingName ?? '',
//       address?.street ?? '',
//     ]
//       .filter((v) => !!v)
//       .join(' ');

//     const addressLine2 = [address?.barangay, address?.city, address?.province, address?.region]
//       .filter((v) => !!v && v !== 'NA')
//       .join(', ');

//     const fullAddress = [addressLine1, addressLine2, address?.zip, address?.country].filter((v) => !!v).join(' ');

//     console.log({ id, fullName, fullAddress, newProfile });

//     await Doctor.findOneAndUpdate({ id }, { fullName, fullAddress, profile: newProfile });
//   });

// router.get('/seed-data', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { search } = req.query;

//       const doctors = await Doctor.find();

//       doctors.forEach(async ({ id, address, profile, specializations }) => {
//         const newSpecializations = specializations.filter((s) => !!s.name);

//         //   console.log({ newSpecializations });

//         const newProfile = {
//           firstName: profile.firstName?.trim(),
//           middleName: profile.middleName?.trim(),
//           lastName: profile.lastName?.trim(),
//           suffix: profile.suffix?.trim(),
//         };

//         console.log({ id, newProfile });

//         const addressLine1 = [
//           address?.unitNo ?? '',
//           address?.floor ?? '',
//           address?.buildingNo ?? '',
//           address?.buildingName ?? '',
//           address?.street ?? '',
//         ]
//           .filter((v) => !!v)
//           .join(' ');

//         const addressLine2 = [address?.barangay, address?.city, address?.province, address?.region]
//           .filter((v) => !!v && v !== 'NA')
//           .join(', ');

//         const fullAddress = [addressLine1, addressLine2, address?.zip, address?.country].filter((v) => !!v).join(' ');

//         await Doctor.findOneAndUpdate(
//           { id },
//           {
//             'profile.firstName': profile.firstName?.trim(),
//             'profile.middleName': profile.middleName?.trim(),
//             'profile.lastName': profile.lastName?.trim(),
//             'profile.suffix': profile.suffix?.trim(),
//           }
//         );
//       });

//       return res.json(doctors);
//     } catch (err) {
//       next(err);
//     }
//   });
