import { faker } from '@faker-js/faker/locale/en_US';
import Doctor from '@models/partners/doctor.model';
import UtilCounter from '@models/utils/utilCounter.model';
import mongoose, { ConnectOptions } from 'mongoose';

// Seed constants
const NUM_DOCTORS = 10000;

// Enums for various fields
const EDoctorType = ['Doctor'];
const EDoctorStatus = ['Active'];
const ECommonGender = ['Male', 'Female'];
const ECommonCivilStatus = ['Single', 'Married', 'Divorced', 'Widowed'];
const EDoctorAffiliationStatus = ['Approved'];
const EDoctorSpecializationType = ['Primary', 'Secondary', 'Other'];

// Sample specializations
const SPECIALIZATIONS = [
  { code: 'GP', name: 'General Practitioner', type: 'Primary' },
  { code: 'INTM', name: 'Internal Medicine', type: 'Primary' },
  { code: 'PED', name: 'Pediatrics', type: 'Primary' },
  { code: 'GER', name: 'Geriatrics', type: 'Primary' },
  { code: 'PM', name: 'Preventive Medicine', type: 'Primary' },

  { code: 'GENS', name: 'General Surgery', type: 'Surgical' },
  { code: 'CTS', name: 'Cardiothoracic Surgery', type: 'Surgical' },
  { code: 'NS', name: 'Neurosurgery', type: 'Surgical' },
  { code: 'ORTHS', name: 'Orthopedic Surgery', type: 'Surgical' },
  { code: 'PLRS', name: 'Plastic and Reconstructive Surgery', type: 'Surgical' },
  { code: 'ENTS', name: 'ENT Surgery', type: 'Surgical' },
  { code: 'OPHS', name: 'Ophthalmology Surgery', type: 'Surgical' },
  { code: 'URS', name: 'Urology Surgery', type: 'Surgical' },
  { code: 'VS', name: 'Vascular Surgery', type: 'Surgical' },
  { code: 'CRS', name: 'Colorectal Surgery', type: 'Surgical' },

  { code: 'CARD', name: 'Cardiology', type: 'Subspecialty' },
  { code: 'ENDO', name: 'Endocrinology', type: 'Subspecialty' },
  { code: 'GAST', name: 'Gastroenterology', type: 'Subspecialty' },
  { code: 'HEME', name: 'Hematology', type: 'Subspecialty' },
  { code: 'NEPH', name: 'Nephrology', type: 'Subspecialty' },
  { code: 'NEUR', name: 'Neurology', type: 'Subspecialty' },
  { code: 'ONCO', name: 'Oncology', type: 'Subspecialty' },
  { code: 'PULM', name: 'Pulmonology', type: 'Subspecialty' },
  { code: 'RHEUM', name: 'Rheumatology', type: 'Subspecialty' },
  { code: 'ID', name: 'Infectious Diseases', type: 'Subspecialty' },
  { code: 'AIMM', name: 'Allergy and Immunology', type: 'Subspecialty' },

  { code: 'RAD', name: 'Radiology', type: 'Diagnostic' },
  { code: 'PATH', name: 'Pathology', type: 'Diagnostic' },
  { code: 'NUCM', name: 'Nuclear Medicine', type: 'Diagnostic' },
  { code: 'CLBIO', name: 'Clinical Biochemistry', type: 'Diagnostic' },

  { code: 'OBGY', name: 'Obstetrics and Gynecology', type: 'Women\'s Health' },
  { code: 'REPRO', name: 'Reproductive Endocrinology and Infertility', type: 'Women\'s Health' },

  { code: 'PEDCARD', name: 'Pediatric Cardiology', type: 'Children\'s Health' },
  { code: 'PEDENDO', name: 'Pediatric Endocrinology', type: 'Children\'s Health' },
  { code: 'PEDGAST', name: 'Pediatric Gastroenterology', type: 'Children\'s Health' },
  { code: 'PEDONCO', name: 'Pediatric Oncology', type: 'Children\'s Health' },
  { code: 'PEDNEUR', name: 'Pediatric Neurology', type: 'Children\'s Health' },

  { code: 'PSYC', name: 'Psychiatry', type: 'Mental Health' },
  { code: 'CAPSYC', name: 'Child and Adolescent Psychiatry', type: 'Mental Health' },
  { code: 'FPSYC', name: 'Forensic Psychiatry', type: 'Mental Health' },
  { code: 'ADDP', name: 'Addiction Psychiatry', type: 'Mental Health' },
  { code: 'PSYTX', name: 'Psychotherapy', type: 'Mental Health' },

  { code: 'EMED', name: 'Emergency Medicine', type: 'Critical Care' },
  { code: 'CCMED', name: 'Critical Care Medicine', type: 'Critical Care' },
  { code: 'TRS', name: 'Trauma Surgery', type: 'Critical Care' },
  { code: 'ANES', name: 'Anesthesiology', type: 'Critical Care' },

  { code: 'OPTH', name: 'Ophthalmology', type: 'Eye and Vision' },
  { code: 'OPT', name: 'Optometry', type: 'Eye and Vision' },
  { code: 'OCP', name: 'Oculoplastic Surgery', type: 'Eye and Vision' },

  { code: 'ENT', name: 'Otolaryngology', type: 'ENT' },
  { code: 'AUD', name: 'Audiology', type: 'ENT' },
  { code: 'LARY', name: 'Laryngology', type: 'ENT' },
  { code: 'RHINO', name: 'Rhinology', type: 'ENT' },

  { code: 'DENT', name: 'Dentistry', type: 'Dental and Oral Health' },
  { code: 'OMS', name: 'Oral and Maxillofacial Surgery', type: 'Dental and Oral Health' },
  { code: 'ORTHOD', name: 'Orthodontics', type: 'Dental and Oral Health' },
  { code: 'PERIO', name: 'Periodontics', type: 'Dental and Oral Health' },
  { code: 'PROSTHO', name: 'Prosthodontics', type: 'Dental and Oral Health' },
  { code: 'ENDO', name: 'Endodontics', type: 'Dental and Oral Health' },
  { code: 'PEDDENT', name: 'Pediatric Dentistry', type: 'Dental and Oral Health' },

  { code: 'PMR', name: 'Physical Medicine and Rehabilitation', type: 'Rehabilitation' },
  { code: 'PHYS', name: 'Physiotherapy', type: 'Rehabilitation' },
  { code: 'OT', name: 'Occupational Therapy', type: 'Rehabilitation' },
  { code: 'SLT', name: 'Speech and Language Therapy', type: 'Rehabilitation' },

  { code: 'DERM', name: 'Dermatology', type: 'Dermatology' },
  { code: 'PDERM', name: 'Pediatric Dermatology', type: 'Dermatology' },
  { code: 'DPATH', name: 'Dermatopathology', type: 'Dermatology' },
  { code: 'COSMD', name: 'Cosmetic Dermatology', type: 'Dermatology' },

  { code: 'SPRT', name: 'Sports Medicine', type: 'Other' },
  { code: 'PC', name: 'Palliative Care', type: 'Other' },
  { code: 'GEN', name: 'Genetics', type: 'Other' },
  { code: 'SM', name: 'Sleep Medicine', type: 'Other' },
  { code: 'PM', name: 'Pain Management', type: 'Other' },
  { code: 'OM', name: 'Occupational Medicine', type: 'Other' },
  { code: 'CLPH', name: 'Clinical Pharmacology', type: 'Other' },
  { code: 'TOX', name: 'Medical Toxicology', type: 'Other' },
  { code: 'HYP', name: 'Hyperbaric Medicine', type: 'Other' },
];

