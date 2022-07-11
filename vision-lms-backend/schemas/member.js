export default {
  name: "member",
  title: "Members",
  type: "document",
  fields: [
    {
      name: "memberNumber",
      title: "Member No.",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "branchName",
      title: "Branch Name",
      type: "string",
    },
    {
      name: "surName",
      title: "Surname",
      type: "string",
    },
    {
      name: "otherNames",
      title: "Other Names",
      type: "string",
    },
    {
      name: "dob",
      title: "DOB (dd/mm/yyyy)",
      type: "date",
    },
    {
      name: "idPass",
      title: "ID/Passport No.",
      type: "string",
    },
    {
      name: "pinNumber",
      title: "PIN No.",
      type: "string",
    },
    {
      name: "mobileNumber",
      title: "Mobile No.",
      type: "string",
    },
    {
      name: "gender",
      title: "Gender",
      type: "string",
    },
    {
      name: "age",
      title: "Age",
      type: "string",
    },
    {
      name: "religion",
      title: "Religion",
      type: "string",
    },
    {
      name: "maritalStatus",
      title: "MaritalStatus",
      type: "string",
    },
    {
      name: "nameSpouse",
      title: "Name of Spouse",
      type: "string",
    },
    {
      name: "spouseNumber",
      title: "Spouse Tel. No.",
      type: "string",
    },
    {
      name: "postalAddress",
      title: "Postal Address",
      type: "string",
    },
    {
      name: "postalCode",
      title: "Postal Code",
      type: "string",
    },
    {
      name: "cityTown",
      title: "City/Town",
      type: "string",
    },
    {
      name: "residentialAddress",
      title: "Residential Address(Attach Map)",
      type: "string",
    },
    {
      name: "emailAddress",
      title: "Email Address",
      type: "string",
    },
    {
      name: "rentedOwned",
      title: "Rented/Owned",
      type: "string",
    },
    {
      name: "landCareAgent",
      title: "Landlord/Caretaker/Agent Name",
      type: "string",
    },
    {
      name: "occupationEmployer",
      title: "Occupation/Employer",
      type: "string",
    },
    {
      name: "employerNumber",
      title: "Employer Contacts (Tel. No.)",
      type: "string",
    },
    {
      name: "businessLocation",
      title: "Location of Business(Attach Map)",
      type: "string",
    },
    {
      name: "businessAge",
      title: "Age of Business",
      type: "string",
    },
    {
      name: "refereeName",
      title: "Name of Referee",
      type: "string",
    },
    {
      name: "refereeNumber",
      title: "Referee Tel Number",
      type: "string",
    },
    {
      name: "communityPosition",
      title: "Any Position of Leadership in the Community",
      type: "string",
    },
    {
      name: "mpesaTransNumber",
      title: "Membership Fee M-PESA Transaction No.",
      type: "string",
    },
    {
      name: "mpesaAmount",
      title: "Membership Fee Amount",
      type: "string",
    },
    {
      name: "nameKin",
      title: "Name",
      type: "string",
    },
    {
      name: "relationship",
      title: "Relationship",
      type: "string",
    },
    {
      name: "residentialAddressKin",
      title: "Residential Address",
      type: "string",
    },
    {
      name: "postalAddressKin",
      title: "Postal Address",
      type: "string",
    },
    {
      name: "postalCodeKin",
      title: "Postal Code",
      type: "string",
    },
    {
      name: "cityTownKin",
      title: "City/Town",
      type: "string",
    },
    {
      name: "mobileNumberKin",
      title: "Mobile/Tel No.",
      type: "string",
    },
    {
      name: "group",
      title: "Group",
      type: "string",
    },
    {
      name: "maintained",
      title: "Maintained",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: 'collateral',
      title: 'Collaterals',
      type: 'array',
      of: [{ type: 'collateral' }],
    },
  ],
};
