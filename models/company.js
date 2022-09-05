const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  tradeName: {
    type: String,
    required: [true, "Trade Name required"],
    unique: true,
  },

  email: {
    type: Array,
    required: [true, "Email required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Password required"],
    min: 8,
  },

  capitalMoney: {
    type: Number,
    required: [true, "Capital Money required"],
  },

  currency: {
    type: String,
    required: [true, "Currency required"],
    uppercase: true,
  },

  status: {
    type: String,
    required: [true, "Status required"],
  },

  companyType: {
    type: String,
    required: [true, "Company Type required"],
  },

  phone: {
    type: Array,
    required: [true, "Phone Number required"],
    unique: true,
  },

  since: { type: String, default: "" },

  companyForm: { type: String, default: "" },

  staffNumber: { type: String, default: "" },

  businessFields: [
    {
      name: { Type: String },
      link: { Type: String },
    },
  ],

  sisterCompany: [],

  docs: [{ name: { Type: String }, link: { Type: String } }],

  callCenter: [],

  whatsApp: [],

  compProfilePDF: {
    name: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },

  currentAddress: {
    location: {
      type: String,
      default: "",
    },
    from: {
      type: String,
      default: "",
    },
    To: {
      type: String,
      default: "",
    },
  },

  previousAddresses: [
    {
      location: { Type: String },
      from: { Type: String },
      To: { Type: String },
    },
  ],

  websites: [],

  telegram: [],

  facebook: [],

  linkedin: { type: String, default: "" },

  twitter: [],

  instagram: [],

  youtube: [],

  googlePlay: [],

  appStore: [],

  appGallery: [],

  mainStructure: [
    {
      structureType: { Type: String },
      employee: { Type: String },
    },
  ],

  branches: [
    {
      currentAddress: {
        location: String,

        from: String,

        to: String,
      },

      mainStructure: [
        {
          structureType: { Type: String },
          employee: { Type: String },
        },
      ],
    },
  ],

  staff: [
    {
      name: String,
      title: String,
    },
  ],

  outsource: [
    {
      name: String,
      details: String,
      link: String,
    },
  ],

  clients: [
    {
      name: String,
      logo: { String },
      link: String,
    },
  ],

  image: {
    type: String,
    default: "/img/default.jpg",
  },

  officialName: {
    type: String,
    default: "",
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