export async function run() {
  try {
    const dbURI = 'mongodb://localhost:27017';

    const options: ConnectOptions = {
      autoIndex: true,
      bufferCommands: false, // If not connected, return errors immediately rather than waiting for reconnect
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      maxPoolSize: 10, // Maintain up to 10 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    await mongoose.connect(dbURI, options);
    mongoose.set('strictQuery', true);
    // await mongoose.connect('mongodb://localhost:27017/yourdatabase', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    console.log('Connected to MongoDB. Seeding doctors...');

    const doctors = [];
    const pad = '0000000';

    const doctorCount = await UtilCounter.findOne({ name: 'Doctor' });
    let counter = doctorCount?.value as number;

    for (let i = 0; i < NUM_DOCTORS; i++) {
      const firstName = faker.person.firstName();
      const middleName = faker.person.middleName();
      const lastName = faker.person.lastName();
      const suffix = faker.person.suffix();

      doctors.push({
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        id: `MDR${(pad + counter).slice(-pad.length)}`,
        type: faker.helpers.arrayElement(EDoctorType),
        status: faker.helpers.arrayElement(EDoctorStatus),
        fullName: `${firstName} ${middleName} ${lastName} ${suffix}`.trim(),
        profile: {
          firstName,
          middleName,
          lastName,
          suffix,
          birthDate: faker.date.birthdate({ min: 30, max: 70, mode: 'age' }),
          gender: faker.helpers.arrayElement(ECommonGender),
          civilStatus: faker.helpers.arrayElement(ECommonCivilStatus),
          emailAddress: faker.internet.email({ firstName, lastName, provider: 'yopmail' }),
          contactNumber: faker.phone.number(),
        },
        fullAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}, ${faker.location.country()}`,
        affiliationDetails: {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          id: `AFN${(pad + counter).slice(-pad.length)}`,
          stage: [
            {
              name: 'ApplicationSubmitted',
              date: faker.date.past(),
            },
            {
              name: 'ContractSigned',
              date: faker.date.recent(),
            },
          ],
          status: faker.helpers.arrayElement(EDoctorAffiliationStatus),
        },
        licenseDetails: [
          {
            id: `PRC-${faker.number.int({ min: 100000, max: 999999 })}`,
            expiryDate: faker.date.future(),
            type: 'PRC',
          },
        ],
        philhealthDetails: {
          philhealthNumber: `PH-${faker.number.int({ min: 100000, max: 999999 })}`,
        },
        remarks: {
          external: faker.lorem.sentence(),
          internal: faker.lorem.sentence(),
        },
        specializations: faker.helpers
          .arrayElements(SPECIALIZATIONS, faker.number.int({ min: 1, max: 3 }))
          .map((spec) => ({
            code: spec.code,
            name: spec.name,
            type: faker.helpers.arrayElement(EDoctorSpecializationType),
          })),
      });

      counter++;
    }

    await UtilCounter.findOneAndUpdate({ name: 'Doctor' }, { value: counter });

    // Insert doctors into MongoDB
    await Doctor.insertMany(doctors);
    console.log(`${NUM_DOCTORS} doctors seeded successfully.`);
    // await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding doctors:', error);
    // await mongoose.disconnect();
  }
}
