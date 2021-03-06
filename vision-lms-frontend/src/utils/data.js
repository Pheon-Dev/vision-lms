export const products = [
  {
    name: 'Daily',
    image: 'https://res.cloudinary.com/drf1wghco/image/upload/v1644166500/daily_jijybe.png',
  },
  {
    name: 'Weekly',
    image: 'https://res.cloudinary.com/drf1wghco/image/upload/v1644166606/weekly_w48qfv.png',
  },
  {
    name: 'Monthly',
    image: 'https://res.cloudinary.com/drf1wghco/image/upload/v1644166605/monthly_x4blw3.png',
  },
];

export const loanPreviewQuery = (memberId, productType, principalAmount, loanTenure) => {
  const query = `*[_type == "maintenance" && memberId == "${memberId}" && productType == "${productType} && principalAmount == "${principalAmount}" && loanTenure == "${loanTenure}]{
      _id,
      productType
      , memberId
        , memberNames
        , memberPhoneNumber
      , principalAmount
      , loanTenure
  }`;
  return query;
};

export const loanFeedQuery = `*[_type == "maintenance"] | order(_createdAt desc) {
      _id,
      loanId,
      productType,
      principalAmount,
      memberId
        , memberNames
        , memberPhoneNumber
      ,loanTenure,
    } `;

export const loanDetailsQuery = (loanId) => {
  const query = `*[_type == "maintenance" && memberId == "${loanId}"]{
      _id,
      productType
      , memberId
        , memberNames
        , memberPhoneNumber
      , principalAmount
      , loanTenure
      , maintained
      , submitted
      , approved
      , disbursed
  }`;
  return query;
};

export const loanDetailQuery = (loanId) => {
  const query = `*[_type == "maintenance" && _id == "${loanId}"]{
      _id,
      productType
      , memberId
        , memberNames
        , memberPhoneNumber
      , principalAmount
      , loanTenure
      , maintained
  }`;
  return query;
};

export const memberLoanDetailQuery = (memberId) => {
  const query = `*[_type == "member" && _id == "${memberId}"]{
      _id,
      productType
      , memberId
      , principalAmount
      , loanTenure
      , interestRate
      , interestAmount
      , installments
      , processingFee
      , repaymentCycle
      , gracePeriod
      , arrears
      , penaltyAmount
  }`;
  return query;
};

export const productDetailQuery = (productType) => {
  const query = `*[_type == "newProduct" && productName == "${productType}"]{
        productName
        , productCode
        , minimumRange
        , maximumRange
        , interestRate
        , interestFrequency
        , penaltyPaymentChoice
        , penaltyTypeChoice
        , penalty
        , tenureMaximum
        , tenureMaximumChoice
        , repaymentCycle
        , processingFee
        , gracePeriod
        , product
  }`;
  return query;
};

