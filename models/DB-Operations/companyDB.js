const Company = require("../company");

const fetchAboutSection = async (id) => {
  const company = await Company.findById(id);

  const aboutData = {
    since: company.since,
    status: company.status,
    companyForm: company.compForm,
    companyType: company.companyType,
    staffNumber: company.staffNumber,
    capitalMoney: company.capitalMoney,
    currency: company.currency,
    businessFields: company.businessFields,
    sisterCompany: company.sisterCompany,
    docs: company.docs,
    email: company.email,
    phone: company.phone,
    callCenter: company.callCenter,
    whatsApp: company.whatsApp,
    compProfilePDF: company.compProfilePDF,
    currentAddress: company.currentAddress,
    previousAddresses: company.previousAddresses,
  };

  return aboutData;
}; // Return About Section Fields

const fetchSocialSection = async (id) => {
  const company = await Company.findById(id);

  const socialData = {
    websites: company.websites,
    telegram: company.telegram,
    facebook: company.facebook,
    linkedin: company.linkedin,
    twitter: company.twitter,
    instagram: company.instagram,
    youtube: company.youtube,
    googlePlay: company.googlePlay,
    appStore: company.appStore,
    appGallery: company.appGallery,
  };

  return socialData;
}; // Return Social Section Fields

const fetchMainStructureSection = async (id) => {
  const company = await Company.findById(id);

  const structData = {
    mainStructure: company.mainStructure,
  };

  return structData;
}; // Return Main Structure Section Fields

const fetchBranchesSection = async (id) => {
  const company = await Company.findById(id);

  const branchesData = {
    branches: company.branches,
  };

  return branchesData;
}; // Return Branches Section Fields

const fetchStaffSection = async (id) => {
  const company = await Company.findById(id);

  const staffData = {
    staff: company.staff,
  };

  return staffData;
}; // Return Staff Section Fields

const fetchOutsourceSection = async (id) => {
  const company = await Company.findById(id);

  const outsourceData = {
    outsource: company.outsource,
  };

  return outsourceData;
}; // Return Out Sourcing Agency Section Fields

const fetchClientsSection = async (id) => {
  const company = await Company.findById(id);

  const clientsData = {
    clients: company.clients,
  };

  return clientsData;
}; // Return Out Sourcing Agency Section Fields

const fetchProfilePic = async (id) => {
  const company = await Company.findById(id);

  const imageData = {
    image: company.image,
  };

  return imageData;
}; // Return Out Sourcing Agency Section Fields

exports.fetchAboutSection = fetchAboutSection;
exports.fetchSocialSection = fetchSocialSection;
exports.fetchMainStructureSection = fetchMainStructureSection;
exports.fetchBranchesSection = fetchBranchesSection;
exports.fetchStaffSection = fetchStaffSection;
exports.fetchOutsourceSection = fetchOutsourceSection;
exports.fetchClientsSection = fetchClientsSection;
exports.fetchProfilePic = fetchProfilePic;