export const memberDetailQuery = (memberId) => {
  const query = `*[_type == "member" && _id == "${memberId}"]{
    image{
      asset->{
        url
      }
    },
    _id,
    memberNumber,
    date,
    maintained,
    branchName,
    personalDetails{
      surName,
      otherNames,
      dob,
      idPass,
      pinNumber,
      mobileNumber,
      gender,
      age,
      religion,
      maritalStatus,
      spouseNumber,
      nameSpouse,
      postalAddress,
      postalCode,
      cityTown,
      residentialAddress,
      emailAddress,
      rented,
      owned,
      landCareAgent,
      occupationEmployer,
      employerNumber,
      businessLocation,
      businessAge,
      refereeName,
      group,
      communityPosition,
      mpesaTransNumber,
    },
    kinInformation{
      nameKin,
      relationship,
      residentialAddressKin,
      postalAddressKin,
      postalCodeKin,
      cityTownKin,
      mobileNumberKin,
    },
    groupInformation{
      groupName,
      groupLeaderName,
      leaderNumber,
      leaderIdNumber,
    },
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
      },
    },
    product,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const memberDetailMoreMemberQuery = (member) => {
  const query = `*[_type == "member" && product == '${member.product}' && _id != '${member._id}']{
    image{
      asset->{
        url
      }
    },
    _id,
    memberNumber,
    date,
    maintained,
    branchName,
    personalDetails{
      surName,
      otherNames,
      dob,
      idPass,
      pinNumber,
      mobileNumber,
      gender,
      age,
      religion,
      maritalStatus,
      spouseNumber,
      nameSpouse,
      postalAddress,
      postalCode,
      cityTown,
      residentialAddress,
      emailAddress,
      rented,
      owned,
      landCareAgent,
      occupationEmployer,
      employerNumber,
      businessLocation,
      businessAge,
      refereeName,
      group,
      communityPosition,
      mpesaTransNumber,
    },
    kinInformation{
      nameKin,
      relationship,
      residentialAddressKin,
      postalAddressKin,
      postalCodeKin,
      cityTownKin,
      mobileNumberKin,
    },
    groupInformation{
      groupName,
      groupLeaderName,
      leaderNumber,
      leaderIdNumber,
    },
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
      },
    },
    product,
  }`;
  return query;
};

export const feedQuery = `*[_type == "member"] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      memberNumber,
      date,
      maintained,
      branchName,
      personalDetails{
        surName,
        otherNames,
        mobileNumber,
        emailAddress,
        mpesaTransNumber,
      },
      product,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "member" && memberNumber match '${searchTerm}*' || personalDetails.mpesaTransNumber match '${searchTerm}*' || product match '${searchTerm}*' || date match '${searchTerm}*' || maintained match '${searchTerm}*' || branchName match '${searchTerm}*' || personalDetails.surName match '${searchTerm}*' || personalDetails.otherNames match '${searchTerm}*' || personalDetails.mobileNumber match '${searchTerm}*' || personalDetails.emailAddress match '${searchTerm}*']{
    image{
      asset->{
        url
      }
    },
    _id,
    memberNumber,
    date,
    maintained,
    branchName,
    personalDetails{
      surName,
      otherNames,
      dob,
      idPass,
      pinNumber,
      mobileNumber,
      gender,
      age,
      religion,
      maritalStatus,
      spouseNumber,
      nameSpouse,
      postalAddress,
      postalCode,
      cityTown,
      residentialAddress,
      emailAddress,
      rented,
      owned,
      landCareAgent,
      occupationEmployer,
      employerNumber,
      businessLocation,
      businessAge,
      refereeName,
      group,
      communityPosition,
      mpesaTransNumber,
    },
    kinInformation{
      nameKin,
      relationship,
      residentialAddressKin,
      postalAddressKin,
      postalCodeKin,
      cityTownKin,
      mobileNumberKin,
    },
    groupInformation{
      groupName,
      groupLeaderName,
      leaderNumber,
      leaderIdNumber,
    },
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
      },
    },
    product,
  }`;
  return query;
};

export const userCreatedMembersQuery = (userId) => {
  const query = `*[_type == 'member' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    memberNumber,
    date,
    maintained,
    branchName,
    personalDetails{
      surName,
      otherNames,
      dob,
      idPass,
      pinNumber,
      mobileNumber,
      gender,
      age,
      religion,
      maritalStatus,
      spouseNumber,
      nameSpouse,
      postalAddress,
      postalCode,
      cityTown,
      residentialAddress,
      emailAddress,
      rented,
      owned,
      landCareAgent,
      occupationEmployer,
      employerNumber,
      businessLocation,
      businessAge,
      refereeName,
      group,
      communityPosition,
      mpesaTransNumber,
    },
    kinInformation{
      nameKin,
      relationship,
      residentialAddressKin,
      postalAddressKin,
      postalCodeKin,
      cityTownKin,
      mobileNumberKin,
    },
    groupInformation{
      groupName,
      groupLeaderName,
      leaderNumber,
      leaderIdNumber,
    },
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
      },
    },
    product,
  }`;
  return query;
};

export const userSavedMembersQuery = (userId) => {
  const query = `*[_type == 'member' && '${userId}' in save[].userId ] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    memberNumber,
    date,
    maintained,
    branchName,
    personalDetails{
      surName,
      otherNames,
      dob,
      idPass,
      pinNumber,
      mobileNumber,
      gender,
      age,
      religion,
      maritalStatus,
      spouseNumber,
      nameSpouse,
      postalAddress,
      postalCode,
      cityTown,
      residentialAddress,
      emailAddress,
      rented,
      owned,
      landCareAgent,
      occupationEmployer,
      employerNumber,
      businessLocation,
      businessAge,
      refereeName,
      group,
      communityPosition,
      mpesaTransNumber,
    },
    kinInformation{
      nameKin,
      relationship,
      residentialAddressKin,
      postalAddressKin,
      postalCodeKin,
      cityTownKin,
      mobileNumberKin,
    },
    groupInformation{
      groupName,
      groupLeaderName,
      leaderNumber,
      leaderIdNumber,
    },
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
      },
    },
    product,
  }`;
  return query;
};
